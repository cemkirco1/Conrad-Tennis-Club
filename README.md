# Conrad Tennis Club — Web Sitesi

Dersler, eğitimler ve kort kiralama paketleri için ziyaretçileri WhatsApp'a yönlendiren tanıtım sitesi tasarımı.

- `design/Main.dc.html` — masaüstü ana sayfa (1440 px)
- `design/Mobile.dc.html` — mobil ana sayfa (390 px)
- `design/canvas.json` — Claude Design canvas düzeni

Canlı canvas: https://claude.ai/artifact/QWD8h41D4ZneQabKAGbybf

Tüm butonlar `https://wa.me/905335712858?text=...` bağlantısıyla, pakete özel hazır mesajla WhatsApp'ı açar.
`[FİYAT]`, `[GEÇERLİLİK]` ve çalışma saatleri alanları doldurulmalıdır.

## v2

- `design-v2/Main.dc.html` — yenilenmiş, duyarlı (responsive) tek sayfa; kaydırdıkça arka planda raket topa vurur, fiyat bilgisi yok, Instagram görselleri için yer tutucular.

Canlı canvas (v2): https://claude.ai/artifact/5GKQroo7m1Em9BHZt3Q7cJ

## React sitesi

`web/` klasöründe v2 tasarımının Vite + React ile yazılmış, yayına hazır hali var. Detaylar: [web/README.md](web/README.md)
