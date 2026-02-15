import { X, Menu } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getGalleryImages } from '../projectImages';
import aocLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOC Logo White.png';
import aocMobileLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOCMobile.png';

/**
 * Instagram-style swipeable image gallery for each project card.
 * Supports drag/swipe to navigate, fade-out/fade-in transitions, and pagination dots.
 */
interface SwipeGalleryProps {
    images: string[];
    alt: string;
}

function SwipeGallery({ images, alt }: SwipeGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [pendingIndex, setPendingIndex] = useState<number | null>(null);
    const [skipTransition, setSkipTransition] = useState(false);
    const startXRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const SWIPE_THRESHOLD = 50;

    const triggerTransition = useCallback((fromIdx: number, toIdx: number) => {
        if (isAnimating) return;
        setDisplayIndex(fromIdx);
        setPendingIndex(toIdx);
        setIsAnimating(true);
        setIsDragging(false);
        setDragX(0);

        // After animation completes, finalize with transitions disabled
        setTimeout(() => {
            setSkipTransition(true); // disable CSS transitions for the swap
            setDisplayIndex(toIdx);
            setCurrentIndex(toIdx);
            setPendingIndex(null);
            setIsAnimating(false);

            // Re-enable transitions on the next frame
            requestAnimationFrame(() => {
                setSkipTransition(false);
            });
        }, 400);
    }, [isAnimating]);

    const handleSwipeEnd = useCallback((deltaX: number) => {
        if (Math.abs(deltaX) < SWIPE_THRESHOLD || isAnimating) {
            setDragX(0);
            setIsDragging(false);
            return;
        }

        const direction = deltaX < 0 ? 'left' : 'right';
        let newIndex: number;

        if (direction === 'left') {
            newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        }

        triggerTransition(currentIndex, newIndex);
    }, [currentIndex, images.length, isAnimating, triggerTransition]);

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isAnimating || images.length <= 1) return;
        setIsDragging(true);
        startXRef.current = e.clientX;
        setDragX(0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setDragX(e.clientX - startXRef.current);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        handleSwipeEnd(dragX);
    };

    const handleMouseLeave = () => {
        if (isDragging) handleSwipeEnd(dragX);
    };

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isAnimating || images.length <= 1) return;
        setIsDragging(true);
        startXRef.current = e.touches[0].clientX;
        setDragX(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        setDragX(e.touches[0].clientX - startXRef.current);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        handleSwipeEnd(dragX);
    };

    const dragOpacity = isDragging ? Math.max(0.3, 1 - Math.abs(dragX) / 300) : 1;
    // Which index is currently "active" for dots
    const activeDot = pendingIndex !== null ? pendingIndex : displayIndex;

    if (images.length === 0) return null;

    return (
        <div className="relative select-none">
            {/* Image container */}
            <div
                ref={containerRef}
                className="aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Bottom layer: incoming image (static, fades in) */}
                {pendingIndex !== null && (
                    <img
                        src={images[pendingIndex]}
                        alt={`${alt} ${pendingIndex + 1}`}
                        loading="lazy"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ zIndex: 1 }}
                    />
                )}

                {/* Top layer: current/outgoing image (slides out + fades) */}
                <img
                    src={images[displayIndex]}
                    alt={`${alt} ${displayIndex + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        zIndex: 2,
                        transform: isDragging
                            ? `translateX(${dragX}px)`
                            : isAnimating
                                ? `translateX(${dragX < 0 || (dragX === 0 && pendingIndex !== null && pendingIndex > displayIndex) ? '-50%' : '50%'})`
                                : 'translateX(0)',
                        opacity: isDragging
                            ? dragOpacity
                            : isAnimating
                                ? 0
                                : 1,
                        transition: (isDragging || skipTransition) ? 'none' : 'transform 0.4s ease-out, opacity 0.4s ease-out',
                    }}
                />
            </div>

            {/* Pagination dots */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2.5 mt-3">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (isAnimating || idx === currentIndex) return;
                                triggerTransition(currentIndex, idx);
                            }}
                            className="relative w-4 h-4 flex items-center justify-center"
                            aria-label={`Go to image ${idx + 1}`}
                        >
                            {/* The dot */}
                            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === activeDot ? 'bg-aoc-gold' : 'bg-white/50 hover:bg-white/70'
                                }`} />
                            {/* Circle ring around active dot */}
                            {idx === activeDot && (
                                <span className="absolute inset-0 rounded-full border border-aoc-gold transition-opacity duration-300" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * ProjectModal Component
 * Full-screen modal with category sidebar and vertically scrolling project cards.
 * Each project card features an Instagram-style swipeable image gallery.
 */
interface ProjectItem {
    title: string;
    category: string;
    year: string;
    location: string;
    image: string;
    description?: string;
}

interface CategoryItem {
    key: string;
    label: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    allProjects: ProjectItem[];
    categories: CategoryItem[];
    language: 'en' | 'ar';
}

export default function ProjectModal({ isOpen, onClose, allProjects, categories, language }: ProjectModalProps) {
    const [activeCategory, setActiveCategory] = useState<string>('RESIDENTIAL');
    const [galleryMap, setGalleryMap] = useState<Record<string, string[]>>({});
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

    // Reset to first category when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveCategory('RESIDENTIAL');
        }
    }, [isOpen]);

    // Pre-load gallery images for current filtered projects
    const filteredProjects = allProjects.filter(p => p.category === activeCategory);

    useEffect(() => {
        if (!isOpen) return;
        let cancelled = false;
        const titles = filteredProjects.map(p => p.title);
        Promise.all(
            titles.map(async title => {
                const imgs = await getGalleryImages(title);
                return { title, imgs };
            })
        ).then(results => {
            if (cancelled) return;
            const map: Record<string, string[]> = {};
            for (const { title, imgs } of results) map[title] = imgs;
            setGalleryMap(prev => ({ ...prev, ...map }));
        });
        return () => { cancelled = true; };
    }, [isOpen, activeCategory]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-aoc-indigo z-50 overflow-hidden">
            {/* Top Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-[70] bg-aoc-black/30 backdrop-blur-md border-b border-white/10 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    {/* Logo - left on desktop, center on mobile */}
                    <a href="#projects" onClick={onClose} className="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <img src={aocMobileLogo} alt="AOC Logo" className="h-full w-auto md:hidden" />
                        <img src={aocLogo} alt="AOC Logo" className="h-full w-auto hidden md:block" />
                    </a>

                    {/* Hamburger Menu Button - Mobile Only (left side) */}
                    <button
                        className="md:hidden text-aoc-white/80 hover:text-aoc-white transition-colors"
                        onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                    >
                        {isMobileCategoryOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Close button - right on mobile, right on desktop */}
                    <button onClick={onClose} className="relative w-10 h-10 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" strokeWidth="1" />
                        </svg>
                        <X size={20} className="text-aoc-white hover:text-aoc-gold transition-colors" />
                    </button>
                </div>
            </nav>

            {/* Mobile Category Slide-out Panel */}
            <div
                className={`fixed inset-0 z-[65] md:hidden transition-all duration-300 ${isMobileCategoryOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMobileCategoryOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-[57px] ${language === 'ar' ? 'right-0' : 'left-0'} w-64 h-[calc(100vh-57px)] bg-aoc-black/30 backdrop-blur-md ${language === 'ar' ? 'border-l' : 'border-r'} border-white/10 transform transition-transform duration-300 ${isMobileCategoryOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}
                >
                    <div className="p-6 space-y-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => {
                                    setActiveCategory(cat.key);
                                    setIsMobileCategoryOpen(false);
                                }}
                                className={`block w-full ${language === 'ar' ? 'text-right text-lg' : 'text-left text-sm'} py-3 font-darker-grotesque font-medium tracking-[0.15em] uppercase transition-all duration-300 ${activeCategory === cat.key
                                    ? 'text-aoc-gold'
                                    : 'text-aoc-white/70 hover:text-aoc-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className={`h-full pb-16 flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`} style={{ paddingTop: '80px' }}>

                {/* Category Sidebar - hidden on mobile */}
                <div className={`hidden md:flex w-56 lg:w-64 shrink-0 flex-col justify-center px-6 lg:px-8 ${language === 'ar' ? 'border-l border-white/10' : 'border-r border-white/10'}`}>
                    <nav className="space-y-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`block w-full text-left text-base font-darker-grotesque font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${language === 'ar' ? 'text-right' : ''} ${activeCategory === cat.key
                                    ? 'text-aoc-gold'
                                    : 'text-aoc-white/70 hover:text-aoc-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Projects Content - Vertical scroll */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 lg:px-14 pt-14 pb-4 md:pt-16 md:pb-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>{`.projects-scroll::-webkit-scrollbar { display: none; }`}</style>
                    <div className="projects-scroll space-y-16 md:space-y-24 max-w-5xl mx-auto">
                        {filteredProjects.map((project, index) => {
                            const galleryImages = galleryMap[project.title] || [];
                            const allImages = [project.image, ...galleryImages];

                            return (
                                <div key={`${project.title}-${index}`} className="relative">
                                    {/* Project Card */}
                                    <div className={`flex flex-col md:flex-row gap-6 md:gap-8 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                                        {/* Image with decorative circle + swipeable gallery */}
                                        <div className="relative md:w-[45%] shrink-0">
                                            {/* Decorative Circle */}
                                            <svg
                                                className={`absolute z-10 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${language === 'ar' ? '-right-6 md:-right-8 lg:-right-10' : '-left-6 md:-left-8 lg:-left-10'} -top-6 md:-top-8 lg:-top-10`}
                                                viewBox="0 0 100 100"
                                            >
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="48"
                                                    fill="none"
                                                    stroke="#CAB64B"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>

                                            {/* Instagram-style swipeable gallery */}
                                            <SwipeGallery images={allImages} alt={project.title} />
                                        </div>

                                        {/* Text content - title first, then description */}
                                        <div className={`flex-1 flex flex-col justify-center ${language === 'ar' ? 'text-right' : ''}`}>
                                            {/* Project Title & Info - above description */}
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-darker-grotesque font-medium tracking-[0.15em] uppercase leading-[0.9] mb-4" style={{ color: '#F2F2F2' }}>
                                                {project.title}
                                            </h2>
                                            <div className={`flex items-center gap-3 mb-5 text-aoc-white/60 font-inter-tight font-light text-sm ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                                                <span>{project.year}</span>
                                                <span>/</span>
                                                <span>{project.location}</span>
                                            </div>

                                            <p className="text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify">
                                                {project.description || 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality.'}
                                            </p>

                                            <p className="text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify mt-4">
                                                {project.description || 'The design approach emphasizes clarity of circulation, flexible retail modules, and strong visual connectivity, ensuring operational efficiency and long-term adaptability.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

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
