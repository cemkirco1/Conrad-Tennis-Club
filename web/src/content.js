// Sitedeki tüm metinler, seçenekler ve WhatsApp mesajları burada; içerik değişiklikleri için tek yer.

export const WHATSAPP_NUMBER = '905335712858';
export const PHONE_DISPLAY = '+90 533 571 28 58';
export const INSTAGRAM_URL = 'https://www.instagram.com/conradtennisclub/';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Conrad+Istanbul+Bosphorus';

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const GENERAL_MESSAGE = 'Merhaba, Conrad Tennis Club hakkında bilgi almak istiyorum.';

export const NAV = [
  { href: '#dersler', label: 'Dersler' },
  { href: '#egitimler', label: 'Eğitimler' },
  { href: '#kiralama', label: 'Kort kiralama' },
  { href: '#mesaj', label: 'Randevu' },
];

export const LESSONS = [
  {
    title: 'Bireysel ders',
    text: 'Antrenörünüzle birebir, tamamen size odaklı bir saat. Teknikte en hızlı ilerleme.',
    facts: ['1 kişi', '60 dakika', "8 ya da 12'li paket"],
    message: 'Merhaba, bireysel özel ders hakkında bilgi almak istiyorum.',
  },
  {
    title: 'İki kişilik ders',
    text: 'Eşiniz, arkadaşınız ya da çocuğunuzla aynı kortta, aynı antrenörle. En çok tercih edilen ders.',
    facts: ['2 kişi', '60 dakika', "8 ya da 12'li paket"],
    message: 'Merhaba, iki kişilik ders hakkında bilgi almak istiyorum.',
  },
  {
    title: 'Grup dersi',
    text: 'Aynı seviyedeki üç ya da dört oyuncuyla, maç temposunda antrenman ve yeni oyun arkadaşları.',
    facts: ['3–4 kişi', '90 dakika', 'Aylık program'],
    message: 'Merhaba, grup dersleri hakkında bilgi almak istiyorum.',
  },
];

export const PROGRAMS = [
  {
    title: 'Çocuk Tenis Akademisi',
    who: '4–14 yaş',
    text: 'Mini tenis ile başlayan; koordinasyonu, özgüveni ve oyun sevgisini geliştiren yaş gruplu eğitim. Hafta içi akşam ve hafta sonu sabah grupları.',
    image: '/img/cocuk-mini-tenis.svg',
    alt: 'Toprak kortta mini tenis konileri ve renkli toplar',
    message: 'Merhaba, Çocuk Tenis Akademisi hakkında bilgi almak istiyorum.',
  },
  {
    title: 'Yetişkin Başlangıç',
    who: '8 hafta',
    text: 'Hiç oynamamış ya da yıllar sonra kortlara dönenler için temel vuruşlar, oyun kuralları ve ilk maçlar.',
    image: '/img/file-top.svg',
    alt: 'Filenin üzerinden geçen tenis topu',
    message: 'Merhaba, Yetişkin Başlangıç programı hakkında bilgi almak istiyorum.',
  },
  {
    title: 'Cardio Tenis',
    who: 'Yetişkin ve çocuk grupları',
    text: 'Müzik eşliğinde, yüksek tempolu grup antrenmanı. Tenis vuruşlarıyla kardiyo; her seviyeye açık.',
    image: '/img/cardio.svg',
    alt: 'Kortta hızla süzülen tenis topunun izleri',
    message: 'Merhaba, Cardio Tenis grupları hakkında bilgi almak istiyorum.',
  },
  {
    title: 'Performans ve turnuva',
    who: 'Seviye tespitiyle',
    text: 'Lisanslı ve turnuva hedefli oyuncular için teknik, taktik ve maç analizi içeren yoğun program.',
    image: '/img/kort-ustten.svg',
    alt: 'Üstten görünen toprak tenis kortu',
    message: 'Merhaba, Performans ve turnuva programı hakkında bilgi almak istiyorum.',
  },
];

