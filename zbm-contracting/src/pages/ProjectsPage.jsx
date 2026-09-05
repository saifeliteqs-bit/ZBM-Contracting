import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsPage.scss";

const HERO_IMG = "/images/hero-03.webp";

const categories = ["All", "Residential", "Commercial", "Exterior", "Technical"];

const allProjects = [
  {
    id: 1,
    title: "Modern Villa Transformation",
    category: "Residential",
    location: "Emirates Hills, Dubai",
    scope: "Full villa renovation including structural modifications, interior fit-out, landscaping and pool construction.",
    image: "/images/project-01-1.webp",
    gallery: ["/images/project-01-1.webp", "/images/project-01-2.webp", "/images/project-01-3.webp", "/images/project-01-4.webp"],
  },
  {
    id: 2,
    title: "Refined Living Interior",
    category: "Residential",
    location: "Palm Jumeirah, Dubai",
    scope: "Complete interior redesign with custom joinery, lighting design and premium material selection.",
    image: "/images/project-02-1.webp",
    gallery: ["/images/project-02-1.webp", "/images/project-02-2.webp", "/images/project-02-3.webp", "/images/project-02-4.webp"],
  },
  {
    id: 3,
    title: "Contemporary Kitchen",
    category: "Residential",
    location: "Jumeirah Golf Estates, Dubai",
    scope: "Bespoke kitchen renovation with imported stone countertops, custom cabinetry and integrated appliances.",
    image: "/images/project-03-1.webp",
    gallery: ["/images/project-03-1.webp", "/images/project-03-2.webp", "/images/project-03-3.webp", "/images/project-03-4.webp"],
  },
  {
    id: 4,
    title: "Spa-Inspired Bathroom",
    category: "Residential",
    location: "Dubai Hills Estate",
    scope: "Luxury bathroom renovation with freestanding tub, rain shower system and heated marble flooring.",
    image: "/images/project-04-1.webp",
    gallery: ["/images/project-04-1.webp", "/images/project-04-2.webp", "/images/project-04-3.webp", "/images/project-04-4.webp"],
  },
  {
    id: 5,
    title: "Executive Office Interior",
    category: "Commercial",
    location: "Business Bay, Dubai",
    scope: "Full commercial fit-out for a 4,500 sq ft executive office with glass partitions and branded reception.",
    image: "/images/project-05-1.webp",
    gallery: ["/images/project-05-1.webp", "/images/project-05-2.webp", "/images/project-05-3.webp", "/images/project-05-4.webp"],
  },
  {
    id: 6,
    title: "Resort-Style Pool",
    category: "Exterior",
    location: "Al Barari, Dubai",
    scope: "Custom infinity pool with integrated lighting, deck area and coordinated landscape design.",
    image: "/images/project-06-1.webp",
    gallery: ["/images/project-06-1.webp", "/images/project-06-2.webp", "/images/project-06-3.webp", "/images/project-06-4.webp"],
  },
  {
    id: 7,
    title: "Contemporary Garden",
    category: "Exterior",
    location: "Arabian Ranches, Dubai",
    scope: "Full landscape transformation with hardscape pathways, feature lighting and native planting.",
    image: "/images/project-07-1.webp",
    gallery: ["/images/project-07-1.webp", "/images/project-07-2.webp", "/images/project-07-3.webp", "/images/project-07-4.webp"],
  },
  {
    id: 8,
    title: "Modern Outdoor Pergola",
    category: "Exterior",
    location: "Tilal Al Ghaf, Dubai",
    scope: "Engineered aluminum pergola with retractable louvers, outdoor kitchen and ambient lighting.",
    image: "/images/project-08-1.webp",
    gallery: ["/images/project-08-1.webp", "/images/project-08-2.webp", "/images/project-08-3.webp", "/images/project-08-4.webp"],
  },
  {
    id: 9,
    title: "Architectural Aluminum Facade",
    category: "Technical",
    location: "DIFC, Dubai",
    scope: "Precision aluminum cladding and window system installation for a mixed-use commercial building.",
    image: "/images/project-09-1.webp",
    gallery: ["/images/project-09-1.webp", "/images/project-09-2.webp", "/images/project-09-3.webp", "/images/project-09-4.webp"],
  },
  {
    id: 10,
    title: "Frameless Glass Office",
    category: "Commercial",
    location: "JLT, Dubai",
    scope: "Floor-to-ceiling frameless glass partitions creating open yet defined work zones across two floors.",
    image: "/images/project-10-1.webp",
    gallery: ["/images/project-10-1.webp", "/images/project-10-2.webp", "/images/project-10-3.webp", "/images/project-10-4.webp"],
  },
  {
    id: 11,
    title: "Refined Surface Finish",
    category: "Residential",
    location: "Damac Hills, Dubai",
    scope: "Interior and exterior painting with specialized surface preparation, texturing and protective coatings.",
    image: "/images/project-11-1.webp",
    gallery: ["/images/project-11-1.webp", "/images/project-11-2.webp", "/images/project-11-3.webp", "/images/project-11-4.webp"],
  },
  {
    id: 12,
    title: "Premium Stone Flooring",
    category: "Residential",
    location: "Meadows, Dubai",
    scope: "Italian marble and porcelain tile installation across 6,000 sq ft of living and outdoor space.",
    image: "/images/project-12-1.webp",
    gallery: ["/images/project-12-1.webp", "/images/project-12-2.webp", "/images/project-12-3.webp", "/images/project-12-4.webp"],
  },
];

