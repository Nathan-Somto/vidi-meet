import { Container } from '@/components/Container';
import VideoPlayer from '@/components/VideoPlayer';
import { Routes } from '@/navigation/routes';
import { Box, Text, Button, useToast } from '@/theme';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { formatTotalTime } from '@/utils';
import { MeetingStackParamList } from '@/navigation/MeetingStack';

export default function VideoPlayerScreen({
  route,
}: StackScreenProps<MeetingStackParamList, Routes.VIDEOPLAYER>) {
  const { url, title, duration } = route.params;
  const { toast } = useToast();

  const shareVideo = async () => {
    try {
      await Sharing.shareAsync(url);
    } catch (error) {
      console.error('Error sharing video', error);
    }
  };

  return (
    <Container>
      {/* Video player */}
      <Box flex={1} width="100%" paddingHorizontal="m_16">
        <Box height={50} />
        <VideoPlayer source={url} />
        <Box marginTop="sm_12">
          <Text variant="large" marginBottom="sm_8">
            {title}
          </Text>
          <Text variant="body" color="neutral">
            Duration:{' '}
            <Text color="text" fontWeight={'semibold'}>
              {formatTotalTime(duration)}
            </Text>
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" marginTop="m_16">
          <Button
            width="50%"
            marginRight="m_16"
            onPress={() => {
              toast({
                message: 'Video downloaded successfully',
                variant: 'success',
              });
            }}>
            <MaterialIcons name="file-download" size={24} color="#fff" />
            <Text variant="body" marginLeft="sm_8">
              Download
            </Text>
          </Button>

          {/* Share button */}
          <Button width="50%" onPress={shareVideo} variant="outline">
            <MaterialIcons name="share" size={24} color="#fff" />
            <Text variant="body" marginLeft="sm_8">
              Share
            </Text>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
