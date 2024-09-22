import { Container } from '@/components/Container';
import { Routes } from '@/navigation/routes';
import { Button, Text } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function AuthScreen() {
  const router = useNavigation();

  /* async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isLoaded && !signUp) return null

    try {
      // Start the sign-up process using the phone number method
      await signUp.create({
        phoneNumber: phone,
      })

      // Start the verification - a SMS message will be sent to the
      // number with a one-time code
      await signUp.preparePhoneNumberVerification()

      // Set verifying to true to display second form and capture the OTP code
      setVerifying(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault()

    if (!isLoaded && !signUp) return null

    try {
      // Use the code provided by the user and attempt verification
      const signInAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })

        router.push('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signInAttempt)
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }
 */
  return (
    <Container>
      <Text>AuthScreen</Text>
      <Button
        label="Sign In"
        onPress={() =>
          router.navigate(Routes.MAINTABS, {
            screen: Routes.HOME,
          })
        }
      />
    </Container>
  );
}
