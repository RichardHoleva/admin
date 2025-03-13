import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import Games from './Pages/Games';
import PersonalBoardGames from './Pages/Create';

function App() {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist user state changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/login" element={<Login login={user} setLogin={setUser} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/create" element={<PersonalBoardGames />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
