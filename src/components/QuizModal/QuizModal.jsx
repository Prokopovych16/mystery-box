import { useEffect, useState } from 'react';
import questions from '../../api/questions.json'; // JSON з питаннями
import './QuizModal.scss';
import translations from '../../api/languages.json';

export const QuizModal = ({ chosenLanguage, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const language = translations[chosenLanguage];

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
        newErrors.name = language.errorName;
      }

      // прізвище: мінімум 2, максимум 25 символів
      if (surname.length < 2 || surname.length > 25) {
        newErrors.surname = language.errorSurName;
      }

      // пошта: паттерн на email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        newErrors.email = language.errorEmail;
      }

      // телефон: мінімум 6, максимум 15 символів
      if (phone.length < 6 || phone.length > 15) {
        newErrors.phone = language.errorPhone;
      }

      setErrors(newErrors);

      // перевірка чи є помилки
      return !Object.values(newErrors).some((error) => error !== '');
    };

    if (isFormTouched) {
      const isValid = validateForm();
      setIsFormValid(isValid);
    }
  }, [name, surname, email, phone, isFormTouched, language.errorName, language.errorSurName, language.errorEmail, language.errorPhone]);

  const question = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    setResponses((prevResponses) => ({
      ...prevResponses,
      [question.question['en']]: option,
    }));

    if (currentQuestionIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }, 200);
    } else {
      setIsFormOpen(true);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isFormValid) {
      const data = {
        name,
        surname,
        email,
        phone,
        answers: JSON.stringify(responses), 
      };
  
      try {
        // link для php
        const response = await fetch('http://localhost:8888/mystery-box/public/data_proccesing.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data),
        });
  
        if (response.ok) {
          const result = await response.text();
          console.log('Відповідь сервера:', result);
          alert(`PHP відповів: ${result}`);
        } else {
          console.error('Помилка при відправці даних:', response.statusText);
          alert('Помилка на сервері!');
        }
      } catch (error) {
        console.error('Помилка мережі:', error);
        alert('Не вдалося зв’язатися із сервером!');
      }
      
      setName('');
      setSurname('');
      setEmail('');
      setPhone('');
      setResponses({});
      onClose();
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIsFormTouched(true);

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'surname':
        setSurname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };


  return (
    <div 
      className="quiz-modal"
      onClick={(e) => {
        // Перевіряємо, чи натискання відбулося поза quiz-modal__content або quiz-modal__form
        if (!e.target.closest('.quiz-modal__content') && !e.target.closest('.quiz-modal__form')) {
          onClose();
        }
      }}
    >
      {!isFormOpen ? (
        <div className="quiz-modal__content">
        <h2>{question.question[chosenLanguage]}</h2>
        <div className="quiz-modal__options">
          {question.options[chosenLanguage].map((option, index) => (
            <button
              key={index}
              className={`quiz-modal__options__option ${
                selectedOption === option
                  ? 'quiz-modal__options__option--selected'
                  : ''
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
          <h2 className="quiz-modal__form_title">{language.sign}</h2>
          <form className="quiz-modal__form_inner" onSubmit={handleSubmit}>
            <div className="quiz-modal__form_group">
              <label htmlFor="name">{language.fName}</label>
              <input
                value={name}
                onChange={handleInputChange}
                placeholder="Robert"
                type="text"
                name="name"
                id="name"
                className={`quiz-modal__form_group_input ${errors.name ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="quiz-modal__form_group">
              <label htmlFor="surname">{language.lName}</label>
              <input
                value={surname}
                onChange={handleInputChange}
                placeholder="Kawosaki"
                type="text"
                name="surname"
                id="surname"
                className={`quiz-modal__form_group_input ${errors.surname ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
            <div className="quiz-modal__form_group">
              <label htmlFor="email">{language.email}</label>
              <input
                value={email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                type="email"
                name="email"
                id="email"
                className={`quiz-modal__form_group_input ${errors.email ? 'quiz-modal__form_group_input-error' : ''}`}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="quiz-modal__form_group">
              <label htmlFor="phone">{language.phone}</label>
              <input
                value={phone}
                onChange={handleInputChange}
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
              {language.submit}
            </button>
          </form>
        </div>
      )}
      <button className="button-close" onClick={onClose}></button>
    </div>
  );
};