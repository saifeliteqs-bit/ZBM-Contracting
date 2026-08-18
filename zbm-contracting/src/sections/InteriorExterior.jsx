import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/siteContent';
import './InteriorExterior.scss';

const INTERIOR_IMG = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=90&auto=format&fit=crop';
const EXTERIOR_IMG = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=90&auto=format&fit=crop';

export default function InteriorExterior() {
  const sectionRef = useRef(null);
  const intRef = useRef(null);
  const extRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entry reveal
      gsap.fromTo(
        intRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
      gsap.fromTo(
        extRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    if (hovered === 'interior') {
      gsap.to(intRef.current, { flex: '0 0 58%', duration: 0.6, ease: 'power3.out' });
      gsap.to(extRef.current, { flex: '0 0 42%', duration: 0.6, ease: 'power3.out' });
      gsap.to(intRef.current.querySelector('img'), { scale: 1.04, duration: 0.8 });
      gsap.to(extRef.current.querySelector('img'), { scale: 1, duration: 0.8 });
    } else if (hovered === 'exterior') {
      gsap.to(extRef.current, { flex: '0 0 58%', duration: 0.6, ease: 'power3.out' });
      gsap.to(intRef.current, { flex: '0 0 42%', duration: 0.6, ease: 'power3.out' });
      gsap.to(extRef.current.querySelector('img'), { scale: 1.04, duration: 0.8 });
      gsap.to(intRef.current.querySelector('img'), { scale: 1, duration: 0.8 });
    } else {
      gsap.to([intRef.current, extRef.current], { flex: '0 0 50%', duration: 0.6, ease: 'power3.out' });
      gsap.to([intRef.current.querySelector('img'), extRef.current.querySelector('img')], {
        scale: 1, duration: 0.8,
      });
    }
  }, [hovered]);

  return (
    <section className="ie" ref={sectionRef} id="interior-exterior">
      <div
        className="ie__panel ie__panel--interior"
        ref={intRef}
        onMouseEnter={() => setHovered('interior')}
        onMouseLeave={() => setHovered(null)}
      >
        <img src={INTERIOR_IMG} alt="Luxury interior design" />
        <div className="ie__overlay" />
        <div className="ie__label">
          <h3 className="ie__word display-lg">{siteContent.interiorExterior.interior.label}</h3>
          <p className="ie__tagline label">{siteContent.interiorExterior.interior.tagline}</p>
        </div>
      </div>

      <div
        className="ie__panel ie__panel--exterior"
        ref={extRef}
        onMouseEnter={() => setHovered('exterior')}
        onMouseLeave={() => setHovered(null)}
      >
        <img src={EXTERIOR_IMG} alt="Luxury exterior architecture" />
        <div className="ie__overlay" />
        <div className="ie__label">
          <h3 className="ie__word display-lg">{siteContent.interiorExterior.exterior.label}</h3>
          <p className="ie__tagline label">{siteContent.interiorExterior.exterior.tagline}</p>
        </div>
      </div>
    </section>
  );
}
