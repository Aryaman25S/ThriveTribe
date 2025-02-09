import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import useHealthData from "../hooks/useHealthData";
import SleepTracker from '../components/SleepTrackerCard';

const HomeScreen = () => {
  const { steps, sleepDuration } = useHealthData();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, Jane</Text>
          <Text style={styles.subtitle}>Let’s check your activity</Text>
        </View>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.profileImage} />
      </View>
      
      {/* Activity Cards */}
      <View style={styles.activityContainer}>
        {/* Finished Card */}
        <View style={styles.activityCardLarge}>
          <Text style={styles.activityText}>💪🏻 Finished</Text>
          <Text style={styles.activityPercent}>75%</Text>
          <Text style={styles.activityLabel}>Completed Tasks</Text>
        </View>

        {/* Small Cards (Pending & Step Count) */}
        <View style={styles.activitySmallContainer}>
          {/* Pending Tasks */}
          <View style={styles.activityCardSmall}>
            <Text style={styles.activitySmallText}>🐣 Pending</Text>
            <Text style={styles.activityNumber}>2</Text>
            <Text style={styles.activitySmallLabel}>Tasks</Text>
          </View>

          {/* Step Count */}
          <View style={styles.activityCardSmall}>
            <Text style={styles.activitySmallText}>👣 Step Count</Text>
            <Text style={styles.stepsNumber}>{steps}</Text>
            <Text style={styles.activitySmallLabel}>Steps</Text>
          </View>
        </View>
      </View>

      {/* Sleep Tracker Component */}
      <SleepTracker sleepHours={sleepDuration} goalHours={8} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 15,
  },
  activityCardLarge: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Adjusted width for better fit
    height: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 15,
  },
  activitySmallContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  activityCardSmall: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    flex: 1, // Ensures both cards share equal space
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  activityPercent: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityLabel: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  activitySmallText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  activityNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activitySmallLabel: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default HomeScreen;
