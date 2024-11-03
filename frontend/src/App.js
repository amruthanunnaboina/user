import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ThemeToggle from './ThemeToggle'; 
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

