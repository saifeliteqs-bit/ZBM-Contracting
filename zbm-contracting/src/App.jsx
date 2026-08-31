import { useLenis } from './hooks/useLenis';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Services from './sections/Services';
import Statement from './sections/Statement';
import Projects from './sections/Projects';
import FeaturedProject from './sections/FeaturedProject';
import InteriorExterior from './sections/InteriorExterior';
import Process from './sections/Process';
import WhyZBM from './sections/WhyZBM';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

import './styles/global.scss';

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />

      <div className="site site--ready">
        <Header />

        <main>
          <Hero />
          <About />
          <Stats />
          <Services />
          <Statement />
          <Projects />
          <FeaturedProject />
          <InteriorExterior />
          <Process />
          <WhyZBM />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
