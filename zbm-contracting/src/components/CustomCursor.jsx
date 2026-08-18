import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
    };

    const tick = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      gsap.set(circle, { x: circleX, y: circleY });
    };

    gsap.ticker.add(tick);
    window.addEventListener('mousemove', onMove);

    // Hover states
    const addHover = (selector, labelText, size = 80) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(circle, { width: size, height: size, duration: 0.35, ease: 'power2.out' });
          if (labelText && label) {
            label.textContent = labelText;
            gsap.to(label, { opacity: 1, duration: 0.2 });
          }
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(circle, { width: 44, height: 44, duration: 0.35, ease: 'power2.out' });
          if (label) gsap.to(label, { opacity: 0, duration: 0.2 });
        });
      });
    };

    // Apply after DOM ready
    setTimeout(() => {
      addHover('.project-card', 'VIEW', 100);
      addHover('.service-item', 'EXPLORE', 80);
      addHover('a, button', '', 64);
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div className="cursor__dot" ref={dotRef} />
      <div className="cursor__circle" ref={circleRef}>
        <span className="cursor__label" ref={labelRef} />
      </div>
    </>
  );
}
