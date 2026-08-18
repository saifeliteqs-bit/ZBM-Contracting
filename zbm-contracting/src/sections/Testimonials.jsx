import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/siteContent';
import './Testimonials.scss';

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial__quote',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
      gsap.fromTo(
        '.testimonial__meta',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonial-section" ref={sectionRef}>
      <div className="container">
        <p className="label text-muted" style={{ marginBottom: 40 }}>Client Perspective</p>

        <blockquote className="testimonial__quote display-md serif">
          "{siteContent.testimonial.quote}"
        </blockquote>

        <div className="testimonial__meta">
          <div className="testimonial__line" />
          <div className="testimonial__info">
            <p className="testimonial__client label">{siteContent.testimonial.client}</p>
            <p className="testimonial__project body-sm text-muted">
              {siteContent.testimonial.project}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
