import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import '../styles/Songs.css';
import { mockSongs } from '../data/mock';

function Songs() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  const currentSong = mockSongs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % mockSongs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + mockSongs.length) % mockSongs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="songs-page">
      <div className="player-container">
        <div className="album-art">
          <img src="/visual.jpg" alt="Album Cover" />
        </div>

        <div className="song-info">
          <h2 className="song-title">{currentSong.title}</h2>
          <p className="song-artist">{currentSong.artist}</p>
        </div>

        <div className="progress-section">
          <span className="time-label">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span className="time-label">{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button className="control-btn" onClick={handlePrev}>
            <SkipBack size={24} />
          </button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button className="control-btn" onClick={handleNext}>
            <SkipForward size={24} />
          </button>
        </div>

        <div className="volume-section">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="volume-bar"
          />
        </div>

        <div className="playlist">
          <h3 className="playlist-title">Our Playlist</h3>
          {mockSongs.map((song, index) => (
            <div
              key={index}
              className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
                setTimeout(() => audioRef.current?.play(), 100);
              }}
            >
              <span className="playlist-number">{index + 1}</span>
              <div className="playlist-info">
                <p className="playlist-song-title">{song.title}</p>
                <p className="playlist-song-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <audio ref={audioRef} src={currentSong.src} />
    </div>
  );
}

export default Songs;
