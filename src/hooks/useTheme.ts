'use client';
import { useEffect, useState } from 'react';

export default function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false; // Default fallback on server
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return { toggleDarkMode, isDarkMode };
}
