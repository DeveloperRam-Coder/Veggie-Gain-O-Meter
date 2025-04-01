// App.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import { MealProvider } from './src/context/MealContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const AppContent = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" />
      {isLoading ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <HomeScreen />
      )}
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
