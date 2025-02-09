import React, {useState, useCallback} from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, Avatar, ProgressBar, Badge } from "react-native-paper";
import { fetchGroupDetails } from "../api/api";
import {useFocusEffect} from "@react-navigation/native"; // Import API call

interface GroupMember {
  user_name: string;
  status: boolean;
  daily_incomplete_tasks: number;
}

const GroupScreen = () => {
  const [isInGroup, setIsInGroup] = useState(true); // Assume user is in a group
  const [groupName, setGroupName] = useState("designer"); // Change to your actual group name
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch group details from API
  useFocusEffect(useCallback(() => {
      const loadGroupData = async () => {
          setLoading(true);
          const data = await fetchGroupDetails(groupName);
          console.log(data)
          if (data) {
              setGroupMembers(data.members);
              setStreak(data.streak);
          }
          setLoading(false);
      };

      loadGroupData();
  }, []));

  // Calculate group progress
  const completedCount = Array.isArray(groupMembers)
  ? groupMembers.filter(member => member.daily_incomplete_tasks == 0).length
  : 0;

  const totalMembers = Array.isArray(groupMembers)
  ? groupMembers.length
  : 0;
  const completionPercentage = totalMembers > 0 ? completedCount / totalMembers : 0;

  // **Turn progress card green when all members complete tasks**
  const allTasksCompleted = completedCount === totalMembers;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isInGroup ? (
        <View style={styles.noGroupContainer}>
          <Text style={styles.noGroupText}>You're not in a group yet.</Text>
          <TouchableOpacity style={styles.addGroupButton} onPress={() => setIsInGroup(true)}>
            <Text style={styles.addGroupText}>➕ Add Group</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Group Progress Section */}
          <Card style={[styles.card, allTasksCompleted && styles.completedCard]}>
            <Card.Title title="Group Progress" left={(props) => <Avatar.Icon {...props} icon="account-group" />} />
            <Card.Content>
              <Text style={styles.progressText}>
                {completedCount}/{totalMembers} members completed today's task ✅
              </Text>
              <ProgressBar progress={completionPercentage} color="#4CAF50" style={styles.progressBar} />
            </Card.Content>
          </Card>

          {/* Group Members List */}
          <Text style={styles.sectionTitle}>👥 Group Members</Text>
          {groupMembers?.map((member, index) => (
            <Card key={index} style={styles.memberCard}>
              <Card.Content style={styles.memberContent}>
                <Text style={styles.avatar}>👤</Text>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.user_name}</Text>
                  <Text style={styles.memberStats}>🏆 {1 - member.daily_incomplete_tasks} Tasks Completed</Text>
                  <Text>Status: {member.daily_incomplete_tasks == 0 ? "✅ Done" : "❌ Pending"}</Text>
                </View>
                {!member.status && (
                  <TouchableOpacity style={styles.remindButton}>
                    <Text style={styles.remindText}>⚡ Remind</Text>
                  </TouchableOpacity>
                )}
              </Card.Content>
            </Card>
          ))}

          {/* Streaks & Leaderboard Section */}
          <Card style={styles.card}>
            <Card.Title title="🔥 Streaks & Leaderboard" left={(props) => <Avatar.Icon {...props} icon="fire" />} />
            <Card.Content>
              <Text style={styles.streakText}>Your group has a **{streak}-day streak**! Keep it up! 🔥</Text>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noGroupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noGroupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  addGroupButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  addGroupText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  completedCard: {
    backgroundColor: "#C8E6C9",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  memberCard: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  memberContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    fontSize: 30,
    marginRight: 15,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  memberStats: {
    fontSize: 14,
    color: "gray",
  },
  remindButton: {
    backgroundColor: "#FFA726",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  remindText: {
    color: "#fff",
    fontWeight: "bold",
  },
  streakText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GroupScreen;