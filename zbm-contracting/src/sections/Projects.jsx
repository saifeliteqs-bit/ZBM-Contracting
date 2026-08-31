import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import './Projects.scss';

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.1,
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
    <section className="projects" ref={sectionRef} id="projects">
      <div className="container">
        <div className="projects__header">
          <p className="projects__eyebrow">OUR CRAFTSMANSHIP</p>
          <h2 className="projects__title">Featured Projects</h2>
          <p className="projects__sub">
            A selection of residential and commercial projects delivered across Dubai and the UAE.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((proj) => (
            <div key={proj.id} className="proj-card">
              <div className="proj-card__img">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <div className="proj-card__overlay">
                  <span className="proj-card__view">View Project →</span>
                </div>
              </div>
              <div className="proj-card__info">
                <h3 className="proj-card__title">{proj.title}</h3>
                <p className="proj-card__meta">
                  <span>{proj.location}</span>
                  <span className="proj-card__dot">·</span>
                  <span>{proj.year}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__cta-wrap">
          <a href="#contact" className="projects__cta">START YOUR PROJECT →</a>
        </div>
      </div>
    </section>
  );
}