const processSteps = [
  { number: "01", title: "Consultation", desc: "We visit the site, understand your vision and define the project scope together." },
  { number: "02", title: "Design & Planning", desc: "Detailed concepts, 3D visuals, material selection and a clear project timeline." },
  { number: "03", title: "Execution", desc: "Our in-house teams deliver with precision, quality control and daily coordination." },
  { number: "04", title: "Handover", desc: "Final inspection, walkthrough, documentation and ongoing support." },
];

export default function ProjectsPage() {
  const pageRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".pp-hero__heading span",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".pp-hero__sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.55 }
      );

      gsap.fromTo(".pp-process__step",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".pp-process", start: "top 80%" },
        }
      );

      gsap.fromTo(".pp-stats__item",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".pp-stats", start: "top 85%" },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    gsap.fromTo(".pp-grid__card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }
    );
  }, [activeFilter]);

  return (
    <div className="projects-page" ref={pageRef}>

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="pp-hero__bg">
          <img src={HERO_IMG} alt="ZBM Projects" />
          <div className="pp-hero__overlay" />
        </div>
        <div className="pp-hero__content container">
          <p className="pp-hero__eyebrow">Our Projects</p>
          <h1 className="pp-hero__heading">
            <span className="line-mask"><span>Craftsmanship you</span></span>
            <span className="line-mask"><span>can walk through.</span></span>
          </h1>
          <p className="pp-hero__sub">
            Every project here represents real execution — real materials, real
            timelines, real results. Browse our work across residential, commercial
            and exterior environments.
          </p>
        </div>
        <div className="pp-hero__breadcrumb container">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Projects</span>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="pp-featured">
        <div className="container">
          <div className="pp-featured__inner">
            <div className="pp-featured__img">
              <img src="/images/project-01-1.webp" alt="Featured project" />
              <div className="pp-featured__badge">Featured Project</div>
            </div>
            <div className="pp-featured__info">
              <p className="pp-featured__eyebrow">Emirates Hills, Dubai</p>
              <h2 className="pp-featured__title">Modern Villa Transformation</h2>
              <p className="pp-featured__desc">
                A complete villa renovation spanning 8,500 sq ft — from structural
                modifications and MEP upgrades to bespoke interior fit-out, landscaping
                and pool construction. Delivered in 14 weeks with full project management
                and coordination across 12 trade teams.
              </p>
              <div className="pp-featured__meta">
                <div className="pp-featured__meta-item">
                  <span className="pp-featured__meta-num">8,500</span>
                  <span className="pp-featured__meta-label">Sq Ft</span>
                </div>
                <div className="pp-featured__meta-item">
                  <span className="pp-featured__meta-num">14</span>
                  <span className="pp-featured__meta-label">Weeks</span>
                </div>
                <div className="pp-featured__meta-item">
                  <span className="pp-featured__meta-num">12</span>
                  <span className="pp-featured__meta-label">Trade Teams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="pp-grid-section">
        <div className="container">
          <div className="pp-grid__header">
            <h2 className="pp-grid__title">All Projects</h2>
            <div className="pp-grid__filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`pp-grid__filter ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pp-grid">
            {filtered.map((project) => (
              <article
                key={project.id}
                className="pp-grid__card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="pp-grid__card-img">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="pp-grid__card-cat">{project.category}</span>
                </div>
                <div className="pp-grid__card-body">
                  <h3 className="pp-grid__card-title">{project.title}</h3>
                  <p className="pp-grid__card-loc">{project.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div className="pp-modal" onClick={() => setSelectedProject(null)}>
          <div className="pp-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="pp-modal__close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>
            <div className="pp-modal__gallery">
              {selectedProject.gallery.map((img, i) => (
                <img key={i} src={img} alt={`${selectedProject.title} view ${i + 1}`} />
              ))}
            </div>
            <div className="pp-modal__info">
              <span className="pp-modal__cat">{selectedProject.category}</span>
              <h3 className="pp-modal__title">{selectedProject.title}</h3>
              <p className="pp-modal__loc">{selectedProject.location}</p>
              <p className="pp-modal__scope">{selectedProject.scope}</p>
              <Link
                to="/#contact"
                className="pp-modal__cta"
                onClick={() => setSelectedProject(null)}
              >
                Start a Similar Project
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── PROCESS ── */}
      <section className="pp-process">
        <div className="container">
          <div className="pp-process__header">
            <p className="pp-process__eyebrow">How We Work</p>
            <h2 className="pp-process__heading">From first meeting to final handover.</h2>
          </div>
          <div className="pp-process__grid">
            {processSteps.map((step) => (
              <div key={step.number} className="pp-process__step">
                <span className="pp-process__num">{step.number}</span>
                <h3 className="pp-process__step-title">{step.title}</h3>
                <p className="pp-process__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="pp-stats">
        <div className="pp-stats__inner container">
          <div className="pp-stats__item">
            <span className="pp-stats__num">120+</span>
            <span className="pp-stats__label">Projects Completed</span>
          </div>
          <div className="pp-stats__item">
            <span className="pp-stats__num">98%</span>
            <span className="pp-stats__label">Client Satisfaction</span>
          </div>
          <div className="pp-stats__item">
            <span className="pp-stats__num">60+</span>
            <span className="pp-stats__label">In-House Team</span>
          </div>
          <div className="pp-stats__item">
            <span className="pp-stats__num">18</span>
            <span className="pp-stats__label">Service Categories</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pp-cta">
        <div className="pp-cta__bg">
          <img src="/images/zbm_17.png" alt="ZBM project" />
          <div className="pp-cta__overlay" />
        </div>
        <div className="pp-cta__content container">
          <h2 className="pp-cta__heading">Have a project in mind?</h2>
          <p className="pp-cta__sub">
            Tell us about your space and we will put together a tailored plan
            with transparent pricing and a clear timeline.
          </p>
          <div className="pp-cta__actions">
            <Link to="/#contact" className="pp-cta__btn pp-cta__btn--primary">
              Get a Free Quote
            </Link>
            <a href="tel:+971563830202" className="pp-cta__btn pp-cta__btn--outline">
              Call: +971 56 383 0202
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
