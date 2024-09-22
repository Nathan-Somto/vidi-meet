import React, { useState, useRef } from 'react';
import { Container } from 'app/src/components/Container';
import { Box, Button, Text, useTheme } from 'app/src/theme';
import { Image, FlatList, View, StyleSheet, ViewToken } from 'react-native';
import { welcomeData } from 'app/src/constants';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'app/src/navigation/routes';
export default function WelcomeScreen() {
  const router = useNavigation();
  const DeviceWidth = () => Dimensions.get('window').width;
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewRef = React.useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken<(typeof welcomeData)[number]>[];
      changed: ViewToken<unknown>[];
    }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  );

  return (
    <Container>
      {/* Onboarding content */}
      <FlatList
        data={welcomeData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={onViewRef.current}
        contentContainerStyle={{ height: Dimensions.get('window').height * 0.7, marginBottom: 0 }}
        renderItem={({ item }) => (
          <Box justifyContent="center" alignItems="center" width={DeviceWidth()}>
            <Text variant="large" marginBottom="xs_4">
              {item.title}
            </Text>
            <Text variant="title" color="neutral" textAlign="center">
              {item.description}
            </Text>
            <Image source={item.image} style={styles.image} />
          </Box>
        )}
        ref={flatListRef}
      />
      <Box height={Dimensions.get('window').height * 0.25} width={'100%'}>
        {/* Pagination Dots */}
        <Box flexDirection="row" justifyContent="center" marginBottom="m_16" height={30}>
          {welcomeData.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: colors.inactive },
                ]}
              />
            );
          })}
        </Box>
        {/* Button Container */}
        <Box width="100%" paddingHorizontal="sm_12">
          <Button
            onPress={() =>
              router.navigate(Routes.AUTHSTACK, {
                screen: Routes.AUTH,
                params: {
                  type: 'sign up',
                },
              })
            }
            label="Sign Up"
            width="100%"
            marginBottom={'m_16'}
          />
          <Button
            onPress={() =>
              router.navigate(Routes.AUTHSTACK, {
                screen: Routes.AUTH,
                params: {
                  type: 'sign in',
                },
              })
            }
            label="Sign In"
            width="100%"
            variant="outline"
          />
        </Box>
      </Box>
    </Container>
  );
}

// Styles
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 24,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
