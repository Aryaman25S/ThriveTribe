// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
// import Header from '../components/HeaderCard'; // Import Header component
// import Progress from '../components/ProgressCard'; // Import Progress component

// const HomeScreen = () => {
//   const userName = "John"; // Replace with dynamic user name
//   const totalTasks = 10;
//   const completedTasks = 7;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Header userName={userName} />
//       <Progress totalTasks={totalTasks} completedTasks={completedTasks} />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => console.log('View Tasks Pressed')}
//       >
//         <Text style={styles.buttonText}>View Your Tasks</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF', // Off-white/ivory background
//     paddingHorizontal: 16,
//   },
//   button: {
//     backgroundColor: '#6200EE',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     alignSelf: 'center',
//     marginTop: 30,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
// import Header from '../components/HeaderCard';
// import Progress from '../components/ProgressCard';
// import FitnessStats from '../components/FitnessStatsCard'; 
// const HomeScreen = () => {
//   const userName = "John"; 
//   const totalTasks = 10;
//   const completedTasks = 7;
//   const fitnessData = {
//     steps: 7200,
//     calories: 450,
//     workoutMinutes: 40,
//     bestDay: '10,200 steps on Jan 15', // Example best day
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
      
//       {/* Header */}
//       <Header userName={userName} />

//       {/* Progress Bar */}
//       <Progress totalTasks={totalTasks} completedTasks={completedTasks} />

//       <FitnessStats 
//         steps={fitnessData.steps} 
//         calories={fitnessData.calories} 
//         workoutMinutes={fitnessData.workoutMinutes} 
//         bestDay={fitnessData.bestDay} 
//       />

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFF', // Soft off-white background
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   subtitle: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#666',
//     marginVertical: 10,
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   card: {
//     width: '48%',
//     height: 120,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     elevation: 5, // For shadow on Android
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   purpleCard: { backgroundColor: '#E0BBE4' },
//   pinkCard: { backgroundColor: '#FF9AA2' },
//   peachCard: { backgroundColor: '#FFDAC1' },
//   beigeCard: { backgroundColor: '#E2D1C3' },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#6200EE',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     alignSelf: 'center',
//     marginTop: 30,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;


// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const HomeScreen = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Hi, Jane</Text>
//           <Text style={styles.subtitle}>Let’s check your activity</Text>
//         </View>
//         <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.profileImage} />
//       </View>
      
//       {/* Activity Cards */}
//       <View style={styles.activityContainer}>
//         <View style={styles.activityCard}>
//           <Ionicons name="fitness-outline" size={24} color="#FF9F45" />
//           <Text style={styles.activityNumber}>12</Text>
//           <Text style={styles.activityLabel}>Completed Workouts</Text>
//         </View>
//         <View style={styles.activityCard}>
//           <Ionicons name="time-outline" size={24} color="#FFC107" />
//           <Text style={styles.activityNumber}>2</Text>
//           <Text style={styles.activityLabel}>In Progress</Text>
//         </View>
//         <View style={styles.activityCard}>
//           <Ionicons name="alarm-outline" size={24} color="#8E8E93" />
//           <Text style={styles.activityNumber}>62</Text>
//           <Text style={styles.activityLabel}>Minutes Spent</Text>
//         </View>
//       </View>
      
//       {/* Workout Discovery Section */}
//       <Text style={styles.sectionTitle}>Discover new workouts</Text>
//       <View style={styles.workoutContainer}>
//         <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#FF9F45' }]}>
//           <Text style={styles.workoutTitle}>Cardio</Text>
//           <Text style={styles.workoutDetails}>10 Exercises</Text>
//           <Text style={styles.workoutDetails}>50 Minutes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.workoutCard, { backgroundColor: '#37B5B6' }]}>
//           <Text style={styles.workoutTitle}>Arms</Text>
//           <Text style={styles.workoutDetails}>6 Exercises</Text>
//           <Text style={styles.workoutDetails}>35 Minutes</Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* Progress Encouragement */}
//       <View style={styles.progressCard}>
//         <Text style={styles.progressText}>Keep the progress!</Text>
//         <Text style={styles.progressSubText}>You are more successful than 88% users.</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   greeting: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#8E8E93',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   activityContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//   },
//   activityCard: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   activityNumber: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   activityLabel: {
//     fontSize: 14,
//     color: '#8E8E93',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   workoutContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   workoutCard: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 10,
//     marginHorizontal: 5,
//   },
//   workoutTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   workoutDetails: {
//     fontSize: 14,
//     color: '#FFF',
//   },
//   progressCard: {
//     backgroundColor: '#FFEB3B',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   progressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   progressSubText: {
//     fontSize: 14,
//     color: '#8E8E93',
//   },
// });

// export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FitnessStats from '../components/FitnessStatsCard'; 
import SleepTracker from '../components/SleepTrackerCard'; 

const HomeScreen = () => {

  const fitnessData = {
    steps: 7200,
    calories: 450,
    workoutMinutes: 40,
    bestDay: '10,200 steps on Jan 15', // Example best day
  };
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
        <View style={styles.activityCardLarge}>
          <Text style={styles.activityText}>💪🏻 Finished</Text>
          <Text style={styles.activityPercent}>75%</Text>
          <Text style={styles.activityLabel}>Completed Tasks</Text>
        </View>
        <View style={styles.activityRow}>
          <View style={styles.activityCardSmall}>
            <Text style={styles.activitySmallText}>🐣 Pending</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.activityNumber}>2</Text>
              <Text style={styles.activitySmallLabel}>Tasks</Text>
            </View>
          </View>
          <View style={styles.activityCardSmall}>
            <Text style={styles.stepSmallText}>👣 Step Count</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.stepsNumber}>10,000</Text>
              <Text style={styles.activitySmallLabel}>Steps</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <FitnessStats 
        steps={fitnessData.steps} 
        calories={fitnessData.calories} 
        workoutMinutes={fitnessData.workoutMinutes} 
        bestDay={fitnessData.bestDay} 
      /> */}
      {/* Sleep Tracker Component */}
      <SleepTracker sleepHours={6.5} goalHours={8} />
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
    alignItems: 'center',
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  activityCardLarge: {
    backgroundColor: '#FFF',
    // padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    width: 150,
    height: 220, // Increased height for vertical elongation
    marginRight: 10,
  },
  activityRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 25,
  },
  activityCardSmall: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 97, // Adjusted height to fit in same row
    width: 190,
  },
  activityNumber: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  activityPercent: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  activityLabel: {
    fontSize: 14,
    color: '#8E8E93',
    padding: 8,
    paddingHorizontal: 35,
    textAlign:'center',
  },
  activityText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: -20,
    marginBottom: 30,
  },
  activitySmallText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '600',
    textAlign:'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  activitySmallLabel: {
    
  },
  stepsNumber: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  stepSmallText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: '600',
    textAlign:'center',
  }
});

export default HomeScreen;

