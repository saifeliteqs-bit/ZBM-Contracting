import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/projects';
import { siteContent } from '../data/siteContent';
import './Process.scss';

export default function Process() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.process__heading-line',
        { yPercent: 110 },
        {
          yPercent: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const step = processSteps[activeStep];

  return (
    <section className="process" ref={sectionRef} id="process">
      <div className="container">
        <div className="process__top">
          <p className="label text-muted">{siteContent.process.label}</p>
          <h2 className="process__heading display-lg">
            {siteContent.process.heading.map((line, i) => (
              <span className="line-mask" key={i}>
                <span className="process__heading-line">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Step tabs */}
        <div className="process__tabs">
          {processSteps.map((s, i) => (
            <button
              key={i}
              className={`process__tab ${activeStep === i ? 'active' : ''}`}
              onClick={() => setActiveStep(i)}
            >
              <span className="label">{s.number}</span>
              <span className="process__tab-title">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active step content */}
        <div className="process__content">
          <div className="process__left">
            <div className="process__num display-xl">{step.number}</div>
            <h3 className="process__title serif">{step.title}</h3>
            <p className="process__desc body-lg">{step.description}</p>
          </div>
          <div className="process__right">
            <div className="process__img-wrap">
              {processSteps.map((s, i) => (
                <div
                  key={i}
                  className={`process__img-item ${activeStep === i ? 'active' : ''}`}
                >
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
