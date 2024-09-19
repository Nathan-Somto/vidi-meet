import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import CallScreen from '@/screens/Call/CallScreen';
import JoinMeetingScreen from '@/screens/Call/JoinMeeting';
import ScheduleMeetingScreen from '@/screens/Call/ScheduleMeeting';
import VideoPlayerScreen from '@/screens/Call/VideoPlayerScreen';
import MeetingSetupScreen from '@/screens/Call/MeetingSetupScreen';
const Stack = createStackNavigator();
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
