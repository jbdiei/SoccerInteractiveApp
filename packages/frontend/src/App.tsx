// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import ProgramDetails from './pages/ProgramDetails';
import History from './pages/History';

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
     </DarkModeProvider>
  );
};

export default App;
