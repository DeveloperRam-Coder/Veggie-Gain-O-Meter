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
import { useTheme } from "../context/ThemeContext";
import GoalSuggestions from "../components/GoalSuggestions";
import MealBreakdown from "../components/MealBreakdown";
import MealCard from "../components/MealCard";

export default function HomeScreen(): JSX.Element {
  const mealContext = useContext(MealContext);
  if (!mealContext) {
    throw new Error("MealContext is not provided. Make sure to wrap your component tree with MealContext.Provider.");
  }
  const { meals, setMeals } = mealContext;
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const dailyTarget = 2500; // Example daily target in calories
  const totalCalories = meals.reduce((acc, meal) => {
    const mealCalories = meal.items.reduce(
      (sum, item) => sum + item.calories,
      0
    );
    return acc + mealCalories;
  }, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header with Theme Toggle */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Veggie Gain-o-Meter
          </Text>
          {/* <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={[styles.themeToggleText, { color: theme.text }]}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity> */}
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
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 20,
  },
});
