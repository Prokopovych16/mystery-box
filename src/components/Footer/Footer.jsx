import React, { useState } from 'react';
import './Footer.scss';
import translations from '../../api/languages.json';

export const Footer = ({ currentLang }) => {
  const chosenLanguage = translations[currentLang];

  return (
    <footer className="footer">
      <p className="footer__rules">{chosenLanguage.licence}</p>
    </footer>
  );
};
