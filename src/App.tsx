import { ChevronDown, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import TopNav from './components/TopNav';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useSiteMetadata } from './hooks/useSiteMetadata';
import { SOCIAL_LINKS, getLocalizedText, siteCopy } from './siteData';
import heroVideo from './assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Video/AOC_hero.mp4';
import videoPoster from './assets/video_poster.jpg';
import aboutImage from './assets/asset_16.png';
import beFoundLogo from './assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/BeFound Sigment.png';

import clientAlWisam from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Al-Wisam World.png';
import clientAlKhalid from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/AlKhalid Transportation.png';
import clientAlQodsi from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/AlQodsi.png';
import clientAlyamama from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Alyamama.png';
import clientAraa from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Araa Real Estate.png';
import clientBaitAlarab from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Bait Alarab.png';
import clientBauer from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Bauer Foundation.png';
import clientBinDajam from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Bin Dajam Ltd.png';
import clientBinDawood from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Bin Dawood.png';
import clientEco from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Eco Construction.png';
import clientHayat from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Hayat Alomran.png';
import clientJamal from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Jamal Baghlaf Holding.png';
import clientKayan from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Kayan Almasya.png';
import clientKeller from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Keller.png';
import clientMinistry from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Ministry Of Islamic Affairs, Dawah & Guidance.png';
import clientMusheera from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Musheera.png';
import clientNaft from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Naft.png';
import clientPetroMin from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Petro min.png';
import clientPureIn from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Pure In.png';
import clientRasiat from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Rasiat.png';
import clientSaco from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/SACO.png';
import clientSans from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Sans.png';
import clientTamimi from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Tamimi Markets.png';
import clientZahran from './assets/AlOsaimi_Website_Design 02_Folder/AlOsaimi_Clients/AlOsaimi_Clients/Zahran.png';

const CLIENT_LOGOS = [
  { src: clientAlWisam, alt: 'Al-Wisam World', url: '' },
  { src: clientAlKhalid, alt: 'AlKhalid Transportation', url: '' },
  { src: clientAlQodsi, alt: 'AlQodsi', url: '' },
  { src: clientAlyamama, alt: 'Alyamama', url: '' },
  { src: clientAraa, alt: 'Araa Real Estate', url: '' },
  { src: clientBaitAlarab, alt: 'Bait Alarab', url: '' },
  { src: clientBauer, alt: 'Bauer Foundation', url: 'https://www.bauer.de' },
  { src: clientBinDajam, alt: 'Bin Dajam Ltd', url: '' },
  { src: clientBinDawood, alt: 'Bin Dawood', url: 'https://www.bindawood.com' },
  { src: clientEco, alt: 'Eco Construction', url: '' },
  { src: clientHayat, alt: 'Hayat Alomran', url: '' },
  { src: clientJamal, alt: 'Jamal Baghlaf Holding', url: '' },
  { src: clientKayan, alt: 'Kayan Almasya', url: '' },
  { src: clientKeller, alt: 'Keller', url: 'https://www.keller.com' },
  { src: clientMinistry, alt: 'Ministry Of Islamic Affairs', url: 'https://www.moia.gov.sa' },
  { src: clientMusheera, alt: 'Musheera', url: '' },
  { src: clientNaft, alt: 'Naft', url: '' },
  { src: clientPetroMin, alt: 'Petro Min', url: '' },
  { src: clientPureIn, alt: 'Pure In', url: '' },
  { src: clientRasiat, alt: 'Rasiat', url: '' },
  { src: clientSaco, alt: 'SACO', url: 'https://www.saco.sa' },
  { src: clientSans, alt: 'Sans', url: '' },
  { src: clientTamimi, alt: 'Tamimi Markets', url: 'https://www.tamimimarkets.com' },
  { src: clientZahran, alt: 'Zahran', url: 'https://www.zahran.com' },
];

