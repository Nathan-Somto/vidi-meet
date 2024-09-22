import { Card } from 'app/src/theme/ui/Card';
import { PreviousIcon, UpcomingIcon, VideoIcon } from './icons';
import { Box, Button, Text, useTheme } from 'app/src/theme';
import { Feather } from '@expo/vector-icons';

type MeetingCardProps =
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
      totalTime: Date;
      title: string;
    };
export function MeetingCard(props: MeetingCardProps & { minHeight?: number }) {
  console.log(props);
  const {
    colors,
    size: { lg, m },
  } = useTheme();
  const color = colors.text;
  const size = lg;
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
      {/* Date */}
      {props.type === 'previous' && (
        <Text variant="body" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {props.startTime.toLocaleDateString('en-Us')}
        </Text>
      )}
      <Text variant="body" color="neutral">
        {props.type === 'upcoming'
          ? `Scheduled for: ${props.scheduleDate.toLocaleDateString()}`
          : props.type === 'previous'
            ? `${props.startTime.toLocaleTimeString()} - ${props.endTime.toLocaleTimeString()}`
            : `Total time: ${props.totalTime.toLocaleTimeString()}`}
      </Text>
      {props.type !== 'previous' && (
        <Box flexDirection="row" justifyContent="space-between" marginTop="m_16">
          {props.type === 'upcoming' && (
            <>
              <Button label="Start" height={40} />
              <Button variant="link" width={'80%'} justifyContent="flex-start">
                <Feather name="copy" size={m} color={colors.muted} />
                <Text color={'muted'} variant="title" fontSize={18}>
                  Copy Invitation
                </Text>
              </Button>
            </>
          )}
          {props.type === 'recorded' && (
            <>
              <Button flex={0.5}>
                <Feather name="play" size={size} color={colors.primary} />
                <Text marginLeft="xs_4">Play</Text>
              </Button>
              <Button variant="outline" flex={0.5}>
                <Feather name="download" size={size} color={colors.primary} />
                <Text marginLeft="xs_4">Download</Text>
              </Button>
            </>
          )}
        </Box>
      )}
    </Card>
  );
}
