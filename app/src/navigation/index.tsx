import {
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import AuthStack from './AuthStack';
import { useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import AuthenticatedStackWithProvider, { AuthenticatedStackParamList } from './AuthenticatedStack';
import { AuthStackParamList } from './AuthStack';
export type RootStackParamList = {
  [Routes.AUTHENTICATEDSTACK]: NavigatorScreenParams<AuthenticatedStackParamList>;
  [Routes.AUTHSTACK]: NavigatorScreenParams<AuthStackParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      [Routes.AUTHENTICATEDSTACK]: {
        screens: {
          [Routes.MEETINGSTACK]: {
            screens: {
              [Routes.JOINMEETING]: 'meeting/join/:inviteId',
            },
          },
        },
      },
      // any is used because of an issue related to react navigation core types
      //! refer to the issue here: https://github.com/react-navigation/react-navigation/issues/10876
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  },
};
export default function RootStack() {
  const { isSignedIn } = useUser();
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.AUTHSTACK}>
        {isSignedIn ? (
          <Stack.Screen
            name={Routes.AUTHENTICATEDSTACK}
            component={AuthenticatedStackWithProvider}
          />
        ) : (
          <Stack.Screen name={Routes.AUTHSTACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
