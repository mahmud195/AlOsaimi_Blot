import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getGalleryImages } from '../projectImages';
import aocLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOC Logo White.png';
import aocMobileLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOCMobile.png';

/**
 * ProjectModal Component
 * Horizontal scrolling image gallery with left/right navigation
 * Click any photo to enlarge it to center; click elsewhere to dismiss
 */
interface ProjectItem {
    title: string;
    category: string;
    year: string;
    location: string;
    image: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectItem;
    language: 'en' | 'ar';
}

export default function ProjectModal({ isOpen, onClose, project, language }: ProjectModalProps) {
    const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
    const galleryImages = getGalleryImages(project.title);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollStartX, setScrollStartX] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Combine main image + gallery images
    const allImages = [project.image, ...galleryImages];

    useEffect(() => {
        setEnlargedIndex(null);
    }, [isOpen, project.title]);

    // Check scroll capability
    const updateScrollButtons = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !isOpen) return;
        updateScrollButtons();
        el.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);
        // Re-check after images may have loaded
        const timer = setTimeout(updateScrollButtons, 300);
        return () => {
            el.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
            clearTimeout(timer);
        };
    }, [isOpen, allImages.length, updateScrollButtons]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (enlargedIndex !== null) {
                    e.stopPropagation();
                    setEnlargedIndex(null);
                }
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, enlargedIndex]);

    const handleBackdropClick = useCallback(() => {
        if (enlargedIndex !== null) {
            setEnlargedIndex(null);
        }
    }, [enlargedIndex]);

    const scrollBy = (direction: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.6;
        el.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    // Drag to scroll
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
        setScrollStartX(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const diff = e.clientX - dragStartX;
        scrollRef.current.scrollLeft = scrollStartX - diff;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-aoc-indigo z-50 overflow-y-auto" onClick={handleBackdropClick}>
            {/* Top Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-[70] bg-aoc-black/30 backdrop-blur-md border-b border-white/10 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <button onClick={onClose} className="md:hidden relative w-10 h-10 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" strokeWidth="1" />
                        </svg>
                        <X size={20} className="text-aoc-white hover:text-aoc-gold transition-colors" />
                    </button>

                    <a href="#projects" onClick={onClose} className="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <img src={aocMobileLogo} alt="AOC Logo" className="h-full w-auto md:hidden" />
                        <img src={aocLogo} alt="AOC Logo" className="h-full w-auto hidden md:block" />
                    </a>

                    <button onClick={onClose} className="hidden md:flex relative w-10 h-10 items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" strokeWidth="1" />
                        </svg>
                        <X size={20} className="text-aoc-white hover:text-aoc-gold transition-colors" />
                    </button>

                    <div className="md:hidden w-10"></div>
                </div>
            </nav>

            {/* Main content */}
            <div className={`min-h-screen pt-20 pb-16 flex flex-col lg:flex-row ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>

                {/* Left side - Project info */}
                <div className={`lg:w-[30%] xl:w-[28%] flex flex-col justify-center px-6 lg:px-10 py-6 lg:py-12 shrink-0 ${language === 'ar' ? 'text-right' : ''}`}>
                    <div className="mb-3">
                        <span className="text-xs font-inter-tight font-light tracking-[0.3em] uppercase text-aoc-gold">
                            {project.category}
                        </span>
                    </div>
                    <div className="mb-6 lg:mb-10">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-darker-grotesque font-medium tracking-[0.05em] uppercase leading-[0.9] mb-3" style={{ color: '#CAB64B' }}>
                            {project.title}
                        </h1>
                        <div className={`flex items-center gap-3 text-aoc-white/60 font-inter-tight font-light text-sm ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span>{project.year}</span>
                            <span>/</span>
                            <span>{project.location}</span>
                        </div>
                    </div>
                    <div className="max-w-md">
                        <p className="text-aoc-white/70 text-sm lg:text-base font-inter-tight font-light leading-relaxed text-justify">
                            {language === 'ar'
                                ? 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'
                                : 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'
                            }
                        </p>
                    </div>
                </div>

                {/* Right side - Horizontal scrolling gallery */}
                <div className="lg:w-[70%] xl:w-[72%] relative flex flex-col justify-center px-2 md:px-4 lg:px-6" onClick={(e) => e.stopPropagation()}>

                    {/* Scroll container */}
                    <div className="relative">
                        {/* Left arrow */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scrollBy('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-aoc-black/50 backdrop-blur-sm border border-aoc-gold/40 flex items-center justify-center text-aoc-gold hover:bg-aoc-gold/20 hover:border-aoc-gold transition-all shadow-lg"
                            >
                                <ChevronLeft size={22} />
                            </button>
                        )}

                        {/* Right arrow */}
                        {canScrollRight && (
                            <button
                                onClick={() => scrollBy('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-aoc-black/50 backdrop-blur-sm border border-aoc-gold/40 flex items-center justify-center text-aoc-gold hover:bg-aoc-gold/20 hover:border-aoc-gold transition-all shadow-lg"
                            >
                                <ChevronRight size={22} />
                            </button>
                        )}

                        {/* Scrollable image strip */}
                        <div
                            ref={scrollRef}
                            className={`flex gap-4 md:gap-6 overflow-x-auto py-4 px-6 md:px-10 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                scrollBehavior: isDragging ? 'auto' : 'smooth',
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        >
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                            {allImages.map((img, index) => (
                                <button
                                    key={index}
                                    className={`
                                        flex-shrink-0 block cursor-pointer
                                        transition-all duration-300 ease-out
                                        hover:scale-[1.03] hover:shadow-2xl
                                        shadow-lg rounded-sm overflow-hidden
                                        ${enlargedIndex === index
                                            ? '!fixed !top-1/2 !left-1/2 !w-[85vw] md:!w-[60vw] lg:!w-[50vw] !max-w-[800px] !z-[65]'
                                            : ''
                                        }
                                    `}
                                    style={{
                                        height: enlargedIndex === index ? 'auto' : 'clamp(220px, 50vh, 500px)',
                                        width: enlargedIndex === index ? undefined : 'auto',
                                        transform: enlargedIndex === index ? 'translate(-50%, -50%)' : undefined,
                                        zIndex: enlargedIndex === index ? 65 : undefined,
                                    }}
                                    onClick={(e) => {
                                        if (isDragging) return;
                                        e.stopPropagation();
                                        setEnlargedIndex(enlargedIndex === index ? null : index);
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`${project.title} - ${index + 1}`}
                                        loading="lazy"
                                        draggable={false}
                                        className={`h-full w-auto object-cover select-none ${enlargedIndex === index ? '!h-auto !w-full !max-h-[80vh]' : ''}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

            {/* Dark overlay when image is enlarged */}
            {enlargedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                    onClick={() => setEnlargedIndex(null)}
                />
            )}

            {/* Bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 px-8 py-4 flex justify-between items-center text-aoc-white/50 text-xs md:text-sm font-inter-tight font-light tracking-widest z-[70]">
                <span>A</span>
                <span>FOUNDATION</span>
                <span>OF</span>
                <span>TRUST</span>
            </div>
        </div>
    );
}
