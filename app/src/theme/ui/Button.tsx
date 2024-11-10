import {
  BoxProps,
  ColorProps,
  createBox,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from './Text';
import { Theme, useTheme } from '../theme';
const buttonBox = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);
const variant = createVariant<Theme, 'buttonVariants'>({
  themeKey: 'buttonVariants',
});
const BaseButton = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> &
    BoxProps<Theme> &
    TouchableOpacityProps &
    ColorProps<Theme>,
  Theme
>([variant], buttonBox);

type Props = React.PropsWithChildren &
  React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    size?: 'icon' | 'sm' | 'lg' | 'default' | 'none';
    label?: string;
    isLoading?: boolean;
  };

const Button = ({
  children,
  label,
  isLoading,
  variant = 'primary',
  size = 'default',
  color = 'text',
  ...props
}: Props) => {
  const py =
    size === 'icon' || size === 'sm'
      ? 'xs_4'
      : size === 'default'
        ? 'sm_8'
        : variant === 'link'
          ? undefined
          : 'm_16';
  const px =
    size === 'icon' || size === 'sm'
      ? 'sm_8'
      : size === 'default'
        ? 'm_16'
        : variant === 'link'
          ? undefined
          : 'm_24';
  const theme = useTheme();
  return (
    <BaseButton
      variant={variant}
      flexDirection="row"
      columnGap="sm_8"
      paddingVertical={py}
      paddingHorizontal={px}
      alignItems="center"
      justifyContent="center"
      disabled={isLoading}
      height={50}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : label ? (
        <Text variant="body" color={color} textAlign="center" fontWeight={'600'}>
          {label}
        </Text>
      ) : (
        children
      )}
    </BaseButton>
  );
};
export default Button;
