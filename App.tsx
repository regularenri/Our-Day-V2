import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import Galleria from './pages/Galleria';

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-linen min-h-screen text-charcoal font-sans selection:bg-gold selection:text-linen overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/galleria" element={<Galleria />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;