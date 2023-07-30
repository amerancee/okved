import { ThemeProvider } from 'styled-components';
import { AppStoreProvider } from './store/AppStore/AppStoreProvider.tsx';
import { GlobalStyle } from './theme/GlobalStyle';
import { theme } from './theme/theme';
import MainPage from './pages/MainPage.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppStoreProvider>
        <GlobalStyle />
        <MainPage />
      </AppStoreProvider>
    </ThemeProvider>
  );
}

export default App;
