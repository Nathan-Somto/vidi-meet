import React from 'react';
import { useCall } from '@stream-io/video-react-native-sdk';
import { Button, useToast, Text } from '@/theme';
import { Routes } from '@/navigation/routes';
import { useNavigation } from '@react-navigation/native';

export default function JoinCallButton() {
  const { toast } = useToast();
  const router = useNavigation();
  const call = useCall();
  const handleCallJoin = async () => {
    if (call) {
      call.join();
      router.navigate(Routes.AUTHENTICATEDSTACK, {
        screen: Routes.CALLSTACK,
        params: { screen: Routes.CALL },
      });
    } else {
      toast({ message: ' Could not join Call', variant: 'error' });
    }
  };
  return (
    <Button onPress={handleCallJoin}>
      <Text variant="title">Join Call</Text>
    </Button>
  );
}
