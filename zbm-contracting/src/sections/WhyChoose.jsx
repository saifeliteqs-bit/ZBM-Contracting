import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyChoose.scss';

const features = [
  {
    icon: '★',
    title: '12+ Years of Experience',
    desc: 'Over a decade of proven excellence in renovation, fit-out and construction across the UAE.',
  },
  {
    icon: '◆',
    title: 'In-House Expert Team',
    desc: 'Qualified engineers, designers and skilled craftsmen working under one roof.',
  },
  {
    icon: '✦',
    title: 'Premium Materials',
    desc: 'Only high-grade, durable materials sourced from trusted suppliers for lasting finishes.',
  },
  {
    icon: '⬢',
    title: 'On-Time Delivery',
    desc: 'Structured project management ensures your project is completed within timeline.',
  },
  {
    icon: '◈',
    title: 'Transparent Pricing',
    desc: 'Detailed, itemized quotes with no hidden costs — know exactly what you are paying for.',
  },
  {
    icon: '❖',
    title: 'End-to-End Solutions',
    desc: 'One team handles everything — from initial design to final handover and after-care.',
  },
];

export default function WhyChoose() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.wc-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.1,
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
    <section className="wc" ref={sectionRef} id="why-zbm">
      <div className="container">
        <div className="wc__header">
          <p className="wc__eyebrow">WHY CHOOSE ZBM</p>
          <h2 className="wc__title">
            Building trust, one <span className="accent">project</span> at a time.
          </h2>
          <p className="wc__sub">
            When it comes to contracting services in Dubai and the UAE, ZBM stands apart
            through relentless focus on quality, transparency and on-time delivery.
          </p>
        </div>

        <div className="wc__grid">
          {features.map((f, i) => (
            <div key={i} className="wc-item">
              <div className="wc-item__icon">{f.icon}</div>
              <h3 className="wc-item__title">{f.title}</h3>
              <p className="wc-item__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
