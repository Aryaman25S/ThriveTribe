import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { Card } from "react-native-paper";

interface Reward {
  id: number;
  name: string;
  pointsRequired: number;
  revealed: boolean;
}

const RewardsScreen = () => {
  const [totalPoints, setTotalPoints] = useState(500);
  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, name: "10% Discount Code", pointsRequired: 100, revealed: false },
    { id: 2, name: "Free Coffee ☕", pointsRequired: 150, revealed: false },
    { id: 3, name: "Fitness App Premium", pointsRequired: 200, revealed: false },
    { id: 4, name: "Amazon Gift Card 🎁", pointsRequired: 250, revealed: false },
  ]);

  const flipAnimations = useRef(rewards.map(() => new Animated.Value(0))).current;

  const handleRevealReward = (index: number, id: number, pointsRequired: number) => {
    if (totalPoints >= pointsRequired) {
      setTotalPoints(totalPoints - pointsRequired);
      setRewards(rewards.map((reward) => (reward.id === id ? { ...reward, revealed: true } : reward)));

      Animated.timing(flipAnimations[index], {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/1600x900/?abstract,gradient" }} // Placeholder asset
      style={styles.background}
    >
      <View style={styles.container}>
        <Card style={styles.pointsCard}>
          <Card.Content>
            <Text style={styles.pointsLabel}>Total Points</Text>
            <Text style={styles.pointsText}>{totalPoints} ⭐</Text>
          </Card.Content>
        </Card>

        <ScrollView contentContainerStyle={styles.gridContainer}>
          {rewards.map((item, index) => {
            const frontInterpolate = flipAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "180deg"],
            });

            const backInterpolate = flipAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "360deg"],
            });

            const frontOpacity = flipAnimations[index].interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0, 0],
            });

            const backOpacity = flipAnimations[index].interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0, 1],
            });

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.rewardCard]}
                onPress={() => handleRevealReward(index, item.id, item.pointsRequired)}
                disabled={item.revealed || totalPoints < item.pointsRequired}
              >
                <Animated.View style={[styles.cardFace, { transform: [{ rotateY: frontInterpolate }], opacity: frontOpacity }]}>
                  {totalPoints >= item.pointsRequired ? (
                    <Text style={styles.hiddenText}>Tap to Reveal</Text>
                  ) : (
                    <Text style={styles.lockedText}>🔒 {item.pointsRequired} Points</Text>
                  )}
                </Animated.View>

                <Animated.View style={[styles.cardFace, styles.cardBack, { transform: [{ rotateY: backInterpolate }], opacity: backOpacity }]}>
                  <Text style={styles.rewardText}>{item.name}</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  pointsCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  pointsText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginTop: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  rewardCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    backgroundColor: "#fff", // Plain white reward cards
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 15,
  },
  cardBack: {
    position: "absolute",
    backgroundColor: "#F4C542", // Gold for revealed rewards
  },
  rewardText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  hiddenText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  lockedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
  },
});

export default RewardsScreen;
