import React, { useState, useEffect } from 'react';
import './App.css';

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: parseInt(value) || 0 });
  };

  const startTimer = () => {
    const totalTime = time.hours * 3600 + time.minutes * 60 + time.seconds;
    setRemainingTime(totalTime);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  };

  const formattedTime = formatTime(remainingTime);

  return (
    <div className="app">
      <h1>Countdown Timer</h1>

      <div className="input-container">
        <input
          type="number"
          name="hours"
          value={time.hours}
          onChange={handleInputChange}
          placeholder="HH"
          min="0"
        />
        <span>:</span>
        <input
          type="number"
          name="minutes"
          value={time.minutes}
          onChange={handleInputChange}
          placeholder="MM"
          min="0"
        />
        <span>:</span>
        <input
          type="number"
          name="seconds"
          value={time.seconds}
          onChange={handleInputChange}
          placeholder="SS"
          min="0"
        />
      </div>

      <div className="button-container">
        <button onClick={startTimer} className="start-btn">Start Timer</button>
        <button onClick={stopTimer} className="stop-btn">Stop Timer</button>
      </div>

      <div className="timer-display">
        <div className="time-segment">
          <h2>{formattedTime.hours}</h2>
          <span>hrs</span>
        </div>
        <div className="time-segment">
          <h2>{formattedTime.minutes}</h2>
          <span>min</span>
        </div>
        <div className="time-segment">
          <h2>{formattedTime.seconds}</h2>
          <span>sec</span>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
