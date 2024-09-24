import { Game } from "../lib/types/games";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getLatestGames } from "../lib/services/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { AnimatedGameCard } from "./GameCard";
import Torneos from "./Torneos";

export default function Main() {
  const [games, setGames] = useState<Game[]>([]);
  const insets = useSafeAreaInsets();

  return (
    <View>
      <Torneos />
    </View>
  );
}
