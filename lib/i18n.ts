export const locales = ['tr', 'en', 'fr', 'ar', 'ru', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  ru: 'Русский',
  de: 'Deutsch',
};

export const localeFlags: Record<Locale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
  fr: '🇫🇷',
  ar: '🇸🇦',
  ru: '🇷🇺',
  de: '🇩🇪',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
