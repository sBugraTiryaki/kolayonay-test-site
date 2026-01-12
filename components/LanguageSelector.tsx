'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;

    // Save to localStorage for KolayOnay to detect
    localStorage.setItem('kolayonay_lang', newLocale);

    // Get current path without locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

    // Build new URL with existing search params
    const params = searchParams.toString();
    const newPath = `/${newLocale}${pathWithoutLocale}${params ? `?${params}` : ''}`;

    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        Dil:
      </label>
      <select
        id="language-select"
        value={currentLocale}
        onChange={handleChange}
        className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeFlags[locale]} {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
