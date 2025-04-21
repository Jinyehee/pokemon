import { createContext, useEffect, useState } from "react";

//1. context 생성
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
   const [theme, setTheme] = useState("light");

   useEffect(() => {
      if (theme === "dark") {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, [theme]);

   const changeTheme = () => {
      setTheme((prev) => {
         return prev === "light" ? "dark" : "light";
      });
   };

   return (
      <ThemeContext.Provider value={{ theme, changeTheme }}>
         {children}
      </ThemeContext.Provider>
   );
}
