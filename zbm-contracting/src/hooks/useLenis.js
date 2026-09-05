import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let lenisInstance = null;

export function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // Native scrolling is smoother and more reliable on touch devices.
    if (reduceMotion || coarsePointer) {
      lenisInstance = null;
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
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
      lenis.off?.('scroll', onScroll);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}

export function getLenis() { return lenisInstance; }
