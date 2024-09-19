import { createBox } from '@shopify/restyle';

import { Theme } from '../theme';
import { View, ViewProps } from 'react-native';

const Box = createBox<Theme, ViewProps>(View);

export default Box;
