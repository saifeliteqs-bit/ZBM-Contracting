import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './WhyZBM.scss';

export default function WhyZBM() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.why__benefit', { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.fromTo('.why__heading-line', { yPercent: 110 }, {
        yPercent: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="why" ref={sectionRef} id="why-zbm">
      <div className="why__inner container">
        <div className="why__left">
          <p className="label text-muted" style={{ marginBottom: 28 }}>Why ZBM</p>
          <h2 className="why__heading display-lg">
            {t.whyZBM.heading.map((line, i) => (
              <span className="line-mask" key={i}>
                <span className="why__heading-line">{line}</span>
              </span>
            ))}
          </h2>
          <p className="body-lg why__body">{t.whyZBM.body}</p>
        </div>
        <div className="why__right">
          <ul className="why__list">
            {t.whyZBM.benefits.map((benefit, i) => (
              <li key={i} className="why__benefit">
                <span className="why__benefit-num label text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="why__benefit-text serif">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
