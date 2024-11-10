import { Button, Text } from '@/theme';
import React from 'react';
import { HomeIcon } from './icons';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/navigation/routes';
type Props = {
  onPress?: () => void;
};
export default function GoBackHome({ onPress }: Props) {
  const router = useNavigation();
  return (
    <Button
      onPress={() => {
        if (onPress) {
          onPress();
        }
        router.navigate(Routes.AUTHENTICATEDSTACK, {
          screen: Routes.MAINTABS,
          params: {
            screen: Routes.HOME,
          },
        });
      }}>
      <HomeIcon color="#fff" size={24} />
      <Text>Go Back Home</Text>
    </Button>
  );
}
