import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { ThemeProvider } from '@shopify/restyle';
import { FontFamily, theme } from 'app/src/theme';
import { useFonts } from 'expo-font';
import RootStack from 'app/src/navigation';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { AnimatedSplashScreen } from 'app/src/components/AnimatedSplashScreen';
import FontRegular from './assets/fonts/Inter-Regular.ttf';
import FontMedium from './assets/fonts/Inter-Medium.ttf';
import FontSemiBold from './assets/fonts/Inter-SemiBold.ttf';
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log('get Token Error', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log('save Token Error', error);
      return;
    }
  },
};
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
export default function App() {
  const [loaded, error] = useFonts({
    [FontFamily.regular]: FontRegular,
    [FontFamily.medium]: FontMedium,
    [FontFamily.semibold]: FontSemiBold,
    ...FontAwesome.font,
  });
  const [isAppReady, setIsAppReady] = React.useState(false);
  const [removeSplash, setRemoveSplash] = React.useState(false);
  const showApp = React.useCallback(() => {
    setRemoveSplash(true);
  }, []);
  React.useEffect(() => {
    if (error) {
      throw new Error('Error loading fonts');
    }
  }, [error]);
  React.useEffect(() => {
    function prepare() {
      if (loaded) {
        setIsAppReady(true);
      }
    }
    prepare();
  }, [loaded]);
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ThemeProvider theme={theme}>
          {removeSplash ? (
            <RootStack />
          ) : (
            <AnimatedSplashScreen isAppReady={isAppReady} showApp={showApp} />
          )}
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
