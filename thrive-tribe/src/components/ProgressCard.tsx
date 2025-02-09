// import React from 'react';
// import { View, Text, StyleSheet, Animated, Easing } from 'react-native';


// type ProgressProps = {
//     totalTasks: number;
//     completedTasks: number;
// }
// const Progress = ({ totalTasks, completedTasks }: ProgressProps) => {
//   const progress = (completedTasks / totalTasks) * 100;
//   const progressAnim = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.timing(progressAnim, {
//       toValue: progress,
//       duration: 1000,
//       easing: Easing.ease,
//       useNativeDriver: false,
//     }).start();
//   }, [progress]);

//   const progressWidth = progressAnim.interpolate({
//     inputRange: [0, 100],
//     outputRange: ['0%', '100%'],
//   });

//   const getMotivationalMessage = () => {
//     if (progress < 30) return "Let's get started! 💪";
//     if (progress < 70) return "Keep going! You're doing great! 🚀";
//     if (progress < 100) return "Almost there! Finish strong! 🔥";
//     return "You did it! 🎉";
//   };

//   return (
//     <View style={styles.progressContainer}>
//       <Text style={styles.motivation}>{getMotivationalMessage()}</Text>
//       <Text style={styles.progressText}>
//         {completedTasks}/{totalTasks} Tasks Completed
//       </Text>
//       <View style={styles.progressBarBackground}>
//         <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   progressContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   motivation: {
//     fontSize: 18,
//     color: '#555',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   progressText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
//   progressBarBackground: {
//     width: '100%',
//     height: 10,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: '#4CAF50', // Green color for progress
//     borderRadius: 5,
//   },
// });

// export default Progress;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window'); // Get screen width

type ProgressProps = {
  totalTasks: number;
  completedTasks: number;
};

const Progress = ({ totalTasks, completedTasks }: ProgressProps) => {
  const progress = (completedTasks / totalTasks) * 100;
  const radius = width / 3.5; // Slightly smaller radius
  const strokeWidth = 20; // Increased stroke width for a thicker ring
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  const getMotivationalMessage = () => {
    if (progress < 30) return "Let's get started! 💪";
    if (progress < 70) return "Keep going! You're doing great! 🚀";
    if (progress < 100) return "Almost there! Finish strong! 🔥";
    return "You did it! 🎉";
  };

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.motivation}>{getMotivationalMessage()}</Text>

      {/* Progress Ring */}
      <View style={styles.ringContainer}>
        <Svg height={radius * 2} width={radius * 2}>
          {/* Background Circle */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            stroke="#008080"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
          />
        </Svg>
        {/* Task Count in the Center */}
        <Text style={styles.taskCount}>{`${completedTasks}/${totalTasks}`}</Text>
      </View>

      {/* Pending Tasks Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('View Pending Tasks Pressed')}
      >
        <Text style={styles.buttonText}>View Pending Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,  // Ensures content is centered
    justifyContent: 'center',
  },
  motivation: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  ringContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  taskCount: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Progress;




