import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Hareket tokenları (taste-skill motion.md): expo-out uzun girişler, quint-out kısa arayüz hareketleri.
export const EASE_EXPO = 'expo.out';
export const EASE_OUT = 'power4.out';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, SplitText, useGSAP };
