import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { siteContent } from '../data/siteContent';
import './Projects.scss';

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Heading
      gsap.fromTo(
        '.projects__heading',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Each project card animates differently
      const cards = sectionRef.current.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        const directions = [
          { clipPath: 'inset(0 0 100% 0)', end: 'inset(0 0 0% 0)' },
          { clipPath: 'inset(0 100% 0 0)', end: 'inset(0 0% 0 0)' },
          { clipPath: 'inset(100% 0 0 0)', end: 'inset(0% 0 0 0)' },
          { clipPath: 'inset(0 0 100% 0)', end: 'inset(0 0 0% 0)' },
          { clipPath: 'inset(0 100% 0 0)', end: 'inset(0 0% 0 0)' },
          { clipPath: 'inset(100% 0 0 0)', end: 'inset(0% 0 0 0)' },
        ];
        const dir = directions[i % directions.length];
        const img = card.querySelector('img');

        gsap.fromTo(
          card,
          { clipPath: dir.clipPath },
          {
            clipPath: dir.end,
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: (i % 3) * 0.12,
          }
        );

        // Parallax
        if (img) {
          gsap.to(img, {
            yPercent: i % 2 === 0 ? -6 : 6,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects" ref={sectionRef} id="projects">
      <div className="container">
        <div className="projects__top">
          <p className="label text-muted">{siteContent.projects.label}</p>
          <div className="line-mask">
            <h2 className="projects__heading display-lg">{siteContent.projects.heading}</h2>
          </div>
        </div>

        <div className="projects__grid">
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className={`project-card project-card--${proj.size} project-card--${proj.ratio}`}
            >
              <div className="project-card__img">
                <img src={proj.image} alt={proj.title} loading="lazy" />
              </div>
              <div className="project-card__info">
                <div>
                  <p className="project-card__title serif">{proj.title}</p>
                  <p className="project-card__loc label text-muted">{proj.location}</p>
                </div>
                <p className="project-card__cat label text-muted">{proj.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
