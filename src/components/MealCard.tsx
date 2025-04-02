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


  return (
    <View style={[styles.card, { borderLeftColor: meal.color }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{meal.title}</Text>
        {/* <Text style={styles.caloriesText}>{totalCalories} cal</Text> */}
      </View>
      {meal.items.map((item) => (
        <MealItem
          key={item.id}
          item={item}
          meal={meal}
          meals={meals}
          setMeals={setMeals}
        />
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>
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
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: "#e3f2fd",
    borderWidth: 1,
    borderColor: '#F39C12',
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
  },
  caloriesText: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#1e88e5",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginTop: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
