import { Box, Button, useTheme } from '@/theme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import React from 'react';

export default function MediaStreamOpts() {
  const call = useCall();
  const { size, colors } = useTheme();
  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { isMute: microphoneMuted } = useMicrophoneState();
  const { isMute: cameraMuted } = useCameraState();
  const toggleMicrophone = async () => {
    if (call) {
      await call?.microphone.toggle();
    }
  };
  const toggleCamera = async () => {
    if (call) {
      await call?.camera.toggle();
    }
  };
  return (
    <Box
      justifyContent="center"
      width={'100%'}
      alignItems="center"
      flexDirection="row"
      marginTop="sm_12"
      marginBottom="m_24">
      <Button
        onPress={toggleMicrophone}
        size="icon"
        variant="secondary"
        height={size.xl}
        width={size.xl}
        marginRight="m_16"
        style={{
          borderRadius: size.xl / 2,
          backgroundColor: microphoneMuted ? colors['destructive'] : colors['secondary'],
        }}>
        {microphoneMuted ? (
          <Feather name="mic-off" size={size.lg} color={colors.text} />
        ) : (
          <Feather name="mic" size={size.lg} color={colors.text} />
        )}
      </Button>
      <Button
        onPress={toggleCamera}
        size="icon"
        height={size.xl}
        width={size.xl}
        style={{
          borderRadius: size.xl / 2,
          backgroundColor: cameraMuted ? colors['destructive'] : colors['secondary'],
        }}>
        {cameraMuted ? (
          <MaterialCommunityIcons name="video-off" size={size.lg} color={colors.text} />
        ) : (
          <Feather name="video" size={size.lg} color={colors.text} />
        )}
      </Button>
    </Box>
  );
}
