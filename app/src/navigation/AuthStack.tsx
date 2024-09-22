import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import WelcomeScreen from 'app/src/screens/Auth/WelcomeScreen';
import AuthScreen from 'app/src/screens/Auth/AuthScreen';
import VerifyScreen from 'app/src/screens/Auth/VerifyScreen';
export type AuthStackParamList = {
  [Routes.WELCOME]: undefined;
  [Routes.AUTH]: {
    type: 'sign in' | 'sign up';
  };
  [Routes.VERIFY]: {
    email: string;
  };
};
const Stack = createStackNavigator<AuthStackParamList>();
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={Routes.AUTH} initialParams={{ type: 'sign in' }} component={AuthScreen} />
      <Stack.Screen name={Routes.VERIFY} component={VerifyScreen} />
    </Stack.Navigator>
  );
}
