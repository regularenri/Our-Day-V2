import React, { useEffect, useRef } from 'react';
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
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
        quote: "Ecco cosa possiamo aiutarti a realizzare."
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop',
        quote: "Ogni dettaglio racconta la vostra storia unica."
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1465495910483-0d6745778503?q=80&w=2000&auto=format&fit=crop',
        quote: "Trasformiamo attimi fugaci in ricordi eterni."
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop',
        quote: "La bellezza che merita di essere preservata."
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000&auto=format&fit=crop',
        quote: "Un'opera d'arte che parla del vostro amore."
    }
];

const HorizontalGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cursor Follower Refs
    const cursorRef = useRef<HTMLDivElement>(null);
    const xTo = useRef<gsap.QuickToFunc>();
    const yTo = useRef<gsap.QuickToFunc>();

    const [cursorText, setCursorText] = React.useState("");
    const [isCursorVisible, setIsCursorVisible] = React.useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        const cursor = cursorRef.current;

        // Setup QSAP QuickTo
        if (cursor) {
            xTo.current = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
            yTo.current = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
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

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (xTo.current && yTo.current) {
            xTo.current(e.clientX);
            yTo.current(e.clientY);
        }
    };

    return (
        <div
            ref={containerRef}
            className="bg-linen overflow-x-clip relative cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsCursorVisible(false)}
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

            {/* Logic to show/hide cursor via GSAP */}
            {React.useEffect(() => {
                if (cursorRef.current) {
                    gsap.to(cursorRef.current, {
                        opacity: isCursorVisible ? 1 : 0,
                        scale: isCursorVisible ? 1 : 0.5,
                        duration: 0.3
                    });
                }
            }, [isCursorVisible]) as any}


            {/* Mobile Intro Text (Above Gallery) */}
            <div className="md:hidden px-6 pt-16 pb-8 text-center">
                <AnimatedTitle
                    tag="h2"
                    text="Ispirazione per il vostro giorno"
                    className="font-serif text-4xl text-charcoal leading-tight mb-4 mx-auto"
                />
                <p className="font-sans text-charcoal/60 text-sm leading-relaxed max-w-[280px] mx-auto">
                    Uno sguardo ai momenti che abbiamo catturato e alle emozioni che abbiamo reso immortali.
                </p>
            </div>

            <div ref={triggerRef}>
                <div ref={sectionRef} className="h-[60vh] md:h-screen flex flex-row relative items-center px-[8vw] md:px-[5vw] w-fit">

                    {/* Desktop Intro Text (Inside Scroll) */}
                    <div className="hidden md:flex flex-shrink-0 w-[30vw] mr-[5vw] flex-col justify-center">
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

                    <div className="flex-shrink-0 w-[50vw] md:w-[30vw] flex items-center justify-center pl-10 md:pl-0">
                        <Link
                            to="/galleria"
                            className="group flex flex-col items-center gap-6"
                        >
                            <div className="w-32 h-32 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                                <span className="text-charcoal group-hover:text-linen text-sm md:text-sm uppercase tracking-widest font-bold">Vedi tutto</span>
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
            className="flex-shrink-0 w-[75vw] h-[100vw] md:w-[60vh] md:h-[60vh] mr-[6vw] relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group cursor-none"
            onMouseEnter={() => onHoverStart(item.quote)}
            onMouseLeave={() => onHoverEnd()}
        >
            <img
                src={item.url}
                alt="Gallery work"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none" />
        </div>
    );
};

export default HorizontalGallery;
