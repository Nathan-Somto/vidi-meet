import { Container } from '@/components/Container';
import { CallStackParamList } from '@/navigation/CallStack';
import { Routes } from '@/navigation/routes';
import { Box, Button, FormInput, useTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

export default function JoinMeetingScreen({
  route,
  navigation,
}: StackScreenProps<CallStackParamList, Routes.JOINMEETING>) {
  const { colors, size } = useTheme();
  const { inviteId } = route.params;
  const [inviteValue, setInviteValue] = React.useState(inviteId || '');
  const handleChangeText = (label: string, text: string) => {
    setInviteValue(text);
  };
  const handleJoinViaInvite = () => {
    navigation.navigate(Routes.MEETINGSETUP);
  };
  return (
    <Container>
      <Box paddingHorizontal='m_16'  width={'100%'} >
        <FormInput
          placeholder="Enter Invite Link"
          Icon={() => <Feather name="link" color={colors.neutral} size={size.m} style={{marginRight: 8}} />}
          label="Invitation Link"
          value={inviteValue}
          handleChangeText={handleChangeText}
        />
        <Button label="Join Meeting" onPress={handleJoinViaInvite} marginTop="m_24" />
      </Box>
    </Container>
  );
}
