import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Footer.scss';

const LOGO = '/images/17618.gif';

// Social icons as inline SVG
const socialIcons = {
  facebook: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
  instagram: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 00-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
};

const Icon = ({ path, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d={path} />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const navIds = ['about', 'services', 'projects', 'process', 'contact'];

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

        {/* Brand */}
        <div className="footer__brand">
          <img src={LOGO} alt="ZBM Contracting" className="footer__logo" />
          <p className="body-sm text-taupe footer__tagline">
            Interior · Exterior · Renovation · Fit-Out<br />
            Dubai, United Arab Emirates
          </p>

          {/* Social icons */}
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook"><Icon path={socialIcons.facebook} /></a>
            <a href="#" className="footer__social" aria-label="Instagram"><Icon path={socialIcons.instagram} /></a>
            <a href="#" className="footer__social" aria-label="LinkedIn"><Icon path={socialIcons.linkedin} /></a>
            <a href="#" className="footer__social" aria-label="TikTok"><Icon path={socialIcons.tiktok} /></a>
          </div>
        </div>

        {/* Nav */}
        <nav className="footer__nav">
          <p className="label text-muted footer__col-title">Navigation</p>
          {t.nav.links.map((link, i) => (
            <a key={i} href={`#${navIds[i]}`} className="footer__link">{link}</a>
          ))}
        </nav>

        {/* Contact */}
        <div className="footer__contact">
          <p className="label text-muted footer__col-title">Get in Touch</p>
          <a href="tel:+97142456723" className="footer__link">+971 4 24567234</a>
          <a href="tel:+971563830202" className="footer__link">+971 56 3830202</a>
          <a href="mailto:info@zbmcontracting.com" className="footer__link">info@zbmcontracting.com</a>
          <p className="body-sm text-taupe">Dubai, UAE</p>
        </div>

      </div>

      <div className="footer__wordmark-wrap">
        <h2 className="footer__wordmark" ref={wordmarkRef}>ZBM CONTRACTING</h2>
      </div>

      <div className="footer__bottom container">
        <p className="label text-muted">© {new Date().getFullYear()} ZBM Contracting LLC. All rights reserved.</p>
        <p className="label text-muted">We build the future.</p>
      </div>
    </footer>
  );
}
