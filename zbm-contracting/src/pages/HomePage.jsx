import Hero from '../sections/Hero';
import About from '../sections/About';
import Stats from '../sections/Stats';
import Services from '../sections/Services';
import WhyChoose from '../sections/WhyChoose';
import Projects from '../sections/Projects';
import Process from '../sections/Process';
import CTABanner from '../sections/CTABanner';
import Contact from '../sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <WhyChoose />
      <Projects />
      <Process />
      <CTABanner />
      <Contact />
    </>
  );
}
