import { Box, makeStyles } from 'app/src/theme';
import React from 'react';
import Logo from '../../assets/icon.png';
import { Animated, Image, StyleSheet, Text } from 'react-native';
type Props = {
  isAppReady: boolean;
  showApp: () => void;
};

export function AnimatedSplashScreen({ isAppReady, showApp }: Props) {
  const imageAnim = React.useRef(new Animated.Value(3)).current;
  const textOpacity = React.useRef(new Animated.Value(0)).current;
  const textTranslateY = React.useRef(new Animated.Value(10)).current;
  const splashOpacity = React.useRef(new Animated.Value(1)).current;
  const [isDone, setIsDone] = React.useState(false);
  //? explanation of animation
  //* the logo is shown at 3 times its size.
  //* the logo is animated to its original size.
  //* then the vidi meet text fades in.(opacity and translate y)
  React.useEffect(() => {
    // Animate the logo to its original size
    Animated.timing(imageAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // After logo animation, fade in and translate the "Vidi Meet" text
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0, // Translate back to original position
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsDone(true);
      });
    });
  }, []);
  React.useEffect(() => {
    if (isAppReady && isDone) {
      // Fade out the splash screen
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        showApp();
      });
    }
  }, [isDone, isAppReady]);
  const themeStyles = React.useMemo(() => styles(), []);
  return (
    <Animated.View style={[themeStyles.container, { opacity: splashOpacity }]}>
      <Box flexDirection="row" alignItems="center">
        {/* Logo animation */}
        <Animated.View
          style={{
            transform: [{ scale: imageAnim }],
          }}>
          <Image source={Logo} style={themeStyles.logo} />
        </Animated.View>

        {/* "Vidi Meet" text animation */}
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
            marginLeft: 8,
          }}>
          <Text style={themeStyles.text}>Vidi Meet</Text>
        </Animated.View>
      </Box>
    </Animated.View>
  );
}

const styles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    logo: {
      width: 50,
      height: 50,
    },
    text: {
      fontSize: 30,
      fontWeight: 'semibold',
      color: theme.colors.text,
    },
  })
);
