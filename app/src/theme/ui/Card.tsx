import { createBox } from '@shopify/restyle';
import { Theme } from '../theme';
import { View, ViewProps } from 'react-native';

const BaseCard = createBox<Theme, ViewProps>(View);
type Props = React.PropsWithChildren & React.ComponentProps<typeof BaseCard>;
export function Card({ children, ...props }: Props) {
  return (
    <BaseCard
      minHeight={200}
      backgroundColor="secondary"
      borderRadius="m_8"
      padding="m_16"
      width={'100%'}
      {...props}>
      {children}
    </BaseCard>
  );
}
