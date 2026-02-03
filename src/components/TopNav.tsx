import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import aocLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOC Logo White.png';
import aocMobileLogo from '../assets/AlOsaimi_Website_Design 02_Folder/Used Elements/Logos/AOCMobile.png';

interface TopNavProps {
  activeSection: string;
}

export default function TopNav({ activeSection }: TopNavProps) {
  const { language, setLanguage } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];
  const isActive = (section: string) => activeSection === section;

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  const navItems = [
    { id: 'home', href: '#home', label: t.nav.home },
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'services', href: '#services', label: t.nav.services },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'news', href: '#news', label: t.nav.news },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-aoc-black/30 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">
          {/* Mobile: Hamburger on left, Logo center, Language right */}
          {/* Desktop: Logo left, Nav center, Language right */}

          {/* Hamburger Menu Button - Mobile Only (left side on mobile) */}
          <button
            className="md:hidden text-aoc-white/80 hover:text-aoc-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Different for mobile and desktop */}
          <a href="#home" className="h-10 w-auto transition-all duration-300 md:flex-none absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            {/* Mobile Logo */}
            <img src={aocMobileLogo} alt="AOC Logo" className="h-full w-auto md:hidden" />
            {/* Desktop Logo */}
            <img src={aocLogo} alt="AOC Logo" className="h-full w-auto hidden md:block" />
          </a>

          {/* Desktop Navigation - Center */}
          <div className={`hidden md:flex items-center gap-8 transition-all duration-300 flex-1 justify-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`${language === 'ar' ? 'text-base' : 'text-xs'} font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 ${isActive(item.id)
                  ? 'text-aoc-gold border-b-2 border-aoc-gold pb-1'
                  : 'text-aoc-white/80 hover:text-aoc-white'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Switcher - Right side */}
          <div className="flex items-center gap-6 transition-all duration-300">
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 text-aoc-white/80 hover:text-aoc-white transition-colors"
              >
                <Globe size={16} />
                <span className="text-xs font-inter-tight font-light tracking-[0.2em] uppercase">{t.language}</span>
              </button>

              {showLangDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-aoc-black/95 backdrop-blur-sm border border-aoc-gold/30 rounded overflow-hidden z-50">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`block w-full px-4 py-2 text-xs font-inter-tight font-light tracking-[0.2em] uppercase text-left hover:bg-aoc-gold/10 transition-colors ${language === 'en' ? 'text-aoc-gold' : 'text-aoc-white/80'
                      }`}
                  >
                    ENGLISH
                  </button>
                  <button
                    onClick={() => handleLanguageChange('ar')}
                    className={`block w-full px-4 py-2 text-xs font-inter-tight font-light tracking-[0.2em] uppercase text-left hover:bg-aoc-gold/10 transition-colors ${language === 'ar' ? 'text-aoc-gold' : 'text-aoc-white/80'
                      }`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-[72px] ${language === 'ar' ? 'right-0' : 'left-0'} w-64 h-[calc(100vh-72px)] bg-aoc-black/95 backdrop-blur-md border-r border-white/10 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}
        >
          <div className="p-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                className={`block py-3 ${language === 'ar' ? 'text-right text-lg' : 'text-left text-sm'} font-inter-tight font-light tracking-[0.15em] uppercase transition-all duration-300 ${isActive(item.id)
                  ? 'text-aoc-gold'
                  : 'text-aoc-white/80 hover:text-aoc-white'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
