import React from 'react';
import { motion } from 'framer-motion';

const Galleria: React.FC = () => {
    const images = [
        'https://picsum.photos/seed/wed1/800/1000',
        'https://picsum.photos/seed/wed2/800/1000',
        'https://picsum.photos/seed/wed3/800/1000',
        'https://picsum.photos/seed/wed4/800/1000',
        'https://picsum.photos/seed/wed5/800/1000',
        'https://picsum.photos/seed/wed6/800/1000',
    ];

    return (
        <main className="pt-32 pb-20 px-6 md:px-12 bg-linen min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                <motion.h1
                    className="font-serif text-5xl md:text-7xl mb-12 text-charcoal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Galleria
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="aspect-[4/5] overflow-hidden rounded-lg bg-charcoal/5"
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Galleria;
