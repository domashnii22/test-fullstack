import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e5c5c',
    },
    secondary: {
      main: '#007FFF',
      hover: '#0066CC',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'],
  },
});

export default theme;
