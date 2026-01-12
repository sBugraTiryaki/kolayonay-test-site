# KolayOnay Banner Test Sitesi - Next.js + Cloudflare

## Amaç
KolayOnay Cookie Management Platform'un banner sisteminin doğru çalışıp çalışmadığını test etmek için bir Next.js test sitesi oluşturmak.

## Test Edilecek Özellikler
- **Dil Algılama**: URL param (`?lang=en`), URL path (`/en`), dropdown (localStorage), browser dili
- **Tema Algılama**: Toggle button ile light/dark mode geçişi
- **Banner Entegrasyonu**: Script embed ve consent akışı

---

## Uygulama Planı

### 1. Next.js Projesi Oluşturma
**Konum**: `/Users/bugratiryaki/Documents/is/kolayonay-test-site`
**Proje İsmi**: `kolayonay-test-site`

```bash
npx create-next-app@latest kolayonay-test-site --typescript --tailwind --app --src-dir
```

**Seçenekler**:
- TypeScript: Evet
- Tailwind CSS: Evet
- App Router: Evet
- src/ dizini: Evet

### 2. Proje Yapısı

```
kolayonay-test-site/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx          # Ana sayfa
│   │   │   └── layout.tsx        # Locale layout
│   │   ├── layout.tsx            # Root layout (banner script burada)
│   │   └── globals.css
│   ├── components/
│   │   ├── ThemeToggle.tsx       # Dark mode toggle
│   │   ├── LanguageSelector.tsx  # Dil seçici dropdown
│   │   └── TestSection.tsx       # Test senaryoları
│   └── lib/
│       └── i18n.ts               # i18n config
├── next.config.js
├── middleware.ts                  # Locale routing
└── wrangler.toml                  # Cloudflare config
```

### 3. i18n Routing (Tüm 6 Dil)

**middleware.ts** - Locale redirect logic:
- Desteklenen diller: `tr`, `en`, `fr`, `ar`, `ru`, `de`
- Default: `tr`
- URL path'e göre locale algılama

**Routing Yapısı**:
- `/` → `/tr` (redirect)
- `/tr` → Türkçe sayfa
- `/en` → İngilizce sayfa
- `/fr?lang=de` → Almanca banner (URL param override)

### 4. Dark Mode Toggle

**ThemeToggle.tsx**:
- `html` element'ine `dark` class'ı ekle/çıkar
- `data-theme` attribute'ü güncelle
- localStorage'a kaydet
- Tailwind CSS dark mode desteği

**tailwind.config.js**:
```js
darkMode: 'class'
```

### 5. KolayOnay Banner Entegrasyonu

**Root Layout (app/layout.tsx)**:
```tsx
<Script
  src="https://verify.kolayonay.com.tr/s/{TOKEN}"
  strategy="afterInteractive"
/>
```

Token, KolayOnay'da yeni oluşturulacak test website'den alınacak.

### 6. Test Sayfası İçeriği

Ana sayfa şunları gösterecek:
1. **Başlık**: "KolayOnay Banner Test Sitesi"
2. **Dil Seçici Dropdown**: 6 dil arası geçiş
3. **Tema Toggle**: Light/Dark mode butonu
4. **Test Senaryoları**:
   - URL param test linki: `?lang=en`
   - Mevcut locale bilgisi
   - Mevcut tema bilgisi
   - localStorage durumu
5. **Dummy İçerik**: Banner'ın sayfa ile nasıl görüneceğini test etmek için

### 7. Cloudflare Pages Deployment

**@cloudflare/next-on-pages** paketi kullanılacak.

**wrangler.toml**:
```toml
name = "kolayonay-test-site"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

**package.json scripts**:
```json
{
  "pages:build": "npx @cloudflare/next-on-pages",
  "pages:deploy": "wrangler pages deploy .vercel/output/static"
}
```

---

## Dosya Detayları

### middleware.ts
- URL path'ten locale algılama
- Locale yoksa browser dilini veya default'u kullan
- `/[locale]/...` formatına redirect

### src/app/[locale]/layout.tsx
- `html` element'ine `lang` attribute'ü ekle
- Dark mode class management
- KolayOnay script embed

### src/app/[locale]/page.tsx
- Test arayüzü
- Dil seçici ve tema toggle
- Debug bilgileri (current locale, theme, localStorage)

### src/components/ThemeToggle.tsx
- Toggle butonu
- `document.documentElement.classList.toggle('dark')`
- `localStorage.setItem('theme', 'dark'|'light')`

### src/components/LanguageSelector.tsx
- Dropdown menü
- Route değiştirme (`router.push(/newLocale)`)
- `localStorage.setItem('kolayonay_lang', locale)`

---

## Deployment Adımları

1. **Proje oluştur** ve bağımlılıkları yükle
2. **Tüm dosyaları** oluştur
3. **Local test**: `npm run dev`
4. **Build**: `npm run pages:build`
5. **Deploy**: `npx wrangler pages deploy`
6. **KolayOnay'da** yeni website oluştur (deployed URL ile)
7. **Token'ı** projeye ekle
8. **Re-deploy** ve test et

---

## Doğrulama Testleri

Deployment sonrası şunları kontrol et:

1. **Banner Görünümü**: Sayfa yüklendiğinde banner çıkıyor mu?
2. **Dil Algılama**:
   - `/tr` → Banner Türkçe
   - `/en` → Banner İngilizce
   - `/en?lang=fr` → Banner Fransızca (param override)
3. **Tema Algılama**:
   - Light mode → Banner light tema
   - Toggle'a tıkla → Banner dark tema'ya geçiyor mu?
4. **Consent Kayıt**: Accept/Reject sonrası floating icon görünüyor mu?
5. **LocalStorage**: `kolayonay_lang` ve consent kayıtları doğru mu?

---

## Kritik Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `middleware.ts` | Locale routing ve redirect |
| `src/app/[locale]/layout.tsx` | Banner script ve tema class'ı |
| `src/app/[locale]/page.tsx` | Test arayüzü |
| `src/components/ThemeToggle.tsx` | Dark mode toggle |
| `wrangler.toml` | Cloudflare Pages config |
