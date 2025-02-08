import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskCard = ({ task }: { task: string }) => {
  return (
    <View style={styles.card}>
      <Text>{task}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default TaskCard;