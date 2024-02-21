/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from 'react';
import { IMoradorListItem } from '../moradores';

interface IVeiculosListItem {
  id_veiculo: number;
  marca: string | null;
  modelo: string;
  placa: string;
  proprietario: IMoradorListItem | null;
}

interface IVeiculosContextProvider {
  list: IVeiculosListItem[];
  isLoading: boolean;
  fetchList: () => void;
}

const DEFAULT_VALUE = {
  list: [],
  isLoading: false,
  fetchList: () => {}
};
const VeiculosContext = createContext<IVeiculosContextProvider>(DEFAULT_VALUE);

const VeiculosContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [list, setList] = useState<IVeiculosListItem[]>(DEFAULT_VALUE.list);
  const [isLoading, setIsLoading] = useState<boolean>(DEFAULT_VALUE.isLoading);

  const fetchList = async () => {
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET'
    };

    await fetch('http://localhost:8080/api/veiculos', requestOptions)
      .then((response) => response.json())
      .then((result: IVeiculosListItem[]) => {
        setList(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <VeiculosContext.Provider
      value={{
        list,
        isLoading,
        fetchList
      }}
    >
      {children}
    </VeiculosContext.Provider>
  );
};

export { VeiculosContextProvider };
export default VeiculosContext;
