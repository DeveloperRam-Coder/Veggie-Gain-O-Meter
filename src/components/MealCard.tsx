import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import MealItem from "./MealItem";
import AddMealItemModal from "./AddMealItemModal";
import { Meal } from "../data/mealsData";

interface MealCardProps {
  meal: Meal;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function MealCard({ meal, meals, setMeals, isExpanded, onToggle }: MealCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);
  
  const totalCalories = meal.items.reduce((sum, item) => sum + item.calories, 0);

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500], // Adjust this value based on your content
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onToggle}
      style={[styles.card, { borderLeftColor: meal.color }]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
        <Text style={styles.header}>
  {meal.title} → {totalCalories} cal
</Text>

        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.itemsContainer, { maxHeight, overflow: 'hidden' }]}>
        {meal.items.map((item) => (
          <MealItem
            key={item.id}
            item={item}
            meal={meal}
            meals={meals}
            setMeals={setMeals}
          />
        ))}
      </Animated.View>
      <AddMealItemModal
        visible={modalVisible}
        mealId={meal.id}
        onClose={() => setModalVisible(false)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: "#ffffff",

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
    marginBottom: 10,
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
