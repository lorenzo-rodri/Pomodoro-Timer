import "../stylesheets/Timer.css";
import YouTubePlayer from "../pages/YouTubePlayer";
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Timer() {
  const bell = new Audio(require('../assets/surprise-emote-animal-crossing.wav'));

  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "lofi study music";
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const updateSeconds = () => { //prev is going to be the total num of seconds, this fun -1 each time
    setRemainingSeconds(prev => {
      const next = prev - 1;
      if (next <= 0) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsPaused(false);
        bell.play();
        return 0;
      }
      return next;
    });
  };

  const appTimer = () => { // when app timer is CALLED it starts the timer, and sets the usestate isrunning to true adn ispaused false. setinterval creates the timer counting down
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      bell.play();

      if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      }

      intervalRef.current = setInterval(updateSeconds, 1000); // set interval says do updateSeconds every 1000 ms
    } else {
      alert('Session has already started.');
    }
  };

  const handlePauseToggle = () => { // CALLED if pause is pressed only works if isrunning
    if (isRunning) {
      if (!isPaused) {
        clearInterval(intervalRef.current); // clear interval
        setIsPaused(true);
        if (playerRef.current && playerRef.current.playVideo) {
          playerRef.current.pauseVideo();
        }
      } else {                                   // when resume is pressed it resumes the interval
        intervalRef.current = setInterval(updateSeconds, 1000);
        setIsPaused(false);
        if (playerRef.current && playerRef.current.playVideo) {
          playerRef.current.playVideo();
        }
      }
    }
  };

  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    async function loadRandomVideo() {
      if (!searchTerm) return;
      const id = await fetchRandomVideoId(searchTerm);
      setVideoId(id);
    }
    loadRandomVideo();
  }, [searchTerm]);

  async function fetchRandomVideoId(searchTerm) {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const maxResults = 10;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(searchTerm)}&key=${apiKey}`
    );

    const data = await response.json();
    if (!data.items || data.items.length === 0) return null;

    const randomVideo = data.items[Math.floor(Math.random() * data.items.length)];
    return randomVideo.id.videoId;
  }

  const handleReset = async () => { // when reset is pressed 
    clearInterval(intervalRef.current);
    setRemainingSeconds(45 * 60);
    setIsRunning(false);
    setIsPaused(false);
    const newVideoId = await fetchRandomVideoId(searchTerm);
    setVideoId(newVideoId);
  };

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');

  return (
    <div className="timer-page">
      <h1>Pomodoro Player</h1>
			<div class="app-message">Start the timer</div>
      <div className="timer-layout">
        <div className="app-circle"> 
          <div className="circle-shape">
            <div className="semi-circle right-side circle-mask"></div>
            <div className="semi-circle right-side circle"></div>
            <div className="semi-circle left-side circle-mask"></div>
            <div className="semi-circle left-side circle"></div>
          </div>

          <div className="app-counter-box">
            {isRunning ? (
              <p>
                <span className="minutes">{minutes}</span>:
                <span className="seconds">{seconds}</span>
              </p>
            ) : (
              <p>
                <span className="minutes">45</span>
                :<span className="seconds">00</span>
              </p>
            )}
          </div>

          <div className="btn-group">
            <button className="btn-start" onClick={appTimer}>start</button>            
            <button className="btn-pause" onClick={handlePauseToggle}>
              {isPaused ? 'resume' : 'pause'}
            </button>          
            <button className="btn-reset" onClick={handleReset}>reset</button>            
          </div>
        </div>

        <div className="yt-player-box">
          {videoId ? (
            <YouTubePlayer videoId={videoId} playerRef={playerRef} />
          ) : (
            <p>Loading video...</p>
          )}
        </div>
      </div>
    </div>
  );
}

