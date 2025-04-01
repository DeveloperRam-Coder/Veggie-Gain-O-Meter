// src/data/mealsData.ts

export interface MealItem {
    id: string;
    name: string;
    calories: number;
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
      title: 'Morning',
      color: '#b52f2f',
      items: [
        { id: 'm1', name: 'Oatmeal', calories: 150 },
        { id: 'm2', name: 'Banana', calories: 105 }
      ],
    },
    {
      id: 'lunch',
      title: 'Lunch',
      color: '#2f71b5',
      items: [
        { id: 'l1', name: 'Veggie Sandwich', calories: 300 },
        { id: 'l2', name: 'Fruit Salad', calories: 120 }
      ],
    },
    {
      id: 'eveningSnack',
      title: 'Evening Snack',
      color: '#b5a12f',
      items: [
        { id: 'e1', name: 'Mixed Nuts', calories: 200 },
        { id: 'e2', name: 'Green Tea', calories: 5 }
      ],
    },
    {
      id: 'dinner',
      title: 'Dinner',
      color: '#5b2fb5',
      items: [
        { id: 'd1', name: 'Curry', calories: 350 },
        { id: 'd2', name: 'Rice', calories: 200 }
      ],
    },
  ];
  
  export default mealsData;
  