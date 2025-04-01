import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function GoalSuggestions(): JSX.Element {
  const [currentDate, setCurrentDate] = useState("");

  // Update the current date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(`📅 ${formattedDate}`);
  }, []);

  return (
    <View style={styles.container}>
      {/* Date and Nutrition Info */}
      <View style={styles.topSection}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f2f9f2",
    borderRadius: 10,
    marginBottom: 15,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: width < 350 ? 14 : 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    flexShrink: 1,
  },
  badgeContainer: {
    flexDirection: "row",
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  caloriesBadge: {
    backgroundColor: "#f8a100",
  },
  proteinBadge: {
    backgroundColor: "#9b4de0",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width < 350 ? 12 : 14,
  },
  themeToggleText: {
    fontSize: 20,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
});
