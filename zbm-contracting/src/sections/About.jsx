import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './About.scss';

const IMG1 = '/images/zmb_9.png';

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const h1r = useRef(null);
  const h2r = useRef(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      [h1r, h2r].forEach((el, i) => {
        if (!el.current) return;
        gsap.fromTo(
          el.current,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
            },
          }
        );
      });

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={sectionRef} id="about">
      <div className="about__background" aria-hidden="true">
        <img ref={imgRef} src={IMG1} alt="" />
      </div>

      <div className="about__overlay" aria-hidden="true" />

      <div className="about__inner container">
        <div className="about__content">
          <span className="about__accent" aria-hidden="true" />

          <p className="label about__label">{t.about.label}</p>

          <h2 className="about__heading display-lg">
            {t.about.heading.map((line, i) => (
              <span className="line-mask" key={i}>
                <span ref={i === 0 ? h1r : h2r}>{line}</span>
              </span>
            ))}
          </h2>

          <div className="about__body">
            <p className="body-lg">{t.about.body}</p>
            <p className="body-lg">{t.about.body2}</p>
          </div>

          <div className="about__actions">
            <button
              type="button"
              className="about__btn about__btn--primary"
              onClick={() => scrollToSection('services')}
            >
              Explore Services
            </button>

            <button
              type="button"
              className="about__btn about__btn--outline"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </button>
          </div>

          <div className="about__highlights">
            <div className="about__highlight">
              <span className="about__highlight-num">120+</span>
              <span className="about__highlight-label">Projects Delivered</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-num">12+</span>
              <span className="about__highlight-label">Years Experience</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-num">2</span>
              <span className="about__highlight-label">Core Disciplines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
