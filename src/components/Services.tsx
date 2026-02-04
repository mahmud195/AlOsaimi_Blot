import { useState, useRef, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Service {
  id: string;
  title: string;
  description: string;
  place: string;
  fullDescription: string;
  image: string;
}

function ServiceModal({ service, isOpen, onClose, language }: { service: Service | null; isOpen: boolean; onClose: () => void; language: string }) {
  // Disable page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  // Split title into two lines for display
  const titleWords = service.title.split(' ');
  const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

  return (
    <div className="fixed inset-0 bg-aoc-indigo z-50 overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className={`fixed top-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 w-12 h-12 rounded-full bg-aoc-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-aoc-white hover:text-aoc-gold hover:border-aoc-gold transition-all`}
      >
        <X size={24} />
      </button>

      {/* Main content */}
      <div className={`min-h-screen flex flex-col lg:flex-row ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>

        {/* Left side - Title and description */}
        <div className={`lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24 ${language === 'ar' ? 'text-right' : ''}`}>
          {/* Large Title */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-darker-grotesque font-extralight tracking-[0.05em] uppercase text-aoc-white leading-[0.9]">
              {firstLine}
            </h1>
            <h1 className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-darker-grotesque font-extralight tracking-[0.05em] uppercase text-aoc-white leading-[0.9] ${language === 'ar' ? '' : 'lg:pl-16'}`}>
              {secondLine}
            </h1>
          </div>

          {/* Description */}
          <div className="max-w-lg space-y-6">
            <p className="text-aoc-white/80 text-base lg:text-lg font-inter-tight font-light leading-relaxed">
              {service.fullDescription}
            </p>

            {service.place && (
              <p className="text-aoc-white/60 text-sm font-inter-tight font-light">
                {language === 'ar' ? 'الموقع: ' : 'Location: '}{service.place}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Image with decorative circle */}
        <div className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-16">
          {/* Decorative Circle - positioned to overlap title and image */}
          <svg
            className="absolute z-20 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
            style={{
              top: '15%',
              left: language === 'ar' ? 'auto' : '0',
              right: language === 'ar' ? '0' : 'auto',
              transform: 'translate(-30%, 0)'
            }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#CAB64B"
              strokeWidth="1"
            />
          </svg>

          {/* Image container with fixed aspect ratio */}
          <div className="relative w-full max-w-xl">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - like About section */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-6 flex justify-between items-center text-aoc-white/50 text-sm font-inter-tight font-light tracking-widest">
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const isScrollButtonPressed = useRef(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);

  // Scroll animations (triggerOnce: false to repeat animations)
  const titleAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const cardsAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });

  useEffect(() => {
    const checkScroll = () => {
      if (carouselRef.current) {
        setCanScroll(carouselRef.current.scrollWidth > carouselRef.current.clientWidth);
      }
    };
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);


  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scroll = () => {
      if (isScrollButtonPressed.current) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;

        if (currentScroll + 8 >= maxScroll) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 8;
        }
        scrollAnimationRef.current = requestAnimationFrame(scroll);
      }
    };

    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };


  const handleScrollButtonDown = () => {
    isScrollButtonPressed.current = true;
    setIsButtonPressed(true);
    const carousel = carouselRef.current;
    if (!carousel) return;

    const isRTL = language === 'ar';

    const scroll = () => {
      if (isScrollButtonPressed.current) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;

        if (isRTL) {
          // For RTL: scroll from right to left (negative direction)
          if (currentScroll - 8 <= 0) {
            carousel.scrollLeft = maxScroll;
          } else {
            carousel.scrollLeft -= 8;
          }
        } else {
          // For LTR: scroll from left to right (positive direction)
          if (currentScroll + 8 >= maxScroll) {
            carousel.scrollLeft = 0;
          } else {
            carousel.scrollLeft += 8;
          }
        }
        scrollAnimationRef.current = requestAnimationFrame(scroll);
      }
    };
    scrollAnimationRef.current = requestAnimationFrame(scroll);
  };

  const handleScrollButtonUp = () => {
    isScrollButtonPressed.current = false;
    setIsButtonPressed(false);
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }
  };

  const services: Service[] = [
    {
      id: 'architecture',
      title: t.services.architecture.title,
      description: t.services.architecture.description,
      place: t.services.architecture.place,
      fullDescription: t.services.architecture.fullDescription,
      image: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg'
    },
    {
      id: 'interior',
      title: t.services.interior.title,
      description: t.services.interior.description,
      place: t.services.interior.place,
      fullDescription: t.services.interior.fullDescription,
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg'
    },
    {
      id: 'urban',
      title: t.services.urban.title,
      description: t.services.urban.description,
      place: t.services.urban.place,
      fullDescription: t.services.urban.fullDescription,
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg'
    },
    {
      id: 'landscape',
      title: t.services.landscape.title,
      description: t.services.landscape.description,
      place: t.services.landscape.place,
      fullDescription: t.services.landscape.fullDescription,
      image: 'https://images.pexels.com/photos/1092359/pexels-photo-1092359.jpeg'
    },
    {
      id: 'sustainability',
      title: t.services.sustainability.title,
      description: t.services.sustainability.description,
      place: t.services.sustainability.place,
      fullDescription: t.services.sustainability.fullDescription,
      image: 'https://images.pexels.com/photos/3862623/pexels-photo-3862623.jpeg'
    },
    {
      id: 'renovation',
      title: t.services.renovation.title,
      description: t.services.renovation.description,
      place: t.services.renovation.place,
      fullDescription: t.services.renovation.fullDescription,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    }
  ];

  const handleReadMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

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

            <p className={`text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
              {t.services.intro}
            </p>

            <p className={`text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
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
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex-shrink-0 w-80 group cursor-pointer card-deal card-stack-${index} ${cardsAnimation.isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div
                    onClick={() => handleReadMore(service)}
                    className="relative w-80 h-80 overflow-hidden mb-6"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-8 left-0 right-0 px-4 text-center">
                      <h3 className="text-xl font-darker-grotesque font-light tracking-[0.12em] uppercase text-aoc-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-aoc-white/70 text-sm font-inter-tight font-light leading-relaxed mb-4 text-center">
                    {service.description}
                  </p>

                  <button
                    onClick={() => handleReadMore(service)}
                    className="text-sm font-inter-tight font-light tracking-[0.1em] uppercase text-blue-300 hover:text-aoc-white transition-colors underline block mx-auto"
                  >
                    {t.services.readMore}
                  </button>
                </div>
              ))}
            </div>

            <div className="relative mt-8 pt-4 h-12 hidden md:flex items-center justify-between">
              {canScroll && (
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
              )}
            </div>
          </div>
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
    </section>
  );
}
