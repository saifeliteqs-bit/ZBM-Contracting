import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { getLenis } from '../hooks/useLenis';
import { services } from '../data/services';
import './Header.scss';

const LOGO = '/images/zbm-logo-clean.png';

export default function Header() {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { t, lang, toggle } = useLanguage();

  const goTo = (id, block = 'start') => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: block === 'center' ? -180 : -78, duration: 1.05 });
    else target.scrollIntoView({ behavior: 'smooth', block });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const intro = gsap.from(headerRef.current, { opacity: 0, y: -18, duration: .8, delay: .2, ease: 'power3.out' });
    const trigger = ScrollTrigger.create({
      start: 80,
      end: 'max',
      onUpdate: () => setScrolled(window.scrollY > 80),
    });
    return () => { intro.kill(); trigger.kill(); };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menuRef.current, { opacity: 1, duration: .3 });
      gsap.fromTo('.menu-link', { y: 52, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .07, delay: .08, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      if (menuRef.current) gsap.to(menuRef.current, { opacity: 0, duration: .22 });
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navIds = ['about', 'services', 'projects', 'process', 'contact'];

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <button className="header__logo" onClick={() => goTo('hero')} aria-label="Go to top">
            <img src={LOGO} alt="ZBM Contracting" />
          </button>

          <nav className="header__nav" aria-label="Primary navigation">
            {t.nav.links.map((link, i) => navIds[i] === 'services' ? (
              <div className="header__dropdown" key={link}>
                <button className="header__link header__link--services" onClick={() => goTo('services')}>
                  {link}<span className="header__dropdown-arrow" aria-hidden="true" />
                </button>
                <div className="header__dropdown-menu">
                  <div className="header__dropdown-grid">
                    {services.map((service) => (
                      <button key={service.number} className="header__dropdown-item" onClick={() => goTo(`service-${service.number}`, 'center')}>
                        <span>{service.number}</span>{service.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button key={link} className="header__link" onClick={() => goTo(navIds[i])}>{link}</button>
            ))}
          </nav>

          <div className="header__right">
            <button className="lang-toggle" onClick={toggle}>{lang === 'en' ? 'عربي' : 'EN'}</button>
            <button className="header__cta" onClick={() => goTo('contact')}>{t.nav.cta} ↗</button>
            <button className={`header__burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span /><span /></button>
          </div>
        </div>
      </header>

      <div ref={menuRef} className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          <nav className="mobile-menu__nav">
            {t.nav.links.map((link, i) => (
              <div key={link} className="line-mask">
                <button className="menu-link" onClick={() => { setMenuOpen(false); setTimeout(() => goTo(navIds[i]), 250); }}>{link}</button>
                {navIds[i] === 'services' && (
                  <div className="mobile-services">
                    {services.map((service) => (
                      <button key={service.number} className="mobile-services__item" onClick={() => { setMenuOpen(false); setTimeout(() => goTo(`service-${service.number}`, 'center'), 250); }}>
                        <span>{service.number}</span>{service.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <button className="lang-toggle lang-toggle--mobile" onClick={toggle}>{lang === 'en' ? 'عربي — Arabic' : 'EN — English'}</button>
          </div>
        </div>
      </div>
    </>
  );
}
