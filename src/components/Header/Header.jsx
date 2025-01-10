import { useState } from 'react';
import './Header.scss';
import translations from '../../api/languages.json';

export const Header = ({ currentLang, handleCurrentLanguage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const chosenLanguage = translations[currentLang];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (lang) => {
    handleCurrentLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__inner_logo">
          <a href='#123'>
            <img className="header__inner_logo_img" src="img/logo.webp" alt="logo" />
          </a>
        </div>

        <div className="language-switcher">
          <div className="current-language" onClick={toggleDropdown}>
            <img 
              className="current-language-flag" 
              src={chosenLanguage.flag} 
              alt={`${chosenLanguage.name} flag`} 
            />
            <img 
              className="current-language-vector" 
              src="img/Vector.svg" 
              alt="vector" 
            />
          </div>
          <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
            {Object.entries(translations).map(([lang, { name, flag }]) => (
              lang !== chosenLanguage && (
                <div key={lang} className="dropdown-item" onClick={() => handleLanguageChange(lang)}>
                  <img src={flag} alt={`${name} flag`} />
                  <span>{name}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}