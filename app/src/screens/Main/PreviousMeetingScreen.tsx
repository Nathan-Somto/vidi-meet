import { Container } from 'app/src/components/Container';
import { MeetingCard } from 'app/src/components/MeetingCard';
import { Box } from 'app/src/theme';
import React from 'react';
import { FlatList } from 'react-native';

export default function PreviousMeetingScreen() {
  const fakeData = [
    {
      id: '1',
      title: 'Family Meeting',
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Team Meeting',
      startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
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
            <MeetingCard type="previous" minHeight={140} {...item} />
            <Box height={20} />
          </>
        )}
      />
    </Container>
  );
}
