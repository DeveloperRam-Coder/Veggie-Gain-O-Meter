import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MealItem from './MealItem';
import AddMealItemModal from './AddMealItemModal';
import { Meal } from '../data/mealsData';

interface MealCardProps {
  meal: Meal;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
}

export default function MealCard({ meal, meals, setMeals }: MealCardProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const totalMealCalories = meal.items.reduce((sum, item) => sum + item.calories, 0);

  return (
    <View style={[styles.card, { borderLeftColor: meal.color }]}>
      <Text style={styles.title}>{meal.title}</Text>
      <View style={styles.itemsContainer}>
        {meal.items.map((item) => (
          <MealItem key={item.id} item={item} meal={meal} meals={meals} setMeals={setMeals} />
        ))}
      </View>
      <Text style={styles.caloriesText}>Total: {totalMealCalories} cal</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>
      <AddMealItemModal visible={modalVisible} mealId={meal.id} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#252728',
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 5,
    width: '100%',
  },
  title: {
    fontSize: width < 350 ? 16 : 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemsContainer: {
    marginBottom: 8,
  },
  caloriesText: {
    color: '#fff',
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: width < 350 ? 12 : 14,
  },
  addButton: {
    backgroundColor: '#2f71b5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: width < 350 ? 14 : 16,
  },
});
