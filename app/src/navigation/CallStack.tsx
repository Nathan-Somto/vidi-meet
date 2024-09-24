import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import CallScreen from '@/screens/Call/CallScreen';
import JoinMeetingScreen from '@/screens/Call/JoinMeeting';
import ScheduleMeetingScreen from '@/screens/Call/ScheduleMeeting';
import VideoPlayerScreen from '@/screens/Call/VideoPlayerScreen';
import MeetingSetupScreen from '@/screens/Call/MeetingSetupScreen';
import UserListScreen from '@/screens/Call/UserListScreen';
import { useTheme } from '@/theme';
export type UserListData = {id: string; name: string;}[]
export type CallStackParamList = {
  [Routes.CALL]: {
    callId: string;
  };
  [Routes.JOINMEETING]: {
    inviteId?: string;
  };
  [Routes.SCHEDULEMEETING]: undefined;
  [Routes.VIDEOPLAYER]: {
    url: string;
    title: string;
    duration: number;
  };
  [Routes.MEETINGSETUP]: undefined;
  [Routes.USERLIST]: {
    from: Routes.SCHEDULEMEETING | Routes.NEWMEETING;
    add?: boolean;
  };
};

const Stack = createStackNavigator<CallStackParamList>();
export default function CallStack() {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,        
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name={Routes.CALL} component={CallScreen} />
      <Stack.Screen name={Routes.USERLIST} component={UserListScreen} />
      <Stack.Screen name={Routes.JOINMEETING} component={JoinMeetingScreen} />
      <Stack.Screen name={Routes.SCHEDULEMEETING} component={ScheduleMeetingScreen} />
      <Stack.Screen name={Routes.VIDEOPLAYER} component={VideoPlayerScreen} />
      <Stack.Screen name={Routes.MEETINGSETUP} component={MeetingSetupScreen} />
    </Stack.Navigator>
  );
}
