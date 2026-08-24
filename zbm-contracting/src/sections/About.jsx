import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './About.scss';

const IMG1 = 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=90&auto=format&fit=crop';

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const imgInnerRef = useRef(null);
  const h1r = useRef(null);
  const h2r = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      [h1r, h2r].forEach((el, i) => {
        if (!el.current) return;
        gsap.fromTo(el.current, { yPercent: 110 }, {
          yPercent: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          delay: i * 0.12,
        });
      });
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      );
      gsap.fromTo(imgInnerRef.current, { scale: 1.18 }, {
        scale: 1, duration: 2.0, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
      gsap.to(imgInnerRef.current, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={sectionRef} id="about">
      <div className="about__inner container">
        <div className="about__left">
          <p className="label about__label text-muted">{t.about.label}</p>
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

          {/* Stats row instead of small image */}
          <div className="about__highlights">
            <div className="about__highlight">
              <span className="about__highlight-num">120+</span>
              <span className="about__highlight-label label text-muted">Projects Delivered</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-num">12+</span>
              <span className="about__highlight-label label text-muted">Years Experience</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-num">2</span>
              <span className="about__highlight-label label text-muted">Core Disciplines</span>
            </div>
          </div>
        </div>

        <div className="about__right">
          <div className="about__img-wrap" ref={imgRef}>
            <img ref={imgInnerRef} src={IMG1} alt="Premium interior design" />
          </div>
        </div>
      </div>
    </section>
  );
}
