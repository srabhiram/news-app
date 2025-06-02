'use client'
import  { useEffect, useState } from 'react'

export default function useTheme() {
     const [isDarkMode, setIsDarkMode] = useState(false);
    
      useEffect(() => {
      const isDark = localStorage.getItem("theme") === "dark";
      document.body.classList.toggle("dark", isDark);
      setIsDarkMode(isDark);
    }, []);
    
      const toggleDarkMode = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("theme", newTheme);
        document.body.classList.toggle("dark");
      };
  return {toggleDarkMode, isDarkMode}
}
