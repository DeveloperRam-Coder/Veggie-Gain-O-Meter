import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function GoalSuggestions(): JSX.Element {
  const [currentDate, setCurrentDate] = useState("");

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
      <View style={styles.header}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>Today's Goal 🎯</Text>
        <Text style={styles.goalText}>Stay hydrated and eat balanced meals!</Text>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Set New Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F39C12',
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: width < 350 ? 14 : 18,
    fontWeight: "bold",
    color: "#1a237e",
  },
  goalSection: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e88e5",
    marginBottom: 4,
  },
  goalText: {
    fontSize: 14,
    color: "#424242",
  },
  actionButton: {
    marginTop: 12,
    backgroundColor: "#1e88e5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});