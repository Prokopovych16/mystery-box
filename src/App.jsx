import { useEffect, useState } from 'react';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import translations from './api/languages.json';

export const App = () => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    
    // Підтримувані мови
    const supportedLanguages = Object.keys(translations);


    const defaultLanguage = supportedLanguages.includes(browserLanguage.slice(0, 2))
      ? browserLanguage.slice(0, 2)
      : 'en';

    setCurrentLang(defaultLanguage);
  }, []);

  const handleCurrentLanguage = (lang) => {
    setCurrentLang(lang);
  };

  return (
    <div className="App">
      <Header currentLang={currentLang} handleCurrentLanguage={handleCurrentLanguage} />
      <MainPage currentLang={currentLang} />
      <Footer currentLang={currentLang} />
    </div>
  );
};
