// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import DisplayPage from './pages/DisplayPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/display" element={<DisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
