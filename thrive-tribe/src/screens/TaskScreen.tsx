import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Avatar } from 'react-native-paper';

interface Task {
  title: string;
  completed: boolean;
  proof: string | null;
}

const TaskScreen = () => {
  const [task, setTask] = useState<Task>({
    title: "Example Task",
    completed: false,
    proof: null,
  });

  const [taskHistory, setTaskHistory] = useState<Task[]>([]);

  // Handle task completion
  const completeTask = () => {
    setTask({ ...task, completed: true });
    setTaskHistory([{ title: task.title, completed: true, proof: task.proof }, ...taskHistory]);
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

  // Undo Task Completion with Confirmation
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
      {/* Task Section */}
      <Card style={styles.card}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Keep content centered horizontally
    paddingTop: 50, // Push content down slightly
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default TaskScreen;
