import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/projects';
import './Process.scss';

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.proc-step',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.12,
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
    <section className="proc" ref={sectionRef} id="process">
      <div className="container">
        <div className="proc__header">
          <p className="proc__eyebrow">HOW WE WORK</p>
          <h2 className="proc__title">
            From first idea to <span className="accent">final detail</span>.
          </h2>
          <p className="proc__sub">
            A streamlined 4-step process that keeps you informed and in control at every stage.
          </p>
        </div>

        <div className="proc__grid">
          {processSteps.map((step, i) => (
            <div key={i} className="proc-step">
              <div className="proc-step__num">{step.number}</div>
              <div className="proc-step__line" />
              <h3 className="proc-step__title">{step.title}</h3>
              <p className="proc-step__desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
