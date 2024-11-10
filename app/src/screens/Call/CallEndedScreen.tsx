import React from 'react';
import GoBackHome from '@/components/GoBackHome';
import { Container } from '@/components/Container';
import { Box, Text, useTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { formatTimeRange } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import { CallStackParamList } from '@/navigation/CallStack';
import { Routes } from '@/navigation/routes';
import { RatingComp } from '@/components/RatingComp';
import { useCallStore } from '@/hooks/useCallStore';

export default function CallEndedScreen({
  route: {
    params: { endedAt, startedAt, endedBy, showRateCall = false, hasEnded = false },
  },
}: StackScreenProps<CallStackParamList, Routes.CALLENDED>) {
  const setCurrentCallId = useCallStore((state) => state.setCurrentCallId);
  const { colors } = useTheme();
  return (
    <Container>
      <Box width="100%" flex={1}>
        {hasEnded && (
          <>
            <Feather name="phone-off" size={64} color={colors.destructive} />
            <Text variant="title" marginTop="sm_8" fontWeight={'medium'}>
              <Text fontWeight={'semibold'}>{endedBy}</Text> ended the call
            </Text>
            {/* Time for when the meeting ended */}
            <Text>{formatTimeRange(new Date(startedAt ?? ''), new Date(endedAt ?? ''))}</Text>
          </>
        )}
        {/* Rating Component */}
        {showRateCall && <RatingComp />}
        <GoBackHome
          onPress={() => {
            setCurrentCallId(null);
          }}
        />
      </Box>
    </Container>
  );
}
