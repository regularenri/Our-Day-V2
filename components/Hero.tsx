import React from 'react';
import { motion, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/1234567890";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-32 w-full max-w-[1600px] mx-auto min-h-screen flex flex-col justify-center">
      
      {/* Headline */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mb-16 md:mb-24 text-center md:text-left"
      >
        <motion.h1 
          variants={itemVariants}
          className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-charcoal mb-8"
        >
          Preserviamo la <span className="italic text-sage font-light">bellezza effimera</span> <br className="hidden md:block"/>
          della vostra unione.
        </motion.h1>
        
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <p className="font-sans text-charcoal/70 text-sm md:text-base max-w-md leading-relaxed">
            Specializzati nel tradurre i momenti fugaci del vostro matrimonio in manufatti tangibili ed eterni attraverso pittura, miniature e resina.
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border-b border-charcoal/30 pb-1 hover:border-charcoal transition-all"
          >
            <span className="uppercase text-xs tracking-widest font-bold">Inizia il tuo viaggio</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]"
      >
        {/* Card 1: Live Painting */}
        <div className="relative group overflow-hidden rounded-[2rem] md:col-span-1 h-[400px] md:h-full">
          <img 
            src="https://picsum.photos/seed/wedding1/800/1200" 
            alt="Live Painting" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-0 left-0 p-8 text-linen">
            <span className="uppercase text-xs tracking-widest mb-2 block opacity-80">Servizio 01</span>
            <h3 className="font-serif text-3xl italic">Live Painting</h3>
          </div>
        </div>

        {/* Card 2: Miniatures */}
        <div className="relative group overflow-hidden rounded-[2rem] md:col-span-1 h-[400px] md:h-full bg-soft-terracotta/30 flex flex-col items-center justify-center p-8 border border-charcoal/5">
          <div className="w-48 h-48 md:w-64 md:h-64 relative z-10">
            <img 
              src="https://picsum.photos/seed/cake/600/600" 
              alt="Miniatures" 
              className="w-full h-full object-cover rounded-full shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 ease-out"
            />
          </div>
          <div className="mt-8 text-center text-charcoal relative z-10">
            <span className="uppercase text-xs tracking-widest mb-2 block opacity-60">Servizio 02</span>
            <h3 className="font-serif text-3xl">Le Miniature</h3>
            <p className="mt-2 text-xs opacity-70 max-w-[200px] mx-auto">Repliche in scala 1:12 scolpite a mano con ossessione per il dettaglio.</p>
          </div>
           {/* Decorative bg element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
        </div>

        {/* Card 3: Resin */}
        <div className="relative group overflow-hidden rounded-[2rem] md:col-span-1 h-[400px] md:h-full">
           <img 
            src="https://picsum.photos/seed/flowers/800/1200" 
            alt="Resin Bouquet" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Glass/Blur Effect */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/10 group-hover:backdrop-blur-none transition-all duration-700" />
          
          <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
            <div className="self-end w-12 h-12 border border-white/30 rounded-full flex items-center justify-center animate-spin-slow">
              <span className="text-[8px] uppercase tracking-widest">★</span>
            </div>
            <div>
              <span className="uppercase text-xs tracking-widest mb-2 block opacity-80">Servizio 03</span>
              <h3 className="font-serif text-3xl">Conservazione<br/>Bouquet</h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div className="mt-16 pt-8 border-t border-charcoal/10 flex flex-wrap gap-8 justify-between items-center text-charcoal/80 font-sans uppercase text-xs tracking-widest">
        <span>40+ Ore per pezzo</span>
        <span>100% Fatto a mano</span>
        <span>Disponibilità Limitata</span>
      </div>

    </section>
  );
};

export default Hero;