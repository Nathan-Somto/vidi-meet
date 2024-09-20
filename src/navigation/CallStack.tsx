import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import CallScreen from '@/screens/Call/CallScreen';
import JoinMeetingScreen from '@/screens/Call/JoinMeeting';
import ScheduleMeetingScreen from '@/screens/Call/ScheduleMeeting';
import VideoPlayerScreen from '@/screens/Call/VideoPlayerScreen';
import MeetingSetupScreen from '@/screens/Call/MeetingSetupScreen';
export type CallStackParamList = {
  [Routes.CALL]: undefined;
  [Routes.JOINMEETING]: {
    inviteId?: string;
  };
  [Routes.SCHEDULEMEETING]: undefined;
  [Routes.VIDEOPLAYER]: {
    url: string;
  };
  [Routes.MEETINGSETUP]: undefined;
};

const Stack = createStackNavigator<CallStackParamList>();
export default function CallStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.CALL} component={CallScreen} />
      <Stack.Screen name={Routes.JOINMEETING} component={JoinMeetingScreen} />
      <Stack.Screen name={Routes.SCHEDULEMEETING} component={ScheduleMeetingScreen} />
      <Stack.Screen name={Routes.VIDEOPLAYER} component={VideoPlayerScreen} />
      <Stack.Screen name={Routes.MEETINGSETUP} component={MeetingSetupScreen} />
    </Stack.Navigator>
  );
}
