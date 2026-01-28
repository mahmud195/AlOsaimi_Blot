import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import TopNav from './components/TopNav';
import Services from './components/Services';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import archcorpLogo from './assets/aoc_logo_white.png';
import aboutImage from './assets/asset_16.png';

function App() {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [activeSection, setActiveSection] = useState('about');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`bg-aoc-black text-aoc-white overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <TopNav activeSection={activeSection} />
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-aoc-black">
          <div className="absolute inset-0 bg-gradient-to-b from-aoc-black/70 via-aoc-indigo/30 to-aoc-black/70 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg')] bg-cover bg-center opacity-40 animate-[zoom_20s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-20 text-center space-y-8">
          <div className="w-24 h-auto mx-auto mb-12">
            <img src={archcorpLogo} alt="ARCHCORP Logo" className="w-full h-auto" />
          </div>

          <h1 className="text-5xl md:text-7xl font-space-grotesk font-extralight tracking-[0.3em] uppercase">
            {t.hero.title}
          </h1>
        </div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="text-aoc-gold" size={32} strokeWidth={1} />
        </div>
      </section>

      <section id="about" className="min-h-screen bg-aoc-indigo flex items-center">
        <div className={`max-w-screen-2xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center ${language === 'ar' ? 'rtl' : ''}`}>
          <div className={`relative h-[600px] overflow-hidden ${language === 'ar' ? 'md:order-2' : ''}`}>
            <img
              src={aboutImage}
              alt="Architecture"
              className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
            />
          </div>

          <div className={`space-y-8 ${language === 'ar' ? 'md:order-1' : ''}`}>
            <h2 className="text-6xl font-space-grotesk font-extralight tracking-[0.2em] uppercase leading-tight text-aoc-gold">
              {t.about.title}
            </h2>

            <div className="w-24 h-[1px] bg-aoc-gold" />

            <p className="text-aoc-white/70 text-lg font-inter-tight font-light leading-relaxed max-w-xl">
              {t.about.paragraph1}
            </p>

            <p className="text-aoc-white/70 text-lg font-inter-tight font-light leading-relaxed max-w-xl">
              {t.about.paragraph2}
            </p>
          </div>
        </div>
      </section>

      <Services />

      <section id="projects" className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
            alt="Featured Project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aoc-black/90 via-aoc-indigo/50 to-transparent" />
        </div>

        <div className={`relative z-10 max-w-screen-2xl mx-auto px-8 py-24 w-full ${language === 'ar' ? 'rtl' : ''}`}>
          <div className="max-w-2xl space-y-6">
            <div className="text-sm font-inter-tight font-light tracking-[0.3em] uppercase text-aoc-gold">
              {t.projects.featured}
            </div>
            <h3 className="text-5xl font-space-grotesk font-extralight tracking-[0.15em] uppercase text-aoc-white">
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
            <div className={`space-y-8 ${language === 'ar' ? 'md:order-2' : ''}`}>
              <h2 className="text-6xl font-space-grotesk font-extralight tracking-[0.2em] uppercase leading-tight text-aoc-white">
                {t.news.title}
              </h2>

              <div className="w-24 h-[1px] bg-aoc-gold" />

              <div className="space-y-4">
                <div className="text-sm font-inter-tight font-light tracking-[0.2em] uppercase text-aoc-gold">
                  {t.news.date}
                </div>
                <h3 className="text-3xl font-space-grotesk font-light tracking-[0.1em] leading-snug text-aoc-white">
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
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`min-h-screen bg-aoc-indigo flex items-center py-24 ${language === 'ar' ? 'rtl' : ''}`}>
        <div className="max-w-3xl mx-auto px-8 w-full">
          <h2 className="text-6xl font-space-grotesk font-extralight tracking-[0.2em] uppercase mb-4 leading-tight text-aoc-gold">
            {t.contact.title}
          </h2>

          <div className="w-24 h-[1px] bg-aoc-gold mb-16" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  placeholder={t.contact.firstName}
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.15em] transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t.contact.lastName}
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
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
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-aoc-gold/30 py-4 text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.15em] transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                placeholder={t.contact.message}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
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
    </div>
  );
}

export default App;
