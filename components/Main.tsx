import { Game } from "../lib/types/games";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getLatestGames } from "../lib/services/mockData";
import { getTournaments } from "../lib/services/mockDataTournify";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";
import { AboutIcon } from "./Icons";
export default function Main() {
  const [games, setGames] = useState<Game[]>([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const fetchGames = async () => {
      const latestGames = await getTournaments();
      setGames(latestGames);
    };
    fetchGames();
  }, []);

  return (
    <View className="bg-black">
      {games.length === 0 ? (
        <View className="flex">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
