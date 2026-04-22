import { useEffect } from 'react';
import {
  SITE_URL,
  SOCIAL_LINKS,
  getLocalizedText,
  serviceBriefs,
  siteCopy,
  type SiteLanguage,
} from '../siteData';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertScript(id: string, data: Record<string, unknown>) {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-schema-id="${id}"]`);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema-id', id);
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function useSiteMetadata(language: SiteLanguage) {
  useEffect(() => {
    const meta = siteCopy.meta[language];
    const canonicalUrl = `${SITE_URL}/`;
    const serviceNames = serviceBriefs.map((service) => getLocalizedText(service.title, language));
    const faqItems = siteCopy.faq.map((item) => ({
      '@type': 'Question',
      name: getLocalizedText(item.question, language),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedText(item.answer, language),
      },
    }));

    document.title = meta.title;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#003087' });
    upsertMeta('meta[name="application-name"]', { name: 'application-name', content: meta.siteName });
    upsertMeta('meta[name="apple-mobile-web-app-title"]', {
      name: 'apple-mobile-web-app-title',
      content: meta.siteName,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: meta.siteName });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: meta.locale });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: `${SITE_URL}/favicon.png` });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: meta.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: `${SITE_URL}/favicon.png`,
    });

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    upsertScript('primary-site-schema', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: siteCopy.meta.en.siteName,
          alternateName: siteCopy.meta.ar.siteName,
          url: canonicalUrl,
          logo: `${SITE_URL}/favicon.png`,
          sameAs: Object.values(SOCIAL_LINKS),
          areaServed: 'Saudi Arabia',
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${SITE_URL}/#service`,
          name: siteCopy.meta.en.siteName,
          description: siteCopy.meta.en.description,
          url: canonicalUrl,
          areaServed: {
            '@type': 'Country',
            name: 'Saudi Arabia',
          },
          serviceType: serviceNames,
          availableLanguage: ['English', 'Arabic'],
          sameAs: Object.values(SOCIAL_LINKS),
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: language === 'ar' ? 'الخدمات' : 'Services',
            itemListElement: serviceBriefs.map((service, index) => ({
              '@type': 'Offer',
              position: index + 1,
              itemOffered: {
                '@type': 'Service',
                name: getLocalizedText(service.title, language),
                description: getLocalizedText(service.summary, language),
                areaServed: 'Saudi Arabia',
                audience: {
                  '@type': 'Audience',
                  audienceType: getLocalizedText(service.audience, language),
                },
                url: `${SITE_URL}${service.docPath}`,
              },
            })),
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: canonicalUrl,
          name: meta.siteName,
          inLanguage: language,
          description: meta.description,
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/#webpage`,
          url: canonicalUrl,
          name: meta.title,
          inLanguage: language,
          isPartOf: {
            '@id': `${SITE_URL}/#website`,
          },
          about: {
            '@id': `${SITE_URL}/#organization`,
          },
          description: meta.description,
          primaryImageOfPage: `${SITE_URL}/favicon.png`,
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
          mainEntity: faqItems,
        },
      ],
    });
  }, [language]);
}
