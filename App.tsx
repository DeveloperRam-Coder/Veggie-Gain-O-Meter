// App.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import { MealProvider } from './src/context/MealContext';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, ]}>
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
      <MealProvider>
        <AppContent />
      </MealProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
