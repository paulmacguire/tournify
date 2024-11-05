
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../lib/services/mockDataTournify';

interface TopScorersProps {
  topScorers: Player[];
}

const TopScorers: React.FC<TopScorersProps> = ({ topScorers }) => {
  return (
    <View style={styles.container}>
      {topScorers.map((player, index) => (
        <View style={styles.row} key={player.id}>
          <Text style={styles.position}>{index + 1}</Text>
          <View style={styles.playerInfo}>
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.team}>{player.teamName}</Text>
          </View>
          <Text style={styles.goals}>{player.goals} goles</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  position: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    width: 30,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  team: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  goals: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopScorers;
