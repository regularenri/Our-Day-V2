import { motion, Variants } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

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
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?fm=jpg&q=80&w=2600&auto=format&fit=crop"
            alt="Wedding Celebration Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Light Overlay for Harmony with Navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-linen via-linen/40 to-transparent" />
      </div>

      <div className="relative z-10 px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-32 w-full max-w-[1600px] mx-auto flex flex-col flex-1 justify-center">
        {/* Headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <AnimatedTitle
            tag="h1"
            text="Preserviamo la bellezza effimera della vostra unione."
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-charcoal mb-8"
          />

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <p className="font-sans text-charcoal/70 text-sm md:text-base max-w-md leading-relaxed">
              Specializzati nel tradurre i momenti fugaci del vostro matrimonio in manufatti tangibili ed eterni attraverso pittura, miniature e resina.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border-b border-charcoal/20 pb-1 hover:border-charcoal transition-all text-charcoal"
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]"
        >
          <div className="relative group overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white/40 backdrop-blur-md p-8 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <img src="https://picsum.photos/seed/art-p/600/600" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="Detail" />
            </div>
            <div className="relative z-10 text-charcoal">
              <span className="uppercase text-[10px] tracking-widest mb-2 block opacity-60">Servizio 01</span>
              <h3 className="font-serif text-2xl italic">Live Painting</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white/40 backdrop-blur-md p-8 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <img src="https://picsum.photos/seed/mini-p/600/600" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="Detail" />
            </div>
            <div className="relative z-10 text-charcoal">
              <span className="uppercase text-[10px] tracking-widest mb-2 block opacity-60">Servizio 02</span>
              <h3 className="font-serif text-2xl italic">Le Miniature</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white/40 backdrop-blur-md p-8 flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <img src="https://picsum.photos/seed/resin-p/600/600" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="Detail" />
            </div>
            <div className="relative z-10 text-charcoal text-left">
              <span className="uppercase text-[10px] tracking-widest mb-2 block opacity-60">Servizio 03</span>
              <h3 className="font-serif text-2xl italic">Conservazione</h3>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 flex flex-wrap gap-8 justify-between items-center text-charcoal/50 font-sans uppercase text-[10px] tracking-[0.3em]">
          <span>40+ Ore per pezzo</span>
          <span>100% Fatto a mano</span>
          <span>Disponibilità Limitata</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;