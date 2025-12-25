import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    offsetY: number; // Vertical offset in pixels for stagger effect
}

const galleryImages: GalleryImage[] = [
    { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', alt: "Wedding 1", offsetY: 0 },
    { id: 2, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', alt: "Wedding 2", offsetY: 80 },
    { id: 3, src: 'https://images.unsplash.com/photo-1465495910483-0d6745778503?q=80&w=800&auto=format&fit=crop', alt: "Wedding 3", offsetY: 40 },
    { id: 4, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop', alt: "Wedding 4", offsetY: 120 },

    { id: 5, src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', alt: "Wedding 5", offsetY: 60 },
    { id: 6, src: 'https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?q=80&w=800&auto=format&fit=crop', alt: "Wedding 6", offsetY: 0 },
    { id: 7, src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=800&auto=format&fit=crop', alt: "Wedding 7", offsetY: 100 },
    { id: 8, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop', alt: "Wedding 8", offsetY: 40 },

    { id: 9, src: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=800&auto=format&fit=crop', alt: "Wedding 9", offsetY: 20 },
    { id: 10, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', alt: "Wedding 10", offsetY: 70 },
    { id: 11, src: 'https://images.unsplash.com/photo-1511285560982-1351c4f63155?q=80&w=800&auto=format&fit=crop', alt: "Wedding 11", offsetY: 120 },
    { id: 12, src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800&auto=format&fit=crop', alt: "Wedding 12", offsetY: 0 },

    { id: 13, src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', alt: "Wedding 13", offsetY: 90 },
    { id: 14, src: 'https://images.unsplash.com/photo-1470376619031-a6791e534bf0?q=80&w=800&auto=format&fit=crop', alt: "Wedding 14", offsetY: 40 },
    { id: 15, src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop', alt: "Wedding 15", offsetY: 0 },
    { id: 16, src: 'https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=800&auto=format&fit=crop', alt: "Wedding 16", offsetY: 60 },
];

const Galleria: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image reveal with ScrollTrigger
            gsap.from(".gallery-image", {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                },
                y: 80,
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                stagger: 0.08,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // 3D Perspective Tilt effect (desktop only)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, imageRef: HTMLDivElement) => {
        // Only on desktop with hover capability
        if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024) return;

        const rect = imageRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on cursor position
        const rotateX = ((e.clientY - centerY) / rect.height) * -15; // Max 15deg
        const rotateY = ((e.clientX - centerX) / rect.width) * 15;

        gsap.to(imageRef, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000
        });
    };

    const handleMouseLeave = (imageRef: HTMLDivElement) => {
        gsap.to(imageRef, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    };

    return (
        <main ref={containerRef} className="relative pt-32 pb-32 px-4 md:px-8 bg-linen min-h-screen">
            {/* Content container */}
            <div className="relative z-10 max-w-[1400px] mx-auto">
                <AnimatedTitle
                    tag="h1"
                    text="galleria"
                    className="font-serif text-5xl lg:text-7xl mb-12 lg:mb-16 text-charcoal lowercase"
                />

                {/* Gallery grid - many columns for small, elegant images */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 md:gap-12 lg:gap-16 xl:gap-20 px-4"
                >
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className="gallery-image group relative"
                            style={{
                                marginTop: window.innerWidth >= 1024 ? `${image.offsetY}px` : '0px',
                                perspective: '1000px'
                            }}
                            onMouseMove={(e) => {
                                const target = e.currentTarget.querySelector('.image-wrapper') as HTMLDivElement;
                                if (target) handleMouseMove(e, target);
                            }}
                            onMouseLeave={(e) => {
                                const target = e.currentTarget.querySelector('.image-wrapper') as HTMLDivElement;
                                if (target) handleMouseLeave(target);
                            }}
                        >
                            <div
                                className="image-wrapper relative overflow-hidden rounded-lg bg-charcoal/5"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform'
                                }}
                            >
                                <div className="aspect-[3/4]">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover grayscale-[20%] transition-all duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Galleria;
