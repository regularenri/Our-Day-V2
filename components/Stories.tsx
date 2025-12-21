import React from 'react';
import { motion } from 'framer-motion';

const Stories: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white/50">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="uppercase text-xs tracking-[0.2em] text-gold mb-4 block font-bold"
          >
            Testimonianze
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl text-charcoal"
          >
            Storie di Amore <br/><span className="italic text-sage">e Artigianato</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/couple/800/1000" 
                alt="Happy Couple" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linen rounded-full flex items-center justify-center text-xs uppercase tracking-widest text-charcoal border border-charcoal/10 animate-spin-slow hidden md:flex">
              Our Day
            </div>
          </motion.div>

          {/* Quote Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <svg className="w-12 h-12 text-gold mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
            </svg>
            <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
              "Il dipinto dal vivo ha catturato l'anima della nostra cerimonia. Un cimelio che custodiremo per sempre."
            </h3>
            <div className="font-sans">
              <p className="font-bold text-charcoal uppercase tracking-widest text-sm">Giulia & Marco</p>
              <p className="text-charcoal/60 text-xs mt-1">Lago di Como, Settembre 2023</p>
            </div>
            
            <a 
               href="https://wa.me/1234567890" 
               className="mt-12 self-start px-8 py-4 border border-charcoal/20 rounded-full uppercase text-xs tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              Leggi altre storie
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stories;