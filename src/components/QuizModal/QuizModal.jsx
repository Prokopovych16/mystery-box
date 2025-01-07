import { useEffect, useState } from 'react';
import questions from '../../api/questions.json'; // JSON з питаннями
import './QuizModal.scss';

export const QuizModal = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [responses, setResponses] = useState({});

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {
        name: '',
        surname: '',
        email: '',
        phone: '',
      };
  
      // ім'я: мінімум 2, максимум 25 символів
      if (name.length < 2 || name.length > 25) {
        newErrors.name = 'Name must be between 2 and 25 characters.';
      }
  
      // прізвище: мінімум 2, максимум 25 символів
      if (surname.length < 2 || surname.length > 25) {
        newErrors.surname = 'Surname must be between 2 and 25 characters.';
      }
  
      // пошта: паттерн на email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        newErrors.email = 'Enter a valid email address.';
      }
  
      // телефон: мінімум 6, максимум 15 символів
      if (phone.length < 6 || phone.length > 15) {
        newErrors.phone = 'Phone number must be between 6 and 15 characters.';
      }
  
      setErrors(newErrors);
  
      // перевірка чи є помилки
      return !Object.values(newErrors).some((error) => error !== '');
    };
  
    const isValid = validateForm();
    setIsFormValid(isValid);
  }, [name, surname, email, phone]);
  

  const question = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    setResponses({
      ...responses,
      [question.question]: option,
    });

    if (currentQuestionIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }, 200);
    } else {
      setIsFormOpen(true);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isFormValid) {
      console.log('Form submitted:', { name, surname, email, phone, responses });

      setName('');
      setSurname('');
      setEmail('');
      setPhone('');
      setResponses({});
    }
  };
  
  return (
    <div className="quiz-modal">
      {!isFormOpen ? (
        <div className="quiz-modal__content">
          <h2>{question.question}</h2>
          <div className="quiz-modal__options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-modal__options__option ${selectedOption === option ? 'quiz-modal__options__option--selected' : ''
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-modal__form">
          <h2 className="quiz-modal__form_title">Sign up</h2>
          <form className="quiz-modal__form_inner" onSubmit={handleSubmit}>
            <div className="quiz-modal__form_group">
              <label htmlFor="name">First Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Robert"
                type="text"
                name="name"
                id="name"
                className={`quiz-modal__form_group_input ${errors.name ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="quiz-modal__form_group">
              <label htmlFor="surname">Last Name</label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Kawosaki"
                type="text"
                name="surname"
                id="surname"
                className={`quiz-modal__form_group_input ${errors.surname ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
            <div className="quiz-modal__form_group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                type="email"
                name="email"
                id="email"
                className={`quiz-modal__form_group_input ${errors.email ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="quiz-modal__form_group">
              <label htmlFor="phone">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (234) 567-8901"
                type="tel"
                name="phone"
                id="phone"
                className={`quiz-modal__form_group_input ${errors.phone ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <button
              type="submit"
              className={`quiz-modal__form-button ${isFormValid ? 'quiz-modal__form-button-active' : 'quiz-modal__form-button-disabled'
                }`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <button className="button-close" onClick={onClose}></button>
    </div>
  );
};