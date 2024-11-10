import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import CallScreen from '@/screens/Call/CallScreen';
import MeetingSetupScreen from '@/screens/Call/CallSetupScreen';
import { useTheme } from '@/theme';
import StreamCallProvider from '@/components/StreamCallProvider';
import CallEndedScreen from '@/screens/Call/CallEndedScreen';
export type UserListData = { id: string; name: string }[];
export type CallStackParamList = {
  [Routes.CALL]: undefined;
  [Routes.CALLSETUP]: undefined;
  [Routes.CALLENDED]: {
    endedBy: string | null;
    startedAt: string | Date | null;
    endedAt: string | Date | null;
    hasEnded?: boolean;
    showRateCall?: boolean;
  };
};

const Stack = createStackNavigator<CallStackParamList>();
function CallStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.text,
      }}
      initialRouteName={Routes.CALLSETUP}>
      <Stack.Screen name={Routes.CALLSETUP} component={MeetingSetupScreen} />
      <Stack.Screen name={Routes.CALL} component={CallScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={Routes.CALLENDED}
        component={CallEndedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function CallStackWithProvider() {
  return (
    <StreamCallProvider>
      <CallStack />
    </StreamCallProvider>
  );
}
