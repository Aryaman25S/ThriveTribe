import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import for moon icon

type HeaderProps = {
    userName: string;
}

const Header = ({ userName }:HeaderProps ) => {
  return (
    // <View style={styles.header}>
    //   <Text style={styles.headerText}>Welcome Back, {userName}! 👋</Text>
    // </View>
    // <View style={styles.header}>
    //     <Text style={styles.headerText}>Hi, {userName} 👋</Text>
    //     <Ionicon
    <View style={styles.header}>
        <Text style={styles.headerText}>Hi, {userName} 👋</Text>
        <Ionicons name="moon-outline" size={22} color="#666" />
    </View>


  );
};

const styles = StyleSheet.create({
//   header: {
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     // elevation: 5, // Shadow for Android
//     // shadowColor: '#000', // Shadow for iOS
//     // shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'left',
//   },
    header: {
        flexDirection: 'row',  // Align text and icon in one row
        alignItems: 'center',  // Keep them vertically aligned
        justifyContent: 'space-between',  // Push text to left & icon to right
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 16,  // Add padding for spacing
    },
    
    headerText: {
        fontSize: 35,
        fontWeight: '700',
        color: '#333',
    },
  
  
});

export default Header;