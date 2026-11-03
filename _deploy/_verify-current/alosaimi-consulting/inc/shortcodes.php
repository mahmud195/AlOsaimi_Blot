<?php
/**
 * Shortcodes that let the free WordPress editor move complete migrated sections.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_shortcode_sections(): array
{
    return [
        'intro' => 'intro',
        'nav' => 'top-nav',
        'top-nav' => 'top-nav',
        'hero' => 'hero',
        'about' => 'about',
        'services' => 'services',
        'clients' => 'clients',
        'projects' => 'projects',
        'contact' => 'contact',
        'bottom-bar' => 'bottom-bar',
    ];
}

function aoc_render_section_markup(string $section): string
{
    $sections = aoc_shortcode_sections();
    $section = sanitize_key($section);

    if (empty($sections[$section])) {
        return '';
    }

    $data = aoc_site_data();
    $language = aoc_current_language();
    $t = aoc_lang_data($data, $language);

    ob_start();
    get_template_part('template-parts/' . $sections[$section], null, compact('data', 'language', 't'));
    return (string) ob_get_clean();
}

function aoc_section_shortcode(array $atts): string
{
    $atts = shortcode_atts([
        'name' => 'hero',
    ], $atts, 'aoc_section');

    return aoc_render_section_markup((string) $atts['name']);
}
add_shortcode('aoc_section', 'aoc_section_shortcode');

function aoc_homepage_shortcode(array $atts): string
{
    $atts = shortcode_atts([
        'sections' => 'intro,top-nav,hero,about,services,clients,projects,contact,bottom-bar',
    ], $atts, 'aoc_homepage');

    $language = aoc_current_language();
    $sections = array_filter(array_map('trim', explode(',', (string) $atts['sections'])));

    ob_start();
    ?>
    <main id="aoc-site" class="aoc-site bg-aoc-black text-aoc-white overflow-x-clip <?php echo esc_attr('ar' === $language ? 'rtl' : 'ltr'); ?>" data-language="<?php echo esc_attr($language); ?>">
        <?php foreach ($sections as $section) : ?>
            <?php echo aoc_render_section_markup($section); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <?php endforeach; ?>
        <div class="custom-cursor" data-custom-cursor></div>
    </main>
    <?php
    return (string) ob_get_clean();
}
add_shortcode('aoc_homepage', 'aoc_homepage_shortcode');
