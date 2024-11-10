import React from 'react';
import { Card } from '@/theme/ui/Card';
import { PreviousIcon, UpcomingIcon, VideoIcon } from './icons';
import { Box, Button, Text, useTheme, useToast } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { formatDateTime, formatTotalTime, formatTimeRange } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';

export type MeetingCardProps =
  | {
      type: 'upcoming';
      id: string;
      scheduleDate: Date;
      title?: string;
    }
  | {
      type: 'previous';
      id: string;
      startTime: Date;
      endTime: Date;
      title?: string;
    }
  | {
      type: 'recorded';
      id: string;
      url: string;
      totalTime: number;
      title: string;
    }
  | {
      type: 'ongoing';
      id: string;
      title: string;
      startTime: Date;
    };
export function MeetingCard(props: MeetingCardProps & { minHeight?: number }) {
  console.log(props);
  const {
    colors,
    size: { lg, m },
  } = useTheme();
  const router = useNavigation();
  const { toast } = useToast();
  const color = colors.text;
  const size = lg;
  const handleMeetingJoin = () => {
    router.navigate(Routes.AUTHENTICATEDSTACK, {
      screen: Routes.CALLSTACK,
      params: {
        screen: Routes.CALL,
      },
    });
  };
  const handleMeetingPlay = () => {
    if (props.type !== 'recorded') return;
    router.navigate(Routes.AUTHENTICATEDSTACK, {
      screen: Routes.MEETINGSTACK,
      params: {
        screen: Routes.VIDEOPLAYER,
        params: { url: props.url, title: props.title, duration: props.totalTime },
      },
    });
  };
  const handleCopyCode = () => {
    toast({ message: 'Invitation code copied to clipboard', variant: 'success' });
  };
  return (
    <Card minHeight={props?.minHeight}>
      {/* Icon */}
      <Box marginBottom="sm_8">
        {props.type === 'upcoming' ? (
          <UpcomingIcon color={color} size={size} />
        ) : props.type === 'previous' ? (
          <PreviousIcon color={color} size={size} />
        ) : (
          <VideoIcon color={color} size={size} />
        )}
      </Box>
      {/* Title */}
      <Text variant="title" marginBottom="xs_4" fontWeight={'semibold'}>
        {props.title}
      </Text>
      <Text variant="body" color="neutral">
        {props.type === 'upcoming' ? (
          <>
            <Feather name="calendar" size={14} color={colors.muted} />{' '}
            {`Scheduled for: ${formatDateTime(props.scheduleDate)}`}
          </>
        ) : props.type === 'previous' ? (
          <>
            <Feather name="clock" size={14} color={colors.muted} />{' '}
            {formatTimeRange(props.startTime, props.endTime)}
          </>
        ) : props.type === 'ongoing' ? (
          <>
            <Feather name="play-circle" size={14} color={colors.muted} />{' '}
            {`Start time: ${formatDateTime(props.startTime)}`}
          </>
        ) : (
          <>
            <Feather name="clock" size={14} color={colors.muted} />{' '}
            {`Total time: ${formatTotalTime(props.totalTime)}`}
          </>
        )}
      </Text>
      {props.type !== 'previous' && (
        <Box flexDirection="row" justifyContent="space-between" marginTop="xs_4">
          {props.type === 'upcoming' && (
            <>
              <Button label="Start" height={40} />
              <Button
                variant="link"
                width={'80%'}
                onPress={handleCopyCode}
                justifyContent="flex-start">
                <Feather name="copy" size={m} color={colors.muted} />
                <Text color={'muted'} variant="title" fontSize={18}>
                  Copy Invitation
                </Text>
              </Button>
            </>
          )}
          {props.type === 'recorded' && (
            <>
              <Button flex={0.48} onPress={handleMeetingPlay} marginRight="sm_8">
                <Feather name="play" size={size} color={colors.text} />
                <Text marginLeft="xs_4">Play</Text>
              </Button>

              <Button variant="outline" flex={0.48} borderColor="muted">
                <Feather name="download" size={size} color={colors.muted} />
                <Text marginLeft="xs_4" color="muted">
                  Download
                </Text>
              </Button>
            </>
          )}
          {props.type === 'ongoing' && (
            <>
              {/* Join and Copy Invitation */}
              <Box flexDirection="row" justifyContent="space-between" marginTop={'sm_8'}>
                <Button
                  label="Join"
                  height={40}
                  width="40%"
                  minWidth={80}
                  onPress={handleMeetingJoin}
                />
                <Button
                  variant="link"
                  onPress={handleCopyCode}
                  justifyContent="flex-start"
                  flexDirection="row">
                  <Feather name="copy" size={m} color={colors.muted} />
                  <Text color="muted" variant="title" fontSize={18} marginLeft="xs_4">
                    Copy Invitation
                  </Text>
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Card>
  );
}
