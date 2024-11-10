import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./routes";
import { useTheme } from "@/theme";
import UserListScreen from "@/screens/Meeting/UserListScreen";
import JoinMeetingScreen from "@/screens/Meeting/JoinMeeting";
import ScheduleMeetingScreen from "@/screens/Meeting/ScheduleMeeting";
import VideoPlayerScreen from "@/screens/Meeting/VideoPlayerScreen";

export type MeetingStackParamList = {
    [Routes.JOINMEETING]: {
      inviteId?: string;
    };
    [Routes.SCHEDULEMEETING]: undefined;
    [Routes.VIDEOPLAYER]: {
      url: string;
      title: string;
      duration: number;
    };
    [Routes.USERLIST]: {
      from: Routes.SCHEDULEMEETING | Routes.NEWMEETING;
      add?: boolean;
    };
  };
  const Stack = createStackNavigator<MeetingStackParamList>();
  export default function MeetingStack() {
    const { colors } = useTheme();
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.text,
        }}>
        <Stack.Screen name={Routes.USERLIST} component={UserListScreen} />
        <Stack.Screen name={Routes.JOINMEETING} component={JoinMeetingScreen} />
        <Stack.Screen name={Routes.SCHEDULEMEETING} component={ScheduleMeetingScreen} />
        <Stack.Screen name={Routes.VIDEOPLAYER} component={VideoPlayerScreen} />
      </Stack.Navigator>
    );
  }
  