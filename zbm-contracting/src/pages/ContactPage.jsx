import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactPage.scss";

const HERO_IMG = "/images/hero-04.webp";

const contactInfo = [
  {
    icon: "phone",
    title: "Call Us",
    lines: ["+971 4 2456 7234", "+971 56 383 0202"],
    hrefs: ["tel:+97142456723", "tel:+971563830202"],
  },
  {
    icon: "email",
    title: "Email Us",
    lines: ["info@zbmcontracting.com"],
    hrefs: ["mailto:info@zbmcontracting.com"],
  },
  {
    icon: "location",
    title: "Visit Us",
    lines: ["Dubai, United Arab Emirates"],
    hrefs: [null],
  },
  {
    icon: "clock",
    title: "Working Hours",
    lines: ["Mon - Sat: 8:00 AM - 6:00 PM", "Sunday: Closed"],
    hrefs: [null, null],
  },
];

const faqs = [
  {
    q: "How do I get a quote for my project?",
    a: "Fill out the form on this page or call us directly. We will arrange a free site visit, understand your requirements, and provide a detailed, itemized quote within 3-5 working days.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Dubai and the wider UAE, including Abu Dhabi, Sharjah and the Northern Emirates. Our team is based in Dubai and handles projects of all sizes across the region.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. A bathroom renovation may take 2-3 weeks, a full villa renovation 10-16 weeks, and a commercial fit-out 6-12 weeks. We provide a clear timeline before any work begins.",
  },
  {
    q: "Do you handle design as well as execution?",
    a: "Yes. Our in-house team covers everything from initial concept and 3D visualization through material selection, construction and final finishing. One team, one point of contact.",
  },
  {
    q: "What is your payment structure?",
    a: "We work with milestone-based payments tied to project progress. You will receive a transparent breakdown upfront so you know exactly what each phase costs before we begin.",
  },
];

const iconPaths = {
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
};

