import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MealItem from "./MealItem";
import AddMealItemModal from "./AddMealItemModal";
import { Meal } from "../data/mealsData";

interface MealCardProps {
  meal: Meal;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
}

export default function MealCard({ meal, meals, setMeals }: MealCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const totalCalories = meal.items.reduce((sum, item) => sum + item.calories, 0);

  return (
    <View style={[styles.card, { borderLeftColor: meal.color }]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.header}>{meal.title}</Text>
          <Text style={styles.caloriesText}>{totalCalories} cal</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemsContainer}>
        {meal.items.map((item) => (
          <MealItem
            key={item.id}
            item={item}
            meal={meal}
            meals={meals}
            setMeals={setMeals}
          />
        ))}
      </View>
      <AddMealItemModal
        visible={modalVisible}
        mealId={meal.id}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 4,
  },
  caloriesText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  itemsContainer: {
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#F39C12",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
