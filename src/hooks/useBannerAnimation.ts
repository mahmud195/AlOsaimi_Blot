import { useEffect, useRef } from 'react';

/**
 * Banner scrolling animation — uses direct DOM manipulation instead of React state.
 * Returns refs for both the English and Arabic banner containers.
 * Animates via transform on scroll, no React re-renders.
 */
export function useBannerAnimation(speed = 2) {
    const enBannerRef = useRef<HTMLDivElement>(null);
    const arBannerRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const isScrollingRef = useRef(false);
    const animationRef = useRef<number | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const applyTransform = () => {
            const enEl = enBannerRef.current;
            const arEl = arBannerRef.current;
            if (enEl) {
                enEl.style.transform = `translateX(${-(offsetRef.current % 2000)}px)`;
            }
            if (arEl) {
                arEl.style.transform = `translateX(${-(offsetRef.current % 1200)}px)`;
            }
        };

        const animate = () => {
            if (isScrollingRef.current) {
                offsetRef.current += speed;
                applyTransform();
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        const handleScroll = () => {
            if (!isScrollingRef.current) {
                isScrollingRef.current = true;
                animationRef.current = requestAnimationFrame(animate);
            }

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = window.setTimeout(() => {
                isScrollingRef.current = false;
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [speed]);

    return { enBannerRef, arBannerRef };
}
