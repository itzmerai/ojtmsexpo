import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import NotificationIcon from "./NotificationIcon"; // Import the new component

// Define the props for the Header component
interface HeaderProps {
  title: string; // Title to display in the header
  showBackButton?: boolean; // Whether to show the back button
  onBackPress?: () => void; // Function to call when the back button is pressed
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
}) => {
  return (
    <View style={styles.headerBackground}>
      <View style={styles.headerr}>
        {/* Back Button (Chevron Left) */}
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress}>
            <EvilIcons
              name="chevron-left"
              size={30}
              color="#fff"
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}

        {/* Title */}
        <Text style={styles.headerTitle}>{title}</Text>

        {/* Notification Icon */}
        <NotificationIcon />
      </View>
    </View>
  );
};

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: "#0b9ca7",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  headerr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1, // To center the title
  },
});

export default Header;
