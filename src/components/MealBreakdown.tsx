// src/components/MealBreakdown.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MealContext } from '../context/MealContext';

interface MealBreakdownProps {
  dailyTarget: number;
}

export default function MealBreakdown({ dailyTarget }: MealBreakdownProps): JSX.Element {
  const { meals } = useContext(MealContext);
  const { width } = Dimensions.get('window');

  const totalCalories = meals.reduce((total, meal) => total + meal.items.reduce((sum, item) => sum + item.calories, 0), 0);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize: width < 350 ? 16 : 18 }]}>Meal Breakdown</Text>
      <Text style={[styles.info, { fontSize: width < 350 ? 14 : 16 }]}>
        Total Calories: {totalCalories} / {dailyTarget}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252728',
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
  },
  header: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  info: {
    color: '#fff',
  },
});
