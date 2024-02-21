import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Moradores, Veiculos } from '../pages';
import AuthContext from '../context/auth';
import { Wrapper } from '../components';

const Private = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/moradores" element={<Moradores />} />
      <Route path="/veiculos" element={<Veiculos />} />
    </Routes>
  );
};

const Public = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

const AppRoutes = () => {
  const { logged } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {logged ? (
        <Wrapper>
          <Private />
        </Wrapper>
      ) : (
        <Public />
      )}
    </BrowserRouter>
  );
};

export default AppRoutes;
