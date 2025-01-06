import React, { useState, useEffect } from 'react';
import './Footer.scss';

export const Footer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const targetDate = new Date('2025-01-08T00:00:00'); // 8 січня 2025
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <footer className="footer">
      <div className="footer__timer">
        <div className="footer__timer-countdown">
          <div className="footer__timer-item">
            <span className="footer__timer-item-time">{timeLeft.days}</span>
            <span className="footer__timer-item-text">Days</span>
          </div>
          <div className="footer__timer-item">
            <span>{timeLeft.hours}</span>
            <span>Hours</span>
          </div>
          <div className="footer__timer-item">
            <span>{timeLeft.minutes}</span>
            <span>Minutes</span>
          </div>
          <div className="footer__timer-item">
            <span>{timeLeft.seconds}</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__bottom-text">until the contest ends!</p>
        <p className="footer__bottom-rules">©2024 Convers Traffic | Privacy Policy | Terms of Service	</p>
      </div>
    </footer>
  );
};
