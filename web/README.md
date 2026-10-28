# Conrad Tennis Club — React sitesi

Vite + React ile yazılmış tek sayfalık site. Tüm butonlar pakete özel hazır mesajla WhatsApp'ı açar.

## Çalıştırma

```bash
cd web
npm install
npm run dev       # geliştirme: http://localhost:5173
npm run build     # yayın için dist/ klasörü
npm run preview   # build'i yerelde önizle
```

`dist/` klasörü herhangi bir statik hostinge (Netlify, Vercel, GitHub Pages, cPanel) yüklenebilir.

## Kütüphaneler

- **GSAP** (`gsap`, `@gsap/react`): ScrollTrigger ve SplitText ile kaydırma hareketleri. Ayarlar `src/lib/gsap.js` ve `src/lib/motion.js` içinde.
- **three.js** (`three`): arka plandaki 3D raketler, top ve kil tozu — `src/three/rally.js`. Ayrı bir parça olarak yüklenir, ilk ekranı bekletmez. WebGL yoksa sayfa sahnesiz çalışır.
- **Archivo** (`@fontsource-variable/archivo`): yazı tipi kendi sunucumuzdan gelir.

## İçerik nerede?

- `src/content.js` — WhatsApp numarası, telefon, Instagram, ders/eğitim/kiralama metinleri, randevu mesajı seçenekleri ve hazır mesajlar.
- `public/img/` — görseller (şimdilik temsilî çizimler; gerçek fotoğrafları buraya koyup `content.js` içindeki yolları güncelleyin).
- `src/three/rally.js` — `RALLY_PX` bir gidiş-dönüşün kaydırma mesafesi, `PHASE` sayfa açıldığında topun yeri.
- `src/styles.css` — renk ve yazı tokenları (`:root`), mobil uyum. Tasarım kararları: repo kökündeki `DESIGN.md`.
