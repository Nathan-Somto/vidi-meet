import { Feather } from '@expo/vector-icons';
import { Button, Text, useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';

export const BackButton = ({ text = 'Back' }: { text?: string }) => {
  const { colors } = useTheme();
  const router = useNavigation();
  return (
    <Button variant="link" flexDirection="row" paddingLeft="m_16" onPress={() => router.goBack()}>
      <Feather name="chevron-left" size={20} color={colors.text} />
      <Text marginLeft="xs_4" variant="title" color="text">
        {text}
      </Text>
    </Button>
  );
};
