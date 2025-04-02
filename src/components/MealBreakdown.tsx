import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { MealContext } from '../context/MealContext';
import { Easing } from 'react-native-reanimated';

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

  const animatedWidth = new Animated.Value(0);
  Animated.timing(animatedWidth, {
    toValue: progressPercentage,
    duration: 800,
    easing: Easing.ease,
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
    backgroundColor: "#e3f2fd",
    borderWidth: 1,
    borderColor: '#F39C12',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 14,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0, 106, 255, 0.2)',
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
    opacity: 0.9,
    marginTop: 4,
  },
});