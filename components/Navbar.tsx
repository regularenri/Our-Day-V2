import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const whatsappUrl = "https://wa.me/1234567890"; // Replace with actual number

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-linen pointer-events-none"
    >
      {/* Mix-blend-difference ensures visibility on light/dark backgrounds, 
          but pointer-events-auto is needed on children to be clickable */}
      <div className="pointer-events-auto">
        <a href="#" className="font-serif text-2xl md:text-3xl italic font-bold tracking-tight text-charcoal md:text-linen mix-blend-normal">
          OUR DAY
        </a>
      </div>

      <div className="hidden md:flex gap-12 font-sans text-xs tracking-[0.2em] uppercase pointer-events-auto font-medium text-charcoal md:text-linen">
        {['STUDIO', 'PORTFOLIO', 'JOURNAL'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
            {item}
          </a>
        ))}
      </div>

      <div className="pointer-events-auto">
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-charcoal text-linen px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-300"
        >
          Contattaci
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;