import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './routes';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeIcon, PreviousIcon, UpcomingIcon, VideoIcon } from '@/components/icons';
import HomeScreen from '@/screens/Main/HomeScreen';
import { Box, Text, useTheme } from '@/theme';
import { BackButton } from '@/components/BackButton';
import { Image, Pressable } from 'react-native';
import UpcomingMeetingsScreen from '@/screens/Main/UpcomingMeetingsScreen';
import NewMeetingScreen from '@/screens/Main/NewMeetingScreen';
import PreviousMeetingScreen from '@/screens/Main/PreviousMeetingScreen';
import logo from '../../assets/icon.png';
import MeetingRecordingsScreen from '@/screens/Main/MeetingRecordingsScreen';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
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
  const { user } = useUser();
  const { colors, spacing } = useTheme();
  const router = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopColor: 'transparent',
          paddingVertical: spacing.sm_8,
          paddingHorizontal: spacing.xs_4,
          height: 65,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 13.5,
          fontWeight: '600',

          paddingBottom: 5,
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
          return (
            <Pressable
              onPress={() =>
                router.navigate(Routes.AUTHENTICATEDSTACK, {
                  screen: Routes.PROFILE,
                })
              }>
              <Box
                borderColor="primary"
                borderWidth={2}
                height={40}
                width={40}
                marginRight="sm_8"
                overflow="hidden"
                style={{ borderRadius: 50 }}>
                {user?.imageUrl ? (
                  <Image
                    source={{ uri: user.imageUrl }}
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <Feather name="user" size={40} color={colors.neutral} />
                )}
              </Box>
            </Pressable>
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
        options={() => ({
          title: undefined,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <Box
              borderWidth={focused ? 4 : 2}
              height={40}
              width={40}
              overflow="hidden"
              alignItems="center"
              justifyContent="center"
              style={{ borderRadius: 20, borderColor: color }}>
              <TabIcon name="plus" color={color} size={30} />
            </Box>
          ),
        })}
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
        component={MeetingRecordingsScreen}
        options={{
          title: 'Recordings',
          tabBarIcon: ({ color, size }) => <VideoIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
