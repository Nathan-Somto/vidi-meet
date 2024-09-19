import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import WelcomeScreen from '@/screens/Auth/WelcomeScreen';
import AuthScreen from '@/screens/Auth/AuthScreen';
const Stack = createStackNavigator();
export default function AuthStack() {
  return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={Routes.AUTH} component={AuthScreen} />
   </Stack.Navigator>
  )
}