import { ActivityIndicator } from 'react-native';
import React from 'react';
import { Box, Text, useTheme } from '@/theme';
import { Container } from './Container';
export default function FullScreenLoader({ text }: { text: string }) {
  const { colors } = useTheme();
  return (
    <Container>
      <Box flexDirection="row">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text variant="body" marginLeft="xs_4">
          {text}
        </Text>
      </Box>
    </Container>
  );
}
