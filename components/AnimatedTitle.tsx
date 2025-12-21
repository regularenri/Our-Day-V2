import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    text: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
    text,
    className = "",
    tag: Tag = 'h2'
}) => {
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split text into lines
        const splitText = new SplitType(textRef.current, {
            types: 'lines',
            lineClass: 'split-line-inner'
        });

        // Wrap each line in a div with overflow hidden
        splitText.lines?.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.className = 'split-line-outer';
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        // Animate lines
        const ctx = gsap.context(() => {
            gsap.from('.split-line-inner', {
                y: '120%',
                rotate: 2,
                duration: 1.5,
                stagger: 0.1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });
        }, textRef);

        // Re-split on resize
        const handleResize = () => {
            splitText.split({ types: 'lines' });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            ctx.revert();
            splitText.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, [text]);

    return (
        <Tag
            ref={textRef as any}
            className={`${className} overflow-hidden px-1`}
            style={{ display: 'block' }}
        >
            {text}
        </Tag>
    );
};

export default AnimatedTitle;
