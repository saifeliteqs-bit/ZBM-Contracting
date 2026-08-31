import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import './Header.scss';

const LOGO = '/images/17618.gif';

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { t, lang, toggle } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(headerRef.current, { opacity: 0, y: -20, duration: 1, delay: 0.3, ease: 'power3.out' });
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => setScrolled(self.progress > 0),
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo('.menu-link', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.15, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      if (menuRef.current) gsap.to(menuRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [menuOpen]);

  const navIds = ['about', 'services', 'projects', 'process', 'contact'];

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <a href="/" className="header__logo">
            <img src={LOGO} alt="ZBM Contracting" />
          </a>

          <nav className="header__nav">
            {t.nav.links.map((link, i) => (
              <button key={i} className="header__link" onClick={() => {
                document.getElementById(navIds[i])?.scrollIntoView({ behavior: 'smooth' });
              }}>{link}</button>
            ))}
          </nav>

          <div className="header__right">
            <button className="lang-toggle" onClick={toggle}>
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button className="header__cta"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.nav.cta} ↗
            </button>
            <button className={`header__burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          <nav className="mobile-menu__nav">
            {t.nav.links.map((link, i) => (
              <div key={i} className="line-mask">
                <button className="menu-link" onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => document.getElementById(navIds[i])?.scrollIntoView({ behavior: 'smooth' }), 300);
                }}>{link}</button>
              </div>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <button className="lang-toggle lang-toggle--mobile" onClick={toggle}>
              {lang === 'en' ? 'عربي — Arabic' : 'EN — English'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
