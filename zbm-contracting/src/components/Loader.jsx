import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import zbmLogo from '../assets/zbm-logo.png';
import './Loader.scss';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.1,
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
            onComplete?.();
          },
        });
      },
    });

    // Animate counter
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.val);
        }
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    );

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.4,
      ease: 'power3.inOut',
    }, 0.1);

    tl.to(loaderRef.current, { duration: 0.4 }); // brief hold
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__inner">
        <img ref={logoRef} src={zbmLogo} alt="ZBM" className="loader__logo" />
        <div className="loader__line-wrap">
          <div className="loader__line" ref={lineRef} />
        </div>
        <span className="loader__counter" ref={counterRef}>0</span>
      </div>
      <div className="loader__label">
        <span className="label">Interior · Exterior · Architecture</span>
      </div>
    </div>
  );
}
