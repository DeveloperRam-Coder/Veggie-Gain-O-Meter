// src/components/AddMealItemModal.tsx
import React, { useState, useContext } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
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
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleAdd = () => {
    if (!name || !calories) return;
    const newItem = { id: uuid.v4().toString(), name, calories: parseInt(calories) };
    addMealItem(mealId, newItem);
    setName('');
    setCalories('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Add Meal Item</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter item name" 
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Calories</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter calories" 
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.addButton, (!name || !calories) && styles.buttonDisabled]} 
              onPress={handleAdd}
              disabled={!name || !calories}
            >
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    // backdropFilter: 'blur(8px)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#F39C12',
    borderWidth: 1,
    borderColor: '#E67E22',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.7,
    borderColor: '#D1D5DB',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
  },
});
