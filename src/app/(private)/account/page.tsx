import React from 'react';
import { UserButton } from '@clerk/nextjs';

const AccountPage = () => {
  return (
    <div className="p-5">
      <h1>Account Page</h1>
      <UserButton fallback="/" />
    </div>
  );
};

export default AccountPage;