export const RENTALS = [
  {
    area: 'single',
    title: 'Saatlik kiralama',
    lead: 'Bir saat, bir kort',
    items: ['60 dakika toprak kort', 'Soyunma odası', 'İsterseniz raket ve top'],
    cta: 'Kort ayırt',
    message: 'Merhaba, saatlik kort kiralamak istiyorum. Tarih ve saat: ',
  },
  {
    area: 'pack',
    title: '10 saatlik paket',
    lead: 'Dilediğiniz gün ve saatte',
    items: ['10 × 60 dakika kort', 'Öncelikli rezervasyon', 'Partnerinizle ya da arkadaş grubunuzla'],
    cta: 'Paketi sor',
    message: 'Merhaba, 10 saatlik kort kiralama paketi hakkında bilgi almak istiyorum.',
  },
  {
    area: 'member',
    title: 'Sabit saat üyeliği',
    lead: 'Her hafta aynı gün, aynı saat',
    items: ['Ayda 4–5 seans', 'Ek saatlerde öncelik'],
    cta: 'Üyeliği sor',
    message: 'Merhaba, sabit saat kort üyeliği hakkında bilgi almak istiyorum.',
  },
];

export const GALLERY = [
  { src: '/img/kort-perspektif.svg', alt: 'Ağaçlarla çevrili toprak tenis kortu', caption: 'Ağaçların arasında kort' },
  { src: '/img/raket-toplar.svg', alt: 'Toprak kortta raket ve tenis topları', caption: 'Ders arası' },
  { src: '/img/kort-ustten.svg', alt: 'Üstten görünen toprak tenis kortu', caption: 'Kortun planı' },
  { src: '/img/top-sepeti.svg', alt: 'Tenis topu sepeti', caption: 'Antrenman sepeti' },
  { src: '/img/file-top.svg', alt: 'Filenin üzerinden geçen tenis topu', caption: 'Fileden geçiş' },
  { src: '/img/cocuk-mini-tenis.svg', alt: 'Mini tenis konileri ve toplar', caption: 'Çocuk grubu kurulumu' },
  { src: '/img/cardio.svg', alt: 'Hızla süzülen tenis topunun izleri', caption: 'Cardio tenis' },
];

export const MARQUEE = ['Özel ders', 'Çocuk akademisi', 'Cardio tenis', 'Kort kiralama', 'Turnuva hazırlığı'];

// Randevu mesajı oluşturucu
export const COMPOSER = {
  kinds: [
    {
      id: 'ders',
      label: 'Özel ders',
      options: ['Bireysel ders', 'İki kişilik ders', 'Grup dersi'],
      sentence: (o) => `Conrad Tennis Club'da ${o.toLocaleLowerCase('tr-TR')} almak istiyorum.`,
    },
    {
      id: 'egitim',
      label: 'Eğitim programı',
      options: ['Çocuk Tenis Akademisi', 'Yetişkin Başlangıç', 'Cardio Tenis', 'Performans ve turnuva'],
      sentence: (o) => `Conrad Tennis Club'daki ${o} için kayıt yaptırmak istiyorum.`,
    },
    {
      id: 'kort',
      label: 'Kort kiralama',
      options: ['Saatlik kiralama', '10 saatlik paket', 'Sabit saat üyeliği'],
      sentence: (o) =>
        o === 'Saatlik kiralama'
          ? "Conrad Tennis Club'da saatlik kort kiralamak istiyorum."
          : `Conrad Tennis Club'ın ${o.toLocaleLowerCase('tr-TR')} seçeneği hakkında bilgi almak istiyorum.`,
    },
  ],
  times: ['Hafta içi sabah', 'Hafta içi akşam', 'Hafta sonu', 'Fark etmez'],
};

export function composeMessage({ kind, option, time, name }) {
  const k = COMPOSER.kinds.find((x) => x.id === kind) ?? COMPOSER.kinds[0];
  const greeting = name?.trim() ? `Merhaba, ben ${name.trim()}.` : 'Merhaba.';
  const when = time === 'Fark etmez' ? 'Gün ve saat konusunda esneğim.' : `${time} benim için uygun.`;
  return `${greeting} ${k.sentence(option)} ${when} Müsaitlik bilgisi alabilir miyim?`;
}
