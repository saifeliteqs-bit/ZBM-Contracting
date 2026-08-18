import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import Loader from './components/Loader';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import TransitionBars from './components/TransitionBars';

import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Services from './sections/Services';
import Statement from './sections/Statement';
import Projects from './sections/Projects';
import FeaturedProject from './sections/FeaturedProject';
import InteriorExterior from './sections/InteriorExterior';
import Process from './sections/Process';
import VisualBreak from './sections/VisualBreak';
import WhyZBM from './sections/WhyZBM';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

import './styles/global.scss';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useLenis();

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <CustomCursor />

      <div className={`site ${loaded ? 'site--ready' : ''}`}>
        <Header />

        <main>
          <Hero />
          <About />
          <Stats />
          <Services />
          <TransitionBars />
          <Statement />
          <Projects />
          <FeaturedProject />
          <InteriorExterior />
          <Process />
          <VisualBreak />
          <WhyZBM />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
