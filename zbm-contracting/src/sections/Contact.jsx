import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/siteContent';
import './Contact.scss';

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact__line',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you. We will be in touch shortly.');
  };

  return (
    <section className="contact" ref={sectionRef} id="contact">
      <div className="contact__cta">
        <div className="container">
          <h2 className="contact__heading display-xl">
            {siteContent.contact.heading.map((line, i) => (
              <span className="line-mask" key={i}>
                <span className="contact__line">{line}</span>
              </span>
            ))}
          </h2>
          <p className="contact__sub body-lg text-taupe">
            {siteContent.contact.subheading}
          </p>
        </div>
      </div>

      <div className="contact__form-section">
        <div className="container">
          <div className="contact__grid">
            {/* Details */}
            <div className="contact__details">
              <div className="contact__detail-item">
                <span className="label text-muted">Phone</span>
                <a href={`tel:${siteContent.contact.details.phone}`} className="body-lg">
                  {siteContent.contact.details.phone}
                </a>
              </div>
              <div className="contact__detail-item">
                <span className="label text-muted">Email</span>
                <a href={`mailto:${siteContent.contact.details.email}`} className="body-lg">
                  {siteContent.contact.details.email}
                </a>
              </div>
              <div className="contact__detail-item">
                <span className="label text-muted">Location</span>
                <p className="body-lg">{siteContent.contact.details.location}</p>
              </div>
            </div>

            {/* Form */}
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <div className="contact__field">
                  <label className="label">Full Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="contact__field">
                  <label className="label">Email</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="contact__row">
                <div className="contact__field">
                  <label className="label">Phone</label>
                  <input type="tel" placeholder="+971 XX XXX XXXX" />
                </div>
                <div className="contact__field">
                  <label className="label">Project Type</label>
                  <select>
                    <option value="">Select type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>Office</option>
                  </select>
                </div>
              </div>
              <div className="contact__field">
                <label className="label">Service Required</label>
                <select>
                  <option value="">Select service</option>
                  <option>Interior Design</option>
                  <option>Exterior Design</option>
                  <option>Fit-Out & Execution</option>
                  <option>Renovation</option>
                  <option>Architectural Visualization</option>
                  <option>Full Project</option>
                </select>
              </div>
              <div className="contact__field">
                <label className="label">Message</label>
                <textarea placeholder="Tell us about your project..." rows={5} />
              </div>
              <button type="submit" className="contact__submit">
                Send Message ↗
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
