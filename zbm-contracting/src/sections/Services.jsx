import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Services.scss';

export default function Services() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services" ref={sectionRef} id="services">
      <div className="container">
        <div className="services__header">
          <p className="label text-muted">02 — Services</p>
          <h2 className="services__title">What we create.</h2>
          <p className="services__sub body-lg">
            From full villa renovations to landscaping and turnkey solutions —
            our 18 core services cover every stage of your project.
          </p>
        </div>

        <div className="services__grid">
          {services.map((svc, i) => (
            <div key={i} className="svc-card">
              <div className="svc-card__img">
                <img src={svc.image} alt={svc.title} loading="lazy" />
                <span className="svc-card__cat label">{svc.category}</span>
              </div>
              <div className="svc-card__body">
                <span className="svc-card__num label text-muted">{svc.number}</span>
                <h3 className="svc-card__title serif">{svc.title}</h3>
                <p className="svc-card__desc body-sm">{svc.description}</p>
                <a href="#contact" className="svc-card__link">Get a Quote →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
