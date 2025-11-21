import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Tutor from './pages/Tutor';
import Login from './pages/Login';
import Profile from './pages/Profile'; // <--- 1. Import the Profile Page
import ProtectedRoute from './components/ProtectedRoutes'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutor" element={<Tutor />} />

        {/* PRIVATE ROUTES */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
            
            {/* 👇 2. ADD THIS LINE HERE */}
            <Route path="/profile" element={<Profile />} /> 
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;