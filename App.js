import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SlideMenu from './components/SlideMenu';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Songs from './pages/Songs';
import Compliments from './pages/Compliments';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-container">
      <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className={`main-content ${menuOpen ? 'menu-open' : ''}`}>
        <button 
          className="menu-trigger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/compliments" element={<Compliments />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
