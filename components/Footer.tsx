import React from 'react';

const Footer: React.FC = () => {
  const whatsappUrl = "https://wa.me/1234567890";

  return (
    <footer className="bg-charcoal text-linen pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] mt-12 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto flex flex-col h-full">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <div>
            <h3 className="font-serif text-4xl md:text-5xl mb-6">
              Pronti a rendere i vostri <span className="italic text-gold">ricordi eterni?</span>
            </h3>
            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-linen text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform"
            >
              Inizia il progetto
            </a>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end">
             <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">Collaborazioni</h4>
             <p className="font-serif text-2xl md:text-3xl text-right md:text-left hover:text-gold transition-colors cursor-pointer">
               Siamo aperti a collaborazioni <br/> con Wedding Planners.
             </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 font-sans text-xs tracking-widest uppercase opacity-70">
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">Pinterest</a>
            <a href="#" className="hover:text-gold transition-colors">TikTok</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-gold transition-colors">Studio</a>
            <a href="#" className="hover:text-gold transition-colors">Processo</a>
            <a href="#" className="hover:text-gold transition-colors">FAQ</a>
          </div>
          <div className="flex flex-col gap-4">
             <span>Via Etnea, 123</span>
             <span>Catania, Italia</span>
             <span>hello@ourday.it</span>
          </div>
        </div>

        {/* Massive Branding */}
        <div className="border-t border-white/10 pt-12">
            <h1 className="font-serif text-[18vw] leading-none text-center opacity-30 select-none pointer-events-none tracking-tighter mix-blend-overlay">
                OUR DAY
            </h1>
            <div className="flex justify-between mt-8 text-[10px] md:text-xs uppercase tracking-widest opacity-40">
                <span>EST. 2023 • CATANIA, ITALIA</span>
                <span>© 2024 OUR DAY STUDIO. TUTTI I DIRITTI RISERVATI.</span>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;