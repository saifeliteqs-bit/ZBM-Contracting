import { projects } from '../data/projects';
import './Projects.scss';

export default function Projects() {
  const showcaseProjects = [...projects, ...projects];

  return (
    <section className="projects" id="projects">
      <div className="projects__header container">
        <p className="projects__eyebrow">OUR CRAFTSMANSHIP</p>
        <h2 className="projects__title">Featured Projects</h2>
        <p className="projects__sub">
          A selection of residential and commercial projects delivered across Dubai and the UAE.
        </p>
      </div>

      <div className="projects__showcase" aria-label="Featured projects showcase">
        <div className="projects__track">
          {showcaseProjects.map((proj, index) => (
            <article
              className="project-showcase-card"
              key={`${proj.id}-${index}`}
              aria-hidden={index >= projects.length ? 'true' : undefined}
            >
              <img
                className="project-showcase-card__image"
                src={proj.image}
                alt={index < projects.length ? proj.title : ''}
                loading={index < 4 ? 'eager' : 'lazy'}
              />

              <div className="project-showcase-card__shade" />

              <div className="project-showcase-card__content">
                <span className="project-showcase-card__category">{proj.category}</span>
                <h3 className="project-showcase-card__title">{proj.title}</h3>
                <p className="project-showcase-card__meta">
                  {proj.location} <span>·</span> {proj.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="projects__cta-wrap">
        <a href="#contact" className="projects__cta">START YOUR PROJECT →</a>
      </div>
    </section>
  );
}
