import { useEffect, useRef } from 'react';

/**
 * Custom cursor hook — uses direct DOM manipulation for zero React re-renders.
 * Returns a ref to attach to the cursor div element.
 * Automatically hides on touch devices via CSS media queries.
 */
export function useCustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use requestAnimationFrame to batch DOM updates for smooth cursor movement
        let rafId: number | null = null;
        let targetX = -100;
        let targetY = -100;

        const updatePosition = () => {
            if (cursor) {
                cursor.style.left = `${targetX}px`;
                cursor.style.top = `${targetY}px`;
            }
            rafId = null;
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
            if (rafId === null) {
                rafId = requestAnimationFrame(updatePosition);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, [role="button"]')) {
                cursor.classList.add('hovering');
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, [role="button"]')) {
                cursor.classList.remove('hovering');
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return cursorRef;
}
