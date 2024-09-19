import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './routes';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeIcon, PreviousIcon, UpcomingIcon, VideoIcon } from '@/components/icons';
import HomeScreen from '@/screens/Main/HomeScreen';
import { Box, useTheme } from '@/theme';
import { BackButton } from '@/components/BackButton';
import { Image } from 'react-native';
const Tab = createBottomTabNavigator();

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
  <Tab.Navigator
    screenOptions={({route}) =>({
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
          return <BackButton text={route.name} />
      },
      headerRight(){
        // user avatar
        return <Box>
            <Image/>
        </Box>
      }
    })}>
    <Tab.Screen
      name={Routes.HOME}
      options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
      }}
      component={HomeScreen}
    />
    <Tab.Screen
      name={Routes.UPCOMINGMEETINGS}
      component={() => null}
      options={{
        title: 'Upcoming',
        tabBarIcon: ({ color, size }) => <UpcomingIcon color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name={Routes.NEWMEETING}
      component={() => null}
      options={{
        title: 'New Meeting',
        tabBarIcon: ({ color, size }) => <TabIcon name="video-plus" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name={Routes.PREVIOUSMEETINGS}
      component={() => null}
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
  </Tab.Navigator>;
}
