import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeIcon, PreviousIcon, UpcomingIcon, VideoIcon } from '@/components/icons';
import HomeScreen from '@/screens/Main/HomeScreen';
import { Box, Text, useTheme } from '@/theme';
import { BackButton } from '@/components/BackButton';
import { Image } from 'react-native';
import UpcomingMeetingsScreen from '@/screens/Main/UpcomingMeetingsScreen';
import NewMeetingScreen from '@/screens/Main/NewMeetingScreen';
import PreviousMeetingScreen from '@/screens/Main/PreviousMeetingScreen';
import dummyAvatar from '../../assets/images/avatar.png';
import logo from '../../assets/icon.png';
export type MainTabParamList = {
  [Routes.HOME]: undefined;
  [Routes.UPCOMINGMEETINGS]: undefined;
  [Routes.NEWMEETING]: undefined;
  [Routes.PREVIOUSMEETINGS]: undefined;
  [Routes.MEETINGRECORDINGS]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  color: string;
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size: number;
};

function TabIcon({ name, color, size }: TabIconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}
export function MainTabs() {
  const { colors, spacing } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopColor: 'transparent',
          paddingVertical: spacing.sm_8,
          paddingHorizontal: spacing.m_16,
        },
        tabBarActiveTintColor: colors.muted,
        tabBarInactiveTintColor: colors.inactive,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerLeft() {
          return <BackButton text={route.name} />;
        },
        headerRight() {
          // user avatar
          return (
            <Box
              borderColor="primary"
              borderWidth={2}
              height={40}
              width={40}
              marginRight="sm_8"
              overflow="hidden"
              style={{ borderRadius: 50 }}>
              <Image source={dummyAvatar} style={{ height: '100%', width: '100%' }} />
            </Box>
          );
        },
      })}>
      <Tab.Screen
        name={Routes.HOME}
        options={{
          title: 'Home',
          headerTitle: '',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
          headerLeft() {
            return (
              <Box flexDirection="row" alignItems="center" marginLeft="sm_8">
                <Image source={logo} style={{ height: 40, width: 40 }} />
                <Text marginLeft="xs_4" fontSize={20} fontWeight={'semibold'}>
                  VidiMeet
                </Text>
              </Box>
            );
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={Routes.UPCOMINGMEETINGS}
        component={UpcomingMeetingsScreen}
        options={{
          title: 'Upcoming',
          tabBarIcon: ({ color, size }) => <UpcomingIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.NEWMEETING}
        component={NewMeetingScreen}
        options={{
          title: 'New Meeting',
          tabBarIcon: ({ color, size }) => <TabIcon name="video-plus" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.PREVIOUSMEETINGS}
        component={PreviousMeetingScreen}
        options={{
          title: 'Previous',
          tabBarIcon: ({ color, size }) => <PreviousIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.MEETINGRECORDINGS}
        component={() => null}
        options={{
          title: 'Recordings',
          tabBarIcon: ({ color, size }) => <VideoIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
