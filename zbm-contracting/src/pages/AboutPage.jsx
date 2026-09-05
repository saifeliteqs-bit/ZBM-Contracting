import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.scss';

const HERO_IMG = '/images/hero-01.webp';

const values = [
  {
    number: '01',
    title: 'Craftsmanship First',
    desc: "Every joint, every edge, every finish is executed with the care of a craftsman who takes personal pride in the result. We don't cut corners — we refine them.",
  },
  {
    number: '02',
    title: 'Transparent Partnership',
    desc: 'We share detailed, itemized quotes from day one. No hidden costs, no surprises. You see exactly where every dirham goes, and we keep you informed at every stage.',
  },
  {
    number: '03',
    title: 'Design With Intent',
    desc: "We don't decorate — we design. Every material, layout and detail is chosen for a reason: to serve the space, the people who use it, and the vision behind it.",
  },
  {
    number: '04',
    title: 'Reliable Execution',
    desc: 'Timelines are commitments, not estimates. Our structured project management and in-house teams mean your project moves forward every day, on schedule.',
  },
];

const milestones = [
  { year: '2012', event: 'ZBM Contracting founded in Dubai with a small team and a focus on residential renovation.' },
  { year: '2015', event: 'Expanded into commercial fit-out, delivering our first full office project in Business Bay.' },
  { year: '2018', event: 'Grew to 60+ in-house professionals covering MEP, joinery, finishing and project management.' },
  { year: '2021', event: 'Crossed 100 completed projects — villas, offices, restaurants and retail across the UAE.' },
  { year: '2024', event: 'Launched turnkey solutions, offering end-to-end design-and-build for residential and commercial clients.' },
];

const team = [
  {
    role: 'Design & Architecture',
    desc: 'Our design team translates your brief into spatial concepts, 3D walkthroughs and material palettes — balancing aesthetics with buildability from day one.',
    image: '/images/zbm_18.png',
  },
  {
    role: 'Project Management',
    desc: 'Dedicated project managers coordinate every trade, timeline and client touchpoint. One point of contact, clear communication, no surprises.',
    image: '/images/zbm_19.png',
  },
  {
    role: 'Skilled Trades & Execution',
    desc: 'In-house teams of carpenters, electricians, painters, tilers, MEP engineers and finishing specialists execute with precision under one roof.',
    image: '/images/zbm_20.png',
  },
];

