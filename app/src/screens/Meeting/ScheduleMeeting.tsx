import { Container } from '@/components/Container';
import MeetingForm from '@/components/MeetingForm';
import { Box, Button, Text, useTheme, useToast } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import * as Clipboard from 'expo-clipboard';
import GoBackHome from '@/components/GoBackHome';
import * as Linking from 'expo-linking';
export default function ScheduleMeetingScreen() {
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
  const [inviteCode, setInviteCode] = React.useState('');
  const { colors, size } = useTheme();
  const { toast } = useToast();
  const handleCopyCode = async () => {
    try {
      // expo clipboard api
      const link = Linking.createURL('/meeting/join', { queryParams: { inviteId: inviteCode } });
      await Clipboard.setStringAsync(link);
      toast({ message: 'Invitation code copied to clipboard', variant: 'success' });
    } catch (err) {
      console.log(err);
      toast({ message: 'Error copying to clipboard', variant: 'error' });
    }
  };
  return (
    <Container>
      <MeetingForm
        type="schedule"
        showSuccessScreen={(inviteCode: string) => {
          setShowSuccessScreen(true);
          setInviteCode(inviteCode);
        }}
      />
      {showSuccessScreen && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width={'100%'}
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
          padding="sm_12"
          zIndex={50}>
          <Box width={'100%'}>
            <Feather
              name="check-circle"
              size={100}
              style={{ marginHorizontal: 'auto' }}
              color={colors.success}
            />
            <Text variant="large" textAlign="center">
              Meeting Scheduled
            </Text>
            <Box height={10} />
            <Text
              variant="body"
              textAlign="center"
              color="neutral"
              style={{ marginHorizontal: 'auto', width: '80%' }}>
              Your meeting has been scheduled successfully. You can view it in the upcoming meetings
              tab.
            </Text>
            <Box height={40} />
            <Box>
              <Button variant="outline" onPress={handleCopyCode}>
                <Feather name="copy" size={size.m} color={colors.text} />
                <Text color={'text'} variant="title" fontSize={18}>
                  Copy Invitation
                </Text>
              </Button>
              <Box height={20} />
              <GoBackHome onPress={() => setShowSuccessScreen(false)} />
              <Box height={15} />
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
