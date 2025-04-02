// src/components/MealItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal, MealItem as MealItemType } from '../data/mealsData';

interface MealItemProps {
  item: MealItemType;
  meal: Meal;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
}

export default function MealItem({ item, meal, meals, setMeals }: MealItemProps): JSX.Element {
  const handleRemoveItem = () => {
    const updatedMeals = meals.map((m) => {
      if (m.id === meal.id) {
        return {
          ...m,
          items: m.items.filter((i) => i.id !== item.id),
        };
      }
      return m;
    });
    setMeals(updatedMeals);
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - {item.calories} cal
      </Text>
      <TouchableOpacity onPress={handleRemoveItem}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#F39C12",
    padding: 8,
    borderRadius: 5,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  removeButton: {
    color: '#ff6b6b',
    fontSize: 12,
  },
});
