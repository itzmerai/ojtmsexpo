import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter from expo-router

const NotificationIcon: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const handleNotificationPress = () => {
    router.push("/NotificationScreen"); // Navigate to NotificationScreen
  };

  return (
    <TouchableOpacity onPress={handleNotificationPress}>
      <Ionicons
        name="notifications-outline"
        size={24}
        color="#fff"
        style={styles.notificationIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationIcon: {
    marginLeft: 10,
    marginHorizontal: 5,
  },
});

export default NotificationIcon;
