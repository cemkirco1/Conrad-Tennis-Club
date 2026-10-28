# Conrad Tennis Club — tasarım sistemi

Fikir: **kil kortun kendisi sayfanın düzeni ve sahnesi olur.** Renkler kortun malzemesinden, kiralama bölümü kortun ölçekli planı, arka planda iki raket kaydırmaya kilitli bir ralli oynar ve top karşı sahada sekip kil tozu kaldırır.

## Renk

| Rol | Değer | Nerede |
| --- | --- | --- |
| Zemin (çizgi boyası) | `#F3F2ED` | İlk ekran, eğitimler, galeri |
| Mürekkep | `#0F2A21` | Metin, kapanış alanı |
| Yeşil alan (rüzgârlık, çit) | `#173F30` / ton adımı `#1E4B3A` | Dersler, randevu |
| Kil alan | `#B04D2B` | Kort kiralama (tam alan, vurgu değil) |
| Top sarısı (vurgu) | `#D8EC3E` | Yalnızca eylemler ve kapanıştaki ad |

Kil, taste-skill'in "krem + terrakota" yasağına konu olan renktir; burada konunun kendi malzemesi olduğu için tam bir renk alanı olarak kullanıldı, krem zemin yerine soğuk bir çizgi beyazı seçildi.

## Yazı

Tek aile: **Archivo** (değişken; `@fontsource-variable/archivo`, kendi sunucumuzdan). Genişlik ekseniyle ayrışır: başlıklar %106–112 geniş, kapanıştaki ad %62–75 dar. Beş boyut: `--s-xl`, `--s-h2`, `--s-h3`, `--s-body`, `--s-small`.

## Kurallar (taste-skill + impeccable)

- Başlık üstü etiket, 01/02 numaralandırma, italik vurgu kelime, cam efekti, durağan gölge, gradyan yok.
- Düğmeler tam yuvarlak ve düz; ana eylem top sarısı.
- Bölümler sert kesimli renk alanları; ayrım çizgiyle değil ton adımıyla.
- Hareket: GSAP. Yükleme dizisi 1,2 sn içinde biter; başlıklar satır satır maskeden yükselir; kort çizgileri çekilir (imza hareketi); galeri geniş ekranda yana akar. `prefers-reduced-motion` altında hepsi kapanır, içerik bitmiş hâliyle durur.
- 3D: three.js, ayrı parça olarak yüklenir; yalnızca kaydırma ve yeniden boyutlanmada çizilir. İlk ekrandan sonra raketler kenarlara çekilir ve sahne soluklaşır.
