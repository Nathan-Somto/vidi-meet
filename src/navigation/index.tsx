import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import CallStack, { CallStackParamList } from './CallStack';
import { MainTabParamList, MainTabs } from './MainTabs';
import AuthStack, { AuthStackParamList } from './AuthStack';

export type RootStackParamList = {
  [Routes.MAINTABS]: NavigatorScreenParams<MainTabParamList>;
  [Routes.CALLSTACK]: NavigatorScreenParams<CallStackParamList>;
  [Routes.AUTHSTACK]: NavigatorScreenParams<AuthStackParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.AUTHSTACK}>
        <Stack.Screen name={Routes.AUTHSTACK} component={AuthStack} />
        <Stack.Screen name={Routes.MAINTABS} component={MainTabs} />
        <Stack.Screen name={Routes.CALLSTACK} component={CallStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
