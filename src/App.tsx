import { ChevronDown, ArrowRight, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import TopNav from './components/TopNav';
import Services from './components/Services';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import heroVideo from './assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Video/AOC_x_BF_H_No_Subtitles.mp4';
import aboutImage from './assets/asset_16.png';
import beFoundLogo from './assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/BeFound Sigment.png';

function App() {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [activeSection, setActiveSection] = useState('home');
  const [introComplete, setIntroComplete] = useState(false);
  const [introPhase, setIntroPhase] = useState<'initial' | 'drawing' | 'revealing' | 'expanding' | 'done'>('initial');
  const [circleSize, setCircleSize] = useState(150); // Initial circle radius in px
  const [bannerOffset, setBannerOffset] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Viewport dimensions for circle centering
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  // Scroll animations for sections
  const aboutAnimation = useScrollAnimation<HTMLDivElement>();
  const aboutTitleAnimation = useScrollAnimation<HTMLDivElement>();
  const aboutImageAnimation = useScrollAnimation<HTMLDivElement>();
  const aboutTextAnimation = useScrollAnimation<HTMLDivElement>();
  const projectsAnimation = useScrollAnimation<HTMLDivElement>();
  const contactAnimation = useScrollAnimation<HTMLDivElement>();

  // Configurable banner speed (pixels per frame) - adjust this value to control speed
  const BANNER_SPEED = 2;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Continuous banner movement when scrolling
  useEffect(() => {
    const animate = () => {
      if (isScrollingRef.current) {
        setBannerOffset(prev => prev + BANNER_SPEED);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        animationRef.current = requestAnimationFrame(animate);
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Stop animation after scrolling stops
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Intro animation sequence - Circle reveal
  useEffect(() => {
    // Force scroll to top immediately and prevent browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Update viewport size
    setViewportSize({ width: window.innerWidth, height: window.innerHeight });

    // Handle resize to keep circle centered
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    // Disable scrolling during intro
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Start drawing phase (circle draws around center)
    const drawTimer = setTimeout(() => {
      setIntroPhase('drawing');
    }, 100);

    // Start revealing phase (inside circle becomes clear)
    const revealTimer = setTimeout(() => {
      setIntroPhase('revealing');
    }, 1600);

    // Start expanding phase (circle grows to reveal everything)
    const expandTimer = setTimeout(() => {
      setIntroPhase('expanding');
      // Enable scrolling when expansion starts
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Animate circle size from 150 to cover full screen - slower expansion
      let size = 150;
      const expandAnimation = setInterval(() => {
        size += 20; // Slower increment (was 50)
        setCircleSize(size);
        if (size >= Math.max(window.innerWidth, window.innerHeight) * 1.5) {
          clearInterval(expandAnimation);
        }
      }, 16);
    }, 2800);

    // Complete intro after animation (extended time)
    const completeTimer = setTimeout(() => {
      setIntroPhase('done');
      setIntroComplete(true);
      // Re-enable scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 6000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(revealTimer);
      clearTimeout(expandTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className={`bg-aoc-black text-aoc-white overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Intro Animation Overlay - Circle Reveal */}
      {!introComplete && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {/* Glassy blur overlay with inverted circle mask - blur outside, clear inside */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              maskImage: introPhase === 'initial'
                ? 'none'
                : introPhase === 'drawing'
                  ? 'none'
                  : `radial-gradient(circle ${introPhase === 'expanding' ? circleSize : 150}px at 50vw 50vh, transparent 100%, black 100%)`,
              WebkitMaskImage: introPhase === 'initial'
                ? 'none'
                : introPhase === 'drawing'
                  ? 'none'
                  : `radial-gradient(circle ${introPhase === 'expanding' ? circleSize : 150}px at 50vw 50vh, transparent 100%, black 100%)`,
              opacity: introPhase === 'done' ? 0 : 1,
              transition: 'opacity 0.5s ease-out',
            }}
          />

          {/* SVG for circle stroke animation - draws from 12 o'clock clockwise */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${viewportSize.width} ${viewportSize.height}`}
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: introPhase === 'done' ? 0 : 1,
              transition: 'opacity 0.5s ease-out'
            }}
          >
            {/* Circle stroke drawing animation */}
            <circle
              cx={viewportSize.width / 2}
              cy={viewportSize.height / 2}
              r={introPhase === 'expanding' ? circleSize : 150}
              fill="none"
              stroke="#CAB64B"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: introPhase === 'expanding' ? circleSize * 2 * Math.PI : 150 * 2 * Math.PI,
                strokeDashoffset: introPhase === 'initial' ? 150 * 2 * Math.PI : 0,
                transform: `rotate(-90deg)`,
                transformOrigin: `${viewportSize.width / 2}px ${viewportSize.height / 2}px`,
                transition: introPhase === 'drawing' ? 'stroke-dashoffset 1.4s ease-in-out' :
                  introPhase === 'expanding' ? 'all 0.016s linear' : 'none',
                opacity: introPhase === 'done' ? 0 : 1
              }}
            />
          </svg>
        </div>
      )}

      <TopNav activeSection={activeSection} />

      {/* Hero Video Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-aoc-black/60 via-aoc-indigo/20 to-aoc-black/70" />
        </div>


        {/* Scrolling Banner - positioned below center */}
        <div className={`absolute left-0 right-0 z-20 w-screen overflow-hidden ${language === 'ar' ? 'top-[65%]' : 'top-[70%]'}`}>
          {language === 'ar' ? (
            /* Arabic Banner - scroll-based movement (left to right, seamless loop) */
            <div
              className="flex whitespace-nowrap transition-transform duration-75 ease-linear"
              style={{
                width: 'max-content',
                transform: `translateX(${-(bannerOffset % 1200)}px)`
              }}
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الثقة</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الابتكار</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الدقة</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الثقة</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الابتكار</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الدقة</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الثقة</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الابتكار</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-12">الدقة</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white mx-6">•</span>
            </div>
          ) : (
            /* English Banner - scroll-based movement (right to left) */
            <div
              className="flex whitespace-nowrap"
              style={{
                width: 'max-content',
                transform: `translateX(${-(bannerOffset % 2000)}px)`
              }}
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white">
                {t.hero.title}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white">
                {t.hero.title}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white">
                {t.hero.title}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white">
                {t.hero.title}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white">
                {t.hero.title}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white">
                {t.hero.title}
              </span>
            </div>
          )}
        </div>

        {/* Scroll Indicator - Left Side */}
        <div className="absolute bottom-8 left-8 z-30">
          <div className="flex flex-col items-center gap-2 px-3 py-4 border border-aoc-white/30 rounded-full">
            <span className="text-aoc-white/80 text-xs font-inter-tight font-light tracking-[0.15em] uppercase writing-vertical">
              SCROLL
            </span>
            <ChevronDown className="text-aoc-white/80 animate-bounce" size={16} strokeWidth={1} />
          </div>
        </div>

        {/* Bottom Bar - Native Design */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="w-full px-4 py-4 flex items-center justify-between">
            {/* Left spacer for scroll indicator */}
            <div className="w-20"></div>

            {/* Social Media Icons - Center */}
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>

            {/* BeFound Logo on Right */}
            <div className="flex items-center">
              <img src={beFoundLogo} alt="BeFound Design Studio" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen bg-aoc-indigo flex items-center py-24">
        <div ref={aboutAnimation.ref} className={`max-w-screen-2xl mx-auto px-4 md:px-8 w-full ${language === 'ar' ? 'rtl' : ''}`}>
          {/* Container with relative positioning for overlapping elements */}
          <div className="relative">
            {/* ABOUT US Title - Always positioned to overlap the image */}
            <div
              ref={aboutTitleAnimation.ref}
              className={`absolute top-6 md:top-10 z-20 animate-slide-right ${aboutTitleAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'right-[5%] md:right-[8.5%]' : 'left-4 md:left-[3.5rem]'}`}
            >
              {/* Mobile: Single line */}
              <h2 className={`md:hidden text-3xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white ${language === 'ar' ? 'text-right' : ''}`}>
                {language === 'ar' ? 'من نحن' : 'ABOUT US'}
              </h2>
              {/* Desktop: Two lines */}
              <h2 className={`hidden md:block text-8xl lg:text-9xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white ${language === 'ar' ? 'text-left' : ''}`}>
                {t.about.title.split('\n')[0]}
              </h2>
              <h2 className={`hidden md:block text-8xl lg:text-9xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white -mt-2 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                {t.about.title.split('\n')[1]}
              </h2>
            </div>

            {/* Main content - Flex column on mobile, relative positioning on desktop */}
            <div className="relative w-full flex flex-col md:block">
              {/* Image container with decorative circle */}
              <div
                ref={aboutImageAnimation.ref}
                className={`relative pt-16 md:pt-16 w-[80%] md:w-[50%] mx-auto animate-fade-in delay-200 ${aboutImageAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'md:mr-[15%] md:ml-auto' : 'md:ml-[17%] md:mr-auto'}`}
              >
                {/* Decorative Circle - visible on all screens */}
                <div className={`absolute z-10 w-16 h-16 md:w-32 md:h-32 rounded-full border-2 border-aoc-gold top-[55%] -translate-y-1/2 ${language === 'ar' ? '-right-8 md:-right-16' : '-left-8 md:-left-16'}`} />

                {/* Image - smaller on mobile with aspect ratio */}
                <div className="relative aspect-[4/5] md:h-[600px] md:aspect-auto overflow-hidden">
                  <img
                    src={aboutImage}
                    alt="Architecture"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text content - below image on mobile, overlapping on desktop */}
              <div
                ref={aboutTextAnimation.ref}
                className={`relative md:absolute z-10 p-4 md:p-12 mt-6 md:mt-0 md:top-1/2 md:-translate-y-1/4 w-full md:w-[60%] animate-slide-up delay-400 ${aboutTextAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'md:left-0 text-right' : 'md:right-0'}`}
              >
                <div className="space-y-4 md:space-y-6">
                  <p className={`text-aoc-white/80 text-sm md:text-[1.35rem] font-inter-tight font-light leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
                    {t.about.paragraph1}
                  </p>

                  <p className={`text-aoc-white/80 text-sm md:text-[1.35rem] font-inter-tight font-light leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
                    {t.about.paragraph2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />

      <section id="projects" className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
            alt="Featured Project"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aoc-black/90 via-aoc-indigo/50 to-transparent" />
        </div>

        <div
          ref={projectsAnimation.ref}
          className={`relative z-10 max-w-screen-2xl mx-auto px-8 py-24 w-full animate-slide-up ${projectsAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'rtl' : ''}`}
        >
          <div className="max-w-2xl space-y-6">
            <div className="text-sm font-inter-tight font-light tracking-[0.3em] uppercase text-aoc-gold">
              {t.projects.featured}
            </div>
            <h3 className="text-5xl font-darker-grotesque font-extralight tracking-[0.15em] uppercase text-aoc-white">
              {t.projects.title}
            </h3>
            <div className={`flex gap-8 text-aoc-white/70 font-inter-tight font-light ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span>{t.projects.year}</span>
              <span>•</span>
              <span>{t.projects.location}</span>
            </div>
            <button className={`group flex items-center gap-3 text-sm tracking-[0.2em] uppercase mt-8 text-aoc-white hover:text-aoc-gold transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              {t.projects.learnMore}
              <ArrowRight size={16} className={`${language === 'ar' ? '-scale-x-100' : ''} group-hover:translate-x-2 transition-transform`} />
            </button>
          </div>
        </div>
      </section>

      <section id="news" className="min-h-screen bg-aoc-black flex items-center py-24">
        <div className="max-w-screen-2xl mx-auto px-8 w-full">
          <div className={`grid md:grid-cols-2 gap-16 items-center ${language === 'ar' ? 'rtl' : ''}`}>
            <div className={`space-y-8 ${language === 'ar' ? 'md:order-2 text-right' : ''}`}>
              <h2 className="text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase leading-tight text-aoc-white">
                {t.news.title}
              </h2>

              <div className={`w-24 h-[1px] bg-aoc-gold ${language === 'ar' ? 'ml-auto' : ''}`} />

              <div className="space-y-4">
                <div className="text-sm font-inter-tight font-light tracking-[0.2em] uppercase text-aoc-gold">
                  {t.news.date}
                </div>
                <h3 className="text-3xl font-darker-grotesque font-light tracking-[0.1em] leading-snug text-aoc-white">
                  {t.news.articleTitle}
                </h3>
                <p className="text-aoc-white/70 font-inter-tight font-light leading-relaxed">
                  {t.news.articleText}
                </p>
                <button className={`group flex items-center gap-3 text-sm tracking-[0.2em] uppercase mt-6 text-aoc-white hover:text-aoc-gold transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {t.news.readMore}
                  <ArrowRight size={16} className={`${language === 'ar' ? '-scale-x-100' : ''} group-hover:translate-x-2 transition-transform`} />
                </button>
              </div>
            </div>

            <div className={`relative h-[600px] overflow-hidden border-2 border-aoc-gold/30 ${language === 'ar' ? 'md:order-1' : ''}`}>
              <img
                src="https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg"
                alt="News"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`min-h-screen bg-aoc-indigo flex items-center py-24 ${language === 'ar' ? 'rtl' : ''}`}>
        <div
          ref={contactAnimation.ref}
          className={`max-w-3xl mx-auto px-8 w-full animate-slide-up ${contactAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'text-right' : ''}`}
        >
          <h2 className="text-6xl font-darker-grotesque font-extralight tracking-[0.2em] uppercase mb-4 leading-tight text-aoc-gold">
            {t.contact.title}
          </h2>

          <div className={`w-24 h-[1px] bg-aoc-gold mb-16 ${language === 'ar' ? 'ml-auto' : ''}`} />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  placeholder={t.contact.firstName}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.15em] transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t.contact.lastName}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.15em] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder={t.contact.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.15em] transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                placeholder={t.contact.message}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.15em] resize-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-aoc-gold text-aoc-black px-12 py-4 text-sm font-inter-tight font-light tracking-[0.2em] uppercase hover:bg-aoc-gold/90 transition-colors"
            >
              {t.contact.send}
            </button>
          </form>
        </div>
      </section>

      {/* Fixed Bottom Bar - Glassmorphism (shows when not in hero) */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 transition-all duration-300 ${activeSection === 'home' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full px-12 py-3 flex items-center justify-between">
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">A</span>
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">FOUNDATION</span>
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">OF</span>
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">TRUST</span>
        </div>
      </div>

      {/* Custom Cursor - Touch indicator style */}
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
    </div>
  );
}

export default App;
