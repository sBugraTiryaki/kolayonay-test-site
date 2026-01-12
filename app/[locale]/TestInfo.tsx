'use client';

import { useEffect, useState } from 'react';

export default function TestInfo() {
  const [theme, setTheme] = useState<string>('loading...');
  const [storedLang, setStoredLang] = useState<string>('loading...');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'system';
    setTheme(currentTheme);

    const lang = localStorage.getItem('kolayonay_lang') || 'not set';
    setStoredLang(lang);

    // Listen for storage changes
    const handleStorage = () => {
      setTheme(localStorage.getItem('theme') || 'system');
      setStoredLang(localStorage.getItem('kolayonay_lang') || 'not set');
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <>
      <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--card-border)]">
        <span className="text-sm opacity-70">Theme:</span>
        <p className="font-mono text-lg">{theme}</p>
      </div>
      <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--card-border)]">
        <span className="text-sm opacity-70">localStorage kolayonay_lang:</span>
        <p className="font-mono text-lg">{storedLang}</p>
      </div>
    </>
  );
}
