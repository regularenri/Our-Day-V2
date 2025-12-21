import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 's1',
    no: '01',
    name: 'Live Painting',
    details: 'Olio su tela, dipinto dal vivo durante la cerimonia.',
    price: '€ 2.800',
    image: 'https://picsum.photos/seed/art/600/400'
  },
  {
    id: 's2',
    no: '02',
    name: 'Wedding Miniatures',
    details: 'Sculture in scala 1:12 del luogo o della torta.',
    price: '€ 1.200',
    image: 'https://picsum.photos/seed/mini/600/400'
  },
  {
    id: 's3',
    no: '03',
    name: 'Resin Bouquets',
    details: 'Incapsulamento floreale in blocchi di resina UV.',
    price: '€ 850',
    image: 'https://picsum.photos/seed/resin/600/400'
  }
];

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate position relative to the viewport or container
    // We'll use viewport client coordinates for fixed positioning of the preview
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="py-20 px-6 md:px-12 md:py-32 bg-linen relative z-20" onMouseMove={handleMouseMove} ref={listRef}>
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl mb-16 text-charcoal"
        >
          i nostri servizi
        </motion.h2>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-charcoal/20 text-xs uppercase tracking-widest text-charcoal/50 font-medium mb-4">
          <div className="col-span-1 hidden md:block">NO.</div>
          <div className="col-span-6 md:col-span-5">SERVIZIO</div>
          <div className="col-span-3 hidden md:block">DETTAGLI</div>
          <div className="col-span-6 md:col-span-3 text-right">A PARTIRE DA</div>
        </div>

        {/* List Items */}
        <div className="flex flex-col">
          {services.map((service) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
              className="grid grid-cols-12 gap-4 py-8 md:py-12 border-b border-charcoal/10 items-center cursor-trigger hover:bg-white/40 transition-colors duration-300 px-2 -mx-2 rounded-lg"
            >
              <div className="col-span-1 hidden md:block font-sans text-xs text-charcoal/40">{service.no}</div>
              <div className="col-span-6 md:col-span-5">
                <h3 className="font-serif text-3xl md:text-5xl text-charcoal italic">{service.name}</h3>
              </div>
              <div className="col-span-3 hidden md:block font-sans text-sm text-charcoal/70 max-w-[250px]">
                {service.details}
              </div>
              <div className="col-span-6 md:col-span-3 text-right font-serif text-xl md:text-2xl text-charcoal">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {hoveredService && (
          <motion.div
            className="pointer-events-none fixed z-30 hidden md:block overflow-hidden rounded-xl shadow-2xl w-[300px] h-[200px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePosition.x + 40, // Offset from cursor
              y: mousePosition.y - 100
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.1 }}
          >
            <img 
              src={hoveredService.image} 
              alt={hoveredService.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;