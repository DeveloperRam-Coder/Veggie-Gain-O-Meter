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
    backgroundColor: "#252728",
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
  },
  header: {
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
    textAlign: "center",
  },
  info: {
    marginBottom: 3,
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