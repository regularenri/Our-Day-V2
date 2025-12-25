import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../types';
import AnimatedTitle from './AnimatedTitle';

const services: ServiceItem[] = [
  {
    id: 's1',
    no: '01',
    name: 'Live Painting',
    details: 'Catturiamo l\'essenza del vostro amore su tela, dal vivo, trasformando le emozioni del momento in un\'opera d\'arte eterna che prenderà vita sotto i vostri occhi.',
    price: '€ 2.800',
    image: 'https://picsum.photos/seed/art/600/400'
  },
  {
    id: 's2',
    no: '02',
    name: 'Wedding Miniatures',
    details: 'Preziose sculture in scala 1:12 che riproducono fedelmente la location o la torta nuziale, piccoli capolavori di precisione per custodire un grande ricordo.',
    price: '€ 1.200',
    image: 'https://picsum.photos/seed/mini/600/400'
  },
  {
    id: 's3',
    no: '03',
    name: 'Resin Bouquets',
    details: 'Preserviamo la delicatezza del vostro bouquet incapsulandolo in blocchi di resina cristallina, trasformando i fiori del vostro sì in gioielli di design.',
    price: '€ 850',
    image: 'https://picsum.photos/seed/resin/600/400'
  },
  {
    id: 's4',
    no: '04',
    name: 'Luxury Stationery',
    details: 'Partecipazioni, menu e segnaposto realizzati con carte pregiate, calligrafia a mano e dettagli in oro, per annunciare il vostro evento con un tocco di esclusività.',
    price: '€ 500',
    image: 'https://picsum.photos/seed/stat/600/400'
  },
  {
    id: 's5',
    no: '05',
    name: 'Event Styling',
    details: 'Curiamo l\'estetica del vostro evento in ogni minimo dettaglio, creando atmosfere suggestive e coerenti che parlano di voi e del vostro stile unico.',
    price: 'Su preventivo',
    image: 'https://picsum.photos/seed/event/600/400'
  },
  {
    id: 's6',
    no: '06',
    name: 'Custom Favors',
    details: 'Bomboniere e cadeau de mariage personalizzati, oggetti di design pensati per ringraziare i vostri ospiti con un dono che non verrà dimenticato.',
    price: 'Su preventivo',
    image: 'https://picsum.photos/seed/favor/600/400'
  }
];

interface ServicesProps {
  isPreview?: boolean;
}

const Services: React.FC<ServicesProps> = ({ isPreview = false }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // GSAP QuickTo refs
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();

  useEffect(() => {
    // Only setup GSAP on desktop (lg and above)
    if (window.innerWidth < 1024 || !previewRef.current) return;

    // Center the element on the cursor
    gsap.set(previewRef.current, { xPercent: -50, yPercent: -50 });

    xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.1, ease: "power3" });
    yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.1, ease: "power3" });

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleInteraction = (id: string, type: 'enter' | 'leave' | 'click') => {
    if (type === 'enter') {
      setActiveId(id);
      // Animate preview in - faster duration
      if (previewRef.current) {
        gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" });
      }
    } else if (type === 'leave') {
      setActiveId(null);
      // Animate preview out - faster duration
      if (previewRef.current) {
        gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.in" });
      }
    } else if (type === 'click') {
      setActiveId(prev => prev === id ? null : id);
    }
  };

  // Handle container mouse leave to ensure preview hides
  const handleContainerLeave = () => {
    if (window.innerWidth >= 1024) {
      setActiveId(null);
      if (previewRef.current) {
        gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.in" });
      }
    }
  };

  const visibleServices = isPreview ? services.slice(0, 3) : services;
  const activeService = services.find(s => s.id === activeId);

  return (
    <section
      className="py-20 px-6 lg:px-12 lg:py-32 bg-linen relative z-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleContainerLeave}
      ref={containerRef}
    >
      <div className="max-w-[1400px] mx-auto">
        <AnimatedTitle
          tag="h2"
          text="i nostri servizi"
          className="font-serif text-5xl lg:text-7xl mb-12 lg:mb-16 text-charcoal"
        />

        <div className="flex flex-col border-t border-charcoal/20">
          {visibleServices.map((service) => {
            const isActive = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group border-b border-charcoal/20 cursor-pointer overflow-hidden relative"
                onMouseEnter={() => window.innerWidth >= 1024 && handleInteraction(service.id, 'enter')}
                onMouseLeave={() => window.innerWidth >= 1024 && handleInteraction(service.id, 'leave')}
                onClick={() => window.innerWidth < 1024 && handleInteraction(service.id, 'click')}
              >
                {/* Background hover effect (subtle) */}
                <div className={`absolute inset-0 bg-charcoal/5 transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />

                <div className="relative flex flex-col lg:flex-row lg:items-baseline py-6 lg:py-10 px-2 transition-colors duration-300">
                  {/* Number */}
                  <div className="text-xs lg:text-sm font-sans tracking-widest text-charcoal/50 w-12 lg:w-24 mb-2 lg:mb-0">
                    {service.no}
                  </div>

                  {/* Title & Mobile Accordion Indicator */}
                  <div className="flex-1 flex justify-between items-center pr-4">
                    <h3 className="font-serif text-3xl lg:text-5xl text-charcoal italic group-hover:pl-4 transition-all duration-300 leading-tight pb-1">
                      {service.name}
                    </h3>
                    <div className="lg:hidden text-charcoal/60">
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="hidden lg:block w-32 text-right font-serif text-xl text-charcoal/80">
                    {service.price}
                  </div>
                </div>

                {/* Accordion Semantic Content */}
                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-0 lg:pl-24 max-w-2xl text-charcoal/70 font-sans leading-relaxed text-sm lg:text-base pr-4">
                    {service.details}
                    <div className="lg:hidden mt-4 text-charcoal font-serif">
                      A partire da {service.price}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Discover More Button */}
        {isPreview && (
          <div className="mt-16 flex justify-center">
            <Link
              to="/servizi"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-charcoal/20 rounded-full overflow-hidden hover:border-charcoal/100 transition-colors duration-300"
            >
              <span className="relative z-10 font-sans text-xs uppercase tracking-widest font-medium group-hover:text-linen transition-colors duration-300">
                Scopri tutti i servizi
              </span>
              <div className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>
          </div>
        )}
      </div>

      {/* GSAP Image Preview (Desktop Only) */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 pointer-events-none z-30 hidden lg:block overflow-hidden rounded-lg shadow-2xl w-[350px] aspect-[4/3] border-4 border-white/50 opacity-0 scale-0 origin-center"
      >
        {activeService && (
          <img
            src={activeService.image}
            alt={activeService.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
};

export default Services;