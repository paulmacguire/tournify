import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { getTournaments, Tournament } from "../lib/services/mockDataTournify";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "../components/GameCard";
export default function Main() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchTournaments = async () => {
      const data = await getTournaments();
      setTournaments(data);
    };
    fetchTournaments();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {tournaments.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={tournaments}
          keyExtractor={(item) => item.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
  },
});
