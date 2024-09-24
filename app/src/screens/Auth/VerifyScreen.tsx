import { Container } from '@/components/Container';
import { AuthStackParamList } from '@/navigation/AuthStack';
import { Routes } from '@/navigation/routes';
import { Box, Button, makeStyles, Text } from '@/theme';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Keyboard, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
export default function VerifyScreen({
  route,
}: StackScreenProps<AuthStackParamList, Routes.VERIFY>) {
  const [code, setCode] = React.useState('');
  const ref = useBlurOnFulfill({ value: '', cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: '',
    setValue: setCode,
  });
  const themeStyles = React.useMemo(() => styles(), []);
  const autoComplete = Platform.OS === 'android' ? 'sms-otp' : 'one-time-code';
  return (
    <Container>
      <Box width="100%" flex={1} padding="m_24">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Box style={{ marginTop: 40 }}>
              <Text variant="large" marginBottom="sm_8">
                Verify Email
              </Text>
              <Text variant="body" color="neutral" lineHeight={25}>
                Please fill the input box with the six digit code sent to{' '}
                <Text color="text" fontWeight={'semibold'}>
                  {route.params.email}
                </Text>{' '}
              </Text>
            </Box>

            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={themeStyles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={autoComplete}
              renderCell={({ index, symbol, isFocused }) => (
                <React.Fragment key={index}>
                  <Text
                    style={[themeStyles.cell, isFocused && themeStyles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                  {/* Seperator at the third cell */}
                  {index === 2 && <Box style={themeStyles.cellSeperator} />}
                </React.Fragment>
              )}
            />
            <Box style={{ marginTop: 10 }}></Box>
            <Button label="Verify" />
          </>
        </TouchableWithoutFeedback>
      </Box>
    </Container>
  );
}
const styles = makeStyles((theme) =>
  StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginVertical: 40, alignItems: 'center' },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: theme.colors.inactive,
      marginHorizontal: 0,
      textAlign: 'center',
      borderRadius: theme.borderRadii.s_4,
    },
    focusCell: {
      borderColor: theme.colors.muted,
    },
    cellSeperator: {
      width: 26,
      height: 2,
      backgroundColor: theme.colors.neutral,
    },
  })
);
