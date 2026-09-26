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

## İçerik nerede?

- `src/content.js` — WhatsApp numarası, telefon, Instagram, tüm ders/eğitim/kiralama kartları ve hazır WhatsApp mesajları.
- `public/img/` — görseller (şimdilik dummy illüstrasyonlar; gerçek fotoğrafları buraya koyup `content.js` ve `Hero.jsx` içindeki yolları güncelleyin).
- `src/components/RallyBackground.jsx` — kaydırdıkça topa vuran iki raketlik arka plan animasyonu (`RALLY_PX` ile hızı ayarlanır).
- `src/styles.css` — renkler (`:root` değişkenleri) ve mobil uyum.
