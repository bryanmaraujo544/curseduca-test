import {
  CustomThemeContext,
  ThemeContextValues,
} from 'contexts/CustomThemeContext';
import { useContext } from 'react';

export const useTheme = (): ThemeContextValues => {
  const ctx = useContext(CustomThemeContext);
  return ctx;
};
