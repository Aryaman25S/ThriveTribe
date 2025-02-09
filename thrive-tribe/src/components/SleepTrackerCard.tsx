import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

type SleepTrackerProps = {
    sleepHours: number,
    goalHours: number
}
const SleepTracker = ({ sleepHours, goalHours }: SleepTrackerProps) => {
  const progress = (sleepHours / goalHours) * 100;
  const radius = width / 5; // Adjusted for better fit
  const strokeWidth = 12; // Thinner stroke for better aesthetics
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sleep Tracker 🌙</Text>
      <View style={styles.ringContainer}>
        <Svg height={radius * 2 + strokeWidth * 2} width={radius * 2 + strokeWidth * 2}>
          {/* Background Circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#4A4A6A"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            transform={`rotate(-90, ${radius + strokeWidth}, ${radius + strokeWidth})`}
          />
        </Svg>
        <Text style={styles.sleepText}>{`${sleepHours} / ${goalHours} hrs`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="moon" size={24} color="#4A4A6A" />
        <Text style={styles.infoText}>Maintain a healthy sleep schedule for better well-being.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  ringContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sleepText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E8EAF6',
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    textAlign: 'center',
    flexShrink: 1,
  },
});

export default SleepTracker;