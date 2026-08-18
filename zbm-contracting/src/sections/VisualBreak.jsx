import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VisualBreak.scss';

const VB_IMAGE = 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=2400&q=90&auto=format&fit=crop';

export default function VisualBreak() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Slow parallax on the image
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      // Reveal text
      gsap.fromTo(textRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="vb" ref={sectionRef}>
      <div className="vb__img-wrap">
        <img ref={imgRef} src={VB_IMAGE} alt="Luxury architecture" loading="lazy" />
        <div className="vb__overlay" />
      </div>
      <div className="vb__text" ref={textRef}>
        <p className="vb__quote serif">Every detail has a reason.</p>
      </div>
    </section>
  );
}
