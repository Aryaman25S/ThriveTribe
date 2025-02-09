import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, Avatar, ProgressBar, Badge } from "react-native-paper";
import { fetchGroupDetails } from "../api/api";

interface GroupMember {
  userName: string;
  status: boolean;
  totatCompletedTasks: number;
}

const GroupScreen = () => {
  const [isInGroup, setIsInGroup] = useState(false);
  const [groupName, setGroupName] = useState<string | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch group data from API
  useEffect(() => {
    const loadGroupData = async () => {
      setLoading(true);
      const data = await fetchGroupDetails();
      if (data) {
        setIsInGroup(true);
        setGroupName(data.groupName);
        setGroupMembers(data.users);
        setStreak(data.streak);
      }
      setLoading(false);
    };

    loadGroupData();
  }, []);

  // Calculate completion status
  const completedCount = groupMembers.filter((member) => member.status).length;
  const totalMembers = groupMembers.length;
  const completionPercentage = totalMembers > 0 ? completedCount / totalMembers : 0;
  const allTasksCompleted = completedCount === totalMembers;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
      ) : !isInGroup ? (
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
            <Card.Title title={`Group: ${groupName}`} left={(props) => <Avatar.Icon {...props} icon="account-group" />} />
            <Card.Content>
              <Text style={styles.progressText}>
                {completedCount}/{totalMembers} members completed today's task ✅
              </Text>
              <ProgressBar progress={completionPercentage} color="#4CAF50" style={styles.progressBar} />
            </Card.Content>
          </Card>

          {/* Group Members List */}
          <Text style={styles.sectionTitle}>👥 Group Members</Text>
          {groupMembers.map((member, index) => (
            <Card key={index} style={styles.memberCard}>
              <Card.Content style={styles.memberContent}>
                <Text style={styles.avatar}>👤</Text>
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.userName}</Text>
                  <Text style={styles.memberStats}>🏆 {member.totatCompletedTasks} Tasks Completed</Text>
                  <Text>Status: {member.status ? "✅ Done" : "❌ Pending"}</Text>
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
              <Text style={styles.streakText}>Your group has a {streak}-day streak! Keep it up! 🔥</Text>
              <Badge style={styles.badge}>🏆 Streak Leader!</Badge>
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
  loadingIndicator: {
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
  badge: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 16,
    backgroundColor: "#FFD700",
  },
});

export default GroupScreen;
