import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MealContext } from '../context/MealContext';

interface MealBreakdownProps {
  dailyTarget: number;
}

export default function MealBreakdown({ dailyTarget }: MealBreakdownProps): JSX.Element {
  const { meals } = useContext(MealContext);
  const { width } = Dimensions.get('window');

  const totalCalories = meals.reduce(
    (total, meal) => total + meal.items.reduce((sum, item) => sum + item.calories, 0),
    0
  );
  const progressPercentage = Math.min((totalCalories / dailyTarget) * 100, 100);

  return (
    <View style={styles.card}>
      <Text style={styles.header}>📊 Meal Breakdown</Text>
      <Text style={styles.info}>Total Calories: {totalCalories} / {dailyTarget}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.percentageText}>{Math.round(progressPercentage)}% of daily target</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F1C40F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#F1C40F',
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginVertical: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F1C40F',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
});
