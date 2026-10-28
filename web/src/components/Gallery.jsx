import { useRef } from 'react';
import { GALLERY, INSTAGRAM_URL } from '../content.js';
import { gsap, useGSAP } from '../lib/gsap.js';
import { riseHeadings } from '../lib/motion.js';
import { InstagramIcon } from './Icons.jsx';

// Geniş ekranda dikey kaydırma sırayı yana taşır (1:1, sahne tutulur); telefonda parmakla kaydırılan bir sıra.
export default function Gallery() {
  const root = useRef(null);

  useGSAP(() => {
    riseHeadings(root.current);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current.querySelector('.reel__track');
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      root.current.classList.add('is-pinned');
      if (distance() <= 0 || distance() > window.innerHeight * 3) {
        root.current.classList.remove('is-pinned');
        return undefined;
      }
      const move = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current.querySelector('.reel'),
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      // Resimler çerçevelerinin içinde hafifçe kayar (çerçevenin %8'inden az)
      gsap.utils.toArray('.reel__item img', root.current).forEach((img) => {
        gsap.fromTo(img, { xPercent: -4 }, {
          xPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
        });
      });
      return () => root.current?.classList.remove('is-pinned');
    });
  }, { scope: root });

  return (
    <section id="galeri" className="chapter chapter--chalk chapter--gallery" ref={root}>
      <div className="reel">
        <div className="reel__head frame">
          <h2 className="h2" data-rise>Kortlardan kareler</h2>
          <a className="textlink" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={18} /> Daha fazlası @conradtennisclub hesabında
          </a>
        </div>
        <ul className="reel__track">
          {GALLERY.map((g) => (
            <li key={g.src} className="reel__item">
              <div className="reel__frame"><img src={g.src} alt={g.alt} loading="lazy" /></div>
              <p className="reel__caption">{g.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
