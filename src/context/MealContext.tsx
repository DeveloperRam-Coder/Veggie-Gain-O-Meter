// src/context/MealContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import mealsData, { Meal } from '../data/mealsData';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MealContextProps {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  addMealItem: (mealId: string, item: { id: string; name: string; calories: number }) => void;
}

export const MealContext = createContext<MealContextProps>({
  meals: [],
  setMeals: () => {},
  addMealItem: () => {},
});

interface Props {
  children: ReactNode;
}

export const MealProvider = ({ children }: Props): JSX.Element => {
  const [meals, setMeals] = useState<Meal[]>(mealsData);

  // Load meals from AsyncStorage on mount
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const storedMeals = await AsyncStorage.getItem('meals');
        if (storedMeals) {
          setMeals(JSON.parse(storedMeals));
        }
      } catch (error) {
        console.log('Error loading meals:', error);
      }
    };
    loadMeals();
  }, []);

  // Save meals to AsyncStorage whenever meals changes
  useEffect(() => {
    const saveMeals = async () => {
      try {
        await AsyncStorage.setItem('meals', JSON.stringify(meals));
      } catch (error) {
        console.log('Error saving meals:', error);
      }
    };
    saveMeals();
  }, [meals]);

  const addMealItem = (mealId: string, item: { id: string; name: string; calories: number }) => {
    setMeals(prevMeals =>
      prevMeals.map(meal =>
        meal.id === mealId ? { ...meal, items: [...meal.items, item] } : meal
      )
    );
  };

  return (
    <MealContext.Provider value={{ meals, setMeals, addMealItem }}>
      {children}
    </MealContext.Provider>
  );
};
