import React, { useRef } from 'react';
import {
  Animated,
  FlatList,
  View,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6; // Adjust width to 60% of screen width
const ITEM_HEIGHT = ITEM_WIDTH * (3 / 2); // Set height to maintain 2:3 aspect ratio
const SPACER_WIDTH = 0; // No spacer needed for full-width items

export default function MovieCarousel({ movies }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const data = [
    { key: 'left-spacer' },
    ...movies,
    { key: 'right-spacer' },
  ];

  return (
    <Animated.FlatList
      data={data}
      horizontal
      keyExtractor={(item, index) => item.id?.toString() || item.key || index.toString()}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      decelerationRate="fast"
      snapToInterval={ITEM_WIDTH}
      scrollEventThrottle={16}
      snapToAlignment="center"
      contentContainerStyle={{ paddingHorizontal: 0, alignItems: 'center' }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ item, index }) => {
        if (!item.poster_path) return <View style={{ width: SPACER_WIDTH }} />;

        const inputRange = [
          (index - 2) * ITEM_WIDTH,
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.95, 1, 0.95],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1, 0.7],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              marginHorizontal: 0,
              transform: [{ scale }],
              opacity,
            }}
            className="rounded-xl overflow-hidden"
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w780${item.poster_path}` }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </Animated.View>
        );
      }}
    />
  );
}
