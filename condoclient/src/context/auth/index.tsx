import React, { createContext, useState } from 'react';
import { redirect } from 'react-router-dom';

interface IAuthContextProvider {
  logged: boolean;
  authenticate: (username: string, password: string) => void;
  logout: () => void;
}

const loggedKey = sessionStorage.getItem('condoclient/logged');

const INITIAL_STATE = {
  logged: loggedKey !== null && loggedKey !== 'false',
  authenticate: () => {},
  logout: () => {}
};

const AuthContext = createContext<IAuthContextProvider>(INITIAL_STATE);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [logged, setLogged] = useState<boolean>(INITIAL_STATE.logged);

  const authenticate = (username: string, password: string) => {
    console.log('authentication data: ', { username, password });
    sessionStorage.setItem('condoclient/logged', 'true');
    setLogged(true);
  };

  const logout = () => {
    sessionStorage.removeItem('condoclient/logged');
    setLogged(false);
    redirect('/');
  };

  return (
    <AuthContext.Provider
      value={{
        logged,
        authenticate,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
