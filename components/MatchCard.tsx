import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Match } from "../lib/services/common";
import { Link } from "expo-router";
import { SoccerBall } from "phosphor-react-native";

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isPending = match.status === "Pendiente";

  return (
    <Link href={`/match/${match.id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {match.date} - {match.time}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.teamContainer}>
            <SoccerBall size={24} color="#FFFFFF" weight="fill" />
            <Text
              style={styles.teamName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {match.team1Name}
            </Text>
          </View>
          <Text style={styles.score}>{isPending ? "VS" : match.result}</Text>
          <View style={styles.teamContainer}>
            <SoccerBall size={24} color="#FFFFFF" weight="fill" />
            <Text
              style={styles.teamName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {match.team2Name}
            </Text>
          </View>
        </View>
        {isPending && <Text style={styles.pendingText}>Partido pendiente</Text>}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 12,
  },
  date: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  teamName: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 8,
  },
  score: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  pendingText: {
    color: "#FFD700",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});

export default MatchCard;
