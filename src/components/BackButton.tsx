import { Feather } from '@expo/vector-icons';
import { Button, Text, useTheme } from '@/theme';

export const BackButton = ({  text='Back' }: {  text?:string }) => {
  const { colors } = useTheme();

  return (
    <Button flexDirection="row" paddingLeft="m_16" onPress={() => void 0}>
      <Feather name="chevron-left" size={16} color={colors.text} />
      <Text marginLeft="xs_4" variant='large' color="text" >
       {text}
      </Text>
    </Button>
  );
};
