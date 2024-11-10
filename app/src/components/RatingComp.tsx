import React, { useState, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Box, Text } from '@/theme';

export function RatingComp() {
  const [rating, setRating] = useState(1);
  const scaleAnim = useRef([...Array(5)].map(() => new Animated.Value(1))).current;
  const [animating, setAnimating] = useState(false);

  const handleStarPress = (index: number) => {
    if (animating) return;
    if (index + 1 === rating) {
      setRating(rating - 1);
      return;
    } else if (index + 1 === rating + 1) {
      setRating(index + 1);
    }

    setAnimating(true);
    Animated.sequence([
      Animated.timing(scaleAnim[index], {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setAnimating(false));
  };

  return (
    <Box alignItems="center" justifyContent="center" marginTop="m_16">
      <Text variant="title"> Rate Your Calling Experience from (1-5)</Text>
      <Box flexDirection="row" alignItems="center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Pressable
            key={index}
            onPress={() => handleStarPress(index)}
            style={{ marginHorizontal: 5 }}
            disabled={animating} 
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim[index] }] }}>
              <Ionicons
                name={index < rating ? 'star' : 'star-outline'}
                size={40}
                color={index < rating ? '#FFD700' : '#ccc'}
              />
            </Animated.View>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}
