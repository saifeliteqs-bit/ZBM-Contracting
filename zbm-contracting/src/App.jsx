import { Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

import './styles/global.scss';

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />

      <div className="site site--ready">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
