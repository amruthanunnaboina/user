import React, { useState, useEffect } from 'react';
import './ThemeToggle.css'; 
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
