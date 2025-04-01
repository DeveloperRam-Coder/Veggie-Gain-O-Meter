// src/components/AddMealItemModal.tsx
import React, { useState, useContext } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MealContext } from '../context/MealContext';
import uuid from 'react-native-uuid';

interface Props {
  visible: boolean;
  mealId: string;
  onClose: () => void;
}

export default function AddMealItemModal({ visible, mealId, onClose }: Props): JSX.Element {
  const { addMealItem } = useContext(MealContext);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  const handleAdd = () => {
    if (!name || !calories) return;
    const newItem = { id: uuid.v4().toString(), name, calories: parseInt(calories) };
    addMealItem(mealId, newItem);
    setName('');
    setCalories('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Add Meal Item</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Item Name" 
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Calories" 
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
backgroundColor: '#fffbeb',    borderRadius: 8,
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1f1f1f',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#b52f2f',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
