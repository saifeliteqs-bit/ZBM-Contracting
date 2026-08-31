import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Hero.scss';

const slides = [
  {
    image: '/images/zbm_3.png',
    eyebrow: 'Luxury Villa Renovation',
    heading: ['Building homes', 'worth remembering.'],
    sub: 'From foundation to final finish — we transform villas into refined living environments.',
  },
  {
    image: '/images/zbm_2.png',
    eyebrow: 'Premium Interior Fit-Out',
    heading: ['Interiors that', 'feel like home.'],
    sub: 'Every material, every finish, every detail — thoughtfully composed around the way you live.',
  },
  {
    image: '/images/zbm_10.png',
    eyebrow: 'Pool & Landscaping',
    heading: ['Exteriors that', 'welcome you.'],
    sub: 'Pools, gardens, pergolas and outdoor spaces — designed to make arrival a moment.',
  },
  {
    image: '/images/zbm_20.png',
    eyebrow: 'Commercial Fit-Out',
    heading: ['Spaces that', 'work harder.'],
    sub: 'Offices, restaurants and commercial interiors that reflect your brand and elevate your team.',
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animate on slide change
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero__eyebrow-active', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
    tl.fromTo('.hero__line-active', { yPercent: 115 }, { yPercent: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 0.1);
    tl.fromTo('.hero__sub-active', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.35);
  }, [activeSlide]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to('.hero__content', {
        yPercent: -25, opacity: 0.4, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '55% top', scrub: 1.1 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const current = slides[activeSlide];

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Slide images */}
      {slides.map((slide, i) => (
        <div key={i} className={`hero__slide ${activeSlide === i ? 'active' : ''}`}>
          <img src={slide.image} alt={slide.eyebrow} />
        </div>
      ))}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content container">
        <p key={`e-${activeSlide}`} className="hero__eyebrow hero__eyebrow-active label">
          {current.eyebrow}
        </p>
        <h1 key={`h-${activeSlide}`} className="hero__heading">
          {current.heading.map((line, i) => (
            <span className="line-mask" key={i}>
              <span className="hero__line-active">{line}</span>
            </span>
          ))}
        </h1>
        <p key={`s-${activeSlide}`} className="hero__sub hero__sub-active body-lg">{current.sub}</p>

        <div className="hero__actions">
          <button className="hero__cta"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Services ↘
          </button>
          <button className="hero__cta hero__cta--outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get a Quote
          </button>
        </div>
      </div>

      {/* Slide dots */}
      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${activeSlide === i ? 'active' : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide number */}
      <div className="hero__counter">
        <span className="serif">{String(activeSlide + 1).padStart(2, '0')}</span>
        <span className="label"> / {String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
