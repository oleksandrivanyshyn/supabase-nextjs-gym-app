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

function ChecoutPage() {
  const { selectedPaymentPlan, setSelectedPaymentPlan } =
    plansGlobalStore() as IPlansGlobalStore;
  const [startDate, setStartDate] = React.useState(
    dayjs().format('YYYY-MM-DD'),
  );

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

            <Button className="mt-7">Pay Now</Button>
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
