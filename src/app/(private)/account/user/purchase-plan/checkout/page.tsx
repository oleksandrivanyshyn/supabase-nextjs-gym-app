'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageTitle from '@/components/ui/page-title';
import {
  IPlansGlobalStore,
  plansGlobalStore,
} from '@/global-store/plans-store';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import toast from 'react-hot-toast';
import { getStripePaymentIntent } from '@/actions/payments';

function ChecoutPage() {
  const { selectedPaymentPlan, setSelectedPaymentPlan } =
    plansGlobalStore() as IPlansGlobalStore;
  const [startDate, setStartDate] = React.useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const [loading, setLoading] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);

  const renderProperty = (key: string, value: any) => {
    try {
      return (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{key}</span>
          <span className="text-gray-700 font-semibold text-sm">{value}</span>
        </div>
      );
    } catch (error) {
      return <></>;
    }
  };
  const endDate = useMemo(() => {
    return dayjs(startDate)
      .add(selectedPaymentPlan?.paymentPlan?.duration, 'day')
      .format('YYYY-MM-DD');
  }, [startDate]);
  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await getStripePaymentIntent(
        selectedPaymentPlan?.paymentPlan?.price,
      );
      if (response.success) {
        setClientSecret(response.data);
        setShowCheckoutForm(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error('Payment Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <PageTitle title="Checkout" />
      {selectedPaymentPlan && (
        <div className="grid grid-cols-2 mt-7">
          <div className="col-span-1 p-5 border border-gray-500 flex flex-col gap-2 rounded-lg">
            {renderProperty('Plan Name', selectedPaymentPlan?.mainPlan?.name)}
            {renderProperty(
              'Amount',
              '$' + selectedPaymentPlan?.paymentPlan?.price,
            )}
            {renderProperty(
              'Duration',
              selectedPaymentPlan?.paymentPlan?.duration + ' days',
            )}
            {renderProperty(
              'Start Date',
              <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />,
            )}

            {startDate && renderProperty('End Date', endDate)}

            <Button
              className="mt-7"
              onClick={paymentIntentHandler}
              disabled={loading}
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}

      {!selectedPaymentPlan && (
        <div className="mt-5 text-sm">
          <p>Please select a payment plan</p>
        </div>
      )}
    </div>
  );
}

export default ChecoutPage;
