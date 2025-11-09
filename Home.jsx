import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Our World of Memories
          </h1>
          <div className="welcome-divider" />
          <p className="welcome-note">
            Every moment with you is a treasure,
            <br />
            woven into the fabric of our beautiful story.
            <br />
            This space holds the chapters of us—
            <br />
            our laughter, our dreams, our forever.
          </p>
        </div>
        
        <div className="home-decoration">
          <div className="floating-heart" />
          <div className="floating-heart delay-1" />
          <div className="floating-heart delay-2" />
        </div>
      </div>
    </div>
  );
}

export default Home;
