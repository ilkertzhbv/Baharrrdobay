import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import '../styles/Memories.css';

const mediaItems = [
  { type: 'image', src: '/visual.jpg', alt: 'Memory 1' },
  { type: 'video', src: '/visual.mp4', alt: 'Memory Video 1' },
  { type: 'image', src: '/visual2.jpg', alt: 'Memory 2' },
  { type: 'video', src: '/visual2.mp4', alt: 'Memory Video 2' },
  { type: 'image', src: '/visual3.jpg', alt: 'Memory 3' },
  { type: 'video', src: '/visual3.mp4', alt: 'Memory Video 3' },
  { type: 'image', src: '/visual4.jpg', alt: 'Memory 4' },
  { type: 'video', src: '/visual4.mp4', alt: 'Memory Video 4' }
];

function Memories() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openMedia = (index) => {
    setSelectedIndex(index);
  };

  const closeMedia = () => {
    setSelectedIndex(null);
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goToPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <div className="memories-page">
      <div className="memories-header">
        <h1 className="memories-title">Our Precious Moments</h1>
        <p className="memories-subtitle">Click to relive each beautiful memory</p>
      </div>

      <div className="memories-grid">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className="memory-card"
            onClick={() => openMedia(index)}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} className="memory-thumbnail" />
            ) : (
              <div className="video-thumbnail">
                <video src={item.src} className="memory-thumbnail" />
                <div className="play-overlay">
                  <Play size={48} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={closeMedia}>
          <button className="lightbox-close" onClick={closeMedia}>
            <X size={32} />
          </button>
          
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
            <ChevronLeft size={36} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {mediaItems[selectedIndex].type === 'image' ? (
              <img src={mediaItems[selectedIndex].src} alt={mediaItems[selectedIndex].alt} />
            ) : (
              <video src={mediaItems[selectedIndex].src} controls autoPlay />
            )}
          </div>
          
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Memories;
