import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card, Avatar } from "react-native-paper";

interface Reward {
  id: number;
  title: string;
  description: string;
  isRevealed: boolean;
}

const RewardsScreen = () => {
  const [totalPoints, setTotalPoints] = useState(250); // Example points
  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, title: "₹500 Off", description: "Flat ₹500 off on silver jewellery", isRevealed: false },
    { id: 2, title: "4 Free Products", description: "Get 4 free products on orders above ₹598", isRevealed: false },
    { id: 3, title: "75% Off", description: "Flat 75% off on earbuds & smartwatch", isRevealed: false },
  ]);

  // Handle reward reveal
  const revealReward = (id: number) => {
    setRewards(rewards.map(reward =>
      reward.id === id ? { ...reward, isRevealed: true } : reward
    ));
    Alert.alert("🎉 Reward Unlocked!", "You have unlocked a new reward!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalPoints}>🏆 {totalPoints} Total Points</Text>

      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Rewards</Text>

        <View style={styles.rewardsGrid}>
          {rewards.map((reward) => (
            <TouchableOpacity key={reward.id} onPress={() => revealReward(reward.id)} style={styles.rewardCard}>
              {!reward.isRevealed ? (
                <View style={styles.scratchCard}>
                  <Text style={styles.scratchText}>🎁 Scratch to Reveal</Text>
                </View>
              ) : (
                <View style={styles.revealedReward}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark theme
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  totalPoints: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollView: {
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
  },
  rewardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  rewardCard: {
    width: "48%",
    aspectRatio: 1, // Ensures square shape
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  scratchCard: {
    backgroundColor: "#FFA500",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scratchText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  revealedReward: {
    alignItems: "center",
    padding: 10,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  rewardDescription: {
    fontSize: 12,
    color: "#CCC",
    textAlign: "center",
  },
});

export default RewardsScreen;
