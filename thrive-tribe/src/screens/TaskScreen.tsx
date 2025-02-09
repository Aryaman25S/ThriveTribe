import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Avatar } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon'; // 🎉 Import Confetti Effect

interface Task {
  title: string;
  completed: boolean;
  proof: string | null;
  dateCompleted?: string;
}

const TaskScreen = () => {
  const [task, setTask] = useState<Task>({
    title: "Take a 30-minute walk in nature 🌿",
    completed: false,
    proof: null,
  });

  const [taskHistory, setTaskHistory] = useState<Task[]>([
    { title: "Drink 2L of Water 💧", completed: true, dateCompleted: "Feb 7, 2025", proof: null },
    { title: "Stretch for 10 Minutes 🧘", completed: false, proof: null },
    { title: "Read for 15 minutes 📖", completed: true, dateCompleted: "Feb 6, 2025", proof: null },
  ]);

  const [showConfetti, setShowConfetti] = useState(false);

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Handle task completion
  const completeTask = () => {
    setTask({ ...task, completed: true });

    const completedTask = {
      title: task.title,
      completed: true,
      proof: task.proof,
      dateCompleted: getFormattedDate(),
    };

    setTaskHistory([completedTask, ...taskHistory]);

    // 🎉 Trigger Confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000);
  };

  // Handle image proof upload
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTask({ ...task, proof: result.assets[0].uri || null });
    }
  };

  // Undo Task Completion
  const undoTaskCompletion = () => {
    Alert.alert(
      "Undo Task Completion",
      "Are you sure you want to reset this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Reset Task",
          onPress: () => setTask({ ...task, completed: false, proof: null }),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Task Section */}
        <Card style={[styles.card, task.completed && styles.completedCard]}>
          <Card.Title title="Today's Task" left={(props) => <Avatar.Icon {...props} icon="clipboard-check" />} />
          <Card.Content>
            <Text style={styles.title}>{task.title}</Text>
            <Text>Status: {task.completed ? "Completed ✅" : "Pending ⏳"}</Text>
            {task.proof && <Text>Proof: {task.proof}</Text>}
          </Card.Content>

          <Card.Actions>
            {!task.completed ? (
              <>
                <Button title="Complete Task" onPress={completeTask} />
                <Button title="Upload Proof" onPress={pickImage} />
              </>
            ) : (
              <Button title="Undo Completion" color="red" onPress={undoTaskCompletion} />
            )}
          </Card.Actions>
        </Card>

        {/* Past Tasks Section */}
        <Text style={styles.sectionTitle}>📜 Past Tasks</Text>
        {taskHistory.length > 0 ? (
          taskHistory.map((item, index) => (
            <Card key={index} style={styles.pastTaskCard}>
              <Card.Content>
                <Text style={styles.pastTaskTitle}>
                  {item.completed ? "✅" : "❌"} {item.title}
                </Text>
                {item.dateCompleted && (
                  <Text style={styles.dateText}>📅 Completed on: {item.dateCompleted}</Text>
                )}
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No past tasks available.</Text>
        )}

      </ScrollView>

      {/* 🎉 Confetti Animation */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: 200, y: 0 }}
          fadeOut={true}
        />
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
  scrollView: {
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff", // Default white background
    elevation: 3,
  },
  completedCard: {
    backgroundColor: "#c8e6c9", // ✅ Green background when task is completed
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
  },
  pastTaskCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  pastTaskTitle: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: "gray",
  },
  noHistoryText: {
    textAlign: "center",
    fontSize: 14,
    color: "gray",
  },
});

export default TaskScreen;