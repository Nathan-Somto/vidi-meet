import { createBox } from '@shopify/restyle';
import { Theme } from '../theme';
import { Dimensions, View, ViewProps } from 'react-native';

const BaseCard = createBox<Theme, ViewProps>(View);
type Props = React.PropsWithChildren & React.ComponentProps<typeof BaseCard>;
export function Card({ children, ...props }: Props) {
  return (
    <BaseCard
      minHeight={200}
      backgroundColor="secondary"
      borderRadius="m_8"
      padding="m_16"
      width={Dimensions.get('window').width * 0.9}
      {...props}>
      {children}
    </BaseCard>
  );
}
