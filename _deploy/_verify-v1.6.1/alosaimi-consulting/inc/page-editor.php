<?php
/**
 * Free WordPress editor helpers for arranging homepage sections.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_post_has_editor_content(?int $post_id = null): bool
{
    $post_id = $post_id ?: get_queried_object_id();

    if ($post_id <= 0) {
        return false;
    }

    $post = get_post($post_id);

    return $post instanceof WP_Post && '' !== trim((string) $post->post_content);
}

function aoc_should_render_wp_page_content(?int $post_id = null, bool $include_plain_content = true): bool
{
    return $include_plain_content && aoc_post_has_editor_content($post_id);
}

function aoc_render_wp_page_content(): void
{
    if (!have_posts()) {
        return;
    }

    while (have_posts()) {
        the_post();
        the_content();
    }

    wp_reset_postdata();
}

function aoc_homepage_editor_content(): string
{
    if (function_exists('aoc_gutenberg_homepage_content')) {
        return aoc_gutenberg_homepage_content();
    }

    $blocks = [];
    $sections = [
        'intro',
        'top-nav',
        'hero',
        'about',
        'services',
        'clients',
        'projects',
        'contact',
        'bottom-bar',
    ];

    foreach ($sections as $section) {
        $blocks[] = aoc_homepage_editor_block($section);
    }

    return implode("\n\n", $blocks);
}

function aoc_homepage_has_legacy_shortcodes(string $content): bool
{
    return false !== strpos($content, '[aoc_section')
        || false !== strpos($content, '[aoc_homepage]')
        || false !== strpos($content, '<!-- wp:shortcode -->');
}

function aoc_homepage_editor_block(string $section): string
{
    return "<!-- wp:shortcode -->\n[aoc_section name=\"" . sanitize_key($section) . "\"]\n<!-- /wp:shortcode -->";
}

function aoc_find_homepage_id(): int
{
    $front_page_id = absint(get_option('page_on_front'));
    if ($front_page_id && 'page' === get_post_type($front_page_id)) {
        return $front_page_id;
    }

    $existing = get_page_by_path('home');
    if ($existing instanceof WP_Post && 'page' === $existing->post_type) {
        return (int) $existing->ID;
    }

    $pages = get_posts([
        'post_type' => 'page',
        'post_status' => ['publish', 'draft', 'private'],
        'posts_per_page' => 10,
        'fields' => 'ids',
        's' => 'Home',
    ]);

    foreach ($pages as $page_id) {
        if ('Home' === get_the_title((int) $page_id)) {
            return (int) $page_id;
        }
    }

    return 0;
}

function aoc_ensure_homepage(): int
{
    $home_id = aoc_find_homepage_id();

    if (!$home_id) {
        $home_id = wp_insert_post([
            'post_type' => 'page',
            'post_status' => 'publish',
            'post_title' => 'Home',
            'post_name' => 'home',
            'post_content' => aoc_homepage_editor_content(),
            'page_template' => 'templates/full-width.php',
        ]);
    }

    if (is_wp_error($home_id) || !$home_id) {
        return 0;
    }

    $home_id = (int) $home_id;
    $post = get_post($home_id);

    if ($post instanceof WP_Post && '' === trim((string) $post->post_content)) {
        wp_update_post([
            'ID' => $home_id,
            'post_content' => aoc_homepage_editor_content(),
        ]);
    }

    update_post_meta($home_id, '_wp_page_template', 'templates/full-width.php');

    if ('page' !== get_option('show_on_front') || absint(get_option('page_on_front')) !== $home_id) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $home_id);
    }

    return $home_id;
}

function aoc_maybe_restore_intro_section(): void
{
    if ('1' === get_option('aoc_homepage_intro_restored_153')) {
        return;
    }

    $home_id = aoc_find_homepage_id();
    $post = $home_id ? get_post($home_id) : null;

    if ($post instanceof WP_Post) {
        $content = (string) $post->post_content;
        $has_sections = false !== strpos($content, '[aoc_section');
        $has_intro = false !== strpos($content, 'name="intro"')
            || false !== strpos($content, "name='intro'")
            || false !== strpos($content, 'name=intro');

        if ($has_sections && !$has_intro) {
            wp_update_post([
                'ID' => (int) $home_id,
                'post_content' => aoc_homepage_editor_block('intro') . "\n\n" . $content,
            ]);
        }
    }

    update_option('aoc_homepage_intro_restored_153', '1');
}

function aoc_maybe_migrate_homepage_to_gutenberg(): void
{
    if (!function_exists('aoc_gutenberg_homepage_content')) {
        return;
    }

    $home_id = aoc_find_homepage_id();
    $post = $home_id ? get_post($home_id) : null;

    if (!$post instanceof WP_Post) {
        return;
    }

    $content = (string) $post->post_content;

    if (!aoc_homepage_has_legacy_shortcodes($content)) {
        update_option('aoc_homepage_gutenberg_migrated_160', '1');
        return;
    }

    wp_update_post([
        'ID' => (int) $home_id,
        'post_content' => aoc_gutenberg_homepage_content(),
    ]);

    update_option('aoc_homepage_gutenberg_migrated_160', '1');
}

function aoc_maybe_create_homepage(): void
{
    if (!is_admin() || !current_user_can('manage_options')) {
        return;
    }

    aoc_ensure_homepage();
    aoc_maybe_restore_intro_section();
    aoc_maybe_migrate_homepage_to_gutenberg();
}
add_action('admin_init', 'aoc_maybe_create_homepage');
add_action('after_switch_theme', 'aoc_ensure_homepage');
add_action('after_switch_theme', 'aoc_maybe_migrate_homepage_to_gutenberg', 20);
