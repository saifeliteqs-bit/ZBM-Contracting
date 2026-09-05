import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let lenisInstance = null;

export function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      lenisInstance = null;
      return undefined;
    }

    // Smooth for both desktop and touch (better than native jerky feel)
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    lenisInstance = lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(500, 33);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

export function getLenis() {
  return lenisInstance;
}
