import { useState, useEffect } from 'react';

export type IntroPhase = 'initial' | 'drawing' | 'expanding' | 'done';

interface IntroAnimationState {
    introComplete: boolean;
    introPhase: IntroPhase;
    circleSize: number;
}

/**
 * Manages the intro circle-reveal animation sequence.
 * Extracted from App.tsx for cleaner separation of concerns.
 */
export function useIntroAnimation(): IntroAnimationState {
    const [introComplete, setIntroComplete] = useState(false);
    const [introPhase, setIntroPhase] = useState<IntroPhase>('initial');
    const [circleSize, setCircleSize] = useState(150);

    useEffect(() => {
        // Force scroll to top and prevent browser scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Disable scrolling during intro
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Start drawing phase
        const drawTimer = setTimeout(() => {
            setIntroPhase('drawing');
        }, 100);

        // Start expanding phase after drawing completes
        const expandTimer = setTimeout(() => {
            setIntroPhase('expanding');

            let size = 150;
            let lastTime = performance.now();

            const animate = (currentTime: number) => {
                const deltaTime = currentTime - lastTime;
                lastTime = currentTime;

                size += (deltaTime / 16) * 25;
                setCircleSize(size);

                if (size > 300) {
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }

                if (size < Math.max(window.innerWidth, window.innerHeight) * 1.5) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, 1100);

        // Complete intro after animation
        const completeTimer = setTimeout(() => {
            setIntroPhase('done');
            setIntroComplete(true);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }, 3400);

        return () => {
            clearTimeout(drawTimer);
            clearTimeout(expandTimer);
            clearTimeout(completeTimer);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    return { introComplete, introPhase, circleSize };
}
