import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Tutor from './pages/Tutor';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoutes'; // <--- Import the new wrapper

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (Accessible by everyone) */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutor" element={<Tutor />} /> {/* Explicitly requested as Public */}

        {/* PRIVATE ROUTES (Require Login) */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;