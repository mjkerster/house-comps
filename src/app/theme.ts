import { PaletteOptions } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

export const HcColorPalette: PaletteOptions = {
  primary: {
    main: '#304ffe',
    light: '#7a7cff',
    dark: '#0026ca',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#fedf30',
    light: '#ffff69',
    dark: '#c7ae00',
    contrastText: '#000000',
  },
  grey: {
    50: '#F1F1F1',
    100: '#E3E3E3',
    200: '#C8C8C8',
    300: '#ACACAC',
    400: '#919191',
    500: '#757575',
    600: '#5E5E5E',
    700: '#464646',
    800: '#2F2F2F',
    900: '#171717',
  },
  background: {
    default: '#F5F5F6',
    paper: '#ffffff',
  },
  text: {
    primary: '#171717',
    secondary: '#757575',
  },
  divider: '#E3E3E3',
  error: {
    main: '#DF3434',
  },
  warning: {
    main: '#db7e00',
  },
  success: {
    main: '#599B41',
  },
  info: {
    main: '#3556C0',
  },
};

export const HcThemeOptions: ThemeOptions = {
  palette: HcColorPalette,
  spacing: 4,
  typography: {
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    h1: {
      fontFamily: 'PoppinsLight',
      fontSize: 32,
      lineHeight: '36px',
    },
    h2: {
      fontFamily: 'PoppinsLight',
      fontSize: 26,
      lineHeight: '29px',
    },
    h3: {
      fontFamily: 'PoppinsLight',
      fontSize: 20,
      lineHeight: '22px',
    },
    h4: {
      fontFamily: 'PoppinsMedium',
      fontSize: 14,
      letterSpacing: 0.1,
      textTransform: 'uppercase',
      lineHeight: '16px',
    },
    h5: {
      fontFamily: 'PoppinsMedium',
      fontSize: 12,
      lineHeight: '14px',
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: 'PoppinsRegular',
      fontSize: 16,
      lineHeight: '20px',
    },
    body2: {
      fontFamily: 'PoppinsRegular',
      fontSize: 14,
      lineHeight: '18px',
    },
    caption: {
      fontFamily: 'PoppinsRegular',
      fontSize: 12,
      lineHeight: '14px',
    },
    button: {
      fontFamily: 'PoppinsMedium',
      fontSize: 16,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        text: {
          textTransform: 'uppercase',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        color: 'primary',
        size: 'small',
      },
    },
  },
};
