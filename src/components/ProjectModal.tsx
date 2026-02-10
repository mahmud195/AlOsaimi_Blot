import { X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { getGalleryImages } from '../projectImages';

/**
 * ProjectModal Component
 * Displays a full-screen modal with project details
 * Gallery images shown as small pinned polaroid-style notes around the main image
 * Click a thumbnail to enlarge, click anywhere else to shrink back
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

// Predefined positions for pinned notes scattered around the main image
// Each position is relative to the gallery container
const PIN_POSITIONS = [
    { top: '2%', left: '0%', rotate: -8 },
    { top: '0%', left: '30%', rotate: 5 },
    { top: '5%', right: '2%', rotate: -4 },
    { top: '30%', left: '-4%', rotate: 7 },
    { top: '35%', right: '-2%', rotate: -6 },
    { top: '58%', left: '0%', rotate: 4 },
    { top: '55%', right: '0%', rotate: -9 },
    { top: '78%', left: '5%', rotate: 6 },
    { top: '80%', right: '5%', rotate: -5 },
    { top: '75%', left: '35%', rotate: 3 },
    { top: '15%', left: '12%', rotate: -7 },
    { top: '48%', left: '8%', rotate: 8 },
    { top: '65%', right: '8%', rotate: -3 },
];

export default function ProjectModal({ isOpen, onClose, project, language }: ProjectModalProps) {
    const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
    const galleryImages = getGalleryImages(project.title);

    // Reset enlarged state when modal opens/closes or project changes
    useEffect(() => {
        setEnlargedIndex(null);
    }, [isOpen, project.title]);

    // Close enlarged image on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && enlargedIndex !== null) {
                e.stopPropagation();
                setEnlargedIndex(null);
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-aoc-indigo z-50 overflow-y-auto" onClick={handleBackdropClick}>
            {/* Top Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 bg-aoc-black/30 backdrop-blur-md border-b border-white/10 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    {/* Mobile: X button on left */}
                    <button
                        onClick={onClose}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center"
                    >
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" strokeWidth="1" />
                        </svg>
                        <X size={20} className="text-aoc-white hover:text-aoc-gold transition-colors" />
                    </button>

                    {/* Logo - center on mobile, left on desktop */}
                    <a href="#projects" onClick={onClose} className="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <img src="/src/assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOCMobile.png" alt="AOC Logo" className="h-full w-auto md:hidden" />
                        <img src="/src/assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOC Logo White.png" alt="AOC Logo" className="h-full w-auto hidden md:block" />
                    </a>

                    {/* Desktop: X button on right */}
                    <button
                        onClick={onClose}
                        className="hidden md:flex relative w-10 h-10 items-center justify-center"
                    >
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" strokeWidth="1" />
                        </svg>
                        <X size={20} className="text-aoc-white hover:text-aoc-gold transition-colors" />
                    </button>

                    {/* Spacer for mobile balance */}
                    <div className="md:hidden w-10"></div>
                </div>
            </nav>

            {/* Main content */}
            <div className={`min-h-screen pt-20 pb-16 flex flex-col lg:flex-row ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>

                {/* Left side - Title and description */}
                <div className={`lg:w-2/5 flex flex-col justify-center px-8 lg:px-16 py-8 lg:py-16 ${language === 'ar' ? 'text-right' : ''}`}>
                    {/* Category */}
                    <div className="mb-4">
                        <span className="text-sm font-inter-tight font-light tracking-[0.3em] uppercase text-aoc-gold">
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="mb-8 lg:mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-darker-grotesque font-medium tracking-[0.05em] uppercase leading-[0.9] mb-4" style={{ color: '#CAB64B' }}>
                            {project.title}
                        </h1>
                        <div className={`flex items-center gap-4 text-aoc-white/60 font-inter-tight font-light ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span>{project.year}</span>
                            <span>/</span>
                            <span>{project.location}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="max-w-lg space-y-6">
                        <p className="text-aoc-white/80 text-base lg:text-lg font-inter-tight font-light leading-relaxed text-justify">
                            {language === 'ar'
                                ? 'هذا المشروع يمثل رؤيتنا في تقديم حلول معمارية مبتكرة تجمع بين الجمال والوظيفة. نسعى دائماً لتحقيق أعلى معايير الجودة والاستدامة في كل مشروع نقوم به.'
                                : 'This project represents our vision in delivering innovative architectural solutions that combine beauty and functionality. We always strive to achieve the highest standards of quality and sustainability in every project we undertake.'
                            }
                        </p>
                    </div>
                </div>

                {/* Right side - Main image with pinned gallery notes */}
                <div className="lg:w-3/5 relative flex items-center justify-center p-4 md:p-8 lg:p-12">
                    <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>

                        {/* Decorative Circle on main image */}
                        <svg
                            className="absolute z-20 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 top-1/2"
                            style={{
                                transform: 'translateY(-50%) translateX(-50%)',
                                left: language === 'ar' ? 'auto' : '0',
                                right: language === 'ar' ? '0' : 'auto',
                            }}
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

                        {/* Main project image */}
                        <div className="aspect-[3/4] overflow-hidden relative z-10">
                            <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Pinned gallery notes scattered around the main image */}
                        {galleryImages.map((img, index) => {
                            const pos = PIN_POSITIONS[index % PIN_POSITIONS.length];
                            const isEnlarged = enlargedIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="absolute z-30 group"
                                    style={{
                                        top: pos.top,
                                        left: pos.left,
                                        right: pos.right,
                                        // When enlarged, override position to center
                                        ...(isEnlarged ? {
                                            top: '50%',
                                            left: '50%',
                                            right: 'auto',
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 60,
                                        } : {
                                            transform: `rotate(${pos.rotate}deg)`,
                                        }),
                                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    }}
                                >
                                    {/* Pin */}
                                    {!isEnlarged && (
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-40 w-4 h-4">
                                            <div className="w-3 h-3 rounded-full bg-aoc-gold shadow-lg border border-yellow-600" />
                                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-px h-2 bg-gray-400" />
                                        </div>
                                    )}

                                    {/* Photo card */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEnlargedIndex(isEnlarged ? null : index);
                                        }}
                                        className={`
                                            block bg-white p-1 shadow-xl cursor-pointer
                                            transition-all duration-400
                                            ${isEnlarged
                                                ? 'w-[70vw] max-w-[500px] md:w-[400px] lg:w-[500px] p-2 shadow-2xl'
                                                : 'w-16 md:w-20 lg:w-24 hover:scale-110 hover:shadow-2xl hover:z-40'
                                            }
                                        `}
                                        style={{
                                            transform: isEnlarged ? 'rotate(0deg)' : undefined,
                                        }}
                                    >
                                        <div className={`overflow-hidden ${isEnlarged ? 'aspect-[4/3]' : 'aspect-square'}`}>
                                            <img
                                                src={img}
                                                alt={`${project.title} gallery ${index + 1}`}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Enlarged image overlay backdrop */}
            {enlargedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    onClick={() => setEnlargedIndex(null)}
                />
            )}

            {/* Bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 px-8 py-4 flex justify-between items-center text-aoc-white/50 text-xs md:text-sm font-inter-tight font-light tracking-widest z-50">
                <span>A</span>
                <span>FOUNDATION</span>
                <span>OF</span>
                <span>TRUST</span>
            </div>
        </div>
    );
}
