import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectDetail.scss';

export default function ProjectDetail() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-detail__copy > *',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.project-detail__image',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
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
    <section className="project-detail" ref={sectionRef}>
      <div className="project-detail__inner container">
        <div className="project-detail__copy">
          <p className="project-detail__eyebrow">
            <span className="project-detail__eyebrow-mark" />
            DESIGNED FOR THE WAY YOU LIVE & WORK
          </p>

          <h2 className="project-detail__title">Interior & Fit-Out Solutions in Dubai</h2>

          <p>
            ZBM Contracting delivers tailored interior fit-out solutions for villas, apartments,
            offices, retail spaces, restaurants and hospitality environments across Dubai and the UAE.
            Every project is planned around the client’s requirements, the character of the space and
            the quality expected from a premium finish.
          </p>

          <p>
            Our team manages the complete journey from space planning and material selection to
            ceilings, flooring, joinery, feature walls, painting, lighting coordination and final
            finishing. We combine practical construction knowledge with refined detailing so every
            element feels considered and works together as one complete environment.
          </p>

          <p>
            Whether the project is a full commercial fit-out, a villa renovation or a focused interior
            upgrade, our approach remains the same: clear coordination, disciplined execution and
            careful attention to detail from the first site discussion through final handover.
          </p>

          <p>
            With experience across residential and commercial projects in the UAE, ZBM Contracting
            creates spaces that are functional, durable and visually distinctive — built to perform
            well today and continue to feel relevant for years to come.
          </p>
        </div>

        <div className="project-detail__visuals" aria-label="ZBM interior project showcase">
          <figure className="project-detail__image project-detail__image--back">
            <img src="/images/zbm_18.png" alt="Refined residential interior by ZBM Contracting" loading="lazy" />
          </figure>

          <figure className="project-detail__image project-detail__image--front">
            <img src="/images/zbm_19.png" alt="Premium commercial fit-out by ZBM Contracting" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}
