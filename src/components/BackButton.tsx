import { Feather } from '@expo/vector-icons';
import { Button, Text, useTheme } from '@/theme';

export const BackButton = ({ text = 'Back' }: { text?: string }) => {
  const { colors } = useTheme();

  return (
    <Button variant="link" flexDirection="row" paddingLeft="m_16" onPress={() => void 0}>
      <Feather name="chevron-left" size={20} color={colors.text} />
      <Text marginLeft="xs_4" variant="title" color="text">
        {text}
      </Text>
    </Button>
  );
};