function FAQItem({ faq, index, active, toggle }) {
  return (
    <div className={`cp-faq__item ${active ? "open" : ""}`}>
      <button className="cp-faq__question" onClick={() => toggle(index)}>
        <span>{faq.q}</span>
        <span className="cp-faq__icon">{active ? "\u2212" : "+"}</span>
      </button>
      <div className="cp-faq__answer">
        <p>{faq.a}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const pageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will be in touch shortly.");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".cp-hero__heading span",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".cp-hero__sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.55 }
      );

      gsap.fromTo(".cp-info__card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".cp-info", start: "top 82%" },
        }
      );

      gsap.fromTo(".cp-form-section__left > *, .cp-form-section__form > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: ".cp-form-section", start: "top 78%" },
        }
      );

      gsap.fromTo(".cp-faq__item",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".cp-faq", start: "top 82%" },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={pageRef}>

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero__bg">
          <img src={HERO_IMG} alt="ZBM Contact" />
          <div className="cp-hero__overlay" />
        </div>
        <div className="cp-hero__content container">
          <p className="cp-hero__eyebrow">Contact Us</p>
          <h1 className="cp-hero__heading">
            <span className="line-mask"><span>Let us bring your</span></span>
            <span className="line-mask"><span>vision to life.</span></span>
          </h1>
          <p className="cp-hero__sub">
            Whether you have a clear brief or just an idea, we are here to
            listen, advise and deliver. Get in touch to start the conversation.
          </p>
        </div>
        <div className="cp-hero__breadcrumb container">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="cp-info">
        <div className="container">
          <div className="cp-info__grid">
            {contactInfo.map((info) => (
              <div key={info.title} className="cp-info__card">
                <div className="cp-info__icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d={iconPaths[info.icon]} />
                  </svg>
                </div>
                <h3 className="cp-info__title">{info.title}</h3>
                <div className="cp-info__lines">
                  {info.lines.map((line, i) =>
                    info.hrefs[i] ? (
                      <a key={i} href={info.hrefs[i]} className="cp-info__line cp-info__line--link">
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="cp-info__line">{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="cp-form-section">
        <div className="container">
          <div className="cp-form-section__inner">
            <div className="cp-form-section__left">
              <p className="cp-form-section__eyebrow">Send Us a Message</p>
              <h2 className="cp-form-section__heading">
                Tell us about your project and we will get back to you within 24 hours.
              </h2>
              <p className="cp-form-section__desc">
                Share as much detail as you can — property type, scope of work,
                preferred timeline and budget range. The more we know upfront, the
                more useful our initial response will be.
              </p>
              <div className="cp-form-section__trust">
                <div className="cp-form-section__trust-item">
                  <span className="cp-form-section__trust-num">24h</span>
                  <span className="cp-form-section__trust-label">Response Time</span>
                </div>
                <div className="cp-form-section__trust-item">
                  <span className="cp-form-section__trust-num">Free</span>
                  <span className="cp-form-section__trust-label">Site Visit</span>
                </div>
                <div className="cp-form-section__trust-item">
                  <span className="cp-form-section__trust-num">No</span>
                  <span className="cp-form-section__trust-label">Hidden Costs</span>
                </div>
              </div>
            </div>

            <form className="cp-form-section__form" onSubmit={handleSubmit}>
              <div className="cp-form__row">
                <div className="cp-form__field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="cp-form__field">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="cp-form__row">
                <div className="cp-form__field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+971 XX XXX XXXX" />
                </div>
                <div className="cp-form__field">
                  <label>Project Type</label>
                  <select defaultValue="">
                    <option value="" disabled>Select type</option>
                    <option>Villa Renovation</option>
                    <option>Apartment Fit-Out</option>
                    <option>Commercial Office</option>
                    <option>Restaurant / Retail</option>
                    <option>Exterior / Landscape</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="cp-form__row">
                <div className="cp-form__field">
                  <label>Service Required</label>
                  <select defaultValue="">
                    <option value="" disabled>Select service</option>
                    <option>Interior Design</option>
                    <option>Exterior Design</option>
                    <option>Fit-Out and Execution</option>
                    <option>Renovation</option>
                    <option>MEP Works</option>
                    <option>Turnkey Solution</option>
                  </select>
                </div>
                <div className="cp-form__field">
                  <label>Budget Range</label>
                  <select defaultValue="">
                    <option value="" disabled>Select range</option>
                    <option>Under AED 100,000</option>
                    <option>AED 100,000 - 300,000</option>
                    <option>AED 300,000 - 500,000</option>
                    <option>AED 500,000 - 1,000,000</option>
                    <option>Above AED 1,000,000</option>
                  </select>
                </div>
              </div>
              <div className="cp-form__field">
                <label>Project Details</label>
                <textarea placeholder="Tell us about your project, timeline and any specific requirements..." rows={5} />
              </div>
              <button type="submit" className="cp-form__submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="cp-map">
        <iframe
          title="ZBM Contracting Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68279754!2d54.897847703!3d25.076280454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1700000000000"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ── FAQ ── */}
      <section className="cp-faq">
        <div className="container">
          <div className="cp-faq__inner">
            <div className="cp-faq__header">
              <p className="cp-faq__eyebrow">Common Questions</p>
              <h2 className="cp-faq__heading">Frequently asked questions.</h2>
            </div>
            <div className="cp-faq__list">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} active={openFaq === i} toggle={toggleFaq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cp-cta">
        <div className="cp-cta__bg">
          <img src="/images/zbm_17.png" alt="ZBM project" />
          <div className="cp-cta__overlay" />
        </div>
        <div className="cp-cta__content container">
          <h2 className="cp-cta__heading">Ready to start your project?</h2>
          <p className="cp-cta__sub">
            Call us directly for an immediate conversation about your space.
          </p>
          <div className="cp-cta__actions">
            <a href="tel:+971563830202" className="cp-cta__btn cp-cta__btn--primary">
              Call: +971 56 383 0202
            </a>
            <a href="https://wa.me/971563830202" target="_blank" rel="noopener noreferrer" className="cp-cta__btn cp-cta__btn--outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
