import {  TextInput, TextInputProps } from 'react-native';
import React from 'react';
import Text from './Text';
import Box from './Box';
import { createBox } from '@shopify/restyle';
import { Theme, useTheme } from '../theme';
const BaseTextInput = createBox<Theme, TextInputProps>(TextInput);
type props<T extends string> = Omit<
  TextInputProps,
  'style' | 'onChangeText'
> & {
  label: T;
  showLabel?: boolean
  Icon?: () => JSX.Element;
  handleChangeText: (label: T, text: string) => void;
};
export default function FormInput<T extends string>({
  handleChangeText,
  label,
  placeholder,
  value,
  showLabel = true,
  Icon,
  ...props
}: props<T>) {
  const { colors, size } = useTheme();
  return (
    <Box>
      {showLabel && (
        <Text variant="title" marginBottom="sm_8">
          {label}
        </Text>
      )}
      <Box
        flexDirection="row"
        borderRadius="s_4"
        backgroundColor="secondary"
        paddingHorizontal="m_16"
        alignItems='center'
        height={size.xl}>
        {Icon && <Icon />}
        <BaseTextInput
          onChangeText={(text) => handleChangeText(label, text)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral}
          flex={Icon ? 0.7: 1}
          textAlign="left"
          style={{
            color: colors.text,
          }}
          {...props}
        />
      </Box>
    </Box>
  );
}
