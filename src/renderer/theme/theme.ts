import { amber, deepPurple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: deepPurple[300],
        '&:hover': { backgroundColor: deepPurple[500] },
      },
      containedSecondary: {
        backgroundColor: amber[700],
        '&:hover': { backgroundColor: amber[900] },
      },
    },
    MuiTypography: {
      h1: {
        fontSize: '2.3rem',
        fontWeight: 600,
      },
    },
    MuiInput: {
      underline: {
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `2px solid ${deepPurple[800]}`,
        },
      },
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
    },
  },
});
