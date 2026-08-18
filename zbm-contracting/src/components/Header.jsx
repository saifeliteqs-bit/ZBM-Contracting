import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import zbmLogo from '../assets/zbm-logo.png';
import { siteContent } from '../data/siteContent';
import './Header.scss';

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Appear on load
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 2.2,
      ease: 'power3.out',
    });

    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => setScrolled(self.progress > 0),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.menu-link',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.15, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      if (menuRef.current) {
        gsap.to(menuRef.current, { opacity: 0, duration: 0.3 });
      }
    }
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id.toLowerCase());
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
      >
        <div className="header__inner">
          <a href="/" className="header__logo">
            <img src={zbmLogo} alt="ZBM Contracting" />
          </a>

          <nav className="header__nav">
            {siteContent.nav.links.map((link) => (
              <button
                key={link}
                className="header__link"
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="header__right">
            <button
              className="header__cta"
              onClick={() => scrollTo('contact')}
            >
              {siteContent.nav.cta} ↗
            </button>
            <button
              className={`header__burger ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
      >
        <div className="mobile-menu__inner">
          <nav className="mobile-menu__nav">
            {siteContent.nav.links.map((link) => (
              <div key={link} className="line-mask">
                <button
                  className="menu-link"
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </button>
              </div>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <p className="label text-taupe">Dubai, UAE</p>
            <p className="label text-taupe" style={{ marginTop: 8 }}>Interior · Exterior · Architecture</p>
          </div>
        </div>
      </div>
    </>
  );
}
