import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import './Projects.scss';

function ProjectCard({ project }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef(null);

  const go = (direction) => {
    setActive((current) => (current + direction + project.images.length) % project.images.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((c) => (c + 1) % project.images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <article className="proj-card">
      <div
        className="proj-card__media"
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStart.current == null) return;
          const delta = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
          touchStart.current = null;
        }}
      >
        <div className="proj-card__track" style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
          {project.images.map((image, i) => (
            <div className="proj-card__slide" key={image}>
              <img src={image} alt={`${project.title} view ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <button
          className="proj-card__arrow proj-card__arrow--prev"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label={`Previous image for ${project.title}`}
        >‹</button>
        <button
          className="proj-card__arrow proj-card__arrow--next"
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label={`Next image for ${project.title}`}
        >›</button>

        <div className="proj-card__dots" aria-label={`${project.title} image selector`}>
          {project.images.map((_, i) => (
            <button
              key={i}
              className={i === active ? 'active' : ''}
              onClick={(e) => { e.stopPropagation(); setActive(i); }}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
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
