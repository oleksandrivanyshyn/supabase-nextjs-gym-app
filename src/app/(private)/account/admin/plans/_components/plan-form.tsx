'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadFileAndGetUrl } from '@/utils';
import { addNewPlan, editPlanById } from '@/actions/plans';
import { useRouter } from 'next/navigation';

interface PlanFormProps {
  formType?: 'add' | 'edit';
  initialValues?: any;
}

function PlanForm({ formType = 'add', initialValues }: PlanFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<any[]>([]);
  const [existingMediaUrls, setExistingMediaUrls] = useState<string[]>(
    initialValues?.images || [],
  );

  const formSchema = z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    features: z.array(z.string()).nonempty('Features is required'),
    monthly_price: z.union([z.number(), z.string()]),
    quarterly_price: z.union([z.number(), z.string()]),
    half_yearly_price: z.union([z.number(), z.string()]),
    yearly_price: z.union([z.number(), z.string()]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      features: initialValues?.features || [''],
      monthly_price: initialValues?.monthly_price ?? 0,
      quarterly_price: initialValues?.quarterly_price ?? 0,
      half_yearly_price: initialValues?.half_yearly_price ?? 0,
      yearly_price: initialValues?.yearly_price ?? 0,
    },
  });

  async function onSubmit(values: any) {
    try {
      setLoading(true);

      let newMediaUrls = [];
      for (let file of selectedMediaFiles) {
        const response = await uploadFileAndGetUrl(file);
        if (!response.success) {
          throw new Error(response.message);
        }
        newMediaUrls.push(response.data);
      }

      const formattedValues = {
        ...values,
        monthly_price:
          values.monthly_price === '' ? 0 : parseFloat(values.monthly_price),
        quarterly_price:
          values.quarterly_price === ''
            ? 0
            : parseFloat(values.quarterly_price),
        half_yearly_price:
          values.half_yearly_price === ''
            ? 0
            : parseFloat(values.half_yearly_price),
        yearly_price:
          values.yearly_price === '' ? 0 : parseFloat(values.yearly_price),
      };

      if (formType === 'add') {
        formattedValues.images = newMediaUrls;
      } else {
        formattedValues.images = [...existingMediaUrls, ...newMediaUrls];
      }

      let response = null;
      if (formType === 'add') {
        response = await addNewPlan(formattedValues);
      } else {
        response = await editPlanById(initialValues.id, formattedValues);
      }

      if (response.success) {
        toast.success(response.message);
        router.push('/account/admin/plans');
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'features',
  } as any);

  const pricingFields = [
    'monthly_price',
    'quarterly_price',
    'half_yearly_price',
    'yearly_price',
  ];

  const onSelectedMediaFilesRemove = (index: number) => {
    const temp = [...selectedMediaFiles];
    temp.splice(index, 1);
    setSelectedMediaFiles(temp);
  };

  const onExistingMediaUrlsRemove = (index: number) => {
    const temp = [...existingMediaUrls];
    temp.splice(index, 1);
    setExistingMediaUrls(temp);
  };

  return (
    <div className="mt-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter plan name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <fieldset className="p-5 border border-gray-400">
            <legend className="bg-white px-5 text-sm">Features</legend>

            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  name={`features.${index}`}
                  key={field.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-5">
                      <FormControl>
                        <Input placeholder="Feature description" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant={'outline'}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => append('')}
              type="button"
              className="mt-7"
            >
              Add Feature
            </Button>
          </fieldset>

          <fieldset className="p-5 border border-gray-400">
            <legend className="bg-white px-5 text-sm">Pricing</legend>

            <div className="grid grid-cols-4 gap-5">
              {pricingFields.map((item) => (
                <FormField
                  control={form.control}
                  name={item as any}
                  key={item}
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-xs font-semibold block mb-1">
                        {item.replace('_', ' ').toUpperCase()}
                      </label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          value={
                            field.value === 0 || Number.isNaN(field.value)
                              ? ''
                              : field.value
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === '' ? '' : parseFloat(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3">
            <FormLabel className="block">Images</FormLabel>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e: any) => {
                if (e.target.files) {
                  setSelectedMediaFiles([
                    ...selectedMediaFiles,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
            />

            <div className="flex flex-wrap gap-5">
              {existingMediaUrls.map((url, index) => (
                <div
                  className="border p-2 rounded border-gray-300 flex items-center justify-center flex-col relative"
                  key={`existing-${index}`}
                >
                  <img
                    src={url}
                    className="w-20 h-20 object-contain"
                    alt="Existing pricing plan"
                  />
                  <span
                    className="text-red-500 text-xs cursor-pointer mountaineer underline text-center w-full mt-1"
                    onClick={() => onExistingMediaUrlsRemove(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
              {selectedMediaFiles.map((file, index) => (
                <div
                  className="border p-2 rounded border-gray-300 flex items-center justify-center flex-col relative"
                  key={`selected-${index}`}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-20 h-20 object-contain"
                    alt="Selected premium plan"
                  />
                  <span
                    className="text-red-500 text-xs cursor-pointer underline text-center w-full mt-1"
                    onClick={() => onSelectedMediaFilesRemove(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/account/admin/plans')}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PlanForm;
