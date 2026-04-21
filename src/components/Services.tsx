import { useState, useRef, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import aocLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOC Logo White.png';
import aocMobileLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOCMobile.png';

import projectManagementImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/project_management.png';
import supervisionImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/Engineering Supervision.jpg.jpeg';
import designServicesImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/Design Services.jpg';
import surveyingImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/Surveying_.jpg';
import aorImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/A.O.R.jpg';
import engineeringServicesImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/Engineering Services.png';
import bimServicesImg from '../assets/AlOsaimi_Website_Design 02_Folder/Pics For Website_Our Services/BIM Services Picture.jpg.jpeg';
import beFoundLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/BeFound Sigment.png';

import certEtimad from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Etimad.png';
import certJeddahMunicipality from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Jeddah Municipality.png';
import certKhibrah from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Khibrah Platform.png';
import certMoJ from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Ministry Of Justice.png';
import certMoMRAH from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Ministry Of Municipal Rural Affairs & Housing.png';
import certModon from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Modon.png';
import certNWC from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/National Water Company.png';
import certSCE from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Saudi Council Of Engineers.png';
import certSEC from '../assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Certificates/AlOsaimi_Certificates/Saudi Electricity Company.png';

const aorCertificates = [
  { src: certSCE, name: 'Saudi Council Of Engineers', url: 'https://www.saudieng.sa' },
  { src: certMoMRAH, name: 'Ministry of Municipal, Rural Affairs & Housing', url: 'https://www.momah.gov.sa' },
  { src: certMoJ, name: 'Ministry of Justice', url: 'https://www.moj.gov.sa' },
  { src: certJeddahMunicipality, name: 'Jeddah Municipality', url: 'https://www.jeddah.gov.sa' },
  { src: certNWC, name: 'National Water Company', url: 'https://www.nwc.com.sa' },
  { src: certModon, name: 'Modon', url: 'https://www.modon.gov.sa' },
  { src: certSEC, name: 'Saudi Electricity Company', url: 'https://www.se.com.sa' },
  { src: certEtimad, name: 'Etimad', url: 'https://etimad.sa' },
  { src: certKhibrah, name: 'Khibrah Platform', url: 'https://khibrah.com.sa' },
];

interface Service {
  id: string;
  title: string;
  description: string;
  place: string;
  fullDescription: string;
  image: string;
}

function ServicesScrollView({ services, isOpen, onClose, language }: { services: Service[]; isOpen: boolean; onClose: () => void; language: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ringEl = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef(false);

  // Lock body scroll + reset to top when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveIndex(0);
      activeIndexRef.current = 0;
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Scroll-based active detection + ring tracking (offsetTop-based, stable across style re-renders)
  useEffect(() => {
    if (!isOpen) return;
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    const update = () => {
      const contentEl = scrollContentRef.current;
      if (!scrollEl || !contentEl) return;
      const scrollTop = scrollEl.scrollTop;
      const viewportCenter = scrollEl.clientHeight * 0.4;
      let closestIdx = 0;
      let closestDist = Infinity;
      imageRefs.current.forEach((el, idx) => {
        if (!el) return;
        // Sum offsetTop up to scrollContent for stable parent-relative position
        let top = 0;
        let node: HTMLElement | null = el;
        while (node && node !== contentEl) {
          top += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        const elCenter = top + el.offsetHeight / 2;
        const dist = Math.abs(elCenter - scrollTop - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closestIdx = idx; }
      });
      if (activeIndexRef.current !== closestIdx) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }
      const imageEl = imageRefs.current[closestIdx];
      const ring = ringEl.current;
      if (imageEl && ring) {
        let top = 0;
        let left = 0;
        let node: HTMLElement | null = imageEl;
        while (node && node !== contentEl) {
          top += node.offsetTop;
          left += node.offsetLeft;
          node = node.offsetParent as HTMLElement | null;
        }
        ring.style.top = `${top}px`;
        ring.style.left = `${left}px`;
        ring.style.width = `${imageEl.offsetWidth}px`;
        ring.style.height = `${imageEl.offsetHeight}px`;
        ring.style.opacity = '1';
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    const t1 = setTimeout(update, 100);
    const t2 = setTimeout(update, 500);
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  const scrollToService = (id: string) => {
    const el = sectionRefs.current[id];
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    isProgrammaticScrollRef.current = true;
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    container.scrollBy({ top: elTop - containerTop - 80, behavior: 'smooth' });
    setTimeout(() => { isProgrammaticScrollRef.current = false; }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-aoc-indigo z-50 overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-[70] bg-aoc-black/30 backdrop-blur-md border-b border-white/10 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="#services" onClick={onClose} className="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src={aocMobileLogo} alt="AOC Logo" className="h-full w-auto md:hidden" />
            <img src={aocLogo} alt="AOC Logo" className="h-full w-auto hidden md:block" />
          </a>
          <div className="md:hidden w-10" />
          <button
            onClick={onClose}
            className="relative w-10 h-10 flex items-center justify-center"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" strokeWidth="1" />
            </svg>
            <X size={20} className="text-aoc-white hover:text-aoc-gold transition-colors" />
          </button>
        </div>
      </nav>

      {/* Main area */}
      <div className={`h-full flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`} style={{ paddingTop: '64px' }}>
        {/* Sidebar — fixed, shows all 7 in order */}
        <aside className={`hidden md:flex w-56 lg:w-64 shrink-0 flex-col justify-center px-6 lg:px-8 ${language === 'ar' ? 'border-l border-white/10' : 'border-r border-white/10'}`}>
          <nav className="space-y-5">
            {services.map((service, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`block w-full font-darker-grotesque font-medium tracking-[0.1em] uppercase truncate transition-colors duration-300 text-sm ${language === 'ar' ? 'text-right' : 'text-left'} ${isActive ? 'text-aoc-gold' : 'text-aoc-white/60 hover:text-aoc-white'}`}
                >
                  {service.title}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 md:px-10 lg:px-14 pt-8 md:pt-12 pb-32 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', contain: 'layout paint' }}
        >
          <div ref={scrollContentRef} className="max-w-5xl mx-auto relative">
            {/* Animated gold ring — tracks the active service image (direct DOM updates, zero re-renders) */}
            <div
              ref={ringEl}
              className="absolute pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100]"
              style={{ opacity: 0, willChange: 'top, left, width, height' }}
            >
              <svg
                className={`absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${language === 'ar' ? '-right-6 md:-right-8 lg:-right-10' : '-left-6 md:-left-8 lg:-left-10'} -top-6 md:-top-8 lg:-top-10`}
                viewBox="0 0 100 100"
                style={{ overflow: 'visible' }}
              >
                <circle cx="50" cy="50" r="48" fill="none" stroke="#CAB64B" strokeWidth="1.5" />
              </svg>
            </div>

            {services.map((service, index) => {
              const titleWords = service.title.split(' ');
              const half = Math.ceil(titleWords.length / 2);
              const firstLine = titleWords.slice(0, half).join(' ');
              const secondLine = titleWords.slice(half).join(' ');
              const isActive = activeIndex === index;

              return (
                <div key={service.id} className="relative">
                  {/* Divider between cards (matching ProjectModal) */}
                  {index > 0 && (
                    <div className="w-full flex items-center gap-4 py-10 md:py-14">
                      <div className="flex-1 h-px bg-white/10" />
                      <div className="w-1 h-1 rounded-full bg-aoc-gold/60" />
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  )}

                  <section
                    ref={el => { sectionRefs.current[service.id] = el; }}
                    data-service-id={service.id}
                    className="rounded-sm overflow-visible transition-all duration-700"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)',
                      border: isActive ? '1px solid rgba(202, 182, 75, 0.5)' : '1px solid rgba(202, 182, 75, 0.25)',
                      backdropFilter: isActive ? 'blur(24px)' : 'blur(16px)',
                      WebkitBackdropFilter: isActive ? 'blur(24px)' : 'blur(16px)',
                      boxShadow: isActive ? '0 0 40px rgba(202, 182, 75, 0.08), inset 0 0 30px rgba(255,255,255,0.03)' : 'none',
                      padding: '3.5rem 3rem 3rem 3.5rem',
                    }}
                  >
                    <div className={`flex flex-col lg:flex-row gap-8 lg:gap-14 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Text */}
                      <div className={`flex-1 flex flex-col justify-center ${language === 'ar' ? 'text-right' : ''}`}>
                        <div className="mb-5 lg:mb-8">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-darker-grotesque font-extralight tracking-[0.05em] uppercase text-aoc-white leading-[0.95]">
                            {firstLine}
                          </h2>
                          {secondLine && (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-darker-grotesque font-extralight tracking-[0.05em] uppercase text-aoc-white leading-[0.95]">
                              {secondLine}
                            </h2>
                          )}
                        </div>

                        <div className="max-w-lg space-y-4">
                          <p className="text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify">
                            {service.fullDescription}
                          </p>

                          {service.place && (
                            <p className="text-aoc-white/50 text-xs md:text-sm font-inter-tight font-light">
                              {language === 'ar' ? 'الموقع: ' : 'Location: '}{service.place}
                            </p>
                          )}

                          {service.id === 'designServices' && (
                            <div className="mt-5">
                              <p className="text-[10px] md:text-xs font-inter-tight font-light tracking-[0.1em] text-aoc-white/60 mb-2 uppercase">
                                {language === 'ar' ? 'مع شريكنا الإبداعي' : 'With our Creative Partner'}
                              </p>
                              <a
                                href="https://www.befound.design/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block transition-opacity hover:opacity-80"
                              >
                                <img src={beFoundLogo} alt="BeFound Design Studio" className="h-6 w-auto" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Image - tracked by ring */}
                      <div
                        ref={el => { imageRefs.current[index] = el; }}
                        className="lg:w-72 xl:w-80 shrink-0"
                      >
                        <div className="w-full aspect-[3/4] overflow-hidden rounded-sm">
                          <img
                            src={service.image}
                            alt={service.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Accreditations strip — full width row under the card, natural colors */}
                    {service.id === 'architectOfRecord' && (
                      <div className="mt-8">
                        <div className="rounded-lg p-5 border border-white/40" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                          <p className={`text-[10px] md:text-xs font-inter-tight font-bold tracking-[0.15em] text-aoc-indigo mb-4 uppercase ${language === 'ar' ? 'text-right' : ''}`}>
                            {language === 'ar' ? 'الاعتمادات والتصنيفات' : 'Accreditations & Classifications'}
                          </p>
                          <div className="flex flex-col gap-6 md:gap-8 mt-4">
                            {/* Top Row: 5 Logos */}
                            <div className="flex items-center justify-between gap-4">
                              {aorCertificates.slice(0, 5).map((cert) => (
                                <a
                                  key={cert.name}
                                  href={cert.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={cert.name}
                                  className="flex flex-1 items-center justify-center hover:scale-110 transition-transform duration-300 min-w-0"
                                >
                                  <img
                                    src={cert.src}
                                    alt={cert.name}
                                    loading="lazy"
                                    className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-full object-contain filter drop-shadow-md"
                                  />
                                </a>
                              ))}
                            </div>
                            {/* Bottom Row: 4 Logos (Spaced out to match top row width visually) */}
                            <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-20">
                              {aorCertificates.slice(5).map((cert) => (
                                <a
                                  key={cert.name}
                                  href={cert.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={cert.name}
                                  className="flex items-center justify-center hover:scale-110 transition-transform duration-300 shrink-0"
                                >
                                  <img
                                    src={cert.src}
                                    alt={cert.name}
                                    loading="lazy"
                                    className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain filter drop-shadow-md"
                                  />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                </div>
              );
            })}
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

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isScrollViewOpen, setIsScrollViewOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollButtonPressed = useRef(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);
  // half of scrollWidth = width of one set of cards (we render cards twice)
  const halfWidthRef = useRef(0);

  const titleAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const cardsAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });

  // Measure half-width after render and on resize
  useEffect(() => {
    const measure = () => {
      if (carouselRef.current) {
        halfWidthRef.current = carouselRef.current.scrollWidth / 2;
        // Start at position 0 (first set)
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setScrollStart(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const diff = e.clientX - dragStart;
    carouselRef.current.scrollLeft = scrollStart - diff;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleScrollButtonDown = () => {
    isScrollButtonPressed.current = true;
    setIsButtonPressed(true);
    const carousel = carouselRef.current;
    if (!carousel) return;

    const isRTL = language === 'ar';

    const scroll = () => {
      if (!isScrollButtonPressed.current) return;
      const half = halfWidthRef.current;

      if (isRTL) {
        carousel.scrollLeft -= 8;
        // when scrolled back past start of second set, jump forward silently
        if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += half;
        }
      } else {
        carousel.scrollLeft += 8;
        // when scrolled into the second set, jump back silently
        if (carousel.scrollLeft >= half) {
          carousel.scrollLeft -= half;
        }
      }
      scrollAnimationRef.current = requestAnimationFrame(scroll);
    };
    scrollAnimationRef.current = requestAnimationFrame(scroll);
  };

  const handleScrollButtonUp = () => {
    isScrollButtonPressed.current = false;
    setIsButtonPressed(false);
    if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
  };

  const services: Service[] = [
    {
      id: 'projectManagement',
      title: t.services.projectManagement.title,
      description: t.services.projectManagement.description,
      place: t.services.projectManagement.place,
      fullDescription: t.services.projectManagement.fullDescription,
      image: projectManagementImg
    },
    {
      id: 'engineeringSupervision',
      title: t.services.engineeringSupervision.title,
      description: t.services.engineeringSupervision.description,
      place: t.services.engineeringSupervision.place,
      fullDescription: t.services.engineeringSupervision.fullDescription,
      image: supervisionImg
    },
    {
      id: 'designServices',
      title: t.services.designServices.title,
      description: t.services.designServices.description,
      place: t.services.designServices.place,
      fullDescription: t.services.designServices.fullDescription,
      image: designServicesImg
    },
    {
      id: 'surveyingWorks',
      title: t.services.surveyingWorks.title,
      description: t.services.surveyingWorks.description,
      place: t.services.surveyingWorks.place,
      fullDescription: t.services.surveyingWorks.fullDescription,
      image: surveyingImg
    },
    {
      id: 'architectOfRecord',
      title: t.services.architectOfRecord.title,
      description: t.services.architectOfRecord.description,
      place: t.services.architectOfRecord.place,
      fullDescription: t.services.architectOfRecord.fullDescription,
      image: aorImg
    },
    {
      id: 'engineeringServices',
      title: t.services.engineeringServices.title,
      description: t.services.engineeringServices.description,
      place: t.services.engineeringServices.place,
      fullDescription: t.services.engineeringServices.fullDescription,
      image: engineeringServicesImg
    },
    {
      id: 'bimServices',
      title: t.services.bimServices.title,
      description: t.services.bimServices.description,
      place: t.services.bimServices.place,
      fullDescription: t.services.bimServices.fullDescription,
      image: bimServicesImg
    }
  ];

  return (
    <section id="services" className={`min-h-screen flex items-start pt-4 md:pt-0 pb-4 ${language === 'ar' ? 'rtl' : ''}`} style={{ backgroundColor: 'rgb(0, 48, 135)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 w-full">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-start md:items-center ${language === 'ar' ? 'rtl' : ''}`}>
          <div
            ref={titleAnimation.ref}
            className={`space-y-4 md:space-y-8 animate-slide-right ${titleAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'md:order-2 text-right' : ''}`}
          >
            <h2 className={`text-3xl md:text-6xl font-darker-grotesque font-extralight tracking-[0.15em] md:tracking-[0.2em] uppercase leading-tight text-aoc-white mt-0 md:-mt-20 ${language === 'ar' ? 'text-right' : 'text-right'}`}>
              {t.services.title}
            </h2>

            <p className={`text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify ${language === 'ar' ? 'text-right' : ''}`}>
              {t.services.intro}
            </p>

            <p className={`text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify ${language === 'ar' ? 'text-right' : ''}`}>
              {t.services.builtOn}
            </p>
          </div>

          <div
            ref={cardsAnimation.ref}
            className={`md:col-span-2 relative mt-4 md:mt-16 animate-fade-in delay-300 ${cardsAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'md:order-1' : ''}`}
          >
            <div
              ref={carouselRef}
              className={`flex gap-10 overflow-x-auto pb-4 ${language === 'ar' ? 'flex-row-reverse' : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                scrollBehavior: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {[...services, ...services].map((service, index) => {
                const isClone = index >= services.length;
                return (
                  <div
                    key={`${service.id}-${index}`}
                    aria-hidden={isClone}
                    className={`flex-shrink-0 w-80 group cursor-pointer ${!isClone ? `card-deal card-stack-${index} ${cardsAnimation.isVisible ? 'visible' : ''}` : 'opacity-100'}`}
                    style={!isClone ? { transitionDelay: `${index * 0.2}s` } : {}}
                  >
                    <div
                      onClick={() => setIsScrollViewOpen(true)}
                      className="relative w-80 aspect-[3/4] overflow-hidden mb-6 transition-transform duration-300 ease-out hover:scale-105"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-8 left-0 right-0 px-4">
                        <h3 className={`text-xl font-darker-grotesque font-light tracking-[0.12em] uppercase text-aoc-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className={`text-aoc-white/70 text-sm font-inter-tight font-light leading-relaxed mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {service.description}
                    </p>
                    <button
                      onClick={() => setIsScrollViewOpen(true)}
                      className={`text-sm font-inter-tight font-light tracking-[0.1em] uppercase text-blue-300 hover:text-aoc-white transition-colors underline block ${language === 'ar' ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}
                    >
                      {t.services.readMore}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-8 pt-4 h-12 hidden md:flex items-center justify-between">
              <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} flex items-center gap-4`}>
                  <button
                    onMouseDown={handleScrollButtonDown}
                    onMouseUp={handleScrollButtonUp}
                    onMouseLeave={handleScrollButtonUp}
                    className={`flex items-center gap-4 px-8 py-3 rounded-full border-2 border-aoc-gold/50 hover:border-aoc-gold hover:bg-aoc-gold/5 transition-all group ${isButtonPressed ? 'scale-90 bg-aoc-gold/15 border-aoc-gold' : 'scale-100'} ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                    style={{
                      transform: isButtonPressed ? 'scale(0.92)' : 'scale(1)',
                      transition: 'transform 0.15s ease-out'
                    }}
                  >
                    <span className="text-aoc-gold font-inter-tight font-light tracking-[0.15em] uppercase text-sm group-hover:tracking-[0.2em] transition-all">
                      {t.services.scroll}
                    </span>
                    <ChevronRight size={20} className={`text-aoc-gold animate-pulse ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesScrollView
        services={services}
        isOpen={isScrollViewOpen}
        onClose={() => setIsScrollViewOpen(false)}
        language={language}
      />
    </section>
  );
}
