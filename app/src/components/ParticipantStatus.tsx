import { Box, Text } from '@/theme';
import { useConnectedUser } from '@stream-io/video-react-native-sdk';
import React from 'react';

export default function ParticipantStatus() {
  const connectedUser = useConnectedUser();
  const participantLabel = connectedUser?.custom?.name ?? connectedUser?.id;
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      alignSelf="flex-start">
      <Box
        backgroundColor="secondary"
        borderTopRightRadius="m_8"
        minWidth={100}
        paddingHorizontal="xs_4">
        <Text>{participantLabel}</Text>
      </Box>
    </Box>
  );
}
