import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProject } from '../data/projects';
import './FeaturedProject.scss';

export default function FeaturedProject() {
  const sectionRef  = useRef(null);
  const wrapRef     = useRef(null);
  const imgContRef  = useRef(null);
  const imgRef      = useRef(null);
  const textColRef  = useRef(null);
  const titleRef    = useRef(null);
  const metaRef     = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // ── Entry: image clip reveal ──
      gsap.fromTo(imgContRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.3, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
      gsap.fromTo(imgRef.current,
        { scale: 1.14 },
        {
          scale: 1, duration: 2.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );

      // ── Entry: heading lines ──
      const lines = titleRef.current?.querySelectorAll('.line-mask span');
      if (lines?.length) {
        gsap.fromTo(lines,
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.0, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
          }
        );
      }

      // ── Entry: meta ──
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: metaRef.current, start: 'top 85%' },
        }
      );

      // ── Cinematic expand: pin section, image grows to fill ──
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=120vh',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        tl.to(textColRef.current, { opacity: 0, x: -48, duration: 0.5 }, 0)
          .to(imgContRef.current, {
            '--img-w': '100%',
            duration: 1.2,
          }, 0)
          .to(imgRef.current, { scale: 1.04, duration: 1.2 }, 0);

        // Use a CSS custom property approach instead of getBoundingClientRect
        gsap.set(imgContRef.current, { '--img-w': '100%' });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="fp" ref={sectionRef} id="featured">
      <div className="fp__pre container">
        <p className="label text-muted">Featured Project</p>
      </div>

      <div className="fp__wrap" ref={wrapRef}>
        <div className="fp__inner container">
          {/* Left text */}
          <div className="fp__text" ref={textColRef}>
            <div ref={titleRef}>
              <h2 className="fp__title display-lg">
                <span className="line-mask"><span>{featuredProject.title}</span></span>
              </h2>
            </div>

            <div className="fp__meta" ref={metaRef}>
              <div className="fp__meta-row">
                <span className="label text-muted">Location</span>
                <span className="body-sm">{featuredProject.location}</span>
              </div>
              <div className="fp__meta-row">
                <span className="label text-muted">Year</span>
                <span className="body-sm">{featuredProject.year}</span>
              </div>
              <div className="fp__tags">
                {featuredProject.categories.map((cat, i) => (
                  <span key={i} className="fp__tag label">{cat}</span>
                ))}
              </div>
              <p className="body-sm fp__desc">{featuredProject.description}</p>
            </div>
          </div>

          {/* Right image — expands to full screen */}
          <div className="fp__img-cont" ref={imgContRef}>
            <img ref={imgRef} src={featuredProject.image} alt={featuredProject.title} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
