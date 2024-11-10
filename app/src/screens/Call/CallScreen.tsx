import { Container } from '@/components/Container';
import { Routes } from '@/navigation/routes';
import { Box, useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { CallContent, CallControls, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';

export default function CallScreen() {
  const { colors, size, spacing } = useTheme();

  const router = useNavigation();
  const client = useStreamVideoClient();
  const onHangUpCallHandler = () => {
    router.navigate(Routes.AUTHENTICATEDSTACK, {
      screen: Routes.CALLSTACK,
      params: {
        screen: Routes.CALLENDED,
        params: {
          showRateCall: true,
          endedAt: null,
          endedBy: null,
          startedAt: null,
        },
      },
    });
  };
  // useEffect for when the host ends the call
  React.useEffect(() => {
    const unsub = client?.on('call.ended', (evt) => {
      router.navigate(Routes.AUTHENTICATEDSTACK, {
        screen: Routes.CALLSTACK,
        params: {
          screen: Routes.CALLENDED,
          params: {
            endedBy: evt.user?.name ?? 'no name',
            startedAt: evt.call?.starts_at ?? new Date(),
            endedAt: evt.call?.ended_at ?? new Date(),
            showRateCall: true,
            hasEnded: true,
          },
        },
      });
    });
    return () => {
      unsub?.();
    };
  }, [client]);

  return (
    <Container>
      <Box flex={1} width={'100%'}>
        <CallContent
          onHangupCallHandler={onHangUpCallHandler}
          CallControls={() => (
            <CallControls
              onHangupCallHandler={onHangUpCallHandler}
              style={{
                backgroundColor: colors.tabBackground,
                borderTopRightRadius: size.m,
                borderTopLeftRadius: size.m,
                paddingHorizontal: spacing.m_16,
              }}
            />
          )}
        />
      </Box>
    </Container>
  );
}
