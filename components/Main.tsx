import { Game } from "../lib/types/games";
import { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { getTournaments } from "../lib/services/mockDataTournify";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Main() {
  const [games, setGames] = useState<Game[]>([]);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const fetchGames = async () => {
      const latestGames = await getTournaments();
      setGames(latestGames);
    };
    fetchGames();
  }, []);

  // const handleGetAccessToken = async () => {
  //   const dataToken = await AsyncStorage.getItem("access_token");
  //   setAccessToken(dataToken || "");
  //   if (!dataToken) {
  //     router.push("/");
  //   }
  //   console.log("Esta es la dataToken!!!!!", dataToken);
  // };

  // useEffect(() => {
  //   handleGetAccessToken();
  // }, []);

  return (
    <View className="bg-black">
      {/* <View>
        <Text className="text-white">Access Token: {accessToken}</Text>
      </View> */}
      {games.length === 0 ? (
        <View className="flex">
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlatList
            data={games}
            keyExtractor={(game) => game.slug}
            renderItem={({ item, index }) => (
              <AnimatedGameCard game={item} index={index} />
            )}
          />
        </>
      )}
    </View>
  );
}
