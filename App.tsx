import 'react-native-gesture-handler';

import { ThemeProvider } from '@shopify/restyle';
import { theme } from 'theme';

import RootStack from './navigation';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootStack />
    </ThemeProvider>
  );
}
