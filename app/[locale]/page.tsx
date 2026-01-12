import { Suspense } from 'react';
import { isValidLocale, localeNames, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import TestInfo from './TestInfo';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const translations: Record<Locale, { title: string; subtitle: string; testSection: string; currentState: string; testLinks: string }> = {
  tr: {
    title: 'KolayOnay Banner Test Sitesi',
    subtitle: 'Cookie Management Platform test sayfasi',
    testSection: 'Test Senaryolari',
    currentState: 'Mevcut Durum',
    testLinks: 'Test Linkleri',
  },
  en: {
    title: 'KolayOnay Banner Test Site',
    subtitle: 'Cookie Management Platform test page',
    testSection: 'Test Scenarios',
    currentState: 'Current State',
    testLinks: 'Test Links',
  },
  fr: {
    title: 'Site de Test KolayOnay Banner',
    subtitle: 'Page de test de la plateforme de gestion des cookies',
    testSection: 'Scenarios de Test',
    currentState: 'Etat Actuel',
    testLinks: 'Liens de Test',
  },
  ar: {
    title: 'موقع اختبار KolayOnay',
    subtitle: 'صفحة اختبار منصة إدارة ملفات تعريف الارتباط',
    testSection: 'سيناريوهات الاختبار',
    currentState: 'الحالة الحالية',
    testLinks: 'روابط الاختبار',
  },
  ru: {
    title: 'Тестовый сайт KolayOnay Banner',
    subtitle: 'Тестовая страница платформы управления cookies',
    testSection: 'Тестовые сценарии',
    currentState: 'Текущее состояние',
    testLinks: 'Тестовые ссылки',
  },
  de: {
    title: 'KolayOnay Banner Testseite',
    subtitle: 'Cookie Management Platform Testseite',
    testSection: 'Testszenarien',
    currentState: 'Aktueller Zustand',
    testLinks: 'Testlinks',
  },
};

export default async function LocalePage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = translations[locale];
  const langParam = typeof resolvedSearchParams.lang === 'string' ? resolvedSearchParams.lang : null;

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
        <p className="text-lg opacity-70">{t.subtitle}</p>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageSelector currentLocale={locale} />
        </Suspense>
        <ThemeToggle />
      </div>

      <section className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t.currentState}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--card-border)]">
            <span className="text-sm opacity-70">URL Locale:</span>
            <p className="font-mono text-lg">{locale} ({localeNames[locale]})</p>
          </div>
          {langParam && (
            <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--card-border)]">
              <span className="text-sm opacity-70">URL ?lang param:</span>
              <p className="font-mono text-lg">{langParam}</p>
            </div>
          )}
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <TestInfo />
          </Suspense>
        </div>
      </section>

      <section className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t.testLinks}</h2>
        <div className="flex flex-wrap gap-2">
          <a href={`/${locale}?lang=tr`} className="btn text-sm">?lang=tr</a>
          <a href={`/${locale}?lang=en`} className="btn text-sm">?lang=en</a>
          <a href={`/${locale}?lang=fr`} className="btn text-sm">?lang=fr</a>
          <a href={`/${locale}?lang=ar`} className="btn text-sm">?lang=ar</a>
          <a href={`/${locale}?lang=ru`} className="btn text-sm">?lang=ru</a>
          <a href={`/${locale}?lang=de`} className="btn text-sm">?lang=de</a>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <a href="/tr" className="btn text-sm">/tr</a>
          <a href="/en" className="btn text-sm">/en</a>
          <a href="/fr" className="btn text-sm">/fr</a>
          <a href="/ar" className="btn text-sm">/ar</a>
          <a href="/ru" className="btn text-sm">/ru</a>
          <a href="/de" className="btn text-sm">/de</a>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-4">{t.testSection}</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ul className="space-y-2 list-disc list-inside">
            <li>Banner gorunumu: Sayfa yuklendiginde banner cikiyor mu?</li>
            <li>Dil algilama: URL path veya ?lang parametresine gore banner dili degisiyor mu?</li>
            <li>Tema algilama: Dark/Light toggle ile banner temasi degisiyor mu?</li>
            <li>Consent kayit: Accept/Reject sonrasi floating icon gorunuyor mu?</li>
            <li>localStorage: kolayonay_lang ve consent kayitlari dogru mu?</li>
          </ul>
        </div>
      </section>

      <footer className="mt-12 text-center text-sm opacity-50">
        <p>KolayOnay Cookie Management Platform - Test Site</p>
      </footer>
    </main>
  );
}
