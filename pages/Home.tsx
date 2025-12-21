import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HorizontalGallery from '../components/HorizontalGallery';
import Stories from '../components/Stories';

const Home: React.FC = () => {
    return (
        <main>
            <Hero />
            <Services isPreview={true} />
            <HorizontalGallery />
            <Stories />
        </main>
    );
};

export default Home;
