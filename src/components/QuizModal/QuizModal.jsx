import { useState } from 'react';
import questions from '../../api/questions.json'; // JSON з питаннями
import './QuizModal.scss';

export const QuizModal = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleAnswer = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFormOpen(true);
    }
  };

  return (
    <div className="quiz-modal">
      {!isFormOpen ? (
        <div className="quiz-modal__content">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{question.question}</p>
          <div className="quiz-modal__options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-modal__options__option ${
                  selectedOption === option ? 'quiz-modal__options__option--selected' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="quiz-modal__next"
            onClick={handleAnswer}
            disabled={!selectedOption}
          >
            Answer
          </button>
        </div>
      ) : (
        <div className="quiz-modal__form">
          <h2 className="quiz-modal__form_title">Sign up</h2>
          <form className="quiz-modal__form_inner">
            <input placeholder='Robert Kawosaki' type="text" name="name" required />
            <input placeholder='example@gmail.com' type="email" name="email" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <button className="button-close" onClick={onClose}>
      </button>
    </div>
  );
};
