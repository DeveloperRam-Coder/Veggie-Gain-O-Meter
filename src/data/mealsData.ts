// src/data/mealsData.ts

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  emoji?: string; // Optional emoji for visual representation
}

export interface Meal {
  id: string;
  title: string;
  color: string;
  items: MealItem[];
}

const mealsData: Meal[] = [
  {
    id: 'morning',
    title: 'Morning 🌅',
    color: '#b52f2f',
    items: [
      { id: 'm1', name: 'Idli 🍚', calories: 150, emoji: '🍚' },
      { id: 'm2', name: 'Upma 🥣', calories: 200, emoji: '🥣' },
      { id: 'm3', name: 'Dosa 🥞', calories: 180, emoji: '🥞' },
      { id: 'm4', name: 'Tea ☕', calories: 50, emoji: '☕' },
      { id: 'm5', name: 'Banana 🍌', calories: 105, emoji: '🍌' },
    ],
  },
  {
    id: 'lunch',
    title: 'Lunch 🍛',
    color: '#2f71b5',
    items: [
      { id: 'l1', name: 'Rice 🍚', calories: 200, emoji: '🍚' },
      { id: 'l2', name: 'Dal 🍲', calories: 150, emoji: '🍲' },
      { id: 'l3', name: 'Vegetable Curry 🥘', calories: 250, emoji: '🥘' },
      { id: 'l4', name: 'Roti 🫓', calories: 120, emoji: '🫓' },
      { id: 'l5', name: 'Salad 🥗', calories: 80, emoji: '🥗' },
    ],
  },
  {
    id: 'eveningSnack',
    title: 'Evening Snack 🍿',
    color: '#b5a12f',
    items: [
      { id: 'e1', name: 'Samosa 🥟', calories: 250, emoji: '🥟' },
      { id: 'e2', name: 'Chai ☕', calories: 60, emoji: '☕' },
      { id: 'e3', name: 'Poha 🍚', calories: 180, emoji: '🍚' },
      { id: 'e4', name: 'Bhajji 🧅', calories: 200, emoji: '🧅' },
      { id: 'e5', name: 'Fruits 🍎', calories: 100, emoji: '🍎' },
    ],
  },
  {
    id: 'dinner',
    title: 'Dinner 🍽️',
    color: '#5b2fb5',
    items: [
      { id: 'd1', name: 'Rice 🍚', calories: 200, emoji: '🍚' },
      { id: 'd2', name: 'Chicken Curry 🍗', calories: 350, emoji: '🍗' },
      { id: 'd3', name: 'Paneer Curry 🧀', calories: 300, emoji: '🧀' },
      { id: 'd4', name: 'Roti 🫓', calories: 120, emoji: '🫓' },
      { id: 'd5', name: 'Vegetable Sabzi 🥦', calories: 180, emoji: '🥦' },
    ],
  },
];

export default mealsData;