import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#26262C] h-9 rounded-md px-3 font-medium"
    >
      {language === 'en' ? 'FA' : 'EN'}
    </button>
  );
}