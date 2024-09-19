import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import CallStack from './CallStack';
import { BackButton } from '../components/BackButton';
import { MainTabs } from './MainTabs';
import AuthStack from './AuthStack';

export type RootStackParamList = {
  [Routes.MAINTABS]: undefined;
  [Routes.CALL]: undefined;
  [Routes.AUTHSTACK]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.AUTHSTACK}>
        <Stack.Screen name={Routes.AUTHSTACK} component={AuthStack} />
        <Stack.Screen name={Routes.MAINTABS} component={MainTabs} />
        <Stack.Screen name={Routes.CALL} component={CallStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
