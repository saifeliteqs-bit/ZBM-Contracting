import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/siteContent';
import './Stats.scss';

export default function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__inner container">
        {siteContent.stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <span className="stat-item__number display-md">{stat.number}</span>
            <span className="stat-item__label label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
