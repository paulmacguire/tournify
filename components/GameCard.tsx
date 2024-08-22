import { Game } from "@/lib/types/games";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

interface GameCardProps {
  game: Game;
}

interface AnimatedGameCardProps {
  game: Game;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link asChild href={`/${game.slug}`}>
      <StyledPressable className="active-opacity-70 border border-black active:border-white/50 mb-2 bg-gray-500/10 rounded-xl p-4">
        <View className="flex-row p-4 gap-4" key={game.slug}>
          <Image source={{ uri: game.image }} style={styles.image} />
          <View className="flex-shrink">
            <Text className="mb-1" style={styles.title}>
              {game.title}
            </Text>
            <Text style={styles.score}>{game.score}</Text>
            <Text className="mt-2 flex-shrink" style={styles.description}>
              {game.description.slice(0, 100)}...
            </Text>
          </View>
        </View>
      </StyledPressable>
    </Link>
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

const styles = StyleSheet.create({
  card: {
    marginBottom: 42,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
