import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { getCurrentUserFromSupabase } from '@/actions/users';

const AccountPage = async () => {
  const result = await currentUser();
  console.log(result);
  const name = result?.firstName + ' ' + result?.lastName;
  const clerkUserId = result?.id;
  const email = result?.emailAddresses[0].emailAddress;
  const response = await getCurrentUserFromSupabase();
  return (
    <div className="p-5">
      <h1>Account Page</h1>
      <UserButton fallback="/" />
      <h1>Clerk User Name: {name}</h1>
      <h1>Clerk User Email: {email}</h1>
      <h1>Clerk User ID: {clerkUserId}</h1>
    </div>
  );
};

export default AccountPage;
