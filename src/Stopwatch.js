import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [msec, setMsec] = useState(0);
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, [timerId]);

  const startTimer = () => {
    setMsec((prevMsec) => {
      let newMsec = prevMsec + 1;
      if (newMsec === 100) {
        newMsec = 0;
        setSecs((prevSecs) => {
          let newSecs = prevSecs + 1;
          if (newSecs === 60) {
            setMins((prevMins) => prevMins + 1);
            return 0;
          }
          return newSecs;
        });
      }
      return newMsec;
    });
  };

  const handleStart = () => {
    if (timerId) clearInterval(timerId);
    setTimerId(setInterval(startTimer, 10));
  };

  const handleStop = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const handleReset = () => {
    clearInterval(timerId);
    setMsec(0);
    setSecs(0);
    setMins(0);
    setTimerId(null);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        <div className="timerDisplay">
          {`${formatTime(mins)} : ${formatTime(secs)} : ${formatTime(msec)}`}
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleStop} className="btn" style={{ backgroundColor: 'red' }}>Stop</button>
        <button onClick={handleStart} className="btn" style={{ backgroundColor: 'green' }}>Start</button>
        <button onClick={handleReset} className="btn" style={{ backgroundColor: 'blue' }}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
