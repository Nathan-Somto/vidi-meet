import { CallsType, useFetchCalls } from '@/hooks/useFetchCalls';
import { Container } from './Container';
import { FlatList } from 'react-native';
import FullScreenLoader from './FullScreenLoader';
import { Call, CallRecording } from '@stream-io/video-react-native-sdk';
import { MeetingCard, MeetingCardProps } from './MeetingCard';
import { Box, Text } from '@/theme';
import React from 'react';
import { getDuration, randomUID } from '@/utils';

type MeetingListProps = {
  type: CallsType;
  CustomLoaderComponent?: () => React.ReactNode;
  CustomEmptyMsgComponent?: () => React.ReactNode;
  useContainer?: boolean;
};
export default function MeetingList({
  type,
  CustomEmptyMsgComponent,
  useContainer = true,
  CustomLoaderComponent,
}: MeetingListProps) {
  const [emptyMessage, setEmptyMessage] = React.useState<string>('');
  const { data, loading } = useFetchCalls(type);
  const formatData = (data: Call[] | CallRecording[]): MeetingCardProps[] => {
    if (type === 'recorded') {
      return (data as CallRecording[]).map((item) => ({
        title: item.filename,
        type: 'recorded',
        url: item.url,
        id: randomUID(),
        totalTime: getDuration(item.end_time, item.start_time),
      }));
    }
    if (type === 'previous') {
      return (data as Call[]).map((item) => ({
        type: 'previous',
        endTime: item.state.endedAt ?? new Date(),
        startTime: item.state?.startedAt ?? new Date(),
        id: item.id,
        title: item.state.custom?.title || 'No Title',
      }));
    }
    if (type === 'upcoming') {
      return (data as Call[]).map((item) => ({
        type: 'upcoming',
        id: item.id,
        scheduleDate: item.state?.startsAt ?? new Date(),
        title: item.state.custom?.title || 'No Title',
      }));
    }
    return (data as Call[]).map((item) => ({
      type: 'ongoing',
      id: item.id,
      title: item.state.custom?.title || 'No Title',
      startTime: item.state?.startedAt ?? new Date(),
    }));
  };

  React.useEffect(() => {
    const getNoCallsMessage = () => {
      switch (type) {
        case 'previous':
          return 'No Previous Calls';
        case 'upcoming':
          return 'No Upcoming Calls';
        case 'recorded':
          return 'No Recordings';
        case 'ongoing':
          return 'No Ongoing Calls';
        default:
          return '';
      }
    };
    if (!CustomEmptyMsgComponent) {
      setEmptyMessage(getNoCallsMessage());
    }
  }, []);
  const ContainerComponent = React.useMemo(
    () => (useContainer ? Container : React.Fragment),
    [useContainer]
  );
  if (loading) {
    return CustomLoaderComponent ? (
      <CustomLoaderComponent />
    ) : (
      <FullScreenLoader text="loading..." />
    );
  }
  return (
    <ContainerComponent>
      {data && data.length > 0 ? (
        <FlatList
          data={formatData(data)}
          contentContainerStyle={{ marginVertical: 30, columnGap: 10 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box width="90%" style={{ marginHorizontal: 'auto' }}>
              <MeetingCard {...item} />
              <Box height={20} />
            </Box>
          )}
        />
      ) : CustomEmptyMsgComponent ? (
        <CustomEmptyMsgComponent />
      ) : (
        <Box flex={1} width="100%" justifyContent="flex-start">
          <Text variant="large" marginTop="sm_12">
            {emptyMessage}
          </Text>
        </Box>
      )}
    </ContainerComponent>
  );
}
