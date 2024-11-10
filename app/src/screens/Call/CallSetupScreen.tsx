import { Container } from '@/components/Container';
import FullScreenLoader from '@/components/FullScreenLoader';
import JoinCallButton from '@/components/JoinCallButton';
import LocalVideoRenderer from '@/components/LocalVideoRenderer';
import MediaStreamOpts from '@/components/MediaStreamOpts';
import { Routes } from '@/navigation/routes';
import { Box } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { useCall } from '@stream-io/video-react-native-sdk';
import * as SecureStore from 'expo-secure-store';
import React from 'react';

export default function CallSetupScreen() {
  const [isCheckingPreference, setIsCheckingPreference] = React.useState(true);
  const call = useCall();
  const router = useNavigation();
  React.useEffect(() => {
    // get saved preference from secure store
    const getPreferences = async () => {
      setIsCheckingPreference(true);
      try {
        const showCallPreview = await SecureStore.getItemAsync('showCallPreview');
        if (showCallPreview === 'false') {
          call?.join();
          router.navigate(Routes.AUTHENTICATEDSTACK, {
            screen: Routes.CALLSTACK,
            params: {
              screen: Routes.CALL,
            },
          });
        }
      } catch (error) {
        console.error('Error getting preferences:', error);
      } finally {
        setIsCheckingPreference(false);
      }
    };
    getPreferences();
  }, []);
  React.useEffect(() => {
    if (call?.state.endedAt) {
      router.navigate(Routes.AUTHENTICATEDSTACK, {
        screen: Routes.CALLSTACK,
        params: {
          screen: Routes.CALLENDED,
          params: {
            endedBy: call?.state.endedBy?.name ?? 'no name',
            startedAt: call?.state?.startedAt ?? new Date(),
            endedAt: call?.state?.endedAt ?? new Date(),
            showRateCall: false,
          },
        },
      });
    }
  }, [call]);
  if (isCheckingPreference) {
    return <FullScreenLoader text="Checking Preference..." />;
  }
  return (
    <Container>
      <Box width="100%" flex={1} paddingHorizontal="m_16">
        <LocalVideoRenderer />
        <MediaStreamOpts />
        <JoinCallButton />
      </Box>
    </Container>
  );
}
