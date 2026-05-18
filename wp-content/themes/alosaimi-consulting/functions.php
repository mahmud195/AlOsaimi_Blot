<?php
/**
 * Al Osaimi Consulting theme bootstrap.
 *
 * This theme intentionally preserves the original React/Vite visual output:
 * compiled Tailwind CSS is enqueued from the React build, while PHP templates
 * provide the WordPress structure and server-side content.
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once get_template_directory() . '/inc/helpers.php';
require_once get_template_directory() . '/inc/content.php';
require_once get_template_directory() . '/inc/contact.php';
require_once get_template_directory() . '/inc/admin.php';

function aoc_theme_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus([
        'primary' => __('Primary Navigation', 'alosaimi-consulting'),
    ]);
}
add_action('after_setup_theme', 'aoc_theme_setup');

function aoc_theme_assets(): void
{
    $theme_version = wp_get_theme()->get('Version');
    $dist_css = aoc_first_matching_asset('assets/dist/index-*.css');

    if ($dist_css) {
        wp_enqueue_style(
            'aoc-compiled',
            get_template_directory_uri() . '/assets/dist/' . basename($dist_css),
            [],
            filemtime($dist_css)
        );
    }

    wp_enqueue_style(
        'aoc-wordpress-overrides',
        get_template_directory_uri() . '/assets/css/wp-overrides.css',
        ['aoc-compiled'],
        file_exists(get_template_directory() . '/assets/css/wp-overrides.css') ? filemtime(get_template_directory() . '/assets/css/wp-overrides.css') : $theme_version
    );

    wp_enqueue_script(
        'aoc-theme',
        get_template_directory_uri() . '/assets/js/theme.js',
        [],
        file_exists(get_template_directory() . '/assets/js/theme.js') ? filemtime(get_template_directory() . '/assets/js/theme.js') : $theme_version,
        true
    );

    wp_localize_script('aoc-theme', 'AOC_THEME', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('aoc_contact_nonce'),
        'language' => aoc_current_language(),
        'success' => [
            'en' => __('Thank you. Your message has been sent.', 'alosaimi-consulting'),
            'ar' => __('شكراً لك. تم إرسال رسالتك بنجاح.', 'alosaimi-consulting'),
        ],
        'error' => [
            'en' => __('Please check the form and try again.', 'alosaimi-consulting'),
            'ar' => __('يرجى مراجعة البيانات والمحاولة مرة أخرى.', 'alosaimi-consulting'),
        ],
    ]);
}
add_action('wp_enqueue_scripts', 'aoc_theme_assets');

function aoc_defer_theme_script(string $tag, string $handle, string $src): string
{
    if ('aoc-theme' !== $handle) {
        return $tag;
    }

    return '<script src="' . esc_url($src) . '" defer></script>' . "\n";
}
add_filter('script_loader_tag', 'aoc_defer_theme_script', 10, 3);

function aoc_document_title_parts(array $parts): array
{
    if (is_front_page() || is_home()) {
        $parts['title'] = 'ALOSAIMI CONSULTING | A Foundation of Trust';
    }

    return $parts;
}
add_filter('document_title_parts', 'aoc_document_title_parts');

function aoc_head_meta(): void
{
    if (!is_front_page() && !is_home()) {
        return;
    }

    $description = 'ALOSAIMI CONSULTING - Professional consulting services built on a foundation of trust and excellence.';
    $canonical = home_url(add_query_arg([], $GLOBALS['wp']->request ?? ''));
    $og_image = aoc_asset_url('video_poster.jpg');
    ?>
    <meta name="description" content="<?php echo esc_attr($description); ?>" />
    <link rel="canonical" href="<?php echo esc_url($canonical ?: home_url('/')); ?>" />
    <meta property="og:title" content="ALOSAIMI CONSULTING | A Foundation of Trust" />
    <meta property="og:description" content="<?php echo esc_attr($description); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>" />
    <meta property="og:image" content="<?php echo esc_url($og_image); ?>" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="ALOSAIMI CONSULTING | A Foundation of Trust" />
    <meta name="twitter:description" content="<?php echo esc_attr($description); ?>" />
    <?php
}
add_action('wp_head', 'aoc_head_meta', 5);

function aoc_tracking_head(): void
{
    $tracking = aoc_tracking_options();

    if (!empty($tracking['gtm_id'])) {
        ?>
        <script>
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
            (function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','<?php echo esc_js($tracking['gtm_id']); ?>');
        </script>
        <?php
    } elseif (!empty($tracking['ga_id'])) {
        ?>
        <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr($tracking['ga_id']); ?>"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '<?php echo esc_js($tracking['ga_id']); ?>');
        </script>
        <?php
    }

    if (!empty($tracking['clarity_id'])) {
        ?>
        <script>
            (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '<?php echo esc_js($tracking['clarity_id']); ?>');
        </script>
        <?php
    }
}
add_action('wp_head', 'aoc_tracking_head', 20);

function aoc_tracking_body(): void
{
    $tracking = aoc_tracking_options();
    if (empty($tracking['gtm_id'])) {
        return;
    }
    ?>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo esc_attr($tracking['gtm_id']); ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <?php
}
add_action('wp_body_open', 'aoc_tracking_body');

