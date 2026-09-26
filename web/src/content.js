// Sitedeki tüm metinler ve WhatsApp mesajları burada; içerik değişiklikleri için tek yer.

export const WHATSAPP_NUMBER = '905335712858';
export const PHONE_DISPLAY = '+90 533 571 28 58';
export const INSTAGRAM_URL = 'https://www.instagram.com/conradtennisclub/';

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const GENERAL_MESSAGE = 'Merhaba, Conrad Tennis Club hakkında bilgi almak istiyorum.';

export const NAV = [
  { href: '#dersler', label: 'Dersler' },
  { href: '#egitimler', label: 'Eğitimler' },
  { href: '#kiralama', label: 'Kort Kiralama' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#iletisim', label: 'İletişim' },
];

export const LESSONS = [
  {
    icon: 'single',
    title: 'Bireysel ders',
    text: 'Antrenörünüzle birebir, tamamen size odaklı 60 dakika. Teknikte en hızlı ilerleme.',
    tags: ['1 kişi', '60 dk', "8 / 12'li paket"],
    message: 'Merhaba, bireysel özel ders hakkında bilgi almak istiyorum.',
  },
  {
    icon: 'pair',
    title: 'İki kişilik ders',
    text: 'Eşiniz, arkadaşınız ya da çocuğunuzla birlikte. Aynı kortta, aynı antrenörle, oyun keyfi ikiye katlanır.',
    tags: ['2 kişi', '60 dk', "8 / 12'li paket"],
    message: 'Merhaba, iki kişilik ders hakkında bilgi almak istiyorum.',
    featured: true,
  },
  {
    icon: 'group',
    title: 'Grup dersi',
    text: 'Aynı seviyedeki 3–4 oyuncuyla, maç temposunda keyifli antrenman ve yeni oyun arkadaşları.',
    tags: ['3–4 kişi', '90 dk', 'Aylık program'],
    message: 'Merhaba, grup dersleri hakkında bilgi almak istiyorum.',
  },
];

export const PROGRAMS = [
  {
    eyebrow: '4–14 yaş',
    title: 'Çocuk Tenis Akademisi',
    text: 'Mini tenis ile başlayan; koordinasyonu, özgüveni ve oyun sevgisini geliştiren yaş gruplu eğitim.',
    image: '/img/cocuk-mini-tenis.svg',
    alt: 'Mini tenis için koniler ve toplar',
    message: 'Merhaba, Çocuk Tenis Akademisi hakkında bilgi almak istiyorum.',
  },
  {
    eyebrow: '8 hafta',
    title: 'Yetişkin Başlangıç',
    text: 'Hiç oynamamış ya da yıllar sonra kortlara dönenler için temel vuruşlar, oyun kuralları ve ilk maçlar.',
    image: '/img/file-top.svg',
    alt: 'Filenin üzerinden geçen tenis topu',
    message: 'Merhaba, Yetişkin Başlangıç programı hakkında bilgi almak istiyorum.',
  },
  {
    eyebrow: 'Yetişkin & çocuk',
    title: 'Cardio Tenis',
    text: 'Müzik eşliğinde, yüksek tempolu grup antrenmanı. Tenis vuruşlarıyla kardiyo; her seviyeye açık.',
    image: '/img/cardio.svg',
    alt: 'Hızlı hareket eden tenis topu izleri',
    message: 'Merhaba, Cardio Tenis grupları hakkında bilgi almak istiyorum.',
  },
  {
    eyebrow: 'Seviye tespiti ile',
    title: 'Performans & Turnuva',
    text: 'Lisanslı ve turnuva hedefli oyuncular için teknik, taktik ve maç analizi içeren yoğun program.',
    image: '/img/kort-ustten.svg',
    alt: 'Üstten görünen toprak tenis kortu',
    message: 'Merhaba, Performans & Turnuva programı hakkında bilgi almak istiyorum.',
  },
];

export const RENTALS = [
  {
    big: '1',
    unit: 'saat',
    title: 'Saatlik kiralama',
    items: ['60 dakika toprak kort', 'Soyunma odası kullanımı', 'Raket & top kiralama opsiyonel'],
    cta: 'Kort Ayırt',
    message: 'Merhaba, saatlik kort kiralamak istiyorum. Tarih ve saat: ',
  },
  {
    big: '10',
    unit: 'saat',
    title: 'Avantajlı paket',
    items: ['10 × 60 dakika kort kullanımı', 'Öncelikli rezervasyon', 'Dilediğiniz gün ve saatte'],
    cta: 'Paket Bilgisi Al',
    message: 'Merhaba, 10 saatlik kort kiralama paketi hakkında bilgi almak istiyorum.',
    highlight: true,
  },
  {
    big: 'Her',
    unit: 'hafta',
    title: 'Sabit saat üyeliği',
    items: ['Her hafta aynı gün ve saat sizin', 'Aylık 4–5 seans', 'Ek saatlerde öncelik'],
    cta: 'Üyelik Sor',
    message: 'Merhaba, sabit saat kort üyeliği hakkında bilgi almak istiyorum.',
  },
];

export const GALLERY = [
  { src: '/img/kort-perspektif.svg', alt: 'Ağaçlarla çevrili toprak tenis kortu', size: 'tall' },
  { src: '/img/kort-ustten.svg', alt: 'Üstten görünen toprak tenis kortu', size: 'wide' },
  { src: '/img/top-sepeti.svg', alt: 'Tenis topu sepeti' },
  { src: '/img/raket-toplar.svg', alt: 'Toprak kortta raket ve tenis topları' },
  { src: '/img/file-top.svg', alt: 'Filenin üzerinden geçen tenis topu' },
  { src: '/img/cardio.svg', alt: 'Hızlı hareket eden tenis topu izleri', size: 'tall' },
  { src: '/img/cocuk-mini-tenis.svg', alt: 'Mini tenis için koniler ve toplar', size: 'wide' },
];

export const STEPS = [
  { title: 'Seçin', text: 'Özel ders, eğitim programı ya da kort kiralama — size uygun olanı bulun.' },
  { title: "WhatsApp'tan yazın", text: 'Butona dokunun; mesajınız hazır gelir. Gönderin, uygun saatleri paylaşalım.' },
  { title: 'Kortta buluşalım', text: 'Saatiniz onaylanır; raketinizi alın ve gelin.' },
];

export const MARQUEE = ['Özel Ders', 'Çocuk Akademisi', 'Cardio Tenis', 'Kort Kiralama', 'Turnuva Hazırlık'];
