import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import './Projects.scss';

function ProjectCard({ project }) {
  return (
    <article className="proj-card">
      <div className="proj-card__media">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>
      <div className="proj-card__info">
        <h3 className="proj-card__title">{project.title}</h3>
        <p className="proj-card__meta">{project.descriptor}</p>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-card',
        { opacity: 0, y: 34 },
        {
          opacity: 1, y: 0,
          duration: 0.65,
          stagger: 0.055,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
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
          <h2 className="projects__title">
            Featured <span className="accent">Projects</span>
          </h2>
          <p className="projects__sub">
            A curated showcase across every ZBM service — one dedicated project for each of our 18 core capabilities.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>

        <div className="projects__cta-wrap">
          <a href="#contact" className="projects__cta">START YOUR PROJECT →</a>
        </div>
      </div>
    </section>
  );
}
