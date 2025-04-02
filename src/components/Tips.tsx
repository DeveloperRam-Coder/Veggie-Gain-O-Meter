import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface TipsProps {
  tips: string[];
}

const { width } = Dimensions.get("window");
const fontSize = width < 360 ? 12 : 14;
const headerFontSize = width < 360 ? 16 : 18;

const Tips: React.FC<TipsProps> = ({ tips }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize: headerFontSize }]}>🌟 Tips for Healthy Weight Gain 🌟</Text>
      {tips.map((tip, index) => (
        <Text key={index} style={[styles.info, { fontSize, color: colors[index % colors.length] }]}>• {tip}</Text>
      ))}
    </View>
  );
};

const colors = ["#FF5733", "#33FF57", "#337BFF", "#FF33A8", "#FFC300"];

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12'
  },
  header: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  info: {
    marginBottom: 3,
    color: "#7f8c8d",
  },
});

export default function App() {
  const tips = [
    "Choose nutrient-rich meals.",
    "Incorporate healthy fats daily.",
    "Prioritize protein intake.",
    "Maintain a consistent routine."
  ];

  return <Tips tips={tips} />;
}