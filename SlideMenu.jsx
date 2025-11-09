import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Image, Music, Heart, X } from 'lucide-react';
import '../styles/SlideMenu.css';

const menuItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/memories', label: 'Memories', icon: Image },
  { path: '/songs', label: 'Songs', icon: Music },
  { path: '/compliments', label: 'Compliments', icon: Heart }
];

function SlideMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(onClose, 300);
  };

  return (
    <>
      <div 
        className={`menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-title">Our Story</h2>
          <button className="menu-close" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <nav className="menu-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon size={22} className="menu-icon" />
                <span className="menu-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="menu-footer">
          <p className="menu-footer-text">Made with love</p>
        </div>
      </div>
    </>
  );
}

export default SlideMenu;
