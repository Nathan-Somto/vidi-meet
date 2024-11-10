import { Container } from '@/components/Container';
import MeetingForm from '@/components/MeetingForm';
import React from 'react';

export default function NewMeetingScreen() {
  return (
    <Container>
      <MeetingForm type="instant" />
    </Container>
  );
}
