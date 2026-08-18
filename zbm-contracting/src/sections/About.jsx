import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/siteContent';
import './About.scss';

const ABOUT_IMG_1 = 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=90&auto=format&fit=crop';
const ABOUT_IMG_2 = 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=90&auto=format&fit=crop';

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const imgInnerRef = useRef(null);
  const img2Ref = useRef(null);
  const heading1 = useRef(null);
  const heading2 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // Heading line reveals
      [heading1.current, heading2.current].forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12,
          }
        );
      });

      // Main image clip reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image inner scale
      gsap.fromTo(
        imgInnerRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          duration: 2.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Second small image
      gsap.fromTo(
        img2Ref.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.0,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      );

      // Parallax on main image
      gsap.to(imgInnerRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={sectionRef} id="about">
      <div className="about__inner container">

        {/* Left text column */}
        <div className="about__left">
          <p className="label about__label text-muted">{siteContent.about.label}</p>

          <h2 className="about__heading display-lg">
            {siteContent.about.heading.map((line, i) => (
              <span className="line-mask" key={i}>
                <span ref={i === 0 ? heading1 : heading2}>{line}</span>
              </span>
            ))}
          </h2>

          <div className="about__body">
            <p className="body-lg">{siteContent.about.body}</p>
            <p className="body-lg">{siteContent.about.subBody}</p>
          </div>

          <div className="about__small-img" ref={img2Ref}>
            <img src={ABOUT_IMG_2} alt="Exterior architecture" />
          </div>
        </div>

        {/* Right image column */}
        <div className="about__right">
          <div className="about__img-wrap" ref={imgRef}>
            <img ref={imgInnerRef} src={ABOUT_IMG_1} alt="Premium interior design" />
          </div>
        </div>

      </div>
    </section>
  );
}
