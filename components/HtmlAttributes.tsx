'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';

interface HtmlAttributesProps {
  locale: Locale;
}

export default function HtmlAttributes({ locale }: HtmlAttributesProps) {
  useEffect(() => {
    // Set lang attribute
    document.documentElement.lang = locale;

    // Set initial theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [locale]);

  return null;
}
