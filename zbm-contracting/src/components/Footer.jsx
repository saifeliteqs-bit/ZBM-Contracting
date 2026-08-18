import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import zbmLogo from '../assets/zbm-logo.png';
import { siteContent } from '../data/siteContent';
import './Footer.scss';

export default function Footer() {
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 20, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__top container">
        <div className="footer__brand">
          <img src={zbmLogo} alt="ZBM Contracting" className="footer__logo" />
          <p className="body-sm text-taupe footer__tagline">
            Interior · Exterior · Architecture<br />Dubai, UAE
          </p>
        </div>

        <nav className="footer__nav">
          {siteContent.nav.links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="footer__link label"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href={`tel:${siteContent.contact.details.phone}`} className="body-sm text-taupe footer__contact-link">
            {siteContent.contact.details.phone}
          </a>
          <a href={`mailto:${siteContent.contact.details.email}`} className="body-sm text-taupe footer__contact-link">
            {siteContent.contact.details.email}
          </a>
          <p className="body-sm text-taupe">{siteContent.contact.details.location}</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="footer__wordmark-wrap">
        <h2 className="footer__wordmark" ref={wordmarkRef}>
          ZBM CONTRACTING
        </h2>
      </div>

      <div className="footer__bottom container">
        <p className="label text-muted footer__copy">
          © {new Date().getFullYear()} ZBM Contracting. All rights reserved.
        </p>
        <p className="label text-muted">
          Interior &amp; Exterior Design · Dubai, UAE
        </p>
      </div>
    </footer>
  );
}
