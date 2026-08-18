import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TransitionBars.scss';

/**
 * Cinematic panel-wipe transition between two sections.
 * Place between sections in JSX. triggerRef = the element to watch.
 */
export default function TransitionBars({ triggerSelector, colors }) {
  const wrapRef = useRef(null);

  const palette = colors || [
    'var(--cream)',
    'var(--taupe)',
    'var(--warm-brown)',
    'var(--black-brown)',
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const bars = wrapRef.current?.querySelectorAll('.tb__bar');
    if (!bars?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bars,
        { xPercent: -105 },
        {
          xPercent: 105,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="tb" ref={wrapRef} aria-hidden="true">
      {palette.map((color, i) => (
        <div
          key={i}
          className="tb__bar"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}
