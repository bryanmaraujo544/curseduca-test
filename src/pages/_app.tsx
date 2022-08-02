import { useState } from 'react';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/global';

import theme from 'styles/theme';
import { CustomThemeProvider } from 'contexts/CustomThemeContext';
import { UserContextProvider } from 'contexts/UserContext';
import { ToastContainer } from 'components/Toast/ToastContainer';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorMode, setColorMode] = useState(() => {
    try {
      const colorModeStoraged = window.localStorage.getItem('@color-mode') as
        | 'light'
        | 'dark';
      if (!colorModeStoraged) {
        return 'light';
      }
      return colorModeStoraged;
    } catch {
      return 'light';
    }
  });

  return (
    <UserContextProvider>
      <CustomThemeProvider colorMode={colorMode} setColorMode={setColorMode}>
        <ThemeProvider theme={theme[colorMode]}>
          <Component {...pageProps} />
          <GlobalStyle />
          <ToastContainer />
        </ThemeProvider>
      </CustomThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;

