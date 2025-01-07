import { useEffect, useState } from 'react';
import './MainPage.scss';
import { QuizModal } from '../QuizModal/QuizModal';

export const MainPage = () => {

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


  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };
  return (
    <main className="main">
      <div className="main__paddings container">
        <div className="main__inner">
          <div className="main__inner_info">
            <h2 className="main__inner_info-title">Just sign up to win a smart watch.</h2>
            <p className="main__inner_info-text">Enter our monthly drawing
              for a chance to win one of five smart watches.
              Contest winners will be announced on the first day
              of every month.
            </p>

            <div className="main__timer-top">
              <div className="main__timer-countdown">
                <div className="main__timer-item">
                  <span className="main__timer-item-time">{timeLeft.days}</span>
                  <span className="main__timer-item-text">Days</span>
                </div>
                <div className="main__timer-item">
                  <span>{timeLeft.hours}</span>
                  <span>Hours</span>
                </div>
                <div className="main__timer-item">
                  <span>{timeLeft.minutes}</span>
                  <span>Minutes</span>
                </div>
                <div className="main__timer-item">
                  <span>{timeLeft.seconds}</span>
                  <span>Seconds</span>
                </div>
              </div>
              <p className="main__timer_text">until the contest ends!</p>
            </div>

            <button onClick={handleOpenQuiz} className="main__inner_info-button">I want to win!</button>
          </div>
          <div className="main__inner_image">
            <img src="img/watch.webp" alt="images" />
          </div>
        </div>

        {isQuizOpen && (
          <QuizModal onClose={() => setIsQuizOpen(false)} />
        )}

        <div className="main__timer">
          <div className="main__timer-countdown">
            <div className="main__timer-item">
              <span className="main__timer-item-time">{timeLeft.days}</span>
              <span className="main__timer-item-text">Days</span>
            </div>
            <div className="main__timer-item">
              <span>{timeLeft.hours}</span>
              <span>Hours</span>
            </div>
            <div className="main__timer-item">
              <span>{timeLeft.minutes}</span>
              <span>Minutes</span>
            </div>
            <div className="main__timer-item">
              <span>{timeLeft.seconds}</span>
              <span>Seconds</span>
            </div>
          </div>
          <p className="main__timer_text">until the contest ends!</p>
        </div>
      </div>
    </main>
  );
}