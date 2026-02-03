import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* The Home Page (Generator) */}
        <Route path="/" element={<Home />} />
        
        {/* The Dashboard Page (Analytics) */}
        {/* The ":id" part tells React to capture whatever comes after /analytics/ */}
        <Route path="/analytics/:id" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;