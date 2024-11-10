import { Container } from '@/components/Container';
import { AuthStackParamList } from '@/navigation/AuthStack';
import { Routes } from '@/navigation/routes';
import { Box, makeStyles, Text } from '@/theme';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
export default function VerifyScreen({
  route: {
    params: { email, isSignIn },
  },
}: StackScreenProps<AuthStackParamList, Routes.VERIFY>) {
  const { signUp, isLoaded: isSignUpLoaded, setActive } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const [code, setCode] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const ref = useBlurOnFulfill({ value: '', cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: '',
    setValue: setCode,
  });
  const themeStyles = React.useMemo(() => styles(), []);
  const autoComplete = Platform.OS === 'android' ? 'sms-otp' : 'one-time-code';
  const verifySignIn = async () => {
    if (!isSignInLoaded && !signIn) return null;
    if (typeof setActive !== 'function') return null;
    setIsVerifying(true);
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        code,
        strategy: 'email_code',
      });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(signInAttempt);
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setIsError(true);
      }
      Alert.alert('Error', 'Failed to Verify Email');
    } finally {
      setIsVerifying(false);
    }
  };
  const verifySignUp = async () => {
    if (!isSignUpLoaded && !signUp) return null;
    if (typeof setActive !== 'function') return null;
    setIsVerifying(true);
    try {
      const signInAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(signInAttempt);
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setIsError(true);
      }
      Alert.alert('Error', 'Failed to Verify Email');
    } finally {
      setIsVerifying(false);
    }
  };
  React.useEffect(() => {
    if (code.length === 6 && !isVerifying) {
      if (isError) {
        setIsError(false);
      }
      if (isSignIn) {
        verifySignIn();
      } else {
        verifySignUp();
      }
    }
  }, [code]);
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
                  {email}
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
                    disabled={isVerifying}
                    style={[
                      themeStyles.cell,
                      isFocused && themeStyles.focusCell,
                      isError && themeStyles.errorCell,
                      isVerifying && themeStyles.disabledCell,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                  {/* Seperator at the third cell */}
                  {index === 2 && <Box style={themeStyles.cellSeperator} />}
                </React.Fragment>
              )}
            />
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
    disabledCell: {
      backgroundColor: theme.colors.inactive,
      opacity: 0.5,
    },
    focusCell: {
      borderColor: theme.colors.muted,
    },
    errorCell: {
      borderColor: theme.colors.destructive,
    },
    cellSeperator: {
      width: 26,
      height: 2,
      backgroundColor: theme.colors.neutral,
    },
  })
);
