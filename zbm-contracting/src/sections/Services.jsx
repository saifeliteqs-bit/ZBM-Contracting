import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';
import { Link } from 'react-router-dom';
import './Services.scss';

export default function Services() {
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
            start: 'top 80%',
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
          <p className="services__eyebrow">OUR SERVICES</p>
          <h2 className="services__title">
            Comprehensive <span className="accent">Construction</span> Solutions
          </h2>
        </div>

        <div className="services__grid">
          {services.map((svc, i) => (
            <div key={i} className="svc-card" id={`service-${svc.number}`}>
              <div className="svc-card__img">
                <img src={svc.image} alt={svc.title} loading="lazy" />
              </div>
              <div className="svc-card__body">
                <h3 className="svc-card__title">{svc.title}</h3>
                <p className="svc-card__desc">{svc.description}</p>
                {svc.number === '01' ? (
                  <Link to="/services/full-villa-renovation" className="svc-card__link">READ MORE →</Link>
                ) : (
                  <a href="#contact" className="svc-card__link">READ MORE →</a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="services__cta-wrap">
          <a href="#contact" className="services__cta">VIEW ALL SERVICES →</a>
        </div>
      </div>
    </section>
  );
}
