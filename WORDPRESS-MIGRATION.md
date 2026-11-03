# Al Osaimi WordPress Migration

Custom theme path:

`wp-content/themes/alosaimi-consulting`

## Current Platform Target

- WordPress: theme metadata is updated for WordPress 7.0.
- PHP: requires PHP 8.3 or newer.
- Recommended Hostinger setting: use PHP 8.5 if available; otherwise use PHP 8.4 or 8.3.

## What Was Migrated

- React single-page structure was converted into PHP template parts.
- Compiled Tailwind and custom CSS from the original Vite build are preserved in `assets/dist`.
- Original source assets are copied into `assets/source`.
- lucide-react icons were replaced with inline SVG equivalents in `inc/helpers.php`.
- Manual English/Arabic content is rebuilt as PHP arrays in `inc/content.php`.
- Contact form now posts to WordPress AJAX and sends email through `wp_mail()`.

## Template Mapping

- `src/App.tsx` shell -> `front-page.php`
- `TopNav.tsx` -> `template-parts/top-nav.php`
- Hero section -> `template-parts/hero.php`
- About + CEO section -> `template-parts/about.php`
- `Services.tsx` -> `template-parts/services.php`
- Client marquee -> `template-parts/clients.php`
- `ProjectModal.tsx` and projects section -> `template-parts/projects.php`
- Contact section -> `template-parts/contact.php`
- Fixed bottom bar -> `template-parts/bottom-bar.php`
- React UI effects -> `assets/js/theme.js`

## Language System

The theme uses the migrated manual translation data from `inc/content.php`.

- Default language is English.
- Arabic is available through `?lang=ar`.
- English is available through `?lang=en`.
- The nav language switch stores `aoc_lang` as a cookie.
- Arabic output applies `dir="rtl"` and the same `rtl` class logic used by the React version.

## Admin Editing

No required plugins are used.

In WordPress Admin:

`Al Osaimi Content`

Editable content types:

- Services
- Projects
- Project categories
- Clients
- Certificates / accreditations

Editors can add, update, draft, reorder, or delete those items without touching code. Use each item's Main image field to replace the built-in migrated image, and use the project gallery field to select extra Media Library images.

## Free Page Editing

The migrated homepage design remains controlled by `Al Osaimi Content` so it can keep the original animation, modals, galleries, and bilingual behavior.

The homepage can be rearranged with the normal free WordPress block editor. The theme creates a `Home` page automatically, fills it with one shortcode block per section, and sets it as the static front page.

Use WordPress Shortcode blocks to move full migrated sections around:

- `[aoc_section name="intro"]`
- `[aoc_section name="top-nav"]`
- `[aoc_section name="hero"]`
- `[aoc_section name="about"]`
- `[aoc_section name="services"]`
- `[aoc_section name="clients"]`
- `[aoc_section name="projects"]`
- `[aoc_section name="contact"]`
- `[aoc_section name="bottom-bar"]`

Use `[aoc_homepage]` to render the full migrated homepage in one block. Individual text/images for Services, Projects, Clients, and Certificates still come from `Al Osaimi Content`.

In WordPress Admin, go to `Pages -> Home -> Edit`, or use the `Edit Home Page` button in `Al Osaimi Content`.

Global settings remain in:

`Appearance -> Al Osaimi Settings`

Available settings:

- Contact recipient email
- GTM ID
- GA4 ID
- Microsoft Clarity ID
- Google Search Console verification
- Bing Webmaster verification
- Advanced JSON content overrides

Leave the JSON override empty unless a developer needs a low-level fallback override.

## Contact Form

The form keeps the same frontend fields and layout:

- First name
- Last name
- Email
- Message

Backend behavior:

- AJAX submission to `admin-ajax.php`
- Nonce verification
- Honeypot spam field
- Sanitized fields
- Email delivery through `wp_mail()`
- Success/error text is rendered without changing the form layout

## Tracking

Do not add fake IDs. Add real IDs in:

`Appearance -> Al Osaimi Settings`

Supported:

- Google Tag Manager
- Google Analytics 4
- Google Search Console verification
- Bing Webmaster Tools verification
- Microsoft Clarity

If GTM is present, the theme uses GTM as the primary loader. If no GTM is present but GA4 is present, GA4 loads directly.

## Plugins

No plugins are required for the delivered theme.

Optional plugins:

- ACF, if a more editor-friendly structured admin UI is desired later.
- Rank Math or Yoast, if editorial SEO controls and XML sitemap management are desired.
- LiteSpeed Cache / WP Rocket / Autoptimize, only after visual regression testing.

## Hosting

The current Netlify static deployment cannot host standard WordPress because WordPress requires:

- PHP runtime
- MySQL/MariaDB database
- WordPress core files
- Persistent uploads directory

Use standard WordPress hosting, VPS, or managed WordPress hosting.

Deployment steps:

1. Install WordPress on the target host.
2. Upload `wp-content/themes/alosaimi-consulting`.
3. Activate the theme from `Appearance -> Themes`.
4. Set the homepage as a static front page in `Settings -> Reading`.
5. Open any WordPress admin page once as an administrator so the migrated Services, Projects, Clients, and Certificates are seeded into the database.
6. Edit homepage content in `Al Osaimi Content`.
7. Configure contact recipient and tracking IDs in `Appearance -> Al Osaimi Settings`.
8. Verify permalinks in `Settings -> Permalinks`.
9. Test English and Arabic URLs.

## Testing Checklist

- Header and mobile nav
- Language switch: `?lang=en` and `?lang=ar`
- Hero video and poster
- Intro animation
- Custom cursor
- Scroll banner
- About section
- CEO section
- Services carousel
- Services full-screen modal
- Certificates strip
- Client marquee
- Projects background rotation
- Projects full-screen modal
- Project gallery arrows, swipe, dots, fullscreen lightbox
- Contact form success and validation
- Fixed bottom bar
- Desktop, tablet, and mobile viewports
- Browser console errors
- Broken image/video/font URLs
- WordPress email delivery
- SEO meta output

## Known Technical Notes

- The original React source includes `LanguageContext`, but no visible `setLanguage` UI call was wired. The WordPress version adds a small nav-aligned EN/AR switch to make the required bilingual behavior accessible.
- Local PHP lint could not be run in this repository environment because the `php` executable is not installed. Run `php -l` on the theme files in the WordPress/PHP environment before production deployment.
