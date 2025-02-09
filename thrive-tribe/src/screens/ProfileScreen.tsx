import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import { Avatar, Card, Button, Divider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const [username, setUsername] = useState("Alex");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({
    location: "New York, USA",
    languages: "English, Spanish",
    memberSince: "March 2023",
    birthday: "Jan 15, 1995",
    interests: "Running, Meditation, Reading",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Handle profile picture upload
  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Open modal for editing
  const openEditModal = (field: keyof typeof userDetails) => {
    setEditingField(field);
    setEditValue(userDetails[field]);
    setModalVisible(true);
  };

  // Save updated value
  const saveEdit = () => {
    if (editingField) {
      setUserDetails({ ...userDetails, [editingField]: editValue });
    }
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Greeting & Profile Picture */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {username} 👋</Text>
        <TouchableOpacity onPress={pickProfileImage}>
          <Avatar.Image size={100} source={profilePic ? { uri: profilePic } : require("../assets/default-avatar.png")} />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>👤 Personal Info</Text>
          <Divider style={styles.divider} />
          {Object.entries(userDetails).map(([key, value]) => (
            <TouchableOpacity key={key} style={styles.detailItem} onPress={() => openEditModal(key as keyof typeof userDetails)}>
              <Text style={styles.detailText}>{key.replace(/([A-Z])/g, " $1")}: {value}</Text>
              <Text style={styles.editText}>✏️ Edit</Text>
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>⚙️ Settings</Text>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>🔔 Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>🌎 Change Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>🔒 Privacy Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>🚪 Log Out</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {editingField?.replace(/([A-Z])/g, " $1")}</Text>
            <TextInput style={styles.input} value={editValue} onChangeText={setEditValue} />
            <Button mode="contained" onPress={saveEdit} style={styles.saveButton}>Save</Button>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  changePhotoText: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
  },
  infoCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailText: {
    fontSize: 16,
  },
  editText: {
    fontSize: 14,
    color: "#007BFF",
  },
  settingItem: {
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
    color: "#007BFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
