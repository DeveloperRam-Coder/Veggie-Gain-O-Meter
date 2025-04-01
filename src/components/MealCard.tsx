import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MealItem from "./MealItem";
import AddMealItemModal from "./AddMealItemModal";
import { Meal } from "../data/mealsData";
import Colors from "../theme/Colors";

interface MealCardProps {
  meal: Meal;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
}

export default function MealCard({
  meal,
  meals,
  setMeals,
}: MealCardProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const totalCalories = meal.items.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  return (
    <View style={[styles.card, { borderLeftColor: meal.color }]}>
      <Text style={styles.header}>{meal.title}</Text>
      {meal.items.map((item) => (
        <MealItem
          key={item.id}
          item={item}
          meal={meal}
          meals={meals}
          setMeals={setMeals}
        />
      ))}
      {/* <Text style={styles.caloriesText}>Total: {totalCalories} cal</Text> */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Item</Text>
      </TouchableOpacity>
      <AddMealItemModal
        visible={modalVisible}
        mealId={meal.id}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#F1C40F",
    position: "relative", // Ensure the button can be placed relative to the card
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#F1C40F",
    marginBottom: 8,
  },
  caloriesText: {
    fontSize: 12,
    color: "#ECF0F1",
    textAlign: "right",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute", // Position the button absolutely inside the card
    top: 8, // Adjust to move it to the top
    right: 8, // Move it to the right side
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
});
