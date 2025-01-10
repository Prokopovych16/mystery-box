import { useEffect, useState } from 'react';
import './MainPage.scss';
import { QuizModal } from '../QuizModal/QuizModal';
import translations from '../../api/languages.json';
import { Comments } from '../Comments/Comments';

export const MainPage = ({ currentLang }) => {
  const chosenLanguage = translations[currentLang];
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);
  
  function calculateTimeLeft() {
    const now = new Date();
  
    // Set the target date to the next Monday at 12:00 GMT
    const targetDate = new Date(now);
    
    // Find the next Monday
    const dayOfWeek = now.getUTCDay(); // Sunday is 0, Monday is 1, etc.
    const daysUntilMonday = (7 - dayOfWeek + 1) % 7; // If today is Monday, the next Monday is in 7 days
  
    targetDate.setUTCDate(now.getUTCDate() + daysUntilMonday); 
    targetDate.setUTCHours(12, 0, 0, 0); // Set the time to 12:00 GMT
  
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

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  return (
    <main className="main">
      <div className="main__wrapper">
        <div className="main__paddings container">
          <div className="main__inner">
            <div className="main__inner_info">
              <h2 className="main__inner_info-title">{chosenLanguage.title}</h2>
              <p className="main__inner_info-text">{chosenLanguage.description}</p>

              <div className="main__timer-top">
                <div className="main__timer-countdown">
                  <div className="main__timer-item">
                    <span className="main__timer-item-time">{timeLeft.days}</span>
                    <span className="main__timer-item-text">{chosenLanguage.days}</span>
                  </div>
                  <div className="main__timer-item">
                    <span>{timeLeft.hours}</span>
                    <span>{chosenLanguage.hours}</span>
                  </div>
                  <div className="main__timer-item">
                    <span>{timeLeft.minutes}</span>
                    <span>{chosenLanguage.minutes}</span>
                  </div>
                  <div className="main__timer-item">
                    <span>{timeLeft.seconds}</span>
                    <span>{chosenLanguage.seconds}</span>
                  </div>
                </div>
                <p className="main__timer_text">{chosenLanguage.timerText}</p>
              </div>

              <button onClick={handleOpenQuiz} className="main__inner_info-button">{chosenLanguage.buttonText}</button>
            </div>
            <div className="main__inner_image">
              <img src="img/box-image.webp" alt="images" />
            </div>
          </div>

          {isQuizOpen && (
            <QuizModal chosenLanguage={currentLang} onClose={() => setIsQuizOpen(false)} />
          )}

          <div className="main__timer">
            <div className="main__timer-countdown">
              <div className="main__timer-item">
                <span className="main__timer-item-time">{timeLeft.days}</span>
                <span className="main__timer-item-text">{chosenLanguage.days}</span>
              </div>
              <div className="main__timer-item">
                <span>{timeLeft.hours}</span>
                <span>{chosenLanguage.hours}</span>
              </div>
              <div className="main__timer-item">
                <span>{timeLeft.minutes}</span>
                <span>{chosenLanguage.minutes}</span>
              </div>
              <div className="main__timer-item">
                <span>{timeLeft.seconds}</span>
                <span>{chosenLanguage.seconds}</span>
              </div>
            </div>
            <p className="main__timer_text">{chosenLanguage.finishText}</p>
          </div>
        </div>
      </div>


      <Comments currentLang={currentLang} />
    </main>
  );
}