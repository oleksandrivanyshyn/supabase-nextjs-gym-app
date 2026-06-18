import React, { PropsWithChildren, useEffect, useState } from 'react';
import Header from '@/custom-layout/header';
import { getCurrentUserFromSupabase } from '@/actions/users';
import { IUser } from '@/interfaces';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  console.log(user);
  const fetchUser = async () => {
    try {
      const response = await getCurrentUserFromSupabase();
      if (!response.success) {
        throw new Error(response.error);
      } else {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
};

export default PrivateLayout;
