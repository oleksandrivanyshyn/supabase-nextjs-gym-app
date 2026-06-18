import React from 'react';
import { IUser } from '@/interfaces';
import { Menu } from 'lucide-react';

const Header = ({ user }: { user: IUser | null }) => {
  return (
    <div className="flex items-center justify-between bg-primary px-5 py-6">
      <h1 className="text-2xl font-bold text-white">
        <b className="text-white">Shey.</b>
        <b className="text-green-600">Fit</b>
      </h1>

      <div className="flex gap-5 items-center">
        <h1 className="text-sm text-white">{user?.name}</h1>

        <Menu className="text-white cursor-pointer" size={15} />
      </div>
    </div>
  );
};

export default Header;
