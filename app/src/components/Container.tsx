import { Box, useTheme } from 'app/src/theme';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.background} />
      <Box
        flex={1}
        backgroundColor="background"
        width="100%"
        justifyContent="center"
        alignItems="center">
        {children}
      </Box>
    </SafeAreaView>
  );
};
