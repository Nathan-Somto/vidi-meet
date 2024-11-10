import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Avatar,
  StreamVideoParticipant,
  useCall,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-native-sdk';
import { Box } from '@/theme';
import { RTCView } from '@stream-io/react-native-webrtc';
import ParticipantStatus from './ParticipantStatus';

export default function LocalVideoRenderer() {
  const call = useCall();
  const localVideoStream = call?.camera.state.mediaStream;
  const connectedUser = useConnectedUser();
  const { useCameraState } = useCallStateHooks();
  const { status: cameraStatus } = useCameraState();
  const participant = {
    name: connectedUser?.name || '',
    image: connectedUser?.image || '',
    userId: connectedUser?.id || '',
  } as StreamVideoParticipant;
  return (
    <Box
      backgroundColor="inactive"
      borderColor="primary"
      borderRadius="m_8"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      marginVertical="m_16"
      height={300}>
      <Box flex={0.8} alignItems="center" justifyContent="center">
        {cameraStatus === 'enabled' ? (
          <RTCView
            streamURL={localVideoStream?.toURL()}
            objectFit="cover"
            style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%' }]}
          />
        ) : (
          <Avatar participant={participant} />
        )}
      </Box>
      {/* Participant Status */}
      <ParticipantStatus />
    </Box>
  );
}
