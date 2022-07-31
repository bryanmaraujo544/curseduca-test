/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
} from 'react';

export interface ThemeContextValues {
  colorMode: 'light' | 'dark';
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  colorMode: 'light' | 'dark';
  setColorMode: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const CustomThemeContext = createContext({} as ThemeContextValues);

export const CustomThemeProvider = ({
  children,
  colorMode,
  setColorMode,
}: ThemeProviderProps) => {
  const toggleTheme = useCallback(() => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setColorMode]);

  return (
    <CustomThemeContext.Provider value={{ colorMode, toggleTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};
