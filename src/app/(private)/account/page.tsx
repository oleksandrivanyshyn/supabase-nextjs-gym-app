'use client';

import { Button } from '@/components/ui/button';
import PageTitle from '@/components/ui/page-title';
import usersGlobalStore, {
  IUsersGlobalStore,
} from '@/global-store/users-store';
import Link from 'next/link';
import React from 'react';

function AccountPage() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  return (
    <div>
      <PageTitle title={`Welcome ${user?.name}`} />

      <div className="flex flex-col gap-5">
        <p className="mt-5 text-sm text-gray-600">
          Welcome to your account panel. Here you can view your personal details
          and available services.
        </p>

        <Button className="w-max">
          <Link href={'/account/user/purchase-plan'}>
            View Subscription Plans
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default AccountPage;
