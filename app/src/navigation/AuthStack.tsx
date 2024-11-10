import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import WelcomeScreen from '@/screens/Auth/WelcomeScreen';
import AuthScreen from '@/screens/Auth/AuthScreen';
import VerifyScreen from '@/screens/Auth/VerifyScreen';
export type AuthStackParamList = {
  [Routes.WELCOME]: undefined;
  [Routes.AUTH]: {
    type: 'sign in' | 'sign up';
  };
  [Routes.VERIFY]: {
    email: string;
    isSignIn: boolean;
  };
};
const Stack = createStackNavigator<AuthStackParamList>();
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={Routes.AUTH} initialParams={{ type: 'sign in' }} component={AuthScreen} />
      <Stack.Screen name={Routes.VERIFY} component={VerifyScreen} initialParams={{email: "johndoe@gmail.com"}} />
    </Stack.Navigator>
  );
}
