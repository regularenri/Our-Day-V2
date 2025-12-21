import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
import { horizontalLoop } from '../utils/gsapHelpers';

gsap.registerPlugin(Draggable);

const testimonials = [
  {
    id: 1,
    name: "Giulia & Marco",
    role: "Sposi - Lago di Como",
    quote: "Il dipinto dal vivo ha catturato l'anima della nostra cerimonia. Un cimelio che custodiremo per sempre.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Elena & Stefano",
    role: "Sposi - Toscana",
    quote: "Le miniature sono curate in ogni minimo dettaglio. È come avere un pezzetto di quella giornata magica sempre con noi.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Sofia & Davide",
    role: "Sposi - Costiera Amalfitana",
    quote: "La conservazione del bouquet in resina è semplicemente stupenda. Un'opera d'arte che decora la nostra nuova casa.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "Alessia & Riccardo",
    role: "Sposi - Roma",
    quote: "Professionalità e talento incredibili. Hanno saputo interpretare i nostri desideri alla perfezione.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "Chiara & Alessandro",
    role: "Sposi - Venezia",
    quote: "Un tocco di classe unico per il nostro matrimonio. Tutti gli ospiti sono rimasti incantati dal live painting.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: 6,
    name: "Martina & Luca",
    role: "Sposi - Portofino",
    quote: "Hanno reso immortale il momento del nostro primo ballo. Ogni volta che guardiamo il quadro ci emozioniamo.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

const Stories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card');

    const ctx = gsap.context(() => {
      const loop = horizontalLoop(cards, {
        repeat: -1,
        paddingRight: 48,
        speed: 0.5,
        paused: false
      });

      // Draggable logic
      Draggable.create(proxyRef.current, {
        type: "x",
        trigger: sliderRef.current,
        inertia: true,
        onDrag: function () {
          loop.progress(gsap.utils.wrap(0, 1, loop.progress() - (this.deltaX / (cards.length * 400))));
        },
        onThrowUpdate: function () {
          loop.progress(gsap.utils.wrap(0, 1, loop.progress() - (this.deltaX / (cards.length * 400))));
        },
        onPress: () => { loop.pause(); },
        onRelease: () => { loop.play(); }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-linen-white overflow-hidden select-none relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 relative z-10">
        <span className="uppercase text-xs tracking-[0.2em] text-gold mb-6 block font-bold">
          Testimonianze
        </span>
        <div className="max-w-4xl">
          <AnimatedTitle
            tag="h2"
            text="Non credeteci sulla parola."
            className="font-serif text-5xl md:text-8xl text-charcoal leading-[0.9] mb-4"
          />
          <AnimatedTitle
            tag="h2"
            text="Ascoltate chi ci ha scelto."
            className="font-serif text-5xl md:text-8xl text-charcoal leading-[0.9]"
          />
        </div>
      </div>

      <div className="relative h-[500px] md:h-[600px] mt-12">
        {/* Proxy for Draggable */}
        <div ref={proxyRef} className="invisible absolute inset-0" />

        <div
          ref={sliderRef}
          className="flex gap-12 absolute top-0 left-0 cursor-grab active:cursor-grabbing h-full items-center px-[5vw]"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card flex-shrink-0 w-[320px] md:w-[450px] bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-charcoal/5 flex flex-col justify-between h-[420px] md:h-[500px]"
            >
              <div>
                <div className="w-16 h-16 rounded-full overflow-hidden mb-10 border border-charcoal/10">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-sans text-charcoal/80 text-xl md:text-2xl leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div>
                <p className="font-serif text-4xl text-gold italic leading-none mb-2">
                  {t.name}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/40 font-bold">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;