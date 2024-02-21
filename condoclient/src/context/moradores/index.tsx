/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from 'react';

export interface IMoradorListItem {
  id_morador: number;
  primeiro_nome: string;
  segundo_nome: string;
  apartamento: number;
}

interface IMoradoresContextProvider {
  list: IMoradorListItem[];
  isLoading: boolean;
  fetchList: () => void;
}

const DEFAULT_VALUE = {
  list: [],
  isLoading: false,
  fetchList: () => {}
};
const MoradoresContext =
  createContext<IMoradoresContextProvider>(DEFAULT_VALUE);

const MoradoresContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [list, setList] = useState<IMoradorListItem[]>(DEFAULT_VALUE.list);
  const [isLoading, setIsLoading] = useState<boolean>(DEFAULT_VALUE.isLoading);

  const fetchList = async () => {
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET'
    };

    await fetch('http://localhost:8080/api/moradores', requestOptions)
      .then((response) => response.json())
      .then((result: IMoradorListItem[]) => {
        setList(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <MoradoresContext.Provider
      value={{
        list,
        isLoading,
        fetchList
      }}
    >
      {children}
    </MoradoresContext.Provider>
  );
};

export { MoradoresContextProvider };
export default MoradoresContext;
