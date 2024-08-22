import { Game } from "@/lib/types/games";
import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";

interface GameCardProps {
  game: Game;
}

interface AnimatedGameCardProps {
  game: Game;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <View key={game.slug} className="p-2">
      <Text className="text-xl font-bold mb-1 text-black p-2">
        {game.title}
      </Text>
      <Image
        source={{
          uri: game.image,
        }}
        className="w-80 h-80"
        resizeMode="contain"
      />
      <Text className="text-lg font-bold p-2">Rating: {game.score}</Text>
      <Text className="text-lg text-black p-2">{game.description}</Text>
    </View>
  );
};

export const AnimatedGameCard: React.FC<AnimatedGameCardProps> = ({
  game,
  index,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 500 * index,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
};
