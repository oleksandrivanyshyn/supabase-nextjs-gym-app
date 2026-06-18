import React, { PropsWithChildren } from 'react';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Header</h1>
      {children}
    </div>
  );
};

export default PrivateLayout;
