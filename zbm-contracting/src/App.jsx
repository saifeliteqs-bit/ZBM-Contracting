import { useLenis } from './hooks/useLenis';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Services from './sections/Services';
import WhyChoose from './sections/WhyChoose';
import Projects from './sections/Projects';
import ProjectDetail from './sections/ProjectDetail';
import Process from './sections/Process';
import CTABanner from './sections/CTABanner';
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
          <WhyChoose />
          <Projects />
          <ProjectDetail />
          <Process />
          <CTABanner />
          <Contact />
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
