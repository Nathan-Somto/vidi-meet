import { Container } from 'app/src/components/Container';
import { MeetingCard } from 'app/src/components/MeetingCard';
import { Box } from 'app/src/theme';
import React from 'react';
import { FlatList } from 'react-native';

export default function UpcomingMeetingsScreen() {
  const fakeData = [
    {
      id: '1',
      title: 'Family Meeting',
      scheduleDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Team Meeting',
      scheduleDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
    },
  ];
  return (
    <Container>
      <FlatList
        data={fakeData}
        contentContainerStyle={{ marginVertical: 30, columnGap: 8 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <MeetingCard type="upcoming" {...item} />
            <Box height={20} />
          </>
        )}
      />
    </Container>
  );
}
