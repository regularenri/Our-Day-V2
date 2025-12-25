import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
    id: number;
    url: string;
    quote: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        url: 'assets/Images/Webp/460896090_1074017383908067_4200850697466321805_n..webp',
        quote: "Ecco cosa possiamo aiutarti a realizzare."
    },
    {
        id: 2,
        url: 'assets/Images/Webp/450347307_851249443567775_1922508133636013123_n..webp',
        quote: "Ogni dettaglio racconta la vostra storia unica."
    },
    {
        id: 3,
        url: 'assets/Images/Webp/550799572_17994799889825650_6298268683750133622_n..webp',
        quote: "Trasformiamo attimi fugaci in ricordi eterni."
    },
    {
        id: 4,
        url: 'assets/Images/Webp/545112275_17993923277825650_3693115148974838534_n..webp',
        quote: "La bellezza che merita di essere preservata."
    },
    {
        id: 5,
        url: 'assets/Images/Webp/485511146_1176211547222287_7622745455614453238_n..webp',
        quote: "Un'opera d'arte che parla del vostro amore."
    }
];

const HorizontalGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // Cursor Follower Refs
    const cursorRef = useRef<HTMLDivElement>(null);
    const xTo = useRef<gsap.QuickToFunc>();
    const yTo = useRef<gsap.QuickToFunc>();

    const [cursorText, setCursorText] = useState("");
    const [isCursorVisible, setIsCursorVisible] = useState(false);

    // Check if desktop on mount and resize
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Horizontal scroll animation - ONLY on desktop
    useEffect(() => {
        if (!isDesktop) return;

        const section = sectionRef.current;
        const cursor = cursorRef.current;

        // Setup GSAP QuickTo for cursor - faster duration
        if (cursor) {
            xTo.current = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2" });
            yTo.current = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2" });
        }

        const getScrollAmount = () => {
            if (!section) return 0;
            return -(section.scrollWidth - window.innerWidth);
        };

        const ctx = gsap.context(() => {
            gsap.to(sectionRef.current, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount())}`,
                    pin: true,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });
        }, triggerRef);

        return () => {
            ctx.revert();
        };
    }, [isDesktop]);

    // Cursor visibility effect
    useEffect(() => {
        if (cursorRef.current && isDesktop) {
            gsap.to(cursorRef.current, {
                opacity: isCursorVisible ? 1 : 0,
                scale: isCursorVisible ? 1 : 0.5,
                duration: 0.15
            });
        }
    }, [isCursorVisible, isDesktop]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (xTo.current && yTo.current && isDesktop) {
            xTo.current(e.clientX);
            yTo.current(e.clientY);
        }
    };

    const handleContainerLeave = () => {
        if (isDesktop) {
            setIsCursorVisible(false);
        }
    };

    // Mobile scroll hint state (always declared, only used when !isDesktop)
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showHint, setShowHint] = useState(true);

    // Mobile scroll hint effect
    useEffect(() => {
        if (isDesktop) return; // Skip on desktop

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            setShowHint(false);
        };

        // Hide hint after 4 seconds
        const timer = setTimeout(() => {
            setShowHint(false);
        }, 4000);

        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, [isDesktop]);

    // ============ MOBILE / TABLET LAYOUT ============
    if (!isDesktop) {

        return (
            <section className="bg-linen py-20 px-6 overflow-hidden">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <AnimatedTitle
                        tag="h2"
                        text="Ispirazione per il vostro giorno"
                        className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight mb-6"
                    />
                    <p className="font-sans text-charcoal/60 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                        Uno sguardo ai momenti che abbiamo catturato e alle emozioni che abbiamo reso immortali.
                    </p>
                </div>

                {/* Horizontal Scrollable Gallery for Mobile */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide"
                    >
                        <div className="flex gap-4 sm:gap-6 w-max">
                            {galleryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 w-[70vw] sm:w-[55vw] md:w-[45vw] aspect-[3/4] relative rounded-2xl sm:rounded-3xl overflow-hidden"
                                >
                                    <img
                                        src={item.url}
                                        alt="Gallery work"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <p className="absolute bottom-4 left-4 right-4 font-serif text-white text-sm sm:text-base italic leading-snug">
                                        "{item.quote}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Hint */}
                    <div
                        className={`absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg border border-charcoal/10 transition-opacity duration-500 pointer-events-none ${showHint ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            animation: showHint ? 'slideHint 1.5s ease-in-out infinite' : 'none'
                        }}
                    >
                        <span className="font-sans text-xs text-charcoal/70 font-medium whitespace-nowrap">
                            Scorri
                        </span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-charcoal/70"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-10">
                    <Link
                        to="/galleria"
                        className="group flex flex-col items-center gap-4"
                    >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                            <span className="text-charcoal group-hover:text-linen text-xs uppercase tracking-widest font-bold text-center px-2">
                                Vedi tutto
                            </span>
                        </div>
                        <p className="font-serif text-lg sm:text-xl italic text-charcoal/60">
                            Esplora la Galleria
                        </p>
                    </Link>
                </div>
            </section>
        );
    }

    // ============ DESKTOP LAYOUT (Horizontal Scroll) ============
    return (
        <div
            ref={containerRef}
            className="bg-linen overflow-x-clip relative cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleContainerLeave}
        >
            {/* GSAP Cursor Follower Bubble */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-50 px-6 py-4 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl max-w-[250px] text-center flex items-center justify-center opacity-0"
                style={{
                    transform: 'translate(-50%, -120%)',
                    position: 'fixed'
                }}
            >
                <p className="font-serif text-charcoal italic text-lg leading-snug">
                    {cursorText}
                </p>
            </div>

            <div ref={triggerRef}>
                <div ref={sectionRef} className="h-screen flex flex-row relative items-center px-[5vw] w-fit">

                    {/* Desktop Intro Text (Inside Scroll) */}
                    <div className="flex flex-shrink-0 w-[30vw] mr-[5vw] flex-col justify-center">
                        <AnimatedTitle
                            tag="h2"
                            text="Ispirazione per il vostro giorno"
                            className="font-serif text-6xl lg:text-7xl text-charcoal leading-tight"
                        />
                        <p className="mt-8 font-sans text-charcoal/60 max-w-sm text-lg">
                            Uno sguardo ai momenti che abbiamo catturato e alle emozioni che abbiamo reso immortali.
                        </p>
                    </div>

                    {galleryItems.map((item) => (
                        <GalleryCard
                            key={item.id}
                            item={item}
                            onHoverStart={(quote) => {
                                setCursorText(quote);
                                setIsCursorVisible(true);
                            }}
                            onHoverEnd={() => {
                                setIsCursorVisible(false);
                            }}
                        />
                    ))}

                    <div className="flex-shrink-0 w-[30vw] flex items-center justify-center">
                        <Link
                            to="/galleria"
                            className="group flex flex-col items-center gap-6"
                        >
                            <div className="w-32 h-32 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                                <span className="text-charcoal group-hover:text-linen text-sm uppercase tracking-widest font-bold">Vedi tutto</span>
                            </div>
                            <p className="font-serif text-2xl italic text-charcoal/60">Esplora la Galleria</p>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

const GalleryCard: React.FC<{
    item: GalleryItem;
    onHoverStart: (quote: string) => void;
    onHoverEnd: () => void;
}> = ({ item, onHoverStart, onHoverEnd }) => {
    return (
        <div
            className="flex-shrink-0 w-[60vh] h-[60vh] mr-[4vw] relative rounded-[3rem] overflow-hidden group cursor-none"
            onMouseEnter={() => onHoverStart(item.quote)}
            onMouseLeave={() => onHoverEnd()}
        >
            <img
                src={item.url}
                alt="Gallery work"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
        </div>
    );
};

export default HorizontalGallery;
