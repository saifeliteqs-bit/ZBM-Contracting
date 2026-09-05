import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './About.scss';

const IMG1 = '/images/zmb_9.png';

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const h1r = useRef(null);
  const h2r = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      [h1r, h2r].forEach((el, i) => {
        if (!el.current) return;
        gsap.fromTo(el.current, { yPercent: 110 }, {
          yPercent: 0, duration: 1, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      });
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { scale: 1.08 }, {
          scale: 1, duration: 1.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={sectionRef} id="about">
      <div className="about__inner container">
        <div className="about__left">
          <p className="label about__label text-muted">01 — About ZBM</p>
          <h2 className="about__heading">
            <span className="line-mask"><span ref={h1r}>Every space begins</span></span>
            <span className="line-mask"><span ref={h2r}>with an <span className="accent">idea</span>.</span></span>
          </h2>
          <div className="about__body">
            <p>ZBM Contracting brings together design, material, craftsmanship and execution to create refined interiors and distinctive exteriors. From first concept through final detail, we treat every project as an opportunity to create something that endures.</p>
            <p>Based in Dubai, UAE, we work across residential and commercial environments — delivering spaces that are both beautiful and purposeful. Our team combines architectural vision with on-the-ground execution capability.</p>
          </div>
          <div className="about__highlights">
            <div className="about__highlight">
              <span className="about__highlight-num">120+</span>
              <span className="about__highlight-label">Projects Delivered</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-num">12+</span>
              <span className="about__highlight-label">Years Experience</span>
            </div>
            <div className="about__highlight">
              <span className="about__highlight-num">18</span>
              <span className="about__highlight-label">Core Services</span>
            </div>
          </div>
        </div>

        <div className="about__right">
          <div className="about__img-wrap">
            <img ref={imgRef} src={IMG1} alt="ZBM premium interior design" />
          </div>
        </div>
      </div>
    </section>
  );
}
