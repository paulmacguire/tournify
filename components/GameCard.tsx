import { Tournament } from "../lib/services/common";
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

const imageMap = {
  "torneo-verano-2024": require("../assets/liga_cai.png"),
  "torneo-invierno-2024": require("../assets/ultrapadel.jpg"),
  "torneo-primavera-2024": require("../assets/liga_premier.png"),
  "torneo-otono-2024": require("../assets/lif.png"),
};

interface GameCardProps {
  game: Tournament;
}

interface AnimatedGameCardProps {
  game: Tournament;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link href={`/${game.id}`} asChild>
      <Pressable style={styles.card}>
        <Image source={game.image} style={styles.image} resizeMode="cover" />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{game.name}</Text>
          <Text style={styles.description}>{game.description}</Text>
        </View>
      </Pressable>
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
      delay: 200 * index,
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
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#B0B0B0",
  },
});
