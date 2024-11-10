import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Box from './Box';
import Button from './Button';
import { useTheme } from '../theme';
import Text from './Text';
type CheckBoxFieldProps<T extends string> = {
  name: T;
  label: string;
  value: boolean;
  Icon?: () => JSX.Element;
  disabled?: boolean;
  onChange: (name: T, value: boolean) => void | Promise<void>;
};

export function RadioBoxField<T extends string>({
  name,
  label,
  value,
  onChange,
  Icon,
  disabled,
}: CheckBoxFieldProps<T>) {
  const { colors, size } = useTheme();
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between" width={'100%'}>
      <Box alignItems="center" flexDirection="row">
        {Icon && <Icon />}
        <Text variant="title" marginLeft={Icon ? 'sm_8' : undefined}>
          {label}
        </Text>
      </Box>
      <Button
        disabled={disabled}
        size={'icon'}
        variant="link"
        onPress={async () => await onChange(name, !value)}>
        {value ? (
          <AntDesign name="checkcircle" size={size.lg} color={colors.success} />
        ) : (
          <FontAwesome name="circle-o" size={size.lg} color={colors.neutral} />
        )}
      </Button>
    </Box>
  );
}
