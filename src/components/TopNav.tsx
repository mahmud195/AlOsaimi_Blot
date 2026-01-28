import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import archcorpLogo from '../assets/aoc_logo_white.png';

interface TopNavProps {
  activeSection: string;
}

export default function TopNav({ activeSection }: TopNavProps) {
  const { language, setLanguage } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const t = translations[language];
  const isActive = (section: string) => activeSection === section;

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-aoc-black/40 backdrop-blur-sm border-b border-aoc-gold/20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="h-8 w-auto">
          <img src={archcorpLogo} alt="ARCHCORP Logo" className="h-full w-auto" />
        </div>

        <div className={`flex items-center gap-12 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <a
            href="#about"
            className={`text-xs font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 ${
              isActive('about')
                ? 'text-aoc-gold border-b-2 border-aoc-gold pb-1'
                : 'text-aoc-white/80 hover:text-aoc-white'
            }`}
          >
            {t.nav.about}
          </a>
          <a
            href="#services"
            className={`text-xs font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 ${
              isActive('services')
                ? 'text-aoc-gold border-b-2 border-aoc-gold pb-1'
                : 'text-aoc-white/80 hover:text-aoc-white'
            }`}
          >
            {t.nav.services}
          </a>
          <a
            href="#projects"
            className={`text-xs font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 ${
              isActive('projects')
                ? 'text-aoc-gold border-b-2 border-aoc-gold pb-1'
                : 'text-aoc-white/80 hover:text-aoc-white'
            }`}
          >
            {t.nav.projects}
          </a>
          <a
            href="#news"
            className={`text-xs font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 ${
              isActive('news')
                ? 'text-aoc-gold border-b-2 border-aoc-gold pb-1'
                : 'text-aoc-white/80 hover:text-aoc-white'
            }`}
          >
            {t.nav.news}
          </a>
          <a
            href="#contact"
            className={`text-xs font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 ${
              isActive('contact')
                ? 'text-aoc-gold border-b-2 border-aoc-gold pb-1'
                : 'text-aoc-white/80 hover:text-aoc-white'
            }`}
          >
            {t.nav.contact}
          </a>
        </div>

        <div className="flex items-center gap-6">
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
                  className={`block w-full px-4 py-2 text-xs font-inter-tight font-light tracking-[0.2em] uppercase text-left hover:bg-aoc-gold/10 transition-colors ${
                    language === 'en' ? 'text-aoc-gold' : 'text-aoc-white/80'
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`block w-full px-4 py-2 text-xs font-inter-tight font-light tracking-[0.2em] uppercase text-left hover:bg-aoc-gold/10 transition-colors ${
                    language === 'ar' ? 'text-aoc-gold' : 'text-aoc-white/80'
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
  );
}
