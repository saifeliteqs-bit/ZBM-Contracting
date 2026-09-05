import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenis';
import './Hero.scss';

const slides = [
  {
    image: '/images/hero/hero-01.webp',
    eyebrow: 'Interior · Exterior · Architecture',
    heading: ['Spaces shaped', 'around the way', 'you live.'],
    sub: 'ZBM creates refined interior and exterior environments through thoughtful design, execution and craftsmanship.',
  },
  {
    image: '/images/hero/hero-02.webp',
    eyebrow: 'Interior Design · Fit-Out',
    heading: ['Interiors made', 'for the way', 'you live.'],
    sub: 'Thoughtful layouts, refined materials and precise execution come together in spaces that feel effortless.',
  },
  {
    image: '/images/hero/hero-03.webp',
    eyebrow: 'Exterior · Pool · Landscape',
    heading: ['Exteriors that', 'welcome you', 'home.'],
    sub: 'Pools, gardens and outdoor architecture designed as a natural extension of the spaces within.',
  },
  {
    image: '/images/hero/hero-04.webp',
    eyebrow: 'Commercial · Fit-Out',
    heading: ['Spaces designed', 'to work', 'beautifully.'],
    sub: 'Commercial interiors shaped around brand, performance and a memorable everyday experience.',
  },
];

function scrollTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.05 });
  else target.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const heroRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const tl = gsap.timeline();
    tl.fromTo(root.querySelector('.hero__eyebrow-active'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0)
      .fromTo(root.querySelectorAll('.hero__line-active'), { yPercent: 115 }, { yPercent: 0, duration: 0.78, stagger: 0.08, ease: 'power3.out' }, 0.08)
      .fromTo(root.querySelector('.hero__sub-active'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.32);
    return () => tl.kill();
  }, [activeSlide]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 769px)', () => {
        gsap.to('.hero__content', {
          yPercent: -16,
          opacity: 0.72,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '70% top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const current = slides[activeSlide];

  return (
    <section className="hero" ref={heroRef} id="hero">
      {slides.map((slide, i) => (
        <div key={slide.image} className={`hero__slide ${activeSlide === i ? 'active' : ''}`}>
          <img src={slide.image} alt={slide.eyebrow} fetchPriority={i === 0 ? 'high' : 'auto'} />
        </div>
      ))}
      <div className="hero__overlay" />

      <div className="hero__content container">
        <p key={`e-${activeSlide}`} className="hero__eyebrow hero__eyebrow-active label">{current.eyebrow}</p>
        <h1 key={`h-${activeSlide}`} className="hero__heading">
          {current.heading.map((line, i) => (
            <span className="line-mask" key={i}><span className="hero__line-active">{line}</span></span>
          ))}
        </h1>
        <p key={`s-${activeSlide}`} className="hero__sub hero__sub-active body-lg">{current.sub}</p>
        <div className="hero__actions">
          <button className="hero__cta" onClick={() => scrollTo('projects')}>Explore Projects →</button>
          <button className="hero__cta hero__cta--outline" onClick={() => scrollTo('contact')}>Get a Quote</button>
        </div>
      </div>

      <div className="hero__dots" aria-label="Hero slides">
        {slides.map((_, i) => (
          <button key={i} className={`hero__dot ${activeSlide === i ? 'active' : ''}`} onClick={() => setActiveSlide(i)} aria-label={`Show slide ${i + 1}`} />
        ))}
      </div>

      <div className="hero__counter" aria-hidden="true">
        <span className="serif">{String(activeSlide + 1).padStart(2, '0')}</span>
        <span className="label"> / {String(slides.length).padStart(2, '0')}</span>
      </div>

      <button className="hero__scroll" onClick={() => scrollTo('about')} aria-label="Scroll to About section">
        <span>Scroll</span><span className="hero__scroll-line" /><span>↓</span>
      </button>
    </section>
  );
}
