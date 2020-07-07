import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

// const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: 'rgb(26, 115, 232)',
    },
    error: {
      main: '#d93025',
    },
  },
});

const Themed: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default Themed;
