import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Hero.scss';

const HERO_VIDEO = 'https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_24fps.mp4';
const HERO_FALLBACK = 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2400&q=90&auto=format&fit=crop';

export default function Hero() {
  const { t, isAr } = useLanguage();
  const heroRef    = useRef(null);
  const imgWrapRef = useRef(null);
  const panelRef   = useRef(null);
  const eyebrowRef = useRef(null);
  const h0 = useRef(null);
  const h1 = useRef(null);
  const h2 = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.15 });
      tl.to(panelRef.current, { xPercent: -100, duration: 1.15, ease: 'power4.inOut' });
      tl.fromTo(imgWrapRef.current, { clipPath: 'inset(0 45% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut' }, '-=0.7');
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=1.1');
      [h0, h1, h2].forEach((r, i) => {
        if (!r.current) return;
        tl.fromTo(r.current, { yPercent: 115 }, { yPercent: 0, duration: 0.95, ease: 'power3.out' }, i === 0 ? '-=0.5' : '-=0.72');
      });
      tl.fromTo([subRef.current, ctaRef.current], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' }, '-=0.5');
      gsap.to('.hero__content', {
        yPercent: -25, opacity: 0.4, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '55% top', scrub: 1.1 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero__panel" ref={panelRef} />
      <div className="hero__img-wrap" ref={imgWrapRef}>
        <video className="hero__video" autoPlay muted loop playsInline poster={HERO_FALLBACK}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>
      <div className="hero__content container" style={{ textAlign: isAr ? 'right' : 'left' }}>
        <p ref={eyebrowRef} className="hero__eyebrow label">{t.hero.eyebrow}</p>
        <h1 className="hero__heading display-xl">
          <span className="line-mask"><span ref={h0}>{t.hero.heading[0]}</span></span>
          <span className="line-mask"><span ref={h1}>{t.hero.heading[1]}</span></span>
          <span className="line-mask"><span ref={h2}>{t.hero.heading[2]}</span></span>
        </h1>
        <p ref={subRef} className="hero__sub body-lg">{t.hero.sub}</p>
        <button ref={ctaRef} className="hero__cta"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          {t.hero.cta} {isAr ? '↙' : '↘'}
        </button>
      </div>
      <div className="hero__scroll-hint">
        <span className="label">{isAr ? 'تمرير' : 'Scroll'}</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
