import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './router';
import { theme } from './config';
import GlobalContext from './context';

const App: React.FunctionComponent = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <GlobalContext>
          <AppRoutes />
        </GlobalContext>
      </ThemeProvider>
    </>
  );
};

export default App;