const Services = lazy(() => import('./components/Services'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

function App() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeSection, setActiveSection] = useState('home');
  const [introComplete, setIntroComplete] = useState(false);
  const [introPhase, setIntroPhase] = useState<'initial' | 'drawing' | 'expanding' | 'done'>('initial');
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectTransitionPhase, setProjectTransitionPhase] = useState<'idle' | 'expanding' | 'modal-open'>('idle');
  const bannerOffsetRef = useRef(0);
  const bannerElRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const learnMoreBarRef = useRef<HTMLDivElement>(null);
  const topNavWrapperRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const aboutAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const aboutTitleAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const aboutImageAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const aboutTextAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const ceoAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const projectsAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });
  const contactAnimation = useScrollAnimation<HTMLDivElement>({ triggerOnce: false });

  const aboutTitleLines = t.about.title.split('\n');
  const contactTitleLines = t.contact.title.split('\n');
  const heroSummary = siteCopy.heroSummary;
  const overviewCards = siteCopy.overviewCards;
  const faqItems = siteCopy.faq;
  const projectSummary = siteCopy.projectSummary;
  const contactSummary = siteCopy.contactSummary;
  const resourceLinks = siteCopy.resourceLinks;
  const sectionImages = t.projectsGallery.sectionImages;

  useSiteMetadata(language);

  const easeInOutQuad = (value: number) => value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

  const handleLearnMoreClick = useCallback(() => {
    if (projectTransitionPhase !== 'idle' || !learnMoreBarRef.current) return;
    const barEl = learnMoreBarRef.current;
    const topNavEl = topNavWrapperRef.current?.querySelector('nav') as HTMLElement | null;
    const bottomBarEl = bottomBarRef.current;

    const rect = barEl.getBoundingClientRect();
    const startTop = rect.top;
    const startBottom = window.innerHeight - rect.bottom;
    const topNavHeight = topNavEl?.getBoundingClientRect().height || 0;
    const bottomBarHeight = bottomBarEl?.getBoundingClientRect().height || 0;

    document.body.style.overflow = 'hidden';
    setProjectTransitionPhase('expanding');

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

      barEl.style.top = `${currentTop}px`;
      barEl.style.bottom = `${currentBottom}px`;

      if (topNavEl) {
        topNavEl.style.top = currentTop < topNavHeight ? `${currentTop - topNavHeight}px` : '0px';
      }
      if (bottomBarEl) {
        bottomBarEl.style.bottom = currentBottom < bottomBarHeight ? `${currentBottom - bottomBarHeight}px` : '0px';
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsProjectModalOpen(true);
        setProjectTransitionPhase('modal-open');
      }
    };

    requestAnimationFrame(animate);
  }, [projectTransitionPhase]);

  const handleProjectModalClose = useCallback(() => {
    setIsProjectModalOpen(false);
    setProjectTransitionPhase('idle');
    document.body.style.overflow = '';
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

  useEffect(() => {
    if (isProjectModalOpen) return;
    const interval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % sectionImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isProjectModalOpen, sectionImages.length]);

  useEffect(() => {
    document.body.style.overflow = (isProjectModalOpen || projectTransitionPhase !== 'idle') ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isProjectModalOpen, projectTransitionPhase]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const updateObservation = () => {
      const sections = document.querySelectorAll('section[id], header[id]');
      sections.forEach((section) => observer.observe(section));
    };

    updateObservation();

    const mutObserver = new MutationObserver(updateObservation);
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      if (isScrollingRef.current) {
        bannerOffsetRef.current += 2;
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
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const drawTimer = setTimeout(() => setIntroPhase('drawing'), 150);
    const expandTimer = setTimeout(() => {
      setIntroPhase('expanding');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 1300);
    const doneTimer = setTimeout(() => setIntroPhase('done'), 1400);
    const completeTimer = setTimeout(() => setIntroComplete(true), 2100);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(expandTimer);
      clearTimeout(doneTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    const activateVideo = () => setShouldLoadHeroVideo(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === 'function') {
      const handle = idleWindow.requestIdleCallback(activateVideo, { timeout: 1200 });
      return () => {
        if (typeof idleWindow.cancelIdleCallback === 'function') {
          idleWindow.cancelIdleCallback(handle);
        }
      };
    }

    const timeout = window.setTimeout(activateVideo, 700);
    return () => window.clearTimeout(timeout);
  }, [introComplete]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - 12}px, ${event.clientY - 12}px)`;
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current?.classList.add('hovering');
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current?.classList.remove('hovering');
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:rounded focus:bg-aoc-gold focus:px-4 focus:py-3 focus:text-aoc-black"
      >
        {language === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {!introComplete && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex items-center justify-center"
          style={{
            background: 'rgba(10, 12, 20, 0.92)',
            backdropFilter: introPhase === 'done' ? 'none' : 'blur(14px)',
            WebkitBackdropFilter: introPhase === 'done' ? 'none' : 'blur(14px)',
            opacity: introPhase === 'done' ? 0 : 1,
            transition: introPhase === 'done' ? 'opacity 0.6s ease-out, backdrop-filter 0.6s ease-out' : 'none',
          }}
        >
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            style={{
              opacity: introPhase === 'done' || introPhase === 'expanding' ? 0 : 1,
              transition: 'opacity 0.2s ease-out',
            }}
          >
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="#CAB64B"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 942,
                strokeDashoffset: introPhase === 'initial' ? 942 : 0,
                transform: 'rotate(-90deg)',
                transformOrigin: '160px 160px',
                transition: introPhase === 'drawing' ? 'stroke-dashoffset 1s linear' : 'none',
              }}
            />
          </svg>
        </div>
      )}

      <div ref={topNavWrapperRef}>
        <TopNav activeSection={activeSection} />
      </div>

      <main id="main-content">
        <header id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full md:aspect-auto aspect-video md:min-h-screen">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={videoPoster}
                disableRemotePlayback
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              >
                {shouldLoadHeroVideo && <source src={heroVideo} type="video/mp4" />}
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-aoc-black/60 via-aoc-indigo/20 to-aoc-black/70" />
          </div>

          <div className={`absolute left-0 right-0 z-20 w-screen overflow-hidden ${language === 'ar' ? 'top-[65%]' : 'top-[70%]'}`} aria-hidden="true">
            <div ref={bannerElRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.2em] uppercase mx-4 text-aoc-white ${language === 'ar' ? 'font-fustat' : 'font-darker-grotesque'}`}
                >
                  {t.hero.title}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-2 md:left-8 z-30" aria-hidden="true">
            <div className="flex flex-col items-center gap-2 px-3 py-4 border border-aoc-white/30 rounded-full">
              <span className="text-aoc-white/80 text-xs font-inter-tight font-light tracking-[0.15em] uppercase writing-vertical">SCROLL</span>
              <ChevronDown className="text-aoc-white/80 animate-bounce" size={16} strokeWidth={1} />
            </div>
          </div>

          <div className="sr-only">
            <p>{getLocalizedText(heroSummary.eyebrow, language)}</p>
            <p>{getLocalizedText(heroSummary.body, language)}</p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-30">
            <div className="w-full px-4 py-4 relative flex items-center justify-between">
              <div className="hidden md:block w-20" />
              <div className="flex items-center gap-3 md:gap-6 md:absolute md:left-[55%] md:-translate-x-1/2">
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Al Osaimi Consulting on LinkedIn" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                  <Linkedin className="w-4 h-4 md:w-[22px] md:h-[22px]" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Al Osaimi Consulting on Instagram" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                  <Instagram className="w-4 h-4 md:w-[22px] md:h-[22px]" />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Al Osaimi Consulting on Facebook" className="text-aoc-white/80 hover:text-aoc-white transition-colors">
                  <Facebook className="w-4 h-4 md:w-[22px] md:h-[22px]" />
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://www.befound.design/" target="_blank" rel="noopener noreferrer" aria-label="BeFound Design Studio">
                  <img src={beFoundLogo} alt="BeFound Design Studio" className="h-6 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-aoc-black py-16 md:py-20 border-y border-white/10">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
            <div className="max-w-5xl">
              <p className={`text-sm md:text-base font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-gold ${language === 'ar' ? 'text-right' : ''}`}>
                {getLocalizedText(heroSummary.eyebrow, language)}
              </p>
              <h1 id="site-heading" className={`mt-5 text-4xl md:text-6xl lg:text-7xl font-darker-grotesque font-light leading-[0.92] text-aoc-white ${language === 'ar' ? 'text-right' : ''}`}>
                {getLocalizedText(heroSummary.heading, language)}
              </h1>
              <p className={`mt-6 max-w-4xl text-base md:text-xl font-inter-tight font-light leading-relaxed text-aoc-white/80 ${language === 'ar' ? 'text-right' : ''}`}>
                {getLocalizedText(heroSummary.body, language)}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map((card) => (
                <article key={card.id} className="rounded-sm border border-white/12 bg-white/5 p-5 md:p-6 backdrop-blur-sm">
                  <h2 className={`text-2xl md:text-3xl font-darker-grotesque font-light tracking-[0.08em] uppercase text-aoc-white ${language === 'ar' ? 'text-right' : ''}`}>
                    {getLocalizedText(card.title, language)}
                  </h2>
                  <p className={`mt-3 text-sm md:text-base font-inter-tight font-light leading-relaxed text-aoc-white/75 ${language === 'ar' ? 'text-right' : ''}`}>
                    {getLocalizedText(card.body, language)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-inter-tight font-light uppercase tracking-[0.08em]">
              <a href="/services/" className="text-aoc-gold hover:text-aoc-white transition-colors">
                {language === 'ar' ? 'صفحة الخدمات' : 'Services page'}
              </a>
              <a href="/company-profile.md" className="text-aoc-gold hover:text-aoc-white transition-colors">
                {language === 'ar' ? 'الملف التعريفي النصي' : 'Company markdown'}
              </a>
              <a href="/docs/" className="text-aoc-gold hover:text-aoc-white transition-colors">
                {getLocalizedText(resourceLinks[0].label, language)}
              </a>
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="min-h-screen bg-aoc-indigo flex flex-col justify-center py-24 gap-16 md:gap-32">
          <div ref={aboutAnimation.ref} className={`max-w-screen-2xl mx-auto px-4 md:px-8 w-full ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="relative">
              <div
                ref={aboutTitleAnimation.ref}
                className={`absolute top-20 md:top-10 z-20 animate-slide-right ${aboutTitleAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'right-[5%] md:right-[8.5%]' : 'left-0 md:left-[3.5rem]'}`}
              >
                <h2 id="about-heading" className={`text-4xl md:text-8xl lg:text-9xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white ${language === 'ar' ? 'text-right' : ''}`}>
                  <span className="block">{aboutTitleLines[0] || t.about.title}</span>
                  {aboutTitleLines[1] && (
                    <span className={`block -mt-1 md:-mt-2 ${language === 'ar' ? 'md:text-left' : 'md:text-right'}`}>
                      {aboutTitleLines[1]}
                    </span>
                  )}
                </h2>
              </div>

              <div className="relative w-full flex flex-col md:block">
                <div
                  ref={aboutImageAnimation.ref}
                  className={`relative pt-16 md:pt-16 w-[80%] md:w-[50%] mx-auto animate-fade-in ${aboutImageAnimation.isVisible ? 'visible' : ''} ${language === 'ar' ? 'md:mr-[15%] md:ml-auto' : 'md:ml-[17%] md:mr-auto'}`}
                >
                  <svg
                    className={`absolute z-10 w-16 h-16 md:w-32 md:h-32 top-[55%] -translate-y-1/2 ${language === 'ar' ? '-right-8 md:-right-16' : '-left-8 md:-left-16'}`}
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50" cy="50" r="48"
                      fill="none" stroke="#CAB64B" strokeWidth="2"
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
                  <div className="relative aspect-[4/5] md:h-[600px] md:aspect-auto overflow-hidden">
                    <img src={aboutImage} alt="Al Osaimi Consulting architectural work" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className={`relative md:absolute z-10 p-4 md:p-12 mt-6 md:mt-0 md:top-1/2 md:-translate-y-1/4 w-full md:w-[60%] overflow-hidden ${language === 'ar' ? 'md:left-0 text-right' : 'md:right-0'}`}>
                  <div ref={aboutTextAnimation.ref} className={`animate-slide-left ${aboutTextAnimation.isVisible ? 'visible' : ''}`}>
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

          <div ref={ceoAnimation.ref} className={`max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-24 w-full ${language === 'ar' ? 'rtl' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className={`col-span-1 lg:col-span-3 ${language === 'ar' ? 'text-right' : 'text-right'}`}>
                <h3 className="text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-darker-grotesque font-light tracking-[0.05em] uppercase leading-[0.85] text-aoc-white whitespace-pre-line">
                  CEO'S{'\n'}<span className="font-normal">SPEECH</span>
                </h3>
              </div>

              <div className="col-span-1 lg:col-span-5 flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex-shrink-0">
                  <svg className="w-20 h-20 md:w-28 md:h-28" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="48"
                      fill="none" stroke="#CAB64B" strokeWidth="1.5"
                      className={`circle-draw ${ceoAnimation.isVisible ? 'visible' : ''}`}
                      style={{
                        strokeDasharray: 301.6,
                        strokeDashoffset: ceoAnimation.isVisible ? 0 : 301.6,
                        transition: 'stroke-dashoffset 1.5s ease-out',
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'center'
                      }}
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-2xl md:text-3xl lg:text-[1.85rem] xl:text-[2.1rem] font-darker-grotesque font-medium tracking-[0.03em] uppercase text-aoc-gold whitespace-pre-line leading-[0.7] mb-2.5">
                    {t.about.ceoName}
                  </p>
                  <p className="text-xs md:text-sm lg:text-[13px] font-inter-tight font-normal tracking-[0.05em] text-aoc-white/80 uppercase whitespace-nowrap">
                    {t.about.ceoTitle}
                  </p>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-4">
                <div className={`space-y-4 animate-slide-left ${ceoAnimation.isVisible ? 'visible' : ''}`}>
                  {[t.about.ceoSpeech1, t.about.ceoSpeech2, t.about.ceoSpeech3, t.about.ceoSpeech4, t.about.ceoSpeech5, t.about.ceoSpeech6].map((speech, i) => (
                    <p key={i} className={`text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify ${language === 'ar' ? 'text-right rtl' : 'ltr'}`}>
                      {speech}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <Services />
        </Suspense>

        <section aria-labelledby="trust-heading" className="relative overflow-hidden py-12" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-6">
            <h2 id="trust-heading" className="text-2xl md:text-3xl font-darker-grotesque font-light tracking-[0.08em] uppercase text-aoc-indigo">
              {language === 'ar' ? 'جهات وعملاء بارزون' : 'Selected clients and sectors'}
            </h2>
            <p className="mt-2 max-w-3xl text-sm md:text-base font-inter-tight font-light leading-relaxed text-aoc-black/80">
              {language === 'ar'
                ? 'تعكس هذه المجموعة بعض الجهات والعملاء الذين يظهرون امتداد خبرات المكتب عبر قطاعات متعددة، بما يشمل التطوير العقاري والبناء والخدمات المؤسسية.'
                : 'This selection highlights the breadth of organizations and project sectors reflected in the firm’s work, including real estate, construction, and institutional delivery.'}
            </p>
          </div>
          <div className="absolute inset-0 pointer-events-none" />
          <div className="flex" style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => {
              const img = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              );
              return (
                <div key={i} className="flex-shrink-0 flex items-center justify-center mx-10 h-24 w-48">
                  {logo.url ? (
                    <a href={logo.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full w-full">
                      {img}
                    </a>
                  ) : img}
                </div>
              );
            })}
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="relative min-h-screen flex items-center overflow-hidden bg-aoc-black">
          <div className="absolute inset-0 flex items-center justify-center">
            {sectionImages.map((img, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{ opacity: index === activeProjectIndex ? 1 : 0 }}
              >
                <img src={img} alt={`Featured project showcase ${index + 1}`} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-aoc-black/80 via-aoc-indigo/30 to-transparent" />
          </div>

          <div ref={projectsAnimation.ref} className={`absolute inset-0 z-10 ${language === 'ar' ? 'rtl' : ''}`}>
            <div className={`absolute bottom-[58%] left-0 right-0 px-8 md:px-16 ${language === 'ar' ? 'text-right' : ''}`}>
              <h2 id="projects-heading" className="text-3xl md:text-5xl lg:text-6xl font-darker-grotesque font-medium tracking-[0.15em] uppercase leading-[0.9]" style={{ color: '#F2F2F2' }}>
                {t.projectsGallery.sectionTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm md:text-base font-inter-tight font-light leading-relaxed text-aoc-white/80">
                {getLocalizedText(projectSummary.body, language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {projectSummary.sectors[language].map((sector) => (
                  <span key={sector} className="rounded-full border border-aoc-gold/40 bg-black/20 px-3 py-1 text-[11px] font-inter-tight font-light uppercase tracking-[0.08em] text-aoc-gold">
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div
              ref={learnMoreBarRef}
              className={`left-0 right-0 w-full backdrop-blur-sm ${projectTransitionPhase === 'idle'
                ? 'absolute top-1/2 -translate-y-1/2 border-t border-b border-white/20 bg-aoc-black/20'
                : 'bg-aoc-black/90 backdrop-blur-xl'
              }`}
            >
              <div className={`px-4 md:px-16 py-2 md:py-3 transition-opacity duration-300 ${projectTransitionPhase !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                <button
                  type="button"
                  onClick={handleLearnMoreClick}
                  disabled={projectTransitionPhase !== 'idle'}
                  aria-label={language === 'ar' ? 'فتح معرض المشاريع الكامل' : 'Open the full projects gallery'}
                  className={`group flex items-center gap-1 md:gap-2 text-aoc-gold hover:text-aoc-white transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex flex-col gap-1 w-4">
                    <span className="block h-px bg-current" />
                    <span className="block h-px bg-current" />
                    <span className="block h-px bg-current" />
                  </div>
                  <span className="text-[10px] md:text-sm font-inter-tight font-light tracking-[0.1em] md:tracking-[0.15em] uppercase">
                    {t.projectsGallery.learnMore}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="bg-aoc-black py-20 border-y border-white/10">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
            <div className={`max-w-5xl ${language === 'ar' ? 'mr-auto text-right' : ''}`}>
              <p className="text-sm md:text-base font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-gold">
                {language === 'ar' ? 'أسئلة شائعة' : 'Frequently asked questions'}
              </p>
              <h2 id="faq-heading" className="mt-4 text-4xl md:text-6xl font-darker-grotesque font-light leading-[0.92] text-aoc-white">
                {language === 'ar' ? 'إجابات واضحة تساعد المستخدمين ومحركات الإجابة على فهم نطاق العمل بسرعة.' : 'Clear answers that help users and answer engines understand the company quickly.'}
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqItems.map((item) => (
                <article key={getLocalizedText(item.question, language)} className="rounded-sm border border-white/12 bg-white/5 p-6">
                  <h3 className={`text-2xl font-darker-grotesque font-light tracking-[0.05em] text-aoc-white ${language === 'ar' ? 'text-right' : ''}`}>
                    {getLocalizedText(item.question, language)}
                  </h3>
                  <p className={`mt-3 text-sm md:text-base font-inter-tight font-light leading-relaxed text-aoc-white/80 ${language === 'ar' ? 'text-right' : ''}`}>
                    {getLocalizedText(item.answer, language)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className={`min-h-screen bg-aoc-indigo flex items-center py-24 ${language === 'ar' ? 'rtl' : ''}`}>
          <div
            ref={contactAnimation.ref}
            className={`max-w-screen-2xl mx-auto px-4 md:px-8 w-full animate-slide-up ${contactAnimation.isVisible ? 'visible' : ''}`}
          >
            <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12 items-start">
              <div className={`${language === 'ar' ? 'text-right' : ''}`}>
                <p className="text-sm md:text-base font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-gold">
                  {getLocalizedText(contactSummary.title, language)}
                </p>
                <h2 id="contact-heading" className="mt-4 text-5xl md:text-6xl font-darker-grotesque font-extralight tracking-[0.15em] uppercase leading-tight text-aoc-white">
                  <span className="block">{contactTitleLines[0] || t.contact.title}</span>
                  {contactTitleLines[1] && <span className="block">{contactTitleLines[1]}</span>}
                </h2>
                <div className={`w-24 h-[1px] bg-aoc-gold my-8 ${language === 'ar' ? 'mr-auto' : ''}`} />
                <p className="max-w-2xl text-sm md:text-base font-inter-tight font-light leading-relaxed text-aoc-white/80">
                  {getLocalizedText(contactSummary.body, language)}
                </p>
                <p id="contact-note" className="mt-5 max-w-2xl text-xs md:text-sm font-inter-tight font-light leading-relaxed text-aoc-white/60">
                  {getLocalizedText(contactSummary.note, language)}
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-xs font-inter-tight font-light uppercase tracking-[0.08em]">
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-aoc-gold hover:text-aoc-white transition-colors">LinkedIn</a>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-aoc-gold hover:text-aoc-white transition-colors">Instagram</a>
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-aoc-gold hover:text-aoc-white transition-colors">Facebook</a>
                </div>

                <div className="mt-8 rounded-sm border border-white/12 bg-black/10 p-5">
                  <h3 className="text-2xl font-darker-grotesque font-light tracking-[0.08em] uppercase text-aoc-white">
                    {language === 'ar' ? 'روابط مرجعية' : 'Reference links'}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs font-inter-tight font-light uppercase tracking-[0.08em]">
                    <a href="/llms.txt" className="text-aoc-gold hover:text-aoc-white transition-colors">llms.txt</a>
                    <a href="/llms-full.txt" className="text-aoc-gold hover:text-aoc-white transition-colors">llms-full.txt</a>
                    <a href="/docs/" className="text-aoc-gold hover:text-aoc-white transition-colors">
                      {getLocalizedText(resourceLinks[0].label, language)}
                    </a>
                    <a href="/agent-policy.md" className="text-aoc-gold hover:text-aoc-white transition-colors">
                      {getLocalizedText(resourceLinks[4].label, language)}
                    </a>
                  </div>
                </div>
              </div>

              <form
                name="contact"
                method="POST"
                action="/contact/thanks/"
                data-netlify="true"
                netlify-honeypot="bot-field"
                aria-describedby="contact-note"
                className="space-y-6 rounded-sm border border-white/12 bg-black/10 p-6 md:p-8"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    bot-field
                    <input name="bot-field" />
                  </label>
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className={`mb-2 block text-xs font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-white/70 ${language === 'ar' ? 'text-right' : ''}`}>
                      {t.contact.firstName}
                    </span>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder={t.contact.firstName}
                      className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] transition-colors"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-2 block text-xs font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-white/70 ${language === 'ar' ? 'text-right' : ''}`}>
                      {t.contact.lastName}
                    </span>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder={t.contact.lastName}
                      className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] transition-colors"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={`mb-2 block text-xs font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-white/70 ${language === 'ar' ? 'text-right' : ''}`}>
                    {t.contact.email}
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.contact.email}
                    className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] transition-colors"
                    required
                  />
                </label>

                <label className="block">
                  <span className={`mb-2 block text-xs font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-white/70 ${language === 'ar' ? 'text-right' : ''}`}>
                    {t.contact.message}
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t.contact.message}
                    rows={6}
                    className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] resize-none transition-colors"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="bg-aoc-gold text-aoc-black px-12 py-4 text-sm font-inter-tight font-light tracking-[0.2em] uppercase hover:bg-aoc-gold/90 transition-colors"
                >
                  {t.contact.send}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={`border-t border-white/10 bg-aoc-black/95 pb-24 pt-12 ${language === 'ar' ? 'rtl' : ''}`}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className={`${language === 'ar' ? 'text-right' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-darker-grotesque font-light tracking-[0.08em] uppercase text-aoc-white">
                {language === 'ar' ? 'توثيق مناسب للقراءة البشرية والآلية' : 'Human and machine-readable resources'}
              </h2>
              <p className="mt-4 max-w-3xl text-sm md:text-base font-inter-tight font-light leading-relaxed text-aoc-white/75">
                {language === 'ar'
                  ? 'تمت إضافة ملفات llms.txt وروابط مرجعية نصية ووثائق صريحة حول الخدمات وحالة الأتمتة حتى تتمكن الأنظمة الذكية والباحثون والفرق التشغيلية من فهم نطاق الموقع بسرعة.'
                  : 'The site now exposes llms.txt, machine-readable summaries, and explicit documentation around services and automation status so AI systems, researchers, and project teams can extract reliable context quickly.'}
              </p>
            </div>

            <div className="grid gap-3">
              {resourceLinks.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  className={`rounded-sm border border-white/12 bg-white/5 p-4 transition-colors hover:border-aoc-gold/50 hover:bg-white/10 ${language === 'ar' ? 'text-right' : ''}`}
                >
                  <span className="block text-sm font-inter-tight font-light tracking-[0.12em] uppercase text-aoc-gold">
                    {getLocalizedText(resource.label, language)}
                  </span>
                  <span className="mt-2 block text-sm font-inter-tight font-light leading-relaxed text-aoc-white/70">
                    {getLocalizedText(resource.description, language)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div ref={bottomBarRef} className={`fixed bottom-0 left-0 right-0 z-40 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 transition-opacity duration-300 ${activeSection === 'home' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full px-12 py-3 flex items-center justify-between">
          {['A', 'FOUNDATION', 'OF', 'TRUST'].map((word) => (
            <span key={word} className="text-aoc-white/60 text-sm font-inter-tight font-light tracking-[0.3em] uppercase">{word}</span>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={handleProjectModalClose}
          allProjects={t.projectsGallery.items}
          categories={t.projectsGallery.categories}
          language={language}
        />
      </Suspense>

      <div ref={cursorRef} className="custom-cursor" />
    </div>
  );
}

export default App;
