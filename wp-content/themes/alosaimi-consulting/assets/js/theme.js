(function () {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const isArabic = () => document.body.dataset.aocLanguage === 'ar';

  function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  }

  function initLanguageSwitch() {
    qsa('[data-language-switch]').forEach((link) => {
      link.addEventListener('click', () => setCookie('aoc_lang', link.dataset.language || 'en'));
    });
  }

  function initIntro() {
    const overlay = qs('[data-intro-overlay]');
    if (!overlay) return;

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const timers = [
      window.setTimeout(() => overlay.classList.add('is-drawing'), 150),
      window.setTimeout(() => {
        overlay.classList.add('is-expanding');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }, 1300),
      window.setTimeout(() => overlay.classList.add('is-done'), 1400),
      window.setTimeout(() => overlay.remove(), 2100),
    ];

    window.addEventListener('beforeunload', () => timers.forEach(window.clearTimeout), { once: true });
  }

  function initCustomCursor() {
    const cursor = qs('[data-custom-cursor]');
    if (!cursor) return;

    document.addEventListener('mousemove', (event) => {
      cursor.style.transform = `translate(${event.clientX - 12}px, ${event.clientY - 12}px)`;
    }, { passive: true });

    document.addEventListener('mouseover', (event) => {
      if (event.target.closest('a, button, input, textarea, [role="button"]')) {
        cursor.classList.add('hovering');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (event) => {
      if (event.target.closest('a, button, input, textarea, [role="button"]')) {
        cursor.classList.remove('hovering');
      }
    }, { passive: true });
  }

  function initScrollAnimations() {
    const animated = qsa('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up, .circle-draw, .card-deal');
    if (!animated.length || !('IntersectionObserver' in window)) {
      animated.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animated.forEach((el) => observer.observe(el));
  }

  function setMobilePanel(panel, drawer, button, open) {
    if (!panel || !drawer) return;
    panel.classList.toggle('visible', open);
    panel.classList.toggle('opacity-100', open);
    panel.classList.toggle('invisible', !open);
    panel.classList.toggle('opacity-0', !open);
    drawer.classList.toggle('translate-x-0', open);
    drawer.classList.toggle('translate-x-full', !open && isArabic());
    drawer.classList.toggle('-translate-x-full', !open && !isArabic());
    qs('[data-open-icon]', button || document)?.classList.toggle('hidden', open);
    qs('[data-close-icon]', button || document)?.classList.toggle('hidden', !open);
  }

  function initNavigation() {
    const button = qs('[data-mobile-nav-toggle]');
    const panel = qs('[data-mobile-nav-panel]');
    const drawer = qs('[data-mobile-nav-drawer]');
    const backdrop = qs('[data-mobile-nav-backdrop]');
    let open = false;

    const toggle = (state) => {
      open = typeof state === 'boolean' ? state : !open;
      setMobilePanel(panel, drawer, button, open);
    };

    button?.addEventListener('click', () => toggle());
    backdrop?.addEventListener('click', () => toggle(false));
    qsa('[data-mobile-nav-link]').forEach((link) => link.addEventListener('click', () => toggle(false)));

    const bottomBar = qs('[data-bottom-bar]');
    const links = qsa('[data-nav-link]');
    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.dataset.navLink === id;
        link.classList.toggle('text-aoc-gold', active);
        link.classList.toggle('border-b-2', active && !link.hasAttribute('data-mobile-nav-link'));
        link.classList.toggle('border-aoc-gold', active && !link.hasAttribute('data-mobile-nav-link'));
        link.classList.toggle('pb-1', active && !link.hasAttribute('data-mobile-nav-link'));
        link.classList.toggle('text-aoc-white/80', !active);
      });

      if (bottomBar) {
        const show = id !== 'home';
        bottomBar.classList.toggle('opacity-0', !show);
        bottomBar.classList.toggle('opacity-100', show);
        bottomBar.classList.toggle('pointer-events-none', !show);
        bottomBar.style.pointerEvents = show ? 'auto' : 'none';
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) setActive(entry.target.id);
        });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      qsa('section[id]').forEach((section) => observer.observe(section));
    }

    setActive('home');
  }

  function initHeroBanner() {
    const banner = qs('[data-hero-banner]');
    if (!banner) return;

    let offset = 0;
    let scrolling = false;
    let animation = 0;
    let timeout = 0;

    const animate = () => {
      if (!scrolling) return;
      offset += 2;
      banner.style.transform = `translateX(${-(offset % 2000)}px)`;
      animation = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', () => {
      if (!scrolling) {
        scrolling = true;
        animation = requestAnimationFrame(animate);
      }
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        scrolling = false;
        cancelAnimationFrame(animation);
      }, 100);
    }, { passive: true });
  }

  function initProjectBackgrounds() {
    const slides = qsa('[data-project-bg]');
    if (slides.length <= 1) return;
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % slides.length;
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
      });
    }, 5000);
  }

  function initServiceCarousel() {
    const carousel = qs('[data-service-carousel]');
    const holdButton = qs('[data-service-scroll-button]');
    if (!carousel) return;

    let isDragging = false;
    let dragStart = 0;
    let scrollStart = 0;
    let halfWidth = 0;
    let pressed = false;
    let frame = 0;

    const measure = () => { halfWidth = carousel.scrollWidth / 2; };
    measure();
    window.addEventListener('resize', measure);

    carousel.addEventListener('mousedown', (event) => {
      isDragging = true;
      dragStart = event.clientX;
      scrollStart = carousel.scrollLeft;
      carousel.classList.add('cursor-grabbing');
    });
    window.addEventListener('mousemove', (event) => {
      if (!isDragging) return;
      carousel.scrollLeft = scrollStart - (event.clientX - dragStart);
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.classList.remove('cursor-grabbing');
    });

    const continuousScroll = () => {
      if (!pressed) return;
      if (isArabic()) {
        carousel.scrollLeft -= 8;
        if (carousel.scrollLeft <= 0) carousel.scrollLeft += halfWidth;
      } else {
        carousel.scrollLeft += 8;
        if (carousel.scrollLeft >= halfWidth) carousel.scrollLeft -= halfWidth;
      }
      frame = requestAnimationFrame(continuousScroll);
    };

    const start = () => {
      pressed = true;
      holdButton?.classList.add('scale-90', 'bg-aoc-gold/15', 'border-aoc-gold');
      frame = requestAnimationFrame(continuousScroll);
    };
    const stop = () => {
      pressed = false;
      holdButton?.classList.remove('scale-90', 'bg-aoc-gold/15', 'border-aoc-gold');
      cancelAnimationFrame(frame);
    };

    holdButton?.addEventListener('mousedown', start);
    holdButton?.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
  }

  function updateTrackingModal(options) {
    const { scrollEl, contentEl, imageSelector, cardSelector, ringEl, buttons, activeClass = 'is-active' } = options;
    if (!scrollEl || !contentEl) return;
    const images = qsa(imageSelector, contentEl);
    const cards = qsa(cardSelector, contentEl);
    if (!images.length) return;

    const scrollRect = scrollEl.getBoundingClientRect();
    const centerY = scrollRect.top + scrollRect.height * 0.4;
    let closestIndex = 0;
    let closestDistance = Infinity;

    images.forEach((image, index) => {
      const rect = image.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - centerY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    cards.forEach((card, index) => {
      const panel = card.querySelector('.aoc-glass-card');
      panel?.classList.toggle(activeClass, index === closestIndex);
    });

    if (buttons) {
      buttons.forEach((button, index) => {
        const active = index === closestIndex;
        button.classList.toggle('text-aoc-gold', active);
        button.classList.toggle('text-aoc-white/60', !active);
        button.classList.toggle('text-aoc-white/70', !active);
      });
    }

    if (ringEl && images[closestIndex]) {
      const containerRect = contentEl.getBoundingClientRect();
      const imageRect = images[closestIndex].getBoundingClientRect();
      ringEl.style.top = `${imageRect.top - containerRect.top}px`;
      ringEl.style.left = `${imageRect.left - containerRect.left}px`;
      ringEl.style.width = `${imageRect.width}px`;
      ringEl.style.height = `${imageRect.height}px`;
      ringEl.style.opacity = '1';
    }
  }

  function initServicesModal() {
    const modal = qs('[data-services-modal]');
    if (!modal) return;

    const scrollEl = qs('[data-services-scroll]', modal);
    const contentEl = qs('[data-services-content]', modal);
    const ringEl = qs('[data-services-ring]', modal);
    const jumpButtons = qsa('[data-service-jump]', modal);
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => updateTrackingModal({
        scrollEl,
        contentEl,
        imageSelector: '[data-services-image]',
        cardSelector: '[data-service-card]',
        ringEl,
        buttons: jumpButtons,
      }));
    };

    const open = () => {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      scrollEl.scrollTop = 0;
      window.setTimeout(update, 100);
      window.setTimeout(update, 500);
    };
    const close = (event) => {
      event?.preventDefault();
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    qsa('[data-open-services]').forEach((button) => button.addEventListener('click', open));
    qsa('[data-close-services]', modal).forEach((button) => button.addEventListener('click', close));
    scrollEl?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    jumpButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const card = qs(`[data-service-card="${button.dataset.serviceJump}"]`, modal);
        if (!card || !scrollEl) return;
        const containerTop = scrollEl.getBoundingClientRect().top;
        const cardTop = card.getBoundingClientRect().top;
        scrollEl.scrollBy({ top: cardTop - containerTop - 80, behavior: 'smooth' });
      });
    });
  }

  function initProjectsModal() {
    const modal = qs('[data-project-modal]');
    const trigger = qs('[data-open-projects]');
    const learnBar = qs('[data-project-learn-bar]');
    const learnInner = qs('[data-project-learn-inner]');
    const topNav = qs('[data-main-nav]');
    const bottomBar = qs('[data-bottom-bar]');
    if (!modal || !trigger || !learnBar) return;

    const scrollEl = qs('[data-project-scroll]', modal);
    const contentEl = qs('[data-project-content]', modal);
    const ringEl = qs('[data-project-ring]', modal);
    const categoryButtons = qsa('[data-project-category]', modal);
    const categoryPanel = qs('[data-project-category-panel]', modal);
    const categoryDrawer = qs('[data-project-category-drawer]', modal);
    const categoryToggle = qs('[data-project-category-toggle]', modal);
    const categoryBackdrop = qs('[data-project-category-backdrop]', modal);
    let frame = 0;
    let categoryOpen = false;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => updateTrackingModal({
        scrollEl,
        contentEl,
        imageSelector: '[data-project-image]',
        cardSelector: '[data-project-card]',
        ringEl,
      }));
    };

    const openModal = () => {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      scrollEl.scrollTop = 0;
      window.setTimeout(update, 100);
      window.setTimeout(update, 600);
    };

    const restoreLearnBar = () => {
      learnBar.style.position = '';
      learnBar.style.zIndex = '';
      learnBar.style.top = '';
      learnBar.style.bottom = '';
      learnBar.style.transition = '';
      learnBar.classList.add('absolute', 'top-1/2', '-translate-y-1/2', 'border-t', 'border-b', 'border-white/20', 'bg-aoc-black/20');
      learnBar.classList.remove('bg-aoc-black/90', 'backdrop-blur-xl');
      learnInner?.classList.remove('opacity-0');
      topNav.style.top = '';
      bottomBar.style.bottom = '';
    };

    trigger.addEventListener('click', () => {
      const rect = learnBar.getBoundingClientRect();
      const startTop = rect.top;
      const startBottom = window.innerHeight - rect.bottom;
      const topNavHeight = topNav?.getBoundingClientRect().height || 0;
      const bottomBarHeight = bottomBar?.getBoundingClientRect().height || 0;
      const duration = 600;
      const startTime = performance.now();

      document.body.style.overflow = 'hidden';
      learnBar.classList.remove('absolute', 'top-1/2', '-translate-y-1/2', 'border-t', 'border-b', 'border-white/20', 'bg-aoc-black/20');
      learnBar.classList.add('bg-aoc-black/90', 'backdrop-blur-xl');
      learnInner?.classList.add('opacity-0');
      learnBar.style.position = 'fixed';
      learnBar.style.zIndex = '60';
      learnBar.style.top = `${startTop}px`;
      learnBar.style.bottom = `${startBottom}px`;
      learnBar.style.transition = 'none';

      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = ease(progress);
        const currentTop = startTop * (1 - eased);
        const currentBottom = startBottom * (1 - eased);
        learnBar.style.top = `${currentTop}px`;
        learnBar.style.bottom = `${currentBottom}px`;
        if (topNav) topNav.style.top = currentTop < topNavHeight ? `${currentTop - topNavHeight}px` : '0px';
        if (bottomBar) bottomBar.style.bottom = currentBottom < bottomBarHeight ? `${currentBottom - bottomBarHeight}px` : '0px';
        if (progress < 1) requestAnimationFrame(animate);
        else openModal();
      };
      requestAnimationFrame(animate);
    });

    qsa('[data-close-projects]', modal).forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        restoreLearnBar();
      });
    });

    const toggleCategoryPanel = (state) => {
      categoryOpen = typeof state === 'boolean' ? state : !categoryOpen;
      setMobilePanel(categoryPanel, categoryDrawer, categoryToggle, categoryOpen);
    };

    categoryToggle?.addEventListener('click', () => toggleCategoryPanel());
    categoryBackdrop?.addEventListener('click', () => toggleCategoryPanel(false));

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const section = qs(`[data-project-section="${button.dataset.projectCategory}"]`, modal);
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toggleCategoryPanel(false);
      });
    });

    if ('IntersectionObserver' in window && scrollEl) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.dataset.projectSection;
          categoryButtons.forEach((button) => {
            const active = button.dataset.projectCategory === key;
            button.classList.toggle('text-aoc-gold', active);
            button.classList.toggle('text-aoc-white/70', !active);
            button.classList.toggle('text-xl', active);
            button.classList.toggle('lg:text-2xl', active);
          });
        });
      }, { root: scrollEl, rootMargin: '-20% 0px -60% 0px', threshold: 0 });
      qsa('[data-project-section]', modal).forEach((section) => observer.observe(section));
    }

    scrollEl?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function initGalleries() {
    const lightbox = qs('[data-lightbox]');
    const lightboxImage = qs('[data-lightbox-image]');
    const lightboxZoom = qs('[data-lightbox-zoom]');
    const stage = qs('[data-lightbox-stage]');
    let currentImages = [];
    let currentIndex = 0;
    let zoom = 1;
    let pan = { x: 0, y: 0 };
    let panning = false;
    let start = { x: 0, y: 0 };
    let startPan = { x: 0, y: 0 };

    const updateLightbox = () => {
      if (!lightboxImage || !currentImages.length) return;
      lightboxImage.src = currentImages[currentIndex];
      lightboxImage.alt = `Project ${currentIndex + 1}`;
      lightboxImage.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
      if (lightboxZoom) lightboxZoom.textContent = `${Math.round(zoom * 100)}%`;
    };
    const openLightbox = (images, index) => {
      currentImages = images;
      currentIndex = index;
      zoom = 1;
      pan = { x: 0, y: 0 };
      lightbox?.classList.remove('hidden');
      lightbox?.classList.add('flex');
      updateLightbox();
    };
    const closeLightbox = () => {
      lightbox?.classList.add('hidden');
      lightbox?.classList.remove('flex');
    };
    const moveLightbox = (direction) => {
      if (!currentImages.length) return;
      currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
      zoom = 1;
      pan = { x: 0, y: 0 };
      updateLightbox();
    };

    qsa('.aoc-gallery').forEach((gallery) => {
      let images = [];
      try { images = JSON.parse(gallery.dataset.gallery || '[]'); } catch (_error) { images = []; }
      let index = 0;
      const image = qs('[data-gallery-image]', gallery);
      const dots = qsa('[data-gallery-dot]', gallery);
      const stageEl = qs('[data-gallery-stage]', gallery);
      let dragging = false;
      let dragStart = 0;
      let dragX = 0;

      const update = () => {
        if (image && images[index]) {
          image.src = images[index];
          image.style.transform = 'translateX(0)';
          image.style.opacity = '1';
        }
        dots.forEach((dot, dotIndex) => {
          const marker = dot.firstElementChild;
          const active = dotIndex === index;
          marker?.classList.toggle('bg-aoc-gold', active);
          marker?.classList.toggle('bg-white/50', !active);
          qs('.absolute.inset-0', dot)?.remove();
          if (active) {
            const ring = document.createElement('span');
            ring.className = 'absolute inset-0 rounded-full border border-aoc-gold transition-opacity duration-300';
            dot.appendChild(ring);
          }
        });
      };
      const move = (direction) => {
        if (images.length <= 1) return;
        index = (index + direction + images.length) % images.length;
        update();
      };

      qs('[data-gallery-prev]', gallery)?.addEventListener('click', (event) => { event.stopPropagation(); move(-1); });
      qs('[data-gallery-next]', gallery)?.addEventListener('click', (event) => { event.stopPropagation(); move(1); });
      qs('[data-gallery-fullscreen]', gallery)?.addEventListener('click', (event) => { event.stopPropagation(); openLightbox(images, index); });
      dots.forEach((dot) => dot.addEventListener('click', () => { index = Number(dot.dataset.galleryDot || 0); update(); }));

      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        if (Math.abs(dragX) > 50) move(dragX < 0 ? 1 : -1);
        if (image) {
          image.style.transform = 'translateX(0)';
          image.style.opacity = '1';
        }
      };

      stageEl?.addEventListener('mousedown', (event) => {
        if (images.length <= 1) return;
        dragging = true;
        dragStart = event.clientX;
        dragX = 0;
      });
      window.addEventListener('mousemove', (event) => {
        if (!dragging || !image) return;
        dragX = event.clientX - dragStart;
        image.style.transform = `translateX(${dragX}px)`;
        image.style.opacity = String(Math.max(0.3, 1 - Math.abs(dragX) / 300));
      });
      window.addEventListener('mouseup', endDrag);
      stageEl?.addEventListener('touchstart', (event) => {
        if (images.length <= 1) return;
        dragging = true;
        dragStart = event.touches[0].clientX;
        dragX = 0;
      }, { passive: true });
      stageEl?.addEventListener('touchmove', (event) => {
        if (!dragging || !image) return;
        dragX = event.touches[0].clientX - dragStart;
        image.style.transform = `translateX(${dragX}px)`;
      }, { passive: true });
      stageEl?.addEventListener('touchend', endDrag);
    });

    qs('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
    qs('[data-lightbox-prev]')?.addEventListener('click', () => moveLightbox(-1));
    qs('[data-lightbox-next]')?.addEventListener('click', () => moveLightbox(1));
    qs('[data-lightbox-zoom-in]')?.addEventListener('click', () => { zoom = Math.min(zoom + 0.5, 5); updateLightbox(); });
    qs('[data-lightbox-zoom-out]')?.addEventListener('click', () => { zoom = Math.max(zoom - 0.5, 1); if (zoom === 1) pan = { x: 0, y: 0 }; updateLightbox(); });
    lightbox?.addEventListener('wheel', (event) => {
      event.preventDefault();
      zoom = event.deltaY < 0 ? Math.min(zoom + 0.25, 5) : Math.max(zoom - 0.25, 1);
      if (zoom === 1) pan = { x: 0, y: 0 };
      updateLightbox();
    }, { passive: false });
    stage?.addEventListener('mousedown', (event) => {
      if (zoom <= 1) return;
      panning = true;
      start = { x: event.clientX, y: event.clientY };
      startPan = { ...pan };
    });
    window.addEventListener('mousemove', (event) => {
      if (!panning) return;
      pan = { x: startPan.x + event.clientX - start.x, y: startPan.y + event.clientY - start.y };
      updateLightbox();
    });
    window.addEventListener('mouseup', () => { panning = false; });
    window.addEventListener('keydown', (event) => {
      if (lightbox?.classList.contains('hidden')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') moveLightbox(-1);
      if (event.key === 'ArrowRight') moveLightbox(1);
    });
  }

  function initContactForm() {
    const form = qs('[data-contact-form]');
    if (!form || !window.AOC_THEME) return;
    const message = qs('[data-contact-message]', form);
    const submit = qs('button[type="submit"]', form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      formData.append('action', 'aoc_contact_submit');
      formData.append('nonce', window.AOC_THEME.nonce);
      submit.disabled = true;

      if (message) {
        message.classList.remove('hidden', 'aoc-form-success', 'aoc-form-error');
        message.textContent = '';
      }

      try {
        const response = await fetch(window.AOC_THEME.ajaxUrl, { method: 'POST', body: formData, credentials: 'same-origin' });
        const payload = await response.json();
        if (!payload.success) throw new Error(payload.data?.message || window.AOC_THEME.error[window.AOC_THEME.language]);
        if (message) {
          message.textContent = payload.data.message;
          message.classList.add('aoc-form-success');
        }
        form.reset();
      } catch (error) {
        if (message) {
          message.textContent = error.message || window.AOC_THEME.error[window.AOC_THEME.language];
          message.classList.add('aoc-form-error');
        }
      } finally {
        submit.disabled = false;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitch();
    initIntro();
    initCustomCursor();
    initScrollAnimations();
    initNavigation();
    initHeroBanner();
    initProjectBackgrounds();
    initServiceCarousel();
    initServicesModal();
    initProjectsModal();
    initGalleries();
    initContactForm();
  });
})();
