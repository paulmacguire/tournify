import { Game } from "../lib/types/games";
import { useEffect, useState } from "react";
import { FlatList, View, ScrollView, ActivityIndicator } from "react-native";
import { getLatestGames } from "../lib/services/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard, GameCard } from "./GameCard";
import { Logo } from "./Logo";
export default function Main() {
  const [games, setGames] = useState<Game[]>([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const fetchGames = async () => {
      const latestGames = await getLatestGames();
      setGames(latestGames);
    };
    fetchGames();
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="mb-2 px-2">
        <Logo />
      </View>
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
      {/* <Pressable
        onPress={() => alert("Abrir")}
        className="bg-red-500 p-4 rounded-lg shadow-lg"
        style={({ pressed }) => pressed && { backgroundColor: "#dc2626" }}
      >
        {({ pressed }) => (
          <Text className={`${pressed ? "text-black" : "text-white"}`}>
            {pressed ? "Apretado" : "Abrir"}
          </Text>
        )}
      </Pressable> */}
    </View>
  );
}
