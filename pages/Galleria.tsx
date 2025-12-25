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
    { id: 1, src: 'assets/Images/Webp/338774279_245190851263057_709241014944027128_n..webp', alt: "Wedding Detail 1", offsetY: 0 },
    { id: 2, src: 'assets/Images/Webp/450347307_851249443567775_1922508133636013123_n..webp', alt: "Wedding Detail 2", offsetY: 80 },
    { id: 3, src: 'assets/Images/Webp/460896090_1074017383908067_4200850697466321805_n..webp', alt: "Wedding Detail 3", offsetY: 40 },
    { id: 4, src: 'assets/Images/Webp/485008977_9830080170358193_6052266952024163601_n..webp', alt: "Wedding Detail 4", offsetY: 120 },

    { id: 5, src: 'assets/Images/Webp/485511146_1176211547222287_7622745455614453238_n..webp', alt: "Wedding Detail 5", offsetY: 60 },
    { id: 6, src: 'assets/Images/Webp/500778763_3152532351570485_9214239788541518427_n..webp', alt: "Wedding Detail 6", offsetY: 0 },
    { id: 7, src: 'assets/Images/Webp/530856524_773197938984674_2051145255108384575_n..webp', alt: "Wedding Detail 7", offsetY: 100 },
    { id: 8, src: 'assets/Images/Webp/538974663_1194827259351253_1869848071802504127_n..webp', alt: "Wedding Detail 8", offsetY: 40 },

    { id: 9, src: 'assets/Images/Webp/541724757_17993078795825650_6768281024554930109_n..webp', alt: "Wedding Detail 9", offsetY: 20 },
    { id: 10, src: 'assets/Images/Webp/542618216_17993191325825650_2873766679662235812_n..webp', alt: "Wedding Detail 10", offsetY: 70 },
    { id: 11, src: 'assets/Images/Webp/545112275_17993923277825650_3693115148974838534_n..webp', alt: "Wedding Detail 11", offsetY: 120 },
    { id: 12, src: 'assets/Images/Webp/550799572_17994799889825650_6298268683750133622_n..webp', alt: "Wedding Detail 12", offsetY: 0 },
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
