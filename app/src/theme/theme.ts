import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export enum FontFamily {
  regular = 'Inter-Regular',
  medium = 'Inter-Medium',
  semibold = 'Inter-SemiBold',
}
type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const palette = {
  white: '#FFFFFF',
  background: '#121212',
  muted: "#BB86FC",
  primary: '#830EF9',
  secondary: '#1E1E1E',
  inactive: '#666666',
  neutral: '#6C757D',
  success: '#00C851',
  destructive: '#FF4D4F',
  text: '#EDEDED',
  tabBackground: '#212B33',
  transparent: 'transparent',
};

const theme = createTheme({
  colors: {
    ...palette
  }, 
  size: {
    xs: 2,
    s: 16,
    m: 24,
    lg: 30,
    xl: 50,
    xxl: 80,
  },
  spacing: {
    xs_4: 4,
    sm_8: 8,
    sm_12: 12,
    m_16: 16,
    m_24: 24,
    l_32: 32,
    xl_64: 64,
  },
  borderRadii: {
    xs_2: 2,
    s_4: 4,
    m_8: 8,
    l_12: 12,
    l_16: 16,
    xl_24: 24,
  },
  textVariants: {
    small: {
      fontSize: 14,
      fontFamily: FontFamily.regular,
    },
    body: {
      fontSize: 16,
      fontFamily: FontFamily.regular,
    },
    title: { fontSize: 20,  fontFamily: FontFamily.medium },
    large: {
      fontSize: 36,
      fontFamily: FontFamily.semibold
    },
    extra_large: {
      fontSize: 64,
      fontWeight: 'bold',
      fontFamily: FontFamily.semibold
    },
    defaults: {
      fontSize: 16,
      fontFamily: FontFamily.regular,
      color: 'text'
    },
  },
  buttonVariants: {
    link: {
      backgroundColor:'transparent'
    },
    primary: {
      backgroundColor: 'primary',
      borderRadius: 's_4',
    },
    secondary: {
      backgroundColor: 'secondary',
      borderRadius: 's_4',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
      borderRadius: 's_4',
    },
    destructive: {
      backgroundColor: 'destructive',
      borderRadius: 's_4',
      
  },
  default: {
    backgroundColor: 'primary',
    borderRadius: 's_4',
    color: 'text',
  }

}
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
