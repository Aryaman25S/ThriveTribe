import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Avatar } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon';
import {fetchCurrentTask, fetchTaskList, setTaskStatusToComplete} from "@/src/api/api"; // 🎉 Import Confetti Effect

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  proof: string | null;
  dateCompleted?: string;
}

const TaskScreen = () => {
  const [task, setTask] = useState<Task>(null);

  const [taskHistory, setTaskHistory] = useState<Task[]>([]);

  const [showConfetti, setShowConfetti] = useState(false);

  const getFormattedDate = (date = new Date()) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Handle task completion
  const completeTask = async () => {
    await setTaskStatusToComplete(task.id);
    setTask({...task, completed: true});

    const completedTask = {
      id: task.id,
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

  useEffect(() => {
    const loadTaskList = async () => {
      const taskList = await fetchTaskList('charlie');
      const currentTask = await fetchCurrentTask('charlie');
      if (taskList) {
        setTaskHistory(taskList);
        setTask(currentTask);
      }
    };

    loadTaskList();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Task Section */}
        {task && <Card style={[styles.card, task.completed && styles.completedCard]}>
          <Card.Title title="Today's Task" left={(props) => <Avatar.Icon {...props} icon="clipboard-check" />} />
          <Card.Content>
            <Text style={styles.title}>{task.title}</Text>
            <Text>Status: {task.completed ? "Completed ✅" : "Pending ⏳"}</Text>
            {task.proof && <Text>Proof: {task.proof}</Text>}
          </Card.Content>

          <Card.Actions>
            {!task.completed && (
                <>
                  <Button title="Complete Task" onPress={completeTask} />
                  <Button title="Upload Proof" onPress={pickImage} />
                </>
            )}
          </Card.Actions>
        </Card>}

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

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
// import { Svg, Circle } from 'react-native-svg';
// import { Ionicons } from '@expo/vector-icons';
// import ConfettiCannon from 'react-native-confetti-cannon';
// const { width, height } = Dimensions.get('window');
// const radius = width / 3; // Defined radius here

// const TaskCompletionScreen = () => {
//   const progress = 75; // Example completion percentage
//   const strokeWidth = 20; // Thicker stroke for better visibility
//   const circumference = 2 * Math.PI * radius;
//   const progressOffset = circumference - (progress / 100) * circumference;
//   const [showConfetti, setShowConfetti] = useState(false);
//   const pastTasks = [
//     { id: '1', title: 'Morning Yoga🧘', date: 'Feb 8, 2025' },
//     { id: '2', title: 'Read 10 Pages📖', date: 'Feb 7, 2025' },
//     { id: '3', title: 'Drink 2L of Water💧', date: 'Feb 6, 2025' },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.cardTaskTitle}>📅 Today's Task</Text>
//         <Text style={styles.cardText}>Complete a 30-minute workout🏋️</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.completeButton}
//             onPress={() => setShowConfetti(true)} // Trigger confetti
//           > 
//             <Text style={styles.buttonText}>Complete Task</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.uploadButton}>
//             <Text style={styles.buttonText}>Upload Proof</Text>
//           </TouchableOpacity>
//         </View>
//       </View>    
//       {/* Task List */}
//       <Text style={styles.pastTaskTitle}>Past Tasks</Text>
//       <View style={{ width: '100%' }}>
//         <FlatList
//           data={pastTasks}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ width: '100%' }}
//           renderItem={({ item }) => (
//             <View style={styles.pastTaskCard}>
//               <Text style={styles.pastTaskTitleText}>{item.title}</Text>
//               <Text style={styles.pastTaskDate}>{item.date}</Text>
//             </View>
//           )}
//         />
//       </View>
//       {showConfetti && (
//           <ConfettiCannon
//             count={200} // Number of confetti particles
//             origin={{ x: width / 2, y: 0 }} // Start from the top
//             fadeOut={true} // Confetti disappears after animation
//             explosionSpeed={250} // Speed of animation
//             fallSpeed={3000} // Duration of fall
//           />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FDFDFD',
//     padding: 20,
//   },
//   menuIcon: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   card: {
//     width: '90%',
//     height: height / 4,
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardTaskTitle: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 40,
//     textAlign: 'left', // Align text to the left
//   },
//   cardText: {
//     fontSize: 18,
//     color: '#000',
//     marginBottom: 20,
//     textAlign: 'left', // Align text to the left
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   completeButton: {
//     backgroundColor: '#4A4A6A',
//     padding: 12,
//     borderRadius: 10,
//     flex: 1,
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   uploadButton: {
//     backgroundColor: '#4A4A6A',
//     padding: 12,
//     borderRadius: 10,
//     flex: 1,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   ringContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   innerCircle: {
//     position: 'absolute',
//     width: radius * 1.2,
//     height: radius * 1.2,
//     backgroundColor: '#4A4A6A',
//     borderRadius: radius,
//   },
//   completionText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   taskItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   taskBullet: {
//     width: 14,
//     height: 14,
//     backgroundColor: '#FFB300',
//     borderRadius: 7,
//     marginRight: 12,
//   },
//   taskText: {
//     fontSize: 18,
//   },
//   pastTaskTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   pastTaskCard: {
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     width: '100%',
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   pastTaskTitleText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pastTaskDate: {
//     fontSize: 14,
//     color: '#8E8E93',
//     marginTop: 5,
//   },
//   pastTaskList: {
//     width: '150%',
//   },
// });

// export default TaskCompletionScreen;