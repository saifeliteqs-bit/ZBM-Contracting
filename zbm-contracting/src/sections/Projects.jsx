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
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
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
          <div>
            <p className="label text-muted">03 — Selected Work</p>
            <h2 className="projects__title">Spaces worth remembering.</h2>
          </div>
          <p className="projects__sub body-lg">
            A selection of residential and commercial projects delivered across
            Dubai and the UAE.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((proj) => (
            <div key={proj.id} className="proj-card">
              <div className="proj-card__img">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <span className="proj-card__year label">{proj.year}</span>
              </div>
              <div className="proj-card__info">
                <span className="proj-card__cat label text-muted">{proj.category}</span>
                <h3 className="proj-card__title serif">{proj.title}</h3>
                <p className="proj-card__loc body-sm text-muted">{proj.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__cta-row">
          <a href="#contact" className="projects__cta">
            Start Your Project ↗
          </a>
        </div>
      </div>
    </section>
  );
}
