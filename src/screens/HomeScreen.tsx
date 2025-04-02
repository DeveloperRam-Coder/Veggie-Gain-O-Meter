// src/screens/HomeScreen.tsx
import React, { useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { MealContext } from "../context/MealContext";

import Colors from "../theme/Colors";
import GoalSuggestions from "../components/GoalSuggestions";
import MealBreakdown from "../components/MealBreakdown";
import MealCard from "../components/MealCard";
import Tips from "../components/Tips";

export default function HomeScreen(): JSX.Element {
  const mealContext = useContext(MealContext);
  if (!mealContext) {
    throw new Error(
      "MealContext is not provided. Make sure to wrap your component tree with MealContext.Provider."
    );
  }
  const { meals, setMeals } = mealContext;

  const dailyTarget = 2500; // Example daily target in calories
  const totalCalories = meals.reduce((acc, meal) => {
    const mealCalories = meal.items.reduce(
      (sum, item) => sum + item.calories,
      0
    );
    return acc + mealCalories;
  }, 0);

  return (
    <View style={[styles.container]}>
      <ScrollView style={styles.scrollView}>
        {/* Header with Theme Toggle */}
        <View style={styles.header}>
          <Text style={[styles.title]}>Veggie Gain-o-Meter</Text>
        </View>

        {/* Goal Suggestions */}
        <GoalSuggestions />

        {/* Meal Breakdown (or summary) */}
        <MealBreakdown
          totalCalories={totalCalories}
          dailyTarget={dailyTarget}
        />
        {/* Render each MealCard */}
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            meals={meals}
            setMeals={setMeals}
          />
        ))}
        <Tips />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  scrollView: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginTop: 20,
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
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 20,
  },
});
