import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import zbmLogo from '../assets/zbm-logo.png';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Footer.scss';

export default function Footer() {
  const { t, isAr } = useLanguage();
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const navIds = ['about','services','projects','process','contact'];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(wordmarkRef.current, { yPercent: 20, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__top container">
        <div className="footer__brand">
          {/* Logo — inverted for dark background */}
          <div className="footer__logo-wrap">
            <img src={zbmLogo} alt="ZBM Contracting" className="footer__logo" />
          </div>
          <p className="body-sm text-taupe footer__tagline">
            {t.footer.tagline}<br />{t.footer.location}
          </p>
        </div>

        <nav className="footer__nav">
          {t.nav.links.map((link, i) => (
            <a key={i} href={`#${navIds[i]}`} className="footer__link label">{link}</a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href="tel:+97100000000" className="body-sm text-taupe footer__contact-link">+971 XX XXX XXXX</a>
          <a href="mailto:info@zbmcontracting.com" className="body-sm text-taupe footer__contact-link">info@zbmcontracting.com</a>
          <p className="body-sm text-taupe">{t.footer.location}</p>
        </div>
      </div>

      <div className="footer__wordmark-wrap">
        <h2 className="footer__wordmark" ref={wordmarkRef}>ZBM CONTRACTING</h2>
      </div>

      <div className="footer__bottom container">
        <p className="label text-muted">© {new Date().getFullYear()} ZBM Contracting. {t.footer.copy}</p>
        <p className="label text-muted">Interior & Exterior Design · Dubai, UAE</p>
      </div>
    </footer>
  );
}
