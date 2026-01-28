import { useState, useRef, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface Service {
  id: string;
  title: string;
  description: string;
  place: string;
  fullDescription: string;
  image: string;
}

function ServiceModal({ service, isOpen, onClose, language }: { service: Service | null; isOpen: boolean; onClose: () => void; language: string }) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className={`bg-aoc-indigo max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${language === 'ar' ? 'rtl' : ''}`}>
        <div className="sticky top-0 bg-aoc-indigo flex items-center justify-between p-6 border-b border-aoc-gold/30">
          <h3 className="text-3xl font-space-grotesk font-light tracking-[0.15em] uppercase text-aoc-gold">
            {service.title}
          </h3>
          <button
            onClick={onClose}
            className="text-aoc-white hover:text-aoc-gold transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="relative h-96 overflow-hidden border border-aoc-gold/30">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-inter-tight font-light tracking-[0.2em] uppercase text-aoc-gold mb-2">
                LOCATION
              </p>
              <p className="text-aoc-white text-lg font-inter-tight font-light">
                {service.place}
              </p>
            </div>

            <div className="w-24 h-[1px] bg-aoc-gold" />

            <div>
              <h4 className="text-xl font-space-grotesk font-light tracking-[0.1em] uppercase text-aoc-white mb-4">
                ABOUT
              </h4>
              <p className="text-aoc-white/70 text-base font-inter-tight font-light leading-relaxed">
                {service.fullDescription}
              </p>
            </div>
          </div>
        </div>
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
  const lastScrollLeft = useRef(0);
  const isScrollButtonPressed = useRef(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);

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

  const scrollLeft = () => {
    if (carouselRef.current) {
      if (carouselRef.current.scrollLeft <= 300) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      } else {
        carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const currentScroll = carouselRef.current.scrollLeft;

      if (currentScroll + 300 >= maxScroll) {
        carouselRef.current.scrollLeft = 0;
      } else {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };

  const handleScrollButtonDown = () => {
    isScrollButtonPressed.current = true;
    setIsButtonPressed(true);
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
    <section id="services" className={`min-h-screen flex items-center py-24 ${language === 'ar' ? 'rtl' : ''}`} style={{ backgroundColor: 'rgb(0, 48, 135)' }}>
      <div className="max-w-screen-2xl mx-auto px-8 w-full">
        <div className={`grid md:grid-cols-3 gap-16 items-center ${language === 'ar' ? 'rtl' : ''}`}>
          <div className={`space-y-8 ${language === 'ar' ? 'md:order-2' : ''}`}>
            <h2 className="text-5xl md:text-6xl font-space-grotesk font-extralight tracking-[0.2em] uppercase leading-tight text-aoc-white">
              {t.services.title}
            </h2>

            <div className="w-24 h-[1px] bg-aoc-gold" />

            <p className="text-aoc-white/80 text-base font-inter-tight font-light leading-relaxed">
              {t.services.intro}
            </p>

            <p className="text-aoc-white/80 text-base font-inter-tight font-light leading-relaxed">
              Built on a solid foundation of trust and driven by a relentless passion for excellence, we create innovative solutions that contribute to building a sustainable future.
            </p>
          </div>

          <div className={`md:col-span-2 relative ${language === 'ar' ? 'md:order-1' : ''}`}>
            <div
              ref={carouselRef}
              className={`flex gap-6 overflow-x-auto pb-4 ${language === 'ar' ? 'flex-row-reverse' : ''} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-72 group cursor-pointer"
                >
                  <div
                    onClick={() => handleReadMore(service)}
                    className="relative h-80 overflow-hidden mb-6"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-space-grotesk font-light tracking-[0.12em] uppercase text-aoc-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-aoc-white/70 text-sm font-inter-tight font-light leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <button
                    onClick={() => handleReadMore(service)}
                    className="text-sm font-inter-tight font-light tracking-[0.1em] uppercase text-blue-300 hover:text-aoc-white transition-colors underline"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>

            <div className="relative mt-8 pt-4 h-12 flex items-center justify-between">
              {canScroll && (
                <div className="absolute right-0 flex items-center gap-4">
                  <button
                    onMouseDown={handleScrollButtonDown}
                    onMouseUp={handleScrollButtonUp}
                    onMouseLeave={handleScrollButtonUp}
                    className={`flex items-center gap-4 px-8 py-3 rounded-full border-2 border-aoc-gold/50 hover:border-aoc-gold hover:bg-aoc-gold/5 transition-all group ${isButtonPressed ? 'scale-90 bg-aoc-gold/15 border-aoc-gold' : 'scale-100'}`}
                    style={{
                      transform: isButtonPressed ? 'scale(0.92)' : 'scale(1)',
                      transition: 'transform 0.15s ease-out'
                    }}
                  >
                    <span className="text-aoc-gold font-inter-tight font-light tracking-[0.15em] uppercase text-sm group-hover:tracking-[0.2em] transition-all">
                      Scroll
                    </span>
                    <ChevronRight size={20} className="text-aoc-gold animate-pulse" />
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
