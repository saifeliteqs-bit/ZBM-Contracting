import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Statement.scss';

const STMT_IMG = 'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1200&q=90&auto=format&fit=crop';
const STMT_IMG2 = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=90&auto=format&fit=crop';

export default function Statement() {
  const { t, isAr } = useLanguage();
  const sectionRef = useRef(null);
  const l1 = useRef(null);
  const l2 = useRef(null);
  const l3 = useRef(null);
  const l4 = useRef(null);
  const mid1Ref = useRef(null);
  const mid2Ref = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Statement 1
      [l1, l2].forEach((r, i) => {
        if (!r.current) return;
        gsap.fromTo(r.current, { yPercent: 115 }, { yPercent: 0, duration: 1.0, ease: 'power3.out', delay: i * 0.14,
          scrollTrigger: { trigger: '.stmt-group-1', start: 'top 78%' } });
      });
      gsap.fromTo(mid1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.stmt-group-1', start: 'top 65%' } });
      gsap.fromTo(img1Ref.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.stmt-group-1', start: 'top 60%' } });
      // Statement 2
      [l3, l4].forEach((r, i) => {
        if (!r.current) return;
        gsap.fromTo(r.current, { yPercent: 115 }, { yPercent: 0, duration: 1.0, ease: 'power3.out', delay: i * 0.14,
          scrollTrigger: { trigger: '.stmt-group-2', start: 'top 78%' } });
      });
      gsap.fromTo(mid2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.stmt-group-2', start: 'top 65%' } });
      gsap.fromTo(img2Ref.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.stmt-group-2', start: 'top 60%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="statement" ref={sectionRef}>
      <div className="statement__inner">

        {/* Statement 1 */}
        <div className="statement__block stmt-group-1">
          <div className="statement__text-col">
            <div className="line-mask"><span ref={l1} className="display-xl">{t.statement.line1}</span></div>
            <div className="line-mask"><span ref={l2} className="display-xl statement__accent">{t.statement.line2}</span></div>
            <p ref={mid1Ref} className="statement__mid body-lg">{t.statement.mid}</p>
          </div>
          <div className="statement__img-col">
            <div className="statement__img" ref={img1Ref}>
              <img src={STMT_IMG} alt="Interior architectural detail" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="statement__divider" />

        {/* Statement 2 */}
        <div className="statement__block stmt-group-2">
          <div className="statement__img-col statement__img-col--left">
            <div className="statement__img" ref={img2Ref}>
              <img src={STMT_IMG2} alt="Exterior architecture" />
            </div>
          </div>
          <div className="statement__text-col">
            <div className="line-mask"><span ref={l3} className="display-xl">{t.statement.line3}</span></div>
            <div className="line-mask"><span ref={l4} className="display-xl statement__accent">{t.statement.line4}</span></div>
            <p ref={mid2Ref} className="statement__mid body-lg">{t.statement.mid2}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
