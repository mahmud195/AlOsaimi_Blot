import { X } from 'lucide-react';
import aocLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOC Logo White.png';
import aocMobileLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOCMobile.png';

/**
 * NewsModal Component
 * Displays a full-screen modal with news article details
 * Supports RTL for Arabic language
 */
interface NewsArticle {
    title: string;
    subtitle: string;
    text: string;
    image: string;
}

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    article: NewsArticle;
    language: 'en' | 'ar';
}

export default function NewsModal({ isOpen, onClose, article, language }: NewsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-aoc-indigo z-50 overflow-y-auto">
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
                    <a href="#news" onClick={onClose} className="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <img src={aocMobileLogo} alt="AOC Logo" className="h-full w-auto md:hidden" />
                        <img src={aocLogo} alt="AOC Logo" className="h-full w-auto hidden md:block" />
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
                <div className={`lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-8 lg:py-16 ${language === 'ar' ? 'text-right' : ''}`}>
                    {/* Title */}
                    <div className="mb-8 lg:mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-darker-grotesque font-extralight tracking-[0.05em] uppercase text-aoc-white leading-[0.9] mb-4">
                            {article.title}
                        </h1>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-darker-grotesque font-extralight tracking-[0.05em] text-aoc-gold">
                            {article.subtitle}
                        </h2>
                    </div>

                    {/* Full Description */}
                    <div className="max-w-lg space-y-6">
                        <p className="text-aoc-white/80 text-base lg:text-lg font-inter-tight font-light leading-relaxed text-justify">
                            {article.text}
                        </p>
                    </div>
                </div>

                {/* Right side - Image with decorative circle */}
                <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-16">
                    {/* Image container */}
                    <div className="relative w-full max-w-xl">
                        {/* Decorative Circle */}
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

                        <div className="aspect-[3/4] overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 px-8 py-4 flex justify-between items-center text-aoc-white/50 text-xs md:text-sm font-inter-tight font-light tracking-widest">
                <span>A</span>
                <span>FOUNDATION</span>
                <span>OF</span>
                <span>TRUST</span>
            </div>
        </div>
    );
}
