import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTABanner.scss';

const CTA_IMG = '/images/zbm_17.png';

export default function CTABanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-banner__heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.cta-banner__sub, .cta-banner__actions',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-banner" ref={sectionRef}>
      <div className="cta-banner__bg">
        <img src={CTA_IMG} alt="ZBM luxury project" />
        <div className="cta-banner__overlay" />
      </div>

      <div className="cta-banner__content container">
        <p className="label cta-banner__label">Ready to Begin?</p>
        <h2 className="cta-banner__heading">
          Let's build something<br />worth remembering.
        </h2>
        <p className="cta-banner__sub body-lg">
          Whether it's a full villa renovation, a commercial fit-out or a landscape transformation —
          we're ready to deliver excellence on your project.
        </p>
        <div className="cta-banner__actions">
          <a href="#contact" className="cta-banner__btn cta-banner__btn--primary">
            Get a Free Quote ↗
          </a>
          <a href="tel:+971563830202" className="cta-banner__btn cta-banner__btn--outline">
            Call: +971 56 3830202
          </a>
        </div>
      </div>
    </section>
  );
}
