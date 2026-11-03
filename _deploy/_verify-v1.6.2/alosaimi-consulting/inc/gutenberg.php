<?php
/**
 * Native Gutenberg editing layer for the migrated website.
 *
 * The PHP templates remain as a fallback, but the default Home page is now
 * seeded from real core blocks and synced patterns so the layout can be edited
 * visually from Pages > Home > Edit without Elementor or paid plugins.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_block_clean_attrs(array $attrs): array
{
    return array_filter($attrs, static function ($value): bool {
        return null !== $value && '' !== $value && [] !== $value;
    });
}

function aoc_block_json(array $attrs): string
{
    $attrs = aoc_block_clean_attrs($attrs);

    if (!$attrs) {
        return '';
    }

    return ' ' . wp_json_encode($attrs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

function aoc_block_start(string $name, array $attrs = []): string
{
    return '<!-- wp:' . $name . aoc_block_json($attrs) . ' -->';
}

function aoc_block_end(string $name): string
{
    return '<!-- /wp:' . $name . ' -->';
}

function aoc_html_attrs(array $attrs): string
{
    $parts = [];

    foreach (aoc_block_clean_attrs($attrs) as $name => $value) {
        if (true === $value) {
            $parts[] = esc_attr($name);
            continue;
        }

        $parts[] = esc_attr($name) . '="' . esc_attr((string) $value) . '"';
    }

    return $parts ? ' ' . implode(' ', $parts) : '';
}

function aoc_block_tag(string $tag, string $class_name = '', array $attrs = []): string
{
    $attrs['class'] = trim(($attrs['class'] ?? '') . ' ' . $class_name);

    return '<' . tag_escape($tag) . aoc_html_attrs($attrs) . '>';
}

function aoc_block_group(string $inner, string $class_name = '', array $attrs = []): string
{
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $tag = $attrs['tagName'] ?? 'div';
    $html_class = trim('wp-block-group ' . ('full' === ($attrs['align'] ?? '') ? 'alignfull ' : '') . $attrs['className']);
    $html_attrs = [
        'id' => $attrs['anchor'] ?? '',
    ];

    return implode("\n", [
        aoc_block_start('group', $attrs),
        aoc_block_tag($tag, $html_class, $html_attrs),
        $inner,
        '</' . tag_escape($tag) . '>',
        aoc_block_end('group'),
    ]);
}

function aoc_block_columns(string $inner, string $class_name = '', array $attrs = []): string
{
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $html_class = trim('wp-block-columns ' . $attrs['className']);

    return implode("\n", [
        aoc_block_start('columns', $attrs),
        '<div class="' . esc_attr($html_class) . '">',
        $inner,
        '</div>',
        aoc_block_end('columns'),
    ]);
}

function aoc_block_column(string $inner, string $class_name = '', array $attrs = []): string
{
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $html_class = trim('wp-block-column ' . $attrs['className']);

    return implode("\n", [
        aoc_block_start('column', $attrs),
        '<div class="' . esc_attr($html_class) . '">',
        $inner,
        '</div>',
        aoc_block_end('column'),
    ]);
}

function aoc_block_heading(string $text, int $level = 2, string $class_name = '', array $attrs = []): string
{
    $level = max(1, min(6, $level));
    $attrs['level'] = $level;
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $html_class = trim('wp-block-heading ' . $attrs['className']);
    $content = nl2br(esc_html($text));

    return implode("\n", [
        aoc_block_start('heading', $attrs),
        '<h' . $level . ' class="' . esc_attr($html_class) . '">' . $content . '</h' . $level . '>',
        aoc_block_end('heading'),
    ]);
}

function aoc_block_paragraph(string $text, string $class_name = '', array $attrs = []): string
{
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $html_class = trim($attrs['className']);

    return implode("\n", [
        aoc_block_start('paragraph', $attrs),
        '<p' . ($html_class ? ' class="' . esc_attr($html_class) . '"' : '') . '>' . nl2br(esc_html($text)) . '</p>',
        aoc_block_end('paragraph'),
    ]);
}

function aoc_block_image(string $url, string $alt = '', string $class_name = '', array $attrs = []): string
{
    $attrs = array_merge([
        'url' => $url,
        'alt' => $alt,
        'sizeSlug' => 'full',
        'linkDestination' => 'none',
    ], $attrs);
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $figure_class = trim('wp-block-image size-full ' . $attrs['className']);

    return implode("\n", [
        aoc_block_start('image', $attrs),
        '<figure class="' . esc_attr($figure_class) . '"><img src="' . esc_url($url) . '" alt="' . esc_attr($alt) . '" /></figure>',
        aoc_block_end('image'),
    ]);
}

function aoc_block_button(string $label, string $url = '#', string $class_name = '', array $attrs = []): string
{
    $attrs = array_merge([
        'url' => $url,
        'className' => $class_name,
    ], $attrs);
    $button_class = trim('wp-block-button ' . ($attrs['className'] ?? ''));
    $link_class = trim('wp-block-button__link wp-element-button');

    return implode("\n", [
        aoc_block_start('button', $attrs),
        '<div class="' . esc_attr($button_class) . '"><a class="' . esc_attr($link_class) . '" href="' . esc_url($url) . '">' . esc_html($label) . '</a></div>',
        aoc_block_end('button'),
    ]);
}

function aoc_block_buttons(string $inner, string $class_name = '', array $attrs = []): string
{
    $attrs['className'] = trim(($attrs['className'] ?? '') . ' ' . $class_name);
    $html_class = trim('wp-block-buttons ' . $attrs['className']);

    return implode("\n", [
        aoc_block_start('buttons', $attrs),
        '<div class="' . esc_attr($html_class) . '">',
        $inner,
        '</div>',
        aoc_block_end('buttons'),
    ]);
}

function aoc_gutenberg_get_data(): array
{
    $data = function_exists('aoc_site_data') ? aoc_site_data() : aoc_default_site_data();
    $language = function_exists('aoc_current_language') ? aoc_current_language() : 'en';
    $t = function_exists('aoc_lang_data') ? aoc_lang_data($data, $language) : ($data['translations']['en'] ?? []);

    return [$data, $language, $t];
}

function aoc_gutenberg_nav_block(array $data, array $t): string
{
    $items = $data['nav_items'] ?? [];
    $nav = [aoc_block_start('navigation', [
        'overlayMenu' => 'mobile',
        'layout' => [
            'type' => 'flex',
            'justifyContent' => 'right',
            'orientation' => 'horizontal',
        ],
        'className' => 'aoc-nav',
    ])];

    foreach ($items as $item) {
        $id = sanitize_key($item['id'] ?? '');
        $href = $item['href'] ?? ('#' . $id);
        $label = $t['nav'][$id] ?? ucfirst($id);
        $nav[] = '<!-- wp:navigation-link ' . wp_json_encode([
            'label' => $label,
            'url' => $href,
            'kind' => 'custom',
            'isTopLevelLink' => true,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . ' /-->';
    }

    $nav[] = aoc_block_end('navigation');

    return implode("\n", $nav);
}

function aoc_gutenberg_social_links_block(array $social): string
{
    $services = [
        'linkedin' => 'LinkedIn',
        'instagram' => 'Instagram',
        'facebook' => 'Facebook',
    ];
    $links = [];

    foreach ($services as $key => $label) {
        if (empty($social[$key])) {
            continue;
        }

        $icon = function_exists('aoc_icon') ? aoc_icon($key, '', 22) : '';
        $links[] = '<a href="' . esc_url($social[$key]) . '" target="_blank" rel="noopener noreferrer" aria-label="' . esc_attr($label) . '">' . $icon . '</a>';
    }

    return implode("\n", [
        aoc_block_start('html'),
        '<div class="aoc-hero-social-links">' . implode('', $links) . '</div>',
        aoc_block_end('html'),
    ]);
}

function aoc_gutenberg_header_block(): string
{
    [$data, $language, $t] = aoc_gutenberg_get_data();
    $logo = aoc_media_url($data['media']['logo_white'] ?? '');
    $next_language = 'ar' === $language ? 'en' : 'ar';
    $inner = implode("\n", [
        aoc_block_image($logo, 'Al Osaimi Consulting', 'aoc-header-logo'),
        aoc_gutenberg_nav_block($data, $t),
        aoc_block_buttons(
            aoc_block_button(strtoupper($next_language), aoc_language_url($next_language), 'aoc-language-button', [
                'className' => 'aoc-language-button',
            ]),
            'aoc-language-switch'
        ),
    ]);

    return aoc_block_group($inner, 'aoc-block-header', [
        'align' => 'full',
        'tagName' => 'header',
    ]);
}

function aoc_gutenberg_footer_block(): string
{
    $bar_text = function_exists('aoc_global_get') ? aoc_global_get('bottom_bar_text', 'A FOUNDATION OF TRUST') : 'A FOUNDATION OF TRUST';
    $words = array_filter(explode(' ', $bar_text));
    $word_blocks = [];

    foreach ($words as $word) {
        $word_blocks[] = '<span>' . esc_html($word) . '</span>';
    }

    $inner = implode("\n", [
        aoc_block_start('html'),
        '<div class="aoc-bottom-bar-words">' . implode('', $word_blocks) . '</div>',
        aoc_block_end('html'),
    ]);

    return aoc_block_group($inner, 'aoc-bottom-bar', [
        'align' => 'full',
        'tagName' => 'footer',
    ]);
}

function aoc_gutenberg_intro_block(): string
{
    $html = '<div class="aoc-intro-overlay fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none" data-intro-overlay aria-hidden="true"><svg width="320" height="320" viewBox="0 0 320 320" fill="none"><circle cx="160" cy="160" r="150" stroke="#CAB64B" stroke-width="2"/></svg></div>';

    return implode("\n", [
        aoc_block_start('html'),
        $html,
        aoc_block_end('html'),
    ]);
}

function aoc_gutenberg_hero_block(): string
{
    [$data, , $t] = aoc_gutenberg_get_data();
    $video = aoc_media_url($data['media']['hero_video'] ?? '');
    $poster = aoc_media_url($data['media']['hero_poster'] ?? '');
    $befound = aoc_media_url($data['media']['befound'] ?? '');
    $words = $t['hero']['words'] ?? ['PRECISION', '&bull;', 'INNOVATION', '&bull;', 'TRUST'];
    $banner = implode(' ', array_map('wp_strip_all_tags', $words));
    $inner = implode("\n", [
        aoc_block_group(
            aoc_block_paragraph(str_repeat($banner . ' ', 6), 'aoc-hero-banner-text'),
            'aoc-hero-banner',
            ['tagName' => 'div']
        ),
        aoc_block_group(
            '<div class="aoc-hero-scroll-label"><span>SCROLL</span><span>v</span></div>',
            'aoc-hero-scroll',
            ['tagName' => 'div']
        ),
        aoc_block_group(
            aoc_gutenberg_social_links_block($data['social'] ?? []) .
            aoc_block_image($befound, 'BeFound Design Studio', 'aoc-hero-befound'),
            'aoc-hero-bottom-row',
            ['tagName' => 'div']
        ),
    ]);
    $attrs = [
        'url' => $video,
        'poster' => $poster,
        'dimRatio' => 30,
        'backgroundType' => 'video',
        'minHeight' => 100,
        'minHeightUnit' => 'vh',
        'align' => 'full',
        'anchor' => 'home',
        'className' => 'aoc-block-hero',
    ];

    return implode("\n", [
        aoc_block_start('cover', $attrs),
        '<div id="home" class="wp-block-cover alignfull aoc-block-hero" style="min-height:100vh">',
        '<span aria-hidden="true" class="wp-block-cover__background has-background-dim-30 has-background-dim"></span>',
        '<video class="wp-block-cover__video-background intrinsic-ignore" autoplay muted loop playsinline poster="' . esc_url($poster) . '" src="' . esc_url($video) . '"></video>',
        '<div class="wp-block-cover__inner-container">',
        $inner,
        '</div>',
        '</div>',
        aoc_block_end('cover'),
    ]);
}

function aoc_gutenberg_about_block(): string
{
    [$data, , $t] = aoc_gutenberg_get_data();
    $about = $t['about'] ?? [];
    $image = aoc_media_url($data['media']['about_image'] ?? '');
    $text_col = implode("\n", [
        aoc_block_heading($about['title'] ?? 'ABOUT US', 2, 'aoc-section-heading'),
        aoc_block_paragraph($about['paragraph1'] ?? '', 'aoc-lead'),
        aoc_block_paragraph($about['paragraph2'] ?? '', 'aoc-copy'),
    ]);
    $ceo_text = implode("\n", [
        aoc_block_heading($about['ceoSpeechTitle'] ?? "CEO'S SPEECH", 3, 'aoc-subheading'),
        aoc_block_heading($about['ceoName'] ?? '', 4, 'aoc-ceo-name'),
        aoc_block_paragraph($about['ceoTitle'] ?? '', 'aoc-kicker'),
    ]);

    foreach (($about['ceoSpeech'] ?? []) as $paragraph) {
        $ceo_text .= "\n" . aoc_block_paragraph($paragraph, 'aoc-copy');
    }

    $columns = aoc_block_columns(
        aoc_block_column($text_col, 'aoc-about-copy') .
        aoc_block_column(aoc_block_image($image, 'Al Osaimi Consulting', 'aoc-about-image'), 'aoc-about-media') .
        aoc_block_column($ceo_text, 'aoc-about-ceo'),
        'aoc-about-columns'
    );

    return aoc_block_group($columns, 'aoc-section aoc-about-section', [
        'align' => 'full',
        'tagName' => 'section',
        'anchor' => 'about',
    ]);
}

function aoc_gutenberg_service_card(array $service): string
{
    $content = $service['en'] ?? [];
    $image = aoc_media_url($service['image'] ?? '');
    $inner = implode("\n", [
        aoc_block_image($image, $content['title'] ?? 'Service', 'aoc-card-image'),
        aoc_block_heading($content['title'] ?? 'Service', 3, 'aoc-card-title'),
        aoc_block_paragraph($content['description'] ?? '', 'aoc-card-copy'),
        aoc_block_paragraph($content['place'] ?? '', 'aoc-card-meta'),
    ]);

    return aoc_block_group($inner, 'aoc-service-card', ['tagName' => 'article']);
}

function aoc_gutenberg_services_block(): string
{
    [$data, , $t] = aoc_gutenberg_get_data();
    $services = array_slice($data['services'] ?? [], 0, 8);
    $cards = [];

    foreach ($services as $service) {
        $cards[] = aoc_gutenberg_service_card($service);
    }

    $inner = implode("\n", [
        aoc_block_heading($t['services']['title'] ?? 'OUR SERVICES', 2, 'aoc-section-heading'),
        aoc_block_paragraph($t['services']['intro'] ?? '', 'aoc-lead'),
        aoc_block_group(implode("\n", $cards), 'aoc-card-grid aoc-service-grid aoc-service-carousel', ['tagName' => 'div']),
        aoc_block_buttons(aoc_block_button($t['services']['readMore'] ?? 'Read More', '#contact', 'aoc-outline-button'), 'aoc-section-actions'),
    ]);

    return aoc_block_group($inner, 'aoc-section aoc-services-section', [
        'align' => 'full',
        'tagName' => 'section',
        'anchor' => 'services',
    ]);
}

function aoc_gutenberg_clients_block(): string
{
    [$data] = aoc_gutenberg_get_data();
    $logos = [];

    foreach (array_slice($data['clients'] ?? [], 0, 14) as $client) {
        $logos[] = aoc_block_image(aoc_media_url($client['image'] ?? ''), $client['alt'] ?? 'Client', 'aoc-logo-card');
    }

    $inner = implode("\n", [
        aoc_block_heading('TRUSTED BY', 2, 'aoc-small-section-heading'),
        aoc_block_group(implode("\n", $logos), 'aoc-logo-marquee', ['tagName' => 'div']),
    ]);

    return aoc_block_group($inner, 'aoc-section aoc-clients-section', [
        'align' => 'full',
        'tagName' => 'section',
        'anchor' => 'clients',
    ]);
}

function aoc_gutenberg_project_card(array $project): string
{
    $content = $project['en'] ?? [];
    $image = aoc_media_url($project['image'] ?? '');
    $inner = implode("\n", [
        aoc_block_image($image, $content['title'] ?? 'Project', 'aoc-card-image'),
        aoc_block_paragraph(($project['category'] ?? 'PROJECT') . ' / ' . ($content['year'] ?? ''), 'aoc-card-meta'),
        aoc_block_heading($content['title'] ?? 'Project', 3, 'aoc-card-title'),
        aoc_block_paragraph($content['location'] ?? '', 'aoc-card-meta'),
        aoc_block_paragraph($content['description'] ?? '', 'aoc-card-copy'),
    ]);

    return aoc_block_group($inner, 'aoc-project-card', ['tagName' => 'article']);
}

function aoc_gutenberg_projects_block(): string
{
    [$data, , $t] = aoc_gutenberg_get_data();
    $cards = [];

    foreach (array_slice($data['projects'] ?? [], 0, 6) as $project) {
        $cards[] = aoc_gutenberg_project_card($project);
    }

    $inner = implode("\n", [
        aoc_block_heading($t['projectsGallery']['sectionTitle'] ?? 'OUR PROJECTS', 2, 'aoc-section-heading'),
        aoc_block_group(implode("\n", $cards), 'aoc-card-grid aoc-project-grid', ['tagName' => 'div']),
        aoc_block_buttons(aoc_block_button($t['projectsGallery']['learnMore'] ?? 'Learn More', '#contact', 'aoc-outline-button'), 'aoc-section-actions'),
    ]);

    return aoc_block_group($inner, 'aoc-section aoc-projects-section', [
        'align' => 'full',
        'tagName' => 'section',
        'anchor' => 'projects',
    ]);
}

function aoc_gutenberg_certificates_block(): string
{
    [$data, , $t] = aoc_gutenberg_get_data();
    $logos = [];

    foreach ($data['certificates'] ?? [] as $certificate) {
        $logos[] = aoc_block_image(aoc_media_url($certificate['image'] ?? ''), $certificate['name'] ?? 'Certificate', 'aoc-logo-card');
    }

    $inner = implode("\n", [
        aoc_block_heading($t['services']['accreditations'] ?? 'Accreditations & Classifications', 2, 'aoc-small-section-heading'),
        aoc_block_group(implode("\n", $logos), 'aoc-logo-grid', ['tagName' => 'div']),
    ]);

    return aoc_block_group($inner, 'aoc-section aoc-certificates-section', [
        'align' => 'full',
        'tagName' => 'section',
        'anchor' => 'certificates',
    ]);
}

function aoc_gutenberg_contact_form_html(array $t, string $language): string
{
    $contact = $t['contact'] ?? [];
    $fields = [
        'firstName' => $contact['firstName'] ?? 'FIRST NAME',
        'lastName' => $contact['lastName'] ?? 'LAST NAME',
        'email' => $contact['email'] ?? 'EMAIL',
    ];
    $html = '<form class="aoc-contact-form" data-contact-form>';
    $html .= '<input type="text" name="company" tabindex="-1" autocomplete="off" class="aoc-honeypot" aria-hidden="true" />';
    $html .= '<input type="hidden" name="language" value="' . esc_attr($language) . '" />';

    foreach ($fields as $name => $label) {
        $type = 'email' === $name ? 'email' : 'text';
        $html .= '<label><span>' . esc_html($label) . '</span><input type="' . esc_attr($type) . '" name="' . esc_attr($name) . '" required /></label>';
    }

    $html .= '<label class="aoc-contact-message-field"><span>' . esc_html($contact['message'] ?? 'MESSAGE') . '</span><textarea name="message" rows="6" required></textarea></label>';
    $html .= '<button type="submit">' . esc_html($contact['send'] ?? 'SEND MESSAGE') . '</button>';
    $html .= '<p class="hidden" data-contact-message></p>';
    $html .= '</form>';

    return implode("\n", [
        aoc_block_start('html'),
        $html,
        aoc_block_end('html'),
    ]);
}

function aoc_gutenberg_contact_block(): string
{
    [, $language, $t] = aoc_gutenberg_get_data();
    $inner = implode("\n", [
        aoc_block_heading($t['contact']['title'] ?? 'CONTACT US', 2, 'aoc-section-heading'),
        aoc_gutenberg_contact_form_html($t, $language),
    ]);

    return aoc_block_group($inner, 'aoc-section aoc-contact-section', [
        'align' => 'full',
        'tagName' => 'section',
        'anchor' => 'contact',
    ]);
}

function aoc_gutenberg_ensure_synced_pattern(string $slug, string $title, string $content): int
{
    if (!post_type_exists('wp_block')) {
        return 0;
    }

    $existing = get_page_by_path($slug, OBJECT, 'wp_block');

    if ($existing instanceof WP_Post) {
        if ('' === trim((string) $existing->post_content)) {
            wp_update_post([
                'ID' => (int) $existing->ID,
                'post_content' => $content,
            ]);
        }

        return (int) $existing->ID;
    }

    $post_id = wp_insert_post([
        'post_type' => 'wp_block',
        'post_status' => 'publish',
        'post_name' => $slug,
        'post_title' => $title,
        'post_content' => $content,
    ], true);

    return is_wp_error($post_id) ? 0 : (int) $post_id;
}

function aoc_gutenberg_synced_pattern_block(string $slug, string $title, string $content): string
{
    $pattern_id = aoc_gutenberg_ensure_synced_pattern($slug, $title, $content);

    if (!$pattern_id) {
        return $content;
    }

    return '<!-- wp:block {"ref":' . absint($pattern_id) . '} /-->';
}

function aoc_gutenberg_render_synced_pattern(string $slug, string $title, string $content): void
{
    echo do_blocks(aoc_gutenberg_synced_pattern_block($slug, $title, $content)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function aoc_gutenberg_homepage_content(): string
{
    return implode("\n\n", [
        aoc_gutenberg_synced_pattern_block('aoc-site-header', 'AOC Header', aoc_gutenberg_header_block()),
        aoc_gutenberg_intro_block(),
        aoc_gutenberg_hero_block(),
        aoc_gutenberg_about_block(),
        aoc_gutenberg_services_block(),
        aoc_gutenberg_clients_block(),
        aoc_gutenberg_projects_block(),
        aoc_gutenberg_contact_block(),
        aoc_gutenberg_synced_pattern_block('aoc-site-footer', 'AOC Footer', aoc_gutenberg_footer_block()),
    ]);
}

function aoc_gutenberg_register_pattern_category(): void
{
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category('aoc-sections', [
            'label' => __('Al Osaimi Sections', 'alosaimi-consulting'),
        ]);
    }
}
add_action('init', 'aoc_gutenberg_register_pattern_category');
