import {  TextInput, TextInputProps } from 'react-native';
import React from 'react';
import Text from './Text';
import Box from './Box';
import { createBox } from '@shopify/restyle';
import { Theme, useTheme } from '../theme';
const BaseTextInput = createBox<Theme, TextInputProps>(TextInput);
type props<T extends string> = Omit<
  React.ComponentProps<typeof BaseTextInput>,
  'style' | 'onChangeText'
> & {
  label: T;
  handleChangeText: (label: T, text: string) => void;
};
export default function FormInput<T extends string>({
  handleChangeText,
  label,
  placeholder,
  value,
  ...props
}: props<T>) {
  const { colors, size } = useTheme();
  return (
    <Box>
      <Text variant={'title'} marginBottom="sm_8">
        {label}
      </Text>
      <Box
        flexDirection="row"
        borderRadius="s_3"
        backgroundColor="secondary"
        paddingHorizontal="m_16"
        height={size.lg}>
        <BaseTextInput
          onChangeText={(text) => handleChangeText(label, text)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral}
          flex={1}
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
