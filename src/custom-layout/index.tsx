'use client';
import React, { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import PrivateLayout from '@/custom-layout/private-layout';
import PublicLayout from '@/custom-layout/public-layout';

const CustomLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  if (pathname.includes('/account')) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
  return <PublicLayout>{children}</PublicLayout>;
};

export default CustomLayout;
