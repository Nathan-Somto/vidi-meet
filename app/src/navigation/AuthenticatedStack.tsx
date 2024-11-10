import React from 'react';
import StreamVideoProvider from '@/components/StreamVideoProvider';
import { Routes } from './routes';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MainTabParamList, MainTabs } from './MainTabs';
import CallStackWithProvider, { CallStackParamList } from './CallStack';
import MeetingStack, { MeetingStackParamList } from './MeetingStack';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
export type AuthenticatedStackParamList = {
  [Routes.MAINTABS]: NavigatorScreenParams<MainTabParamList>;
  [Routes.CALLSTACK]: NavigatorScreenParams<CallStackParamList>;
  [Routes.MEETINGSTACK]: NavigatorScreenParams<MeetingStackParamList>;
  [Routes.PROFILE]: undefined;
};
const Stack = createStackNavigator<AuthenticatedStackParamList>();
function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.MAINTABS}>
      <Stack.Screen name={Routes.MAINTABS} component={MainTabs} />
      <Stack.Screen name={Routes.CALLSTACK} component={CallStackWithProvider} />
      <Stack.Screen name={Routes.MEETINGSTACK} component={MeetingStack} />
      <Stack.Screen name={Routes.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
export default function AuthenticatedStackWithProvider() {
  return (
    <StreamVideoProvider>
      <AuthenticatedStack />
    </StreamVideoProvider>
  );
}
