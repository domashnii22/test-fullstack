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
    text: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'],
  },
});

export default theme;
