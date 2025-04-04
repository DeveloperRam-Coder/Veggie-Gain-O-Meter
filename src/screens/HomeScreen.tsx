import React, { useContext, useState } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { MealContext } from "../context/MealContext";
import GoalSuggestions from "../components/GoalSuggestions";
import MealBreakdown from "../components/MealBreakdown";
import MealCard from "../components/MealCard";
import Tips from "../components/Tips";

// HomeScreen component - Displays meal tracking information
export default function HomeScreen(): JSX.Element {
  const mealContext = useContext(MealContext); // Access meal context
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null); // Track expanded meal

  if (!mealContext) throw new Error("MealContext is not provided.");

  const { meals, setMeals, resetMeals } = mealContext;
  const dailyTarget = 2500; // Daily calorie goal
  const totalCalories = meals.reduce((acc, meal) => acc + meal.items.reduce((sum, item) => sum + item.calories, 0), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>GymBro</Text>
          <TouchableOpacity onPress={resetMeals}>
            <Text style={styles.resetButton}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <GoalSuggestions />
          <MealBreakdown totalCalories={totalCalories} dailyTarget={dailyTarget} />
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              meals={meals}
              setMeals={setMeals}
              isExpanded={expandedMealId === meal.id}
              onToggle={() => setExpandedMealId(expandedMealId === meal.id ? null : meal.id)}
            />
          ))}
          <Tips />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for UI components
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f4f4" },
  scrollView: { flex: 1, paddingHorizontal: 8 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#F39C12"
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  resetButton: { fontSize: 14, color: "#E74C3C", fontWeight: "600" },
  content: { paddingBottom: 8 },
});
