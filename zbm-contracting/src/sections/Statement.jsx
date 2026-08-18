import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/siteContent';
import './Statement.scss';

const STMT_IMG = 'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1200&q=90&auto=format&fit=crop';

export default function Statement() {
  const sectionRef = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);
  const l3 = useRef(null);
  const l4 = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // All lines reveal on scroll — no pinning
      [l1, l2].forEach((r, i) => {
        if (!r.current) return;
        gsap.fromTo(r.current,
          { yPercent: 115 },
          {
            yPercent: 0, duration: 1.0, ease: 'power3.out',
            delay: i * 0.14,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      });

      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      [l3, l4].forEach((r, i) => {
        if (!r.current) return;
        gsap.fromTo(r.current,
          { yPercent: 115 },
          {
            yPercent: 0, duration: 1.0, ease: 'power3.out',
            delay: i * 0.14,
            scrollTrigger: { trigger: '.statement__group--two', start: 'top 80%' },
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="statement" ref={sectionRef}>
      <div className="statement__inner">

        {/* Statement 1 */}
        <div className="statement__group">
          <div className="line-mask">
            <span ref={l1} className="display-xl">{siteContent.statement.line1}</span>
          </div>
          <div className="line-mask">
            <span ref={l2} className="display-xl statement__accent">{siteContent.statement.line2}</span>
          </div>
        </div>

        {/* Image in between */}
        <div className="statement__img" ref={imgRef}>
          <img src={STMT_IMG} alt="Architectural interior detail" />
        </div>

        {/* Statement 2 */}
        <div className="statement__group statement__group--two">
          <div className="line-mask">
            <span ref={l3} className="display-xl">{siteContent.statement.line3}</span>
          </div>
          <div className="line-mask">
            <span ref={l4} className="display-xl statement__accent">{siteContent.statement.line4}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
