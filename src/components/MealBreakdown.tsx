import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { MealContext } from '../context/MealContext';

interface MealBreakdownProps {
  dailyTarget: number;
  totalCalories: number;
}

export default function MealBreakdown({ dailyTarget }: MealBreakdownProps): JSX.Element {
  const { meals } = useContext(MealContext);
  const { width } = Dimensions.get('window');

  const totalCalories = meals.reduce(
    (total, meal) => total + meal.items.reduce((sum, item) => sum + item.calories, 0),
    0
  );
  const progressPercentage = Math.min((totalCalories / dailyTarget) * 100, 100);

  const animatedWidth = new Animated.Value(0);
  Animated.timing(animatedWidth, {
    toValue: progressPercentage,
    duration: 800,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.card}>
      <Text style={styles.header}>📊 Meal Breakdown</Text>
      <Text style={styles.info}>Total Calories: {totalCalories} / {dailyTarget}</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: animatedWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
      </View>
      <Text style={styles.percentageText}>{Math.round(progressPercentage)}% of daily target</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#7f8c8d',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(243, 156, 18, 0.2)',
    borderRadius: 6,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F39C12',
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 4,
  },
});