import React from 'react';

import { MoradoresContextProvider } from './moradores';
import { VeiculosContextProvider } from './veiculos';
import { AuthContextProvider } from './auth';

const GlobalContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <AuthContextProvider>
      <MoradoresContextProvider>
        <VeiculosContextProvider>{children}</VeiculosContextProvider>
      </MoradoresContextProvider>
    </AuthContextProvider>
  );
};

export default GlobalContext;
