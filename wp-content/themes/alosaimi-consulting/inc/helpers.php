<?php
/**
 * Shared helpers for theme templates.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_first_matching_asset(string $pattern): ?string
{
    $files = glob(get_template_directory() . '/' . ltrim($pattern, '/'));
    if (!$files) {
        return null;
    }

    sort($files, SORT_NATURAL);
    return $files[0];
}

function aoc_url_path(string $relative): string
{
    $relative = str_replace('\\', '/', trim($relative, '/'));
    $parts = array_map('rawurlencode', explode('/', $relative));
    return implode('/', $parts);
}

function aoc_asset_url(string $relative, string $bucket = 'source'): string
{
    return get_template_directory_uri() . '/assets/' . rawurlencode($bucket) . '/' . aoc_url_path($relative);
}

function aoc_asset_path(string $relative, string $bucket = 'source'): string
{
    $relative = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, trim($relative, '/'));
    return get_template_directory() . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . $bucket . DIRECTORY_SEPARATOR . $relative;
}

function aoc_current_language(): string
{
    $candidate = '';

    if (isset($_GET['lang'])) {
        $candidate = sanitize_key(wp_unslash($_GET['lang']));
    } elseif (isset($_COOKIE['aoc_lang'])) {
        $candidate = sanitize_key(wp_unslash($_COOKIE['aoc_lang']));
    }

    return in_array($candidate, ['en', 'ar'], true) ? $candidate : 'en';
}

function aoc_language_url(string $language): string
{
    $language = in_array($language, ['en', 'ar'], true) ? $language : 'en';
    return esc_url(add_query_arg('lang', $language, home_url('/')));
}

function aoc_lang_class(string $language, string $ar_class = '', string $en_class = ''): string
{
    return 'ar' === $language ? $ar_class : $en_class;
}

function aoc_multiline(string $text, string $class = ''): void
{
    $lines = explode("\n", $text);
    foreach ($lines as $index => $line) {
        if ($index > 0) {
            echo '<br />';
        }
        echo '<span' . ($class ? ' class="' . esc_attr($class) . '"' : '') . '>' . esc_html($line) . '</span>';
    }
}

function aoc_icon(string $name, string $class = '', int $size = 24): string
{
    $attrs = 'class="' . esc_attr($class) . '" width="' . esc_attr((string) $size) . '" height="' . esc_attr((string) $size) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    $paths = [
        'menu' => '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>',
        'x' => '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
        'chevron-down' => '<path d="m6 9 6 6 6-6"></path>',
        'chevron-right' => '<path d="m9 18 6-6-6-6"></path>',
        'chevron-left' => '<path d="m15 18-6-6 6-6"></path>',
        'maximize-2' => '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" x2="14" y1="3" y2="10"></line><line x1="3" x2="10" y1="21" y2="14"></line>',
        'zoom-in' => '<circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line><line x1="11" x2="11" y1="8" y2="14"></line><line x1="8" x2="14" y1="11" y2="11"></line>',
        'zoom-out' => '<circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line><line x1="8" x2="14" y1="11" y2="11"></line>',
        'linkedin' => '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle>',
        'instagram' => '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>',
        'facebook' => '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
    ];

    return '<svg ' . $attrs . '>' . ($paths[$name] ?? '') . '</svg>';
}

function aoc_gallery_urls(string $relative_directory): array
{
    $base_path = aoc_asset_path($relative_directory);
    $files = glob($base_path . DIRECTORY_SEPARATOR . '*.{jpg,jpeg,png,webp}', GLOB_BRACE);
    if (!$files) {
        return [];
    }

    sort($files, SORT_NATURAL);
    $urls = [];

    foreach ($files as $file) {
        $basename = basename($file);
        if (preg_match('/^01\.jpe?g$/i', $basename)) {
            continue;
        }
        $urls[] = aoc_asset_url(trim($relative_directory, '/') . '/' . $basename);
    }

    return $urls;
}

