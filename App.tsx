// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import { MealProvider } from './src/context/MealContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      <MealProvider>
        <AppContent />
      </MealProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
