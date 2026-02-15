import { ChevronDown, ChevronLeft, ChevronRight, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import TopNav from './components/TopNav';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import heroVideo from './assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Video/AOC_x_BF_H_No_Subtitles_compressed.mp4';
import videoPoster from './assets/video_poster.jpg';
import aboutImage from './assets/asset_16.png';
import beFoundLogo from './assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/BeFound Sigment.png';

// Lazy load heavy components for better initial load performance
const Services = lazy(() => import('./components/Services'));
const NewsModal = lazy(() => import('./components/NewsModal'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

// Simple HTML sanitization for form input security
const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim();

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
  const [introPhase, setIntroPhase] = useState<'initial' | 'drawing' | 'expanding' | 'done'>('initial');
  const [circleSize, setCircleSize] = useState(150); // Initial circle radius in px
  const bannerOffsetRef = useRef(0);
  const bannerElRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Custom cursor - uses refs for zero re-render DOM updates
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);



  // Scroll animations for sections (triggerOnce: false to repeat animations)
  const aboutAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const aboutTitleAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const aboutImageAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const aboutTextAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const projectsAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const contactAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const newsAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });

  // News carousel state
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  // Projects carousel state
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectTransitionPhase, setProjectTransitionPhase] = useState<'idle' | 'expanding' | 'modal-open'>('idle');
  const learnMoreBarRef = useRef<HTMLDivElement>(null);
  const topNavWrapperRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // Easing function for smooth animation
  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Handle Learn More click — rAF-driven expansion with push effect
  const handleLearnMoreClick = useCallback(() => {
    if (projectTransitionPhase !== 'idle' || !learnMoreBarRef.current) return;
    const barEl = learnMoreBarRef.current;
    // Get the actual fixed <nav> element inside the TopNav wrapper
    const topNavEl = topNavWrapperRef.current?.querySelector('nav') as HTMLElement | null;
    const bottomBarEl = bottomBarRef.current;

    // Measure positions
    const rect = barEl.getBoundingClientRect();
    const startTop = rect.top;
    const startBottom = window.innerHeight - rect.bottom;
    const topNavHeight = topNavEl?.getBoundingClientRect().height || 0;
    const bottomBarHeight = bottomBarEl?.getBoundingClientRect().height || 0;

    document.body.style.overflow = 'hidden';
    setProjectTransitionPhase('expanding');

    // Switch bar to fixed at current position
    barEl.style.position = 'fixed';
    barEl.style.zIndex = '60';
    barEl.style.top = `${startTop}px`;
    barEl.style.bottom = `${startBottom}px`;
    barEl.style.transition = 'none';

    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeInOutQuad(progress);

      const currentTop = startTop * (1 - eased);
      const currentBottom = startBottom * (1 - eased);

      // Animate bar edges
      barEl.style.top = `${currentTop}px`;
      barEl.style.bottom = `${currentBottom}px`;

      // Push TopNav up only when bar's top edge reaches TopNav's bottom
      // Use style.top on the fixed nav element (moves it from top:0 to negative)
      if (topNavEl) {
        if (currentTop < topNavHeight) {
          topNavEl.style.top = `${currentTop - topNavHeight}px`;
        } else {
          topNavEl.style.top = '0px';
        }
      }

      // Push bottom bar down only when bar's bottom edge reaches bottom bar's top
      if (bottomBarEl) {
        if (currentBottom < bottomBarHeight) {
          bottomBarEl.style.bottom = `${currentBottom - bottomBarHeight}px`;
        } else {
          bottomBarEl.style.bottom = '0px';
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        setIsProjectModalOpen(true);
        setProjectTransitionPhase('modal-open');
      }
    };

    requestAnimationFrame(animate);
  }, [projectTransitionPhase]);

  // Handle closing the project modal — reset everything
  const handleProjectModalClose = useCallback(() => {
    setIsProjectModalOpen(false);
    setProjectTransitionPhase('idle');
    document.body.style.overflow = '';
    // Reset all inline styles
    if (learnMoreBarRef.current) {
      const el = learnMoreBarRef.current;
      el.style.position = '';
      el.style.zIndex = '';
      el.style.top = '';
      el.style.bottom = '';
      el.style.transition = '';
    }
    const topNavEl = topNavWrapperRef.current?.querySelector('nav') as HTMLElement | null;
    if (topNavEl) topNavEl.style.top = '';
    if (bottomBarRef.current) bottomBarRef.current.style.bottom = '';
  }, []);

  // Filter projects for the main carousel to show only 'RESIDENTIAL'
  const displayedProjects = t.projectsGallery.items.filter(p => p.category === 'RESIDENTIAL');

  // Auto-rotate project images every 5 seconds (pause when modal is open)
  useEffect(() => {
    if (isProjectModalOpen) return;
    const interval = setInterval(() => {
      setActiveProjectIndex(prev => (prev + 1) % displayedProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isProjectModalOpen, displayedProjects.length, activeProjectIndex]);

  // Handle news change with slide animation
  const handleNewsChange = (newIndex: number) => {
    if (isSliding || newIndex === activeNewsIndex) return;
    setIsSliding(true);
    setActiveNewsIndex(newIndex);
    setTimeout(() => setIsSliding(false), 700); // Match transition duration
  };

  // Auto-rotate news every 10 seconds (pause when modal is open)
  useEffect(() => {
    if (isNewsModalOpen) return; // Don't auto-rotate when modal is open

    const interval = setInterval(() => {
      setActiveNewsIndex(prev => {
        const next = (prev + 1) % t.news.articles.length;
        setIsSliding(true);
        setTimeout(() => setIsSliding(false), 700);
        return next;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [t.news.articles.length, isNewsModalOpen]);

  // Disable body scroll when any modal is open or transition is active (merged into one effect)
  useEffect(() => {
    document.body.style.overflow = (isNewsModalOpen || isProjectModalOpen || projectTransitionPhase !== 'idle') ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isNewsModalOpen, isProjectModalOpen, projectTransitionPhase]);

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

  // Continuous banner movement when scrolling — direct DOM update, zero re-renders
  useEffect(() => {
    const animate = () => {
      if (isScrollingRef.current) {
        bannerOffsetRef.current += BANNER_SPEED;
        if (bannerElRef.current) {
          bannerElRef.current.style.transform = `translateX(${-(bannerOffsetRef.current % 2000)}px)`;
        }
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Sanitize inputs before submission
    const sanitizedData = {
      firstName: sanitize(formData.firstName),
      lastName: sanitize(formData.lastName),
      email: sanitize(formData.email),
      message: sanitize(formData.message),
    };
    console.log('Form submitted:', sanitizedData);
  }, [formData]);

  // Intro animation sequence - Circle reveal
  useEffect(() => {
    // Force scroll to top immediately and prevent browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;



    // Disable scrolling during intro
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Start drawing phase (circle draws around center)
    const drawTimer = setTimeout(() => {
      setIntroPhase('drawing');
    }, 100);

    // Start expanding phase immediately after drawing completes (1s drawing + 100ms initial = 1100ms)
    // No delay - mask appears as soon as circle finishes drawing
    const expandTimer = setTimeout(() => {
      setIntroPhase('expanding');
      // Keep scrolling disabled until expansion is well underway

      // Use requestAnimationFrame for smoother animation
      let size = 150;
      let lastTime = performance.now();

      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Smooth expansion: ~25 pixels per 16ms frame (faster)
        size += (deltaTime / 16) * 25;
        setCircleSize(size);

        // Enable scrolling after circle has expanded a bit
        if (size > 300) {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }

        if (size < Math.max(window.innerWidth, window.innerHeight) * 1.5) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 1100); // Starts immediately when drawing finishes (no delay)

    // Complete intro after animation
    const completeTimer = setTimeout(() => {
      setIntroPhase('done');
      setIntroComplete(true);
      // Re-enable scrolling
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 3400); // Adjusted timing (1100 + ~2300 for expansion)

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(expandTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Custom cursor — direct DOM updates, zero re-renders (~60 events/sec)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        isHoveringRef.current = true;
        if (cursorRef.current) cursorRef.current.classList.add('hovering');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        isHoveringRef.current = false;
        if (cursorRef.current) cursorRef.current.classList.remove('hovering');
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

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
                  : `radial-gradient(circle ${introPhase === 'expanding' ? circleSize : 150}px at 50% 50%, transparent 100%, black 100%)`,
              WebkitMaskImage: introPhase === 'initial'
                ? 'none'
                : introPhase === 'drawing'
                  ? 'none'
                  : `radial-gradient(circle ${introPhase === 'expanding' ? circleSize : 150}px at 50% 50%, transparent 100%, black 100%)`,
              opacity: introPhase === 'done' ? 0 : 1,
              transition: 'opacity 0.5s ease-out',
            }}
          />

          {/* SVG for circle stroke animation - draws from 12 o'clock clockwise */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: introPhase === 'done' ? 0 : 1,
              transition: 'opacity 0.5s ease-out'
            }}
          >
            {/* Circle stroke drawing animation */}
            <circle
              cx="50%"
              cy="50%"
              r={introPhase === 'expanding' ? circleSize : 150}
              fill="none"
              stroke="#CAB64B"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: introPhase === 'expanding' ? circleSize * 2 * Math.PI : 150 * 2 * Math.PI,
                strokeDashoffset: introPhase === 'initial' ? 150 * 2 * Math.PI : 0,
                transform: `rotate(-90deg)`,
                transformOrigin: '50% 50%',
                transition: introPhase === 'drawing' ? 'stroke-dashoffset 1s linear' : 'none',
                opacity: introPhase === 'done' ? 0 : 1
              }}
            />
          </svg>
        </div>
      )}

      <div ref={topNavWrapperRef}>
        <TopNav activeSection={activeSection} />
      </div>

      {/* Hero Video Section */}
      <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Video container with aspect ratio on mobile */}
          <div className="relative w-full h-full md:aspect-auto aspect-video md:min-h-screen">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={videoPoster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-aoc-black/60 via-aoc-indigo/20 to-aoc-black/70" />
        </div>


        {/* Scrolling Banner - positioned below center */}
        <div className={`absolute left-0 right-0 z-20 w-screen overflow-hidden ${language === 'ar' ? 'top-[65%]' : 'top-[70%]'}`}>
          {language === 'ar' ? (
            /* Arabic Banner - scroll-based movement (left to right, seamless loop) */
            <div
              className="flex whitespace-nowrap"
              style={{ width: 'max-content' }}
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
            <div
              ref={bannerElRef}
              className="flex whitespace-nowrap"
              style={{ width: 'max-content' }}
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
        <div className="absolute bottom-8 left-2 md:left-8 z-30">
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
            {/* ABOUT US Title - comes from left */}
            <div
              ref={aboutTitleAnimation.ref}
              className={`absolute top-20 md:top-10 z-20 animate-slide-right ${aboutTitleAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'right-[5%] md:right-[8.5%]' : 'left-0 md:left-[3.5rem]'}`}
            >
              {/* Mobile: Two lines on image */}
              <h2 className={`md:hidden text-4xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white ${language === 'ar' ? 'text-right' : ''}`}>
                {t.about.title.split('\n')[0]}
              </h2>
              <h2 className={`md:hidden text-4xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white -mt-1 ${language === 'ar' ? 'text-right' : 'text-right'}`}>
                {t.about.title.split('\n')[1]}
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
              {/* Image container with animated decorative circle */}
              <div
                ref={aboutImageAnimation.ref}
                className={`relative pt-16 md:pt-16 w-[80%] md:w-[50%] mx-auto animate-fade-in ${aboutImageAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'md:mr-[15%] md:ml-auto' : 'md:ml-[17%] md:mr-auto'}`}
              >
                {/* Animated Decorative Circle - SVG for drawing effect */}
                <svg
                  className={`absolute z-10 w-16 h-16 md:w-32 md:h-32 top-[55%] -translate-y-1/2 ${language === 'ar' ? '-right-8 md:-right-16' : '-left-8 md:-left-16'}`}
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#CAB64B"
                    strokeWidth="2"
                    className={`circle-draw ${aboutImageAnimation.isVisible ? 'visible' : ''}`}
                    style={{
                      strokeDasharray: 301.6,
                      strokeDashoffset: aboutImageAnimation.isVisible ? 0 : 301.6,
                      transition: 'stroke-dashoffset 1.2s ease-out',
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'center'
                    }}
                  />
                </svg>

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

              {/* Text content - slides from right */}
              <div
                className={`relative md:absolute z-10 p-4 md:p-12 mt-6 md:mt-0 md:top-1/2 md:-translate-y-1/4 w-full md:w-[60%] overflow-hidden ${language === 'ar' ? 'md:left-0 text-right' : 'md:right-0'}`}
              >
                <div
                  ref={aboutTextAnimation.ref}
                  className={`animate-slide-left ${aboutTextAnimation.isVisible ? 'visible' : ''}`}
                >
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-aoc-white/80 text-sm md:text-[1.35rem] font-inter-tight font-light leading-relaxed text-justify ${language === 'ar' ? 'text-right' : ''}`}>
                      {t.about.paragraph1}
                    </p>

                    <p className={`text-aoc-white/80 text-sm md:text-[1.35rem] font-inter-tight font-light leading-relaxed text-justify ${language === 'ar' ? 'text-right' : ''}`}>
                      {t.about.paragraph2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Services />
      </Suspense>

      <section id="projects" className="relative h-screen flex items-center overflow-hidden">
        {/* Background images carousel */}
        <div className="absolute inset-0">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: index === activeProjectIndex ? 1 : 0 }}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-aoc-black/80 via-aoc-indigo/30 to-transparent" />
        </div>

        {/* Main content */}
        <div
          ref={projectsAnimation.ref}
          className={`absolute inset-0 z-10 ${language === 'ar' ? 'rtl' : ''}`}
        >

          {/* Section title - OUR PROJECTS */}
          <div className={`absolute bottom-[55%] left-0 right-0 px-8 md:px-16 ${language === 'ar' ? 'text-right' : ''}`}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-darker-grotesque font-medium tracking-[0.15em] uppercase leading-[0.9]" style={{ color: '#F2F2F2' }}>
              {t.projectsGallery.sectionTitle}
            </h2>
          </div>

          <div
            ref={learnMoreBarRef}
            className={`left-0 right-0 w-full backdrop-blur-sm ${projectTransitionPhase === 'idle'
              ? 'absolute top-1/2 -translate-y-1/2 border-t border-b border-white/20 bg-aoc-black/20'
              : 'bg-aoc-black/90 backdrop-blur-xl'
              }`}
          >
            <div className={`px-4 md:px-16 py-2 md:py-3 transition-opacity duration-300 ${projectTransitionPhase !== 'idle' ? 'opacity-0' : 'opacity-100'
              }`}>
              {/* Learn More */}
              <button
                onClick={handleLearnMoreClick}
                disabled={projectTransitionPhase !== 'idle'}
                className={`group flex items-center gap-1 md:gap-2 text-aoc-gold hover:text-aoc-white transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex flex-col gap-1 w-4">
                  <span className="block h-px bg-current"></span>
                  <span className="block h-px bg-current"></span>
                  <span className="block h-px bg-current"></span>
                </div>
                <span className="text-[10px] md:text-sm font-inter-tight font-light tracking-[0.1em] md:tracking-[0.15em] uppercase">
                  {t.projectsGallery.learnMore}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="min-h-screen flex items-center py-16 md:py-24" style={{ backgroundColor: '#f2f2f2' }}>
        <div className={`max-w-screen-xl mx-auto px-8 w-full ${language === 'ar' ? 'rtl' : ''}`}>
          {/* Main Image Container - wrapper with relative positioning for circle */}
          <div
            ref={newsAnimation.ref}
            className="relative w-full mb-8"
          >
            {/* Decorative Circle + NEWS title - positioned at middle height */}
            <div
              className={`absolute z-20 top-1/2 ${language === 'ar' ? 'right-0' : 'left-0'}`}
              style={{
                transform: language === 'ar'
                  ? 'translateY(-50%) translateX(50%)'
                  : 'translateY(-50%) translateX(-50%)'
              }}
            >
              <svg
                className="w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#CAB64B"
                  strokeWidth="2"
                  style={{
                    strokeDasharray: 301.6,
                    strokeDashoffset: newsAnimation.isVisible ? 0 : 301.6,
                    transition: 'stroke-dashoffset 1.2s ease-out',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                  }}
                />
              </svg>
              {/* NEWS Title - next to circle */}
              <h2
                className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-3xl md:text-5xl lg:text-6xl font-darker-grotesque font-medium tracking-[0.15em] uppercase ${language === 'ar' ? 'right-full mr-4 md:mr-6' : 'left-full ml-4 md:ml-6'}`}
                style={{ color: '#F2F2F2' }}
              >
                {t.news.title}
              </h2>
            </div>

            {/* Image container with overflow hidden - sliding carousel */}
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden">
              {/* Sliding images container */}
              <div
                className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                style={{
                  width: `${t.news.articles.length * 100}%`,
                  transform: `translateX(-${activeNewsIndex * (100 / t.news.articles.length)}%)`
                }}
              >
                {t.news.articles.map((article, index) => (
                  <div
                    key={index}
                    className="relative h-full"
                    style={{ width: `${100 / t.news.articles.length}%` }}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />



              {/* Article Title - bottom right of image */}
              <div className={`absolute bottom-8 md:bottom-12 ${language === 'ar' ? 'left-8 md:left-16 text-left' : 'right-8 md:right-16 text-right'}`}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-darker-grotesque font-normal tracking-[0.05em] text-aoc-white mb-2">
                  {t.news.articles[activeNewsIndex].title}
                </h3>
                <p className="text-sm md:text-base font-inter-tight font-light italic text-aoc-white/80">
                  {t.news.articles[activeNewsIndex].subtitle}
                </p>
              </div>

              {/* Pagination Dots - bottom left of image, clickable */}
              <div className={`absolute bottom-8 md:bottom-12 ${language === 'ar' ? 'right-8 md:right-16' : 'left-8 md:left-16'} flex gap-2`}>
                {t.news.articles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNewsChange(index)}
                    disabled={isSliding}
                    className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${index === activeNewsIndex ? 'bg-aoc-white/50' : 'bg-aoc-white'
                      } ${isSliding ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-label={`Go to news ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Article Text Below Image */}
          <div className={`w-full ${language === 'ar' ? 'text-right' : ''}`}>
            <p className="text-gray-700 font-inter-tight font-light leading-relaxed text-base md:text-lg text-justify">
              {t.news.articles[activeNewsIndex].text}...{' '}
              <button
                onClick={() => setIsNewsModalOpen(true)}
                className="font-medium underline hover:text-aoc-gold transition-colors"
              >
                {t.news.readMore}
              </button>
            </p>
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
      <div ref={bottomBarRef} className={`fixed bottom-0 left-0 right-0 z-40 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 transition-opacity duration-300 ${activeSection === 'home' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full px-12 py-3 flex items-center justify-between">
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">A</span>
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">FOUNDATION</span>
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">OF</span>
          <span className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">TRUST</span>
        </div>
      </div>

      {/* News Modal - Lazy loaded for better performance */}
      <Suspense fallback={null}>
        <NewsModal
          isOpen={isNewsModalOpen}
          onClose={() => setIsNewsModalOpen(false)}
          article={t.news.articles[activeNewsIndex]}
          language={language}
        />
      </Suspense>

      {/* Project Modal - Lazy loaded for better performance */}
      <Suspense fallback={null}>
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={handleProjectModalClose}
          allProjects={t.projectsGallery.items}
          categories={t.projectsGallery.categories}
          language={language}
        />
      </Suspense>

      {/* Custom Cursor - GPU-accelerated via transform */}
      <div
        ref={cursorRef}
        className="custom-cursor"
      />
    </div >
  );
}

export default App;
