import {
  View,
  TouchableHighlight,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Box, Button, Text, useTheme } from '@/theme';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { formatTime } from '@/utils';

type VideoPlayerProps = {
  source: string;
  width?: number;
  height?: number;
};

export default function VideoPlayer({
  source,
  width = 0.9 * Dimensions.get('window').width,
  height = 300,
}: VideoPlayerProps) {
  const { colors } = useTheme();
  const videoRef = React.useRef<Video>(null);
  const [playbackStatus, setPlaybackStatus] = React.useState<AVPlaybackStatus | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const controlsOpacity = React.useRef(new Animated.Value(1)).current;
  const controlsHidden = React.useRef(false);

  const playbackIsActive = React.useCallback(
    (status: AVPlaybackStatus | null) => status !== null && status.isLoaded,
    []
  );

  const togglePlay = async () => {
    if (playbackIsActive(playbackStatus) && videoRef.current && !controlsHidden.current) {
      if (playbackStatus?.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      toggleAnimation();
    }
  };

  const hideAnimation = () => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => (controlsHidden.current = true));
  };

  const toggleAnimation = (show?: boolean, keepControls?: boolean) => {
    if (show || controlsHidden.current) {
      Animated.timing(controlsOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        controlsHidden.current = false;
        if (!keepControls) setTimeout(hideAnimation, 7000);
      });
    } else {
      hideAnimation();
    }
  };

  const getSliderPosition = () => {
    if (playbackIsActive(playbackStatus) && playbackStatus?.playableDurationMillis) {
      return playbackStatus.positionMillis / playbackStatus.playableDurationMillis;
    }
    return 0;
  };

  const moveSliderPosition = async (value: number) => {
    if (playbackIsActive(playbackStatus) && playbackStatus?.playableDurationMillis && !controlsHidden.current) {
      const newPosition = value * playbackStatus.playableDurationMillis;
      await videoRef.current?.setPositionAsync(newPosition);
    }
  };

  const fastPositionMove = async (direction: 'forward' | 'backward') => {
    if (playbackIsActive(playbackStatus) && !controlsHidden.current) {
      const newPosition =
        playbackStatus.positionMillis + (direction === 'forward' ? 10000 : -10000);
      await videoRef.current?.setPositionAsync(newPosition);
    }
  };

  const toggleFullScreen = async () => {
    if (playbackIsActive(playbackStatus) && videoRef.current && !controlsHidden.current) {
      await videoRef.current.presentFullscreenPlayer();
    }
  };

  const updatePlayBackStatus = (status: AVPlaybackStatus) => {
    setPlaybackStatus(status);
    if (playbackIsActive(status) && status.didJustFinish) {
      toggleAnimation(true, true);
    }
  };

  const onError = (error: string) => setErrorMessage(error);

  if (errorMessage) {
    return (
      <Box
        justifyContent="center"
        alignItems="center"
        height={height}
        width={width}
        borderRadius="m_8"
        backgroundColor="secondary"
        style={{ marginHorizontal: 'auto' }}>
        <Text variant="body" color="destructive">
          Failed to play Video
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <TouchableHighlight onPress={() => toggleAnimation(true)}>
        <Box backgroundColor="secondary" style={{ width, height, marginHorizontal: 'auto' }}>
          <Video
            ref={videoRef}
            source={{ uri: source }}
            style={{ width, height, marginHorizontal: 'auto', borderRadius: 8 }}
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={updatePlayBackStatus}
            useNativeControls={false}
            onError={onError}
          />

          {!playbackIsActive(playbackStatus) ? (
            <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
          ) : (
            <>
              <Animated.View style={[styles.topControls, { opacity: controlsOpacity }]}>
                {/* Video Controls */}
                <View style={styles.row}>
                  <Button variant="link" onPress={() => fastPositionMove('backward')}>
                    <FontAwesome name="backward" size={24} color="white" />
                  </Button>

                  <Button variant="secondary" style={{ borderRadius: 100 }} onPress={togglePlay}>
                    <FontAwesome
                      name={playbackStatus?.isPlaying ? 'pause' : 'play'}
                      size={24}
                      color="white"
                    />
                  </Button>

                  <Button variant="link" onPress={() => fastPositionMove('forward')}>
                    <FontAwesome name="forward" size={24} color="white" />
                  </Button>
                </View>
                {/* Video Slider and Time */}
              </Animated.View>
              <Animated.View style={[styles.bottomControls, { opacity: controlsOpacity }]}>
                <View style={styles.sliderTimeContainer}>
                  <View style={styles.row}>
                    <View style={styles.timeContainer}>
                      <Text>{formatTime(playbackStatus?.positionMillis ?? 0)} / </Text>
                      <Text>{formatTime(playbackStatus?.playableDurationMillis ?? 0)}</Text>
                    </View>
                    <Button variant="link" onPress={toggleFullScreen}>
                      <MaterialIcons name="fullscreen" size={24} color="white" />
                    </Button>
                  </View>
                  <Slider
                    style={styles.slider}
                    value={getSliderPosition()}
                    minimumValue={0}
                    maximumValue={1}
                    onSlidingComplete={moveSliderPosition}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor="#000000"
                    thumbTintColor={colors.primary}
                  />
                </View>
              </Animated.View>
            </>
          )}
        </Box>
      </TouchableHighlight>
    </Box>
  );
}

const styles = StyleSheet.create({
  topControls: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 12,
  },
  slider: {
    width: '100%',
  },
  sliderTimeContainer: {
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 5,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
