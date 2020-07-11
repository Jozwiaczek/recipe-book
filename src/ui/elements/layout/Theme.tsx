import React from 'react';
import baseStyled, {ThemeProvider, ThemedStyledInterface} from 'styled-components';

const theme = {
  sizes: {
    navbarHeight: '3.5em',
    borderRadius: '6px',
    margin: 10
  },
  palette: {
    primary: {
      light: '#4791db',
      main: '#1976d2',
      dark: '#115293',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e33371',
      main: '#dc004e',
      dark: '#9a0036',
      contrastText: '#000',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00'
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)'
    },
    background: {
      default: '#fafafa',
      paper: '#fff'
    },
    divider: 'rgba(0,0,0,0.24)'
  },
};

const Theme: React.FC = ({children}) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export type ITheme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<ITheme>;

export default Theme;
