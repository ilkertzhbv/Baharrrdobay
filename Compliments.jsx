import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import '../styles/Compliments.css';
import { complimentsList } from '../data/mock';

function Compliments() {
  const [currentCompliment, setCurrentCompliment] = useState(
    complimentsList[Math.floor(Math.random() * complimentsList.length)]
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomCompliment = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * complimentsList.length);
      setCurrentCompliment(complimentsList[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="compliments-page">
      <div className="compliments-container">
        <div className="compliments-header">
          <Sparkles size={40} className="sparkle-icon" />
          <h1 className="compliments-title">Words for You</h1>
        </div>

        <div className={`compliment-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          <p className="compliment-text">{currentCompliment}</p>
        </div>

        <button className="generate-btn" onClick={getRandomCompliment}>
          <Sparkles size={20} />
          <span>Another One</span>
        </button>

        <div className="compliments-grid">
          {complimentsList.slice(0, 6).map((compliment, index) => (
            <div key={index} className="mini-compliment">
              {compliment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Compliments;
