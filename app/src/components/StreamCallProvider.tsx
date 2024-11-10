import React from 'react';
import { useCallStore } from '@/hooks/useCallStore';
import { useFetchCall } from '@/hooks/useFetchCall';
import { Box, Text } from '@/theme';
import NotFound from '../../assets/images/notfound.png';
import { StreamCall } from '@stream-io/video-react-native-sdk';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';
import FullScreenLoader from './FullScreenLoader';
import { Image } from 'react-native';
import GoBackHome from './GoBackHome';

export default function StreamCallProvider({ children }: React.PropsWithChildren) {
  const [callId, setCallId] = React.useState<string>('callId');
  const currentCallId = useCallStore((state) => state.currentCallId);
  const router = useNavigation();
  React.useEffect(() => {
    if (currentCallId) {
      setCallId(currentCallId);
    } else {
      router.navigate(Routes.AUTHENTICATEDSTACK, {
        screen: Routes.MAINTABS,
        params: { screen: Routes.HOME },
      });
    }
  }, [currentCallId]);
  const { data, isLoading } = useFetchCall(callId, callId !== 'callId');
  if (isLoading) {
    return <FullScreenLoader text="Setting up the call..." />;
  }
  if (!data) {
    return (
      <Box width="100%" flex={1}>
        <Image source={NotFound} style={{ width: 200, height: 200, marginHorizontal: 'auto' }} />
        <Text variant="title" marginTop="sm_8" fontWeight={'semibold'}>
          Call Not Found!{' '}
        </Text>
        <GoBackHome />
      </Box>
    );
  }
  return <StreamCall call={data}>{children}</StreamCall>;
}
