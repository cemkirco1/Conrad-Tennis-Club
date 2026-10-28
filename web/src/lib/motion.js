import { gsap, SplitText, EASE_EXPO, MOTION_OK } from './gsap.js';

// Bölüm başlıkları satır satır maskelerinden yükselir (bir kez, görünür alana girerken).
// Yazı tipi yüklenince ya da genişlik değişince SplitText satırları yeniden böler.
export function riseHeadings(scope) {
  gsap.matchMedia().add(MOTION_OK, () => {
    gsap.utils.toArray('[data-rise]', scope).forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 112,
            duration: 0.9,
            ease: EASE_EXPO,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      });
    });
  });
}

// Bir grup öğe okuma sırasıyla gelir: 16–24 px yükselme, 70 ms aralık, bir kez.
export function arrive(targets, trigger, { y = 22, stagger = 0.07, delay = 0.12 } = {}) {
  gsap.matchMedia().add(MOTION_OK, () => {
    gsap.from(targets, {
      y,
      autoAlpha: 0,
      duration: 0.8,
      ease: EASE_EXPO,
      stagger,
      delay,
      scrollTrigger: { trigger, start: 'top 85%', once: true },
    });
  });
}
