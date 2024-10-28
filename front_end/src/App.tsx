import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
      </Routes>
    </Router>
  );
};

export default App;