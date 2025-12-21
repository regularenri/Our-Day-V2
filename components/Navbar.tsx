import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = "https://wa.me/1234567890"; // Replace with actual number

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Servizi', path: '/servizi' },
    { name: 'Galleria', path: '/galleria' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    opened: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 text-charcoal pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Link to="/" className="font-serif text-2xl md:text-3xl italic font-bold tracking-tight text-charcoal mix-blend-normal">
            OUR DAY
          </Link>
        </div>

        <div className="hidden md:flex gap-12 font-sans text-xs tracking-[0.2em] uppercase pointer-events-auto font-medium text-charcoal">
          {navLinks.map((item) => (
            <Link key={item.name} to={item.path} className="hover:opacity-60 transition-opacity">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="pointer-events-auto flex items-center">
          {/* Desktop CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-charcoal text-linen px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-300"
          >
            Contattaci
          </a>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            aria-label="Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-charcoal"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-charcoal"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-charcoal"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal z-[40] flex flex-col justify-center items-center pointer-events-auto md:hidden"
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-4xl italic text-linen hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-8">
                <a
                  href={whatsappUrl}
                  onClick={() => setIsOpen(false)}
                  className="bg-linen text-charcoal px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold"
                >
                  Contattaci
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;