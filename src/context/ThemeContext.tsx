import React, { createContext, useContext, useState } from 'react';
import Colors from '../theme/Colors';

type Theme = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const lightTheme: Theme = {
  background: Colors.white,
  text: Colors.textDark,
  primary: Colors.primary,
  secondary: Colors.secondary,
  accent: Colors.accent,
};

const darkTheme: Theme = {
  background: Colors.primary,
  text: Colors.textLight,
  primary: Colors.white,
  secondary: Colors.secondary,
  accent: Colors.accent,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};