import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


type FitnessProps = {
    steps: number;
    calories: number;
    workoutMinutes: number;
    bestDay: string;
}

const FitnessStats = ({ steps, calories, workoutMinutes, bestDay }: FitnessProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Fitness Stats 📊</Text>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Steps Today:</Text>
        <Text style={styles.statValue}>{steps}</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Calories Burned:</Text>
        <Text style={styles.statValue}>{calories} kcal</Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Workout Minutes:</Text>
        <Text style={styles.statValue}>{workoutMinutes} min</Text>
      </View>
      
      <View style={styles.bestDayContainer}>
        <Text style={styles.bestDayLabel}>🔥 Best Day Record:</Text>
        <Text style={styles.bestDayValue}>{bestDay}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    margin: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#555',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bestDayContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFEB3B',
    borderRadius: 5,
    alignItems: 'center',
  },
  bestDayLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  bestDayValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 5,
  },
});

export default FitnessStats;