export default function AboutPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Hero text entrance
      gsap.fromTo('.about-hero__heading span',
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.about-hero__sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.55 }
      );

      // Story section
      gsap.fromTo('.about-story__text > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-story', start: 'top 78%' },
        }
      );
      gsap.fromTo('.about-story__img',
        { opacity: 0, scale: 1.06 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-story', start: 'top 78%' },
        }
      );

      // Values
      gsap.fromTo('.about-values__item',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-values', start: 'top 80%' },
        }
      );

      // Stats
      gsap.fromTo('.about-stats__item',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 82%' },
        }
      );

      // Timeline
      gsap.fromTo('.about-timeline__entry',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-timeline', start: 'top 80%' },
        }
      );

      // Team
      gsap.fromTo('.about-team__card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-team', start: 'top 80%' },
        }
      );

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page" ref={pageRef}>

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <img src={HERO_IMG} alt="ZBM Contracting craftsmanship" />
          <div className="about-hero__overlay" />
        </div>
        <div className="about-hero__content container">
          <p className="about-hero__eyebrow">About ZBM Contracting</p>
          <h1 className="about-hero__heading">
            <span className="line-mask"><span>Built on craft.</span></span>
            <span className="line-mask"><span>Driven by detail.</span></span>
          </h1>
          <p className="about-hero__sub">
            For over 12 years, ZBM Contracting has been shaping interiors and exteriors
            across Dubai and the UAE — one carefully executed project at a time.
          </p>
        </div>
        <div className="about-hero__breadcrumb container">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>About Us</span>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="about-story">
        <div className="about-story__inner container">
          <div className="about-story__text">
            <p className="about-story__eyebrow">Our Story</p>
            <h2 className="about-story__heading">
              From a small renovation team to a full-service contracting company.
            </h2>
            <p>
              ZBM Contracting started in 2012 with a clear conviction: that the quality of a space
              is decided by the quality of execution behind it. What began as a focused residential
              renovation practice in Dubai has grown into a comprehensive contracting company
              delivering interiors, exteriors, MEP, landscaping and turnkey solutions across the UAE.
            </p>
            <p>
              Today, our team of 60+ in-house professionals — engineers, designers, project managers
              and skilled tradespeople — works under one roof to deliver projects from first concept
              through final handover. We've completed over 120 projects across villas, apartments,
              offices, restaurants and retail environments, earning a reputation for transparent pricing,
              disciplined timelines and refined finishing.
            </p>
            <p>
              What has not changed is our founding principle: every space we build is an opportunity
              to create something that endures — something the people who live and work in it can
              feel proud of for years to come.
            </p>
          </div>
          <div className="about-story__visual">
            <div className="about-story__img">
              <img src="/images/zmb_9.png" alt="ZBM Contracting project showcase" />
            </div>
            <div className="about-story__badge">
              <span className="about-story__badge-num">12+</span>
              <span className="about-story__badge-label">Years in Dubai</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="about-stats">
        <div className="about-stats__inner container">
          <div className="about-stats__item">
            <span className="about-stats__num">120+</span>
            <span className="about-stats__label">Projects Delivered</span>
          </div>
          <div className="about-stats__item">
            <span className="about-stats__num">60+</span>
            <span className="about-stats__label">In-House Professionals</span>
          </div>
          <div className="about-stats__item">
            <span className="about-stats__num">18</span>
            <span className="about-stats__label">Core Services</span>
          </div>
          <div className="about-stats__item">
            <span className="about-stats__num">12+</span>
            <span className="about-stats__label">Years Experience</span>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <p className="about-values__eyebrow">What We Stand For</p>
            <h2 className="about-values__heading">
              The principles behind every project we deliver.
            </h2>
          </div>
          <div className="about-values__grid">
            {values.map((v) => (
              <div key={v.number} className="about-values__item">
                <span className="about-values__number">{v.number}</span>
                <h3 className="about-values__title">{v.title}</h3>
                <p className="about-values__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <p className="about-timeline__eyebrow">Our Journey</p>
            <h2 className="about-timeline__heading">Key milestones along the way.</h2>
          </div>
          <div className="about-timeline__track">
            {milestones.map((m) => (
              <div key={m.year} className="about-timeline__entry">
                <span className="about-timeline__year">{m.year}</span>
                <div className="about-timeline__dot" />
                <p className="about-timeline__event">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="about-team">
        <div className="container">
          <div className="about-team__header">
            <p className="about-team__eyebrow">Our Team</p>
            <h2 className="about-team__heading">
              One team. Every discipline. Under one roof.
            </h2>
            <p className="about-team__sub">
              We do not outsource the work that matters. Our design, management and
              execution teams work together daily — so nothing gets lost in translation.
            </p>
          </div>
          <div className="about-team__grid">
            {team.map((t) => (
              <div key={t.role} className="about-team__card">
                <div className="about-team__card-img">
                  <img src={t.image} alt={t.role} loading="lazy" />
                </div>
                <div className="about-team__card-body">
                  <h3 className="about-team__card-title">{t.role}</h3>
                  <p className="about-team__card-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="about-cta__bg">
          <img src="/images/zbm_17.png" alt="ZBM luxury project" />
          <div className="about-cta__overlay" />
        </div>
        <div className="about-cta__content container">
          <h2 className="about-cta__heading">
            Ready to build something worth remembering?
          </h2>
          <p className="about-cta__sub">
            Whether it is a villa renovation, a commercial fit-out or a complete turnkey
            project — let's talk about what you're looking for.
          </p>
          <div className="about-cta__actions">
            <Link to="/#contact" className="about-cta__btn about-cta__btn--primary">
              Get a Free Quote ↗
            </Link>
            <a href="tel:+971563830202" className="about-cta__btn about-cta__btn--outline">
              Call: +971 56 383 0202
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
