import React, { createContext, useState } from "react";
import initialHabits from "../data/habits";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [habits, setHabits] = useState(initialHabits);
  const [theme, setTheme] = useState("light");

  const completeHabitToday = (id) => {
    const today = new Date().toISOString().slice(0, 10);
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          if (!h.history.includes(today)) {
            const newHist = [...h.history, today];
            return { ...h, history: newHist, streak: h.streak + 1 };
          }
        }
        return h;
      })
    );
  };

  const resetAllStreaks = () => {
    setHabits((prev) => prev.map((h) => ({ ...h, streak: 0, history: [] })));
  };

  return (
    <AppContext.Provider
      value={{
        habits,
        setHabits,
        theme,
        setTheme,
        completeHabitToday,
        resetAllStreaks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
