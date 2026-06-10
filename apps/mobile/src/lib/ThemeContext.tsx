import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DARK_COLORS, LIGHT_COLORS } from "./theme";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof DARK_COLORS;
  toggleTheme: () => void;
  setMode: (m: ThemeMode) => void;
  isDark: boolean;
}

const STORAGE_KEY = "@theme_mode";

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  colors: DARK_COLORS,
  toggleTheme: () => {},
  setMode: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Dark is the signature/default experience; light is opt-in and persisted.
  const [mode, setModeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved === "light" || saved === "dark") setModeState(saved);
    });
  }, []);

  const persist = (m: ThemeMode) => {
    setModeState(m);
    AsyncStorage.setItem(STORAGE_KEY, m).catch(() => {});
  };

  const toggleTheme = () => persist(mode === "dark" ? "light" : "dark");
  const setMode = (m: ThemeMode) => persist(m);

  const colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme, setMode, isDark: mode === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
