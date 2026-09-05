import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VillaRenovationPage.scss';

const scope = [
  { n: '01', title: 'Design & Space Planning', desc: 'Layout refinement, material direction and coordinated design decisions tailored to your villa and lifestyle.' },
  { n: '02', title: 'Civil & Structural Works', desc: 'Wall modifications, openings, masonry, screed and structural coordination required for the new layout.' },
  { n: '03', title: 'Interior Fit-Out', desc: 'Custom ceilings, wall finishes, joinery, doors, wardrobes and detailed interior finishing throughout the villa.' },
  { n: '04', title: 'Kitchen & Bathrooms', desc: 'Complete kitchen and bathroom upgrades with premium finishes, fittings, cabinetry and waterproofing.' },
  { n: '05', title: 'MEP Upgrades', desc: 'Electrical, lighting, plumbing, AC and ducting upgrades coordinated with the new interior design.' },
  { n: '06', title: 'Flooring & Finishes', desc: 'Marble, porcelain, wood, paint and decorative finishes installed with careful attention to detailing.' },
  { n: '07', title: 'Exterior Enhancement', desc: 'Façade updates, gates, pergolas, outdoor finishes and selected external renovation works.' },
  { n: '08', title: 'Landscape & Pool Works', desc: 'Garden improvements, hardscape, lighting and pool-related works to complete the villa transformation.' },
];

const steps = [
  ['01', 'Site Visit & Brief', 'We inspect the villa, understand your priorities and define the renovation scope.'],
  ['02', 'Design & Cost Planning', 'Layouts, finishes, technical requirements and a clear project budget are coordinated before execution.'],
  ['03', 'Approvals & Mobilization', 'Required approvals, procurement and site setup are arranged for a smooth start.'],
  ['04', 'Renovation & Fit-Out', 'Our teams execute civil, MEP, joinery, finishing and external works under coordinated supervision.'],
  ['05', 'Quality Check & Handover', 'Final inspections, snag rectification and detailed handover complete the transformation.'],
];

export default function VillaRenovationPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.vr-hero__title span', { yPercent: 120 }, { yPercent: 0, duration: 0.95, stagger: 0.09, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.vr-hero__eyebrow, .vr-hero__copy, .vr-hero__actions', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.45 });
      gsap.utils.toArray('.vr-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 38 }, {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
        });
      });
      gsap.fromTo('.vr-scope__card', { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.vr-scope__grid', start: 'top 82%' },
      });
      gsap.fromTo('.vr-process__item', { opacity: 0, x: -26 }, {
        opacity: 1, x: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.vr-process__list', start: 'top 82%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="villa-renovation" ref={pageRef}>
      <section className="vr-hero">
        <div className="vr-hero__bg">
          <img src="/images/service-01.webp" alt="Luxury full villa renovation in Dubai" />
          <div className="vr-hero__overlay" />
        </div>
        <div className="vr-hero__content container">
          <p className="vr-hero__eyebrow">Residential Renovation · Dubai & UAE</p>
          <h1 className="vr-hero__title">
            <span className="line-mask"><span>Full Villa</span></span>
            <span className="line-mask"><span>Renovation.</span></span>
          </h1>
          <p className="vr-hero__copy">A complete villa transformation — planned, managed and executed under one team, from demolition and MEP upgrades to interiors, landscaping and final handover.</p>
          <div className="vr-hero__actions">
            <Link to="/contact" className="vr-btn vr-btn--primary">Start Your Renovation ↗</Link>
            <a href="tel:+971563830202" className="vr-btn vr-btn--outline">Call +971 56 3830202</a>
          </div>
        </div>
        <div className="vr-hero__breadcrumb container"><Link to="/">Home</Link><span>/</span><span>Full Villa Renovation</span></div>
      </section>

      <section className="vr-intro">
        <div className="container vr-intro__grid">
          <div className="vr-intro__content vr-reveal">
            <p className="vr-label">Complete Transformation</p>
            <h2>Renovating your villa should feel coordinated, not complicated.</h2>
            <p>From the first site visit to the final finishing detail, ZBM Contracting manages the complete renovation journey. We coordinate design, civil works, MEP, fit-out, kitchens, bathrooms and exterior upgrades so every part of the villa works together.</p>
            <p>Whether you are modernizing an older property, preparing a newly purchased villa, or completely changing the layout and style, our team focuses on quality execution, practical planning and a refined final result.</p>
            <div className="vr-intro__facts">
              <div><strong>One Team</strong><span>Design to handover</span></div>
              <div><strong>Turnkey</strong><span>Interior + exterior</span></div>
              <div><strong>Dubai</strong><span>Villa specialists</span></div>
            </div>
          </div>
          <div className="vr-intro__visual vr-reveal">
            <img src="/images/zbm_10.png" alt="Luxury villa interior renovation" />
            <div className="vr-intro__float"><span>01</span><p>Planned around your villa, your lifestyle and your finish level.</p></div>
          </div>
        </div>
      </section>

      <section className="vr-scope">
        <div className="container">
          <div className="vr-section-head vr-reveal">
            <p className="vr-label">What We Cover</p>
            <h2>Everything required for a complete villa renovation.</h2>
            <p>One coordinated scope covering the key trades and finishes needed to transform the entire property.</p>
          </div>
          <div className="vr-scope__grid">
            {scope.map((item) => <article className="vr-scope__card" key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.desc}</p></article>)}
          </div>
        </div>
      </section>

      <section className="vr-showcase">
        <div className="container">
          <div className="vr-showcase__head vr-reveal"><p className="vr-label">Villa Transformation</p><h2>From structure and services to the spaces you live in every day.</h2></div>
          <div className="vr-showcase__grid">
            <figure className="vr-showcase__large vr-reveal"><img src="/images/zbm_11.png" alt="Renovated villa living area" /><figcaption><span>Interior</span>Refined living spaces</figcaption></figure>
            <figure className="vr-reveal"><img src="/images/service-03.webp" alt="Villa kitchen renovation" /><figcaption><span>Kitchen</span>Custom renovation</figcaption></figure>
            <figure className="vr-reveal"><img src="/images/service-04.webp" alt="Villa bathroom renovation" /><figcaption><span>Bathroom</span>Premium finishes</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="vr-process">
        <div className="container vr-process__layout">
          <div className="vr-process__sticky vr-reveal"><p className="vr-label">Our Process</p><h2>A clear route from existing villa to finished home.</h2><p>We keep design, procurement, trades and site coordination connected throughout the renovation.</p></div>
          <div className="vr-process__list">
            {steps.map(([n, title, desc]) => <div className="vr-process__item" key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="vr-cta">
        <div className="vr-cta__bg"><img src="/images/zbm_17.png" alt="Completed luxury villa" /><div /></div>
        <div className="container vr-cta__content vr-reveal"><p className="vr-label">Ready to Renovate?</p><h2>Turn your existing villa into the home you actually want to live in.</h2><p>Share your villa location, current condition and renovation requirements with our team.</p><div className="vr-hero__actions"><Link to="/contact" className="vr-btn vr-btn--primary">Request a Site Visit ↗</Link><a href="mailto:info@zbmcontracting.com" className="vr-btn vr-btn--outline">Email Us</a></div></div>
      </section>
    </div>
  );
}
