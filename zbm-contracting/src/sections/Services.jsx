import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';
import { siteContent } from '../data/siteContent';
import './Services.scss';

export default function Services() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const imgRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Show first image immediately
      if (imgRefs.current[0]) {
        gsap.set(imgRefs.current[0], { opacity: 1, clipPath: 'inset(0% 0 0 0)' });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleServiceClick = (idx) => {
    setActiveIdx(idx);
    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      if (i === idx) {
        gsap.to(img, { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'power3.out' });
      } else {
        gsap.to(img, { opacity: 0, duration: 0.3 });
      }
    });
  };

  return (
    <section className="services" ref={sectionRef} id="services">
      <div className="container">
        {/* Header */}
        <div className="services__header">
          <p className="label text-muted">{siteContent.services.label}</p>
          <div className="services__header-row">
            <h2 className="display-lg">{siteContent.services.heading}</h2>
            <p className="services__sub body-lg">{siteContent.services.subheading}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="services__content">
          {/* Left: service list */}
          <div className="services__list">
            {services.map((svc, i) => (
              <div
                key={i}
                className={`service-item ${activeIdx === i ? 'active' : ''}`}
                onClick={() => handleServiceClick(i)}
              >
                <span className="service-item__num label">{svc.number}</span>
                <span className="service-item__title">{svc.title}</span>
                <span className="service-item__arrow">↗</span>
                <div className="service-item__line" />
              </div>
            ))}
          </div>

          {/* Right: image stack */}
          <div className="services__images">
            {services.map((svc, i) => (
              <div
                key={i}
                className="services__img-item"
                ref={(el) => (imgRefs.current[i] = el)}
                style={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              >
                <img src={svc.image} alt={svc.title} loading="lazy" />
                <div className="services__img-desc">
                  <p className="label text-cream">{svc.category}</p>
                  <p className="services__img-body body-sm text-cream">{svc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
