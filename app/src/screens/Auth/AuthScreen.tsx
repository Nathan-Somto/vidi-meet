import { Container } from '@/components/Container';
import { Routes } from '@/navigation/routes';
import { Box, Button, FormInput, Text } from '@/theme';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Image } from 'react-native';
import Logo from '../../../assets/icon.png';
import { AuthStackParamList } from '@/navigation/AuthStack';
import { StackScreenProps } from '@react-navigation/stack';
export default function AuthScreen({ route }: StackScreenProps<AuthStackParamList, Routes.AUTH>) {
  const { type } = route.params;
  const router = useNavigation();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [username, setUsername] = React.useState<string>('');
  const activateAuth = true;
  async function handleSubmit() {
    if (!isSignUpLoaded && !signUp) return null;
    if (!isSignInLoaded && !signIn) return null;
    setIsLoading(true);
    try {
      if (type === 'sign up') {
        await signUp.create({
          emailAddress,
          username,
        });
        await signUp.prepareEmailAddressVerification();
      } else {
        const { supportedFirstFactors } = await signIn.create({
          identifier: emailAddress,
        });
        const emailCodeFactor = supportedFirstFactors?.find((factor) => {
          return factor.strategy === 'email_code';
        });
        if (!emailCodeFactor) {
          throw new Error('Email code factor not supported');
        }
        const { emailAddressId } = emailCodeFactor;
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        });
      }
      router.navigate(Routes.AUTHSTACK, {
        screen: Routes.VERIFY,
        params: { email: emailAddress, isSignIn: type === 'sign in' },
      });
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', 'Failed to Send Otp');
    } finally {
      setIsLoading(false);
    }
  }
  function handleChangeText(label: string, text: string) {
    if (label === 'email') {
      setEmailAddress(text);
    }
  }
  return (
    <Container>
      <Box width={'100%'} paddingHorizontal="m_16" justifyContent="space-evenly" flex={0.7}>
        <Box>
          <Image
            source={Logo}
            style={{
              height: 100,
              width: 100,
              marginHorizontal: 'auto',
              marginBottom: 12,
            }}
          />
          <Text textAlign="center" variant="body" color="neutral" marginBottom="xs_4">
            Sign {type === 'sign in' ? 'in via your email account' : 'up with a username and email'}
          </Text>
        </Box>

        <Box>
          {type === 'sign up' && (
            <>
              <FormInput
                label="username"
                showLabel={false}
                placeholder="Username"
                handleChangeText={(label, text) => setUsername(text)}
                value={username}
                Icon={() => (
                  <Feather name="user" size={20} color="#6C757D" style={{ marginRight: 8 }} />
                )}
              />
              <Box height={15} />
            </>
          )}
          <FormInput
            label="email"
            showLabel={false}
            placeholder="Email Address"
            handleChangeText={handleChangeText}
            value={emailAddress}
            Icon={() => (
              <Feather name="mail" size={20} color="#6C757D" style={{ marginRight: 8 }} />
            )}
          />
          {type === 'sign up' && (
            <Button
              justifyContent="flex-start"
              variant="link"
              style={{ paddingHorizontal: 0 }}
              onPress={() => {
                router.navigate(Routes.AUTHSTACK, {
                  screen: Routes.AUTH,
                  params: { type: 'sign in' },
                });
              }}>
              <Text color="inactive">Already have an account? Log In</Text>
            </Button>
          )}
          <Button
            isLoading={isLoading}
            marginTop="m_24"
            onPress={
              activateAuth
                ? handleSubmit
                : () =>
                    router.navigate(Routes.AUTHENTICATEDSTACK, {
                      screen: Routes.MAINTABS,
                      params: {
                        screen: Routes.HOME,
                      },
                    })
            }>
            <Text variant="title" style={{ marginRight: 2.5 }}>
              Sign {type === 'sign in' ? 'in' : 'up'}
            </Text>
            <Feather name="arrow-right" size={24} color="white" />
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
