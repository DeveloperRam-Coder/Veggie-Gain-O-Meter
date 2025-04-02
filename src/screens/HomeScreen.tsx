// src/screens/HomeScreen.tsx
import React, { useContext } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
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

  const dailyTarget = 2500;
  const totalCalories = meals.reduce((acc, meal) => {
    const mealCalories = meal.items.reduce(
      (sum, item) => sum + item.calories,
      0
    );
    return acc + mealCalories;
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Veggie Gain-o-Meter</Text>
          </View>

          <View style={styles.content}>
            <GoalSuggestions />
            <MealBreakdown
              totalCalories={totalCalories}
              dailyTarget={dailyTarget}
            />
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                meals={meals}
                setMeals={setMeals}
              />
            ))}
            <Tips />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#F39C12",
  },
  content: {
    // paddingBottom: 24,
    // gap: 16,
  }
});
