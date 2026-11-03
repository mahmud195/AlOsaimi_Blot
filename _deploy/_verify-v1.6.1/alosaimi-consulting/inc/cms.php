<?php
/**
 * WordPress-editable content model for the front-page sections.
 */

if (!defined('ABSPATH')) {
    exit;
}

const AOC_CMS_SEED_VERSION = '2026-05-21-1';

function aoc_cms_content_menu(): void
{
    add_menu_page(
        __('Al Osaimi Content', 'alosaimi-consulting'),
        __('Al Osaimi Content', 'alosaimi-consulting'),
        'edit_posts',
        'aoc-content',
        'aoc_cms_render_dashboard',
        'dashicons-edit-page',
        21
    );
}
add_action('admin_menu', 'aoc_cms_content_menu');

function aoc_cms_render_dashboard(): void
{
    if (!current_user_can('edit_posts')) {
        return;
    }

    $links = [
        ['label' => __('Services', 'alosaimi-consulting'), 'url' => admin_url('edit.php?post_type=aoc_service')],
        ['label' => __('Projects', 'alosaimi-consulting'), 'url' => admin_url('edit.php?post_type=aoc_project')],
        ['label' => __('Clients', 'alosaimi-consulting'), 'url' => admin_url('edit.php?post_type=aoc_client')],
        ['label' => __('Certificates', 'alosaimi-consulting'), 'url' => admin_url('edit.php?post_type=aoc_certificate')],
        ['label' => __('Global Settings', 'alosaimi-consulting'), 'url' => admin_url('admin.php?page=aoc-global-fields')],
    ];
    $home_id = function_exists('aoc_ensure_homepage') ? aoc_ensure_homepage() : 0;
    $home_edit_url = $home_id ? admin_url('post.php?post=' . $home_id . '&action=edit') : '';
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Al Osaimi Content', 'alosaimi-consulting'); ?></h1>
        <p><?php esc_html_e('Edit homepage sections here. Add, update, reorder, publish, draft, or delete items without touching code.', 'alosaimi-consulting'); ?></p>
        <?php if ($home_edit_url) : ?>
            <p><a class="button button-secondary" href="<?php echo esc_url($home_edit_url); ?>"><?php esc_html_e('Edit Home Page', 'alosaimi-consulting'); ?></a></p>
        <?php endif; ?>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:960px;">
            <?php foreach ($links as $link) : ?>
                <a class="button button-primary button-hero" href="<?php echo esc_url($link['url']); ?>"><?php echo esc_html($link['label']); ?></a>
            <?php endforeach; ?>
        </div>
        <p style="max-width:760px;margin-top:18px;"><?php esc_html_e('Tip: use the Main image field on each item to replace the built-in image. Use the Order field to control display order.', 'alosaimi-consulting'); ?></p>
        <h2><?php esc_html_e('Free WordPress section shortcodes', 'alosaimi-consulting'); ?></h2>
        <p><?php esc_html_e('Use the normal WordPress editor. Each shortcode block can be moved, deleted, copied, or added without code:', 'alosaimi-consulting'); ?></p>
        <pre style="max-width:760px;background:#fff;border:1px solid #ccd0d4;padding:12px;white-space:pre-wrap;">[aoc_section name="hero"]
[aoc_section name="about"]
[aoc_section name="services"]
[aoc_section name="clients"]
[aoc_section name="projects"]
[aoc_section name="contact"]</pre>
        <p><?php esc_html_e('Or render the full migrated homepage with:', 'alosaimi-consulting'); ?> <code>[aoc_homepage]</code></p>
    </div>
    <?php
}

function aoc_cms_register_post_types(): void
{
    register_post_type('aoc_service', [
        'labels' => [
            'name' => __('Services', 'alosaimi-consulting'),
            'singular_name' => __('Service', 'alosaimi-consulting'),
            'add_new_item' => __('Add Service', 'alosaimi-consulting'),
            'edit_item' => __('Edit Service', 'alosaimi-consulting'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => 'aoc-content',
        'show_in_rest' => false,
        'menu_icon' => 'dashicons-hammer',
        'supports' => ['title', 'thumbnail', 'page-attributes'],
        'capability_type' => 'post',
    ]);

    register_taxonomy('aoc_project_category', ['aoc_project'], [
        'labels' => [
            'name' => __('Project Categories', 'alosaimi-consulting'),
            'singular_name' => __('Project Category', 'alosaimi-consulting'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_admin_column' => true,
        'hierarchical' => true,
        'show_in_rest' => false,
    ]);

    register_post_type('aoc_project', [
        'labels' => [
            'name' => __('Projects', 'alosaimi-consulting'),
            'singular_name' => __('Project', 'alosaimi-consulting'),
            'add_new_item' => __('Add Project', 'alosaimi-consulting'),
            'edit_item' => __('Edit Project', 'alosaimi-consulting'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => 'aoc-content',
        'show_in_rest' => false,
        'menu_icon' => 'dashicons-building',
        'supports' => ['title', 'thumbnail', 'page-attributes'],
        'capability_type' => 'post',
    ]);

    register_post_type('aoc_client', [
        'labels' => [
            'name' => __('Clients', 'alosaimi-consulting'),
            'singular_name' => __('Client', 'alosaimi-consulting'),
            'add_new_item' => __('Add Client', 'alosaimi-consulting'),
            'edit_item' => __('Edit Client', 'alosaimi-consulting'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => 'aoc-content',
        'show_in_rest' => false,
        'menu_icon' => 'dashicons-groups',
        'supports' => ['title', 'thumbnail', 'page-attributes'],
        'capability_type' => 'post',
    ]);

    register_post_type('aoc_certificate', [
        'labels' => [
            'name' => __('Certificates', 'alosaimi-consulting'),
            'singular_name' => __('Certificate', 'alosaimi-consulting'),
            'add_new_item' => __('Add Certificate', 'alosaimi-consulting'),
            'edit_item' => __('Edit Certificate', 'alosaimi-consulting'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => 'aoc-content',
        'show_in_rest' => false,
        'menu_icon' => 'dashicons-awards',
        'supports' => ['title', 'thumbnail', 'page-attributes'],
        'capability_type' => 'post',
    ]);
}
add_action('init', 'aoc_cms_register_post_types');

function aoc_cms_enqueue_admin_assets(string $hook): void
{
    if (!function_exists('get_current_screen')) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || !in_array($screen->post_type, ['aoc_service', 'aoc_project', 'aoc_client', 'aoc_certificate'], true)) {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_script(
        'aoc-admin-cms',
        get_template_directory_uri() . '/assets/js/admin-cms.js',
        ['jquery'],
        file_exists(get_template_directory() . '/assets/js/admin-cms.js') ? filemtime(get_template_directory() . '/assets/js/admin-cms.js') : wp_get_theme()->get('Version'),
        true
    );
}
add_action('admin_enqueue_scripts', 'aoc_cms_enqueue_admin_assets');

function aoc_cms_add_meta_boxes(): void
{
    add_meta_box('aoc_service_fields', __('Service Fields', 'alosaimi-consulting'), 'aoc_cms_render_service_fields', 'aoc_service', 'normal', 'high');
    add_meta_box('aoc_project_fields', __('Project Fields', 'alosaimi-consulting'), 'aoc_cms_render_project_fields', 'aoc_project', 'normal', 'high');
    add_meta_box('aoc_logo_fields', __('Logo Fields', 'alosaimi-consulting'), 'aoc_cms_render_logo_fields', 'aoc_client', 'normal', 'high');
    add_meta_box('aoc_logo_fields', __('Certificate Fields', 'alosaimi-consulting'), 'aoc_cms_render_logo_fields', 'aoc_certificate', 'normal', 'high');
}
add_action('add_meta_boxes', 'aoc_cms_add_meta_boxes');

function aoc_cms_category_add_fields(): void
{
    ?>
    <div class="form-field">
        <label for="aoc_category_key"><?php esc_html_e('Display key', 'alosaimi-consulting'); ?></label>
        <input name="aoc_category_key" id="aoc_category_key" type="text" value="" placeholder="RESIDENTIAL" />
        <p><?php esc_html_e('Used by the front-end filter. Use uppercase letters and underscores, for example GAS_STATIONS.', 'alosaimi-consulting'); ?></p>
    </div>
    <div class="form-field">
        <label for="aoc_label_ar"><?php esc_html_e('Arabic label', 'alosaimi-consulting'); ?></label>
        <input name="aoc_label_ar" id="aoc_label_ar" type="text" value="" />
    </div>
    <?php
}
add_action('aoc_project_category_add_form_fields', 'aoc_cms_category_add_fields');

function aoc_cms_category_edit_fields(WP_Term $term): void
{
    $key = get_term_meta($term->term_id, '_aoc_category_key', true);
    $label_ar = get_term_meta($term->term_id, '_aoc_label_ar', true);
    ?>
    <tr class="form-field">
        <th scope="row"><label for="aoc_category_key"><?php esc_html_e('Display key', 'alosaimi-consulting'); ?></label></th>
        <td>
            <input name="aoc_category_key" id="aoc_category_key" type="text" value="<?php echo esc_attr(is_string($key) ? $key : ''); ?>" />
            <p class="description"><?php esc_html_e('Used by the front-end filter. Use uppercase letters and underscores, for example GAS_STATIONS.', 'alosaimi-consulting'); ?></p>
        </td>
    </tr>
    <tr class="form-field">
        <th scope="row"><label for="aoc_label_ar"><?php esc_html_e('Arabic label', 'alosaimi-consulting'); ?></label></th>
        <td><input name="aoc_label_ar" id="aoc_label_ar" type="text" value="<?php echo esc_attr(is_string($label_ar) ? $label_ar : ''); ?>" /></td>
    </tr>
    <?php
}
add_action('aoc_project_category_edit_form_fields', 'aoc_cms_category_edit_fields');

function aoc_cms_save_category_fields(int $term_id): void
{
    if (isset($_POST['aoc_category_key'])) {
        $key = strtoupper((string) wp_unslash($_POST['aoc_category_key']));
        $key = preg_replace('/[^A-Z0-9_]/', '_', $key);
        if ($key) {
            update_term_meta($term_id, '_aoc_category_key', $key);
        }
    }

    if (isset($_POST['aoc_label_ar'])) {
        update_term_meta($term_id, '_aoc_label_ar', sanitize_text_field(wp_unslash($_POST['aoc_label_ar'])));
    }

    $term = get_term($term_id, 'aoc_project_category');
    if ($term && !is_wp_error($term)) {
        update_term_meta($term_id, '_aoc_label_en', $term->name);
    }
}
add_action('created_aoc_project_category', 'aoc_cms_save_category_fields');
add_action('edited_aoc_project_category', 'aoc_cms_save_category_fields');

function aoc_cms_meta(int $post_id, string $key, string $default = ''): string
{
    $value = get_post_meta($post_id, $key, true);
    return is_string($value) && '' !== $value ? $value : $default;
}

function aoc_cms_field(string $name, string $label, string $value, string $type = 'text', array $args = []): void
{
    $id = 'aoc_' . sanitize_key($name);
    $readonly = !empty($args['readonly']) ? ' readonly' : '';
    $placeholder = isset($args['placeholder']) ? ' placeholder="' . esc_attr($args['placeholder']) . '"' : '';
    $description = isset($args['description']) ? (string) $args['description'] : '';
    ?>
    <p>
        <label for="<?php echo esc_attr($id); ?>"><strong><?php echo esc_html($label); ?></strong></label><br />
        <?php if ('textarea' === $type) : ?>
            <textarea id="<?php echo esc_attr($id); ?>" name="aoc_cms[<?php echo esc_attr($name); ?>]" rows="<?php echo esc_attr((string) ($args['rows'] ?? 4)); ?>" class="large-text"<?php echo $readonly; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>><?php echo esc_textarea($value); ?></textarea>
        <?php else : ?>
            <input id="<?php echo esc_attr($id); ?>" name="aoc_cms[<?php echo esc_attr($name); ?>]" type="<?php echo esc_attr($type); ?>" value="<?php echo esc_attr($value); ?>" class="regular-text"<?php echo $placeholder . $readonly; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> />
        <?php endif; ?>
        <?php if ($description) : ?><span class="description"><?php echo esc_html($description); ?></span><?php endif; ?>
    </p>
    <?php
}

function aoc_cms_featured_image_note(): void
{
    echo '<p class="description">' . esc_html__('Use the Main image field below to upload or replace the image shown on the website.', 'alosaimi-consulting') . '</p>';
}

function aoc_cms_image_picker(int $post_id, string $field, string $label, string $description = ''): void
{
    $attachment_id = absint(get_post_meta($post_id, $field, true));
    $image_url = $attachment_id ? wp_get_attachment_image_url($attachment_id, 'medium') : '';
    $input_id = 'aoc_' . sanitize_key($field);
    ?>
    <div class="aoc-image-picker" style="margin:16px 0;">
        <label for="<?php echo esc_attr($input_id); ?>"><strong><?php echo esc_html($label); ?></strong></label><br />
        <input id="<?php echo esc_attr($input_id); ?>" name="aoc_cms[<?php echo esc_attr($field); ?>]" type="hidden" value="<?php echo esc_attr((string) $attachment_id); ?>" data-aoc-image-id />
        <div data-aoc-image-preview style="margin:10px 0;">
            <?php if ($image_url) : ?>
                <img src="<?php echo esc_url($image_url); ?>" alt="" style="max-width:220px;height:auto;border:1px solid #ccd0d4;background:#fff;padding:4px;" />
            <?php endif; ?>
        </div>
        <button type="button" class="button" data-aoc-image-select data-target="<?php echo esc_attr($input_id); ?>"><?php esc_html_e('Choose image', 'alosaimi-consulting'); ?></button>
        <button type="button" class="button" data-aoc-image-clear data-target="<?php echo esc_attr($input_id); ?>"><?php esc_html_e('Clear', 'alosaimi-consulting'); ?></button>
        <?php if ($description) : ?><p class="description"><?php echo esc_html($description); ?></p><?php endif; ?>
    </div>
    <?php
}

function aoc_cms_render_service_fields(WP_Post $post): void
{
    wp_nonce_field('aoc_cms_save', 'aoc_cms_nonce');
    aoc_cms_featured_image_note();
    aoc_cms_image_picker($post->ID, '_aoc_image_id', __('Main service image', 'alosaimi-consulting'), __('This overrides the built-in migrated image.', 'alosaimi-consulting'));
    aoc_cms_field('_aoc_key', __('Stable key', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_key', $post->post_name ?: 'service-' . $post->ID), 'text', [
        'description' => __('Keep designServices and architectOfRecord unchanged for the special partner/accreditation blocks.', 'alosaimi-consulting'),
    ]);
    aoc_cms_field('_aoc_title_ar', __('Arabic title', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_title_ar'));
    aoc_cms_field('_aoc_description_en', __('English short description', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_description_en'), 'textarea', ['rows' => 3]);
    aoc_cms_field('_aoc_description_ar', __('Arabic short description', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_description_ar'), 'textarea', ['rows' => 3]);
    aoc_cms_field('_aoc_full_description_en', __('English full description', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_full_description_en'), 'textarea', ['rows' => 6]);
    aoc_cms_field('_aoc_full_description_ar', __('Arabic full description', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_full_description_ar'), 'textarea', ['rows' => 6]);
    aoc_cms_field('_aoc_place_en', __('English location', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_place_en'));
    aoc_cms_field('_aoc_place_ar', __('Arabic location', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_place_ar'));
    aoc_cms_field('_aoc_source_image', __('Built-in fallback image path', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_source_image'), 'text', ['readonly' => true]);
}

function aoc_cms_render_project_fields(WP_Post $post): void
{
    wp_nonce_field('aoc_cms_save', 'aoc_cms_nonce');
    aoc_cms_featured_image_note();
    aoc_cms_image_picker($post->ID, '_aoc_image_id', __('Main project image', 'alosaimi-consulting'), __('This image appears first in the project card/gallery.', 'alosaimi-consulting'));
    aoc_cms_field('_aoc_title_ar', __('Arabic title', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_title_ar'));
    aoc_cms_field('_aoc_year', __('Year', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_year', date('Y')));
    aoc_cms_field('_aoc_location_en', __('English location', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_location_en'));
    aoc_cms_field('_aoc_location_ar', __('Arabic location', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_location_ar'));
    aoc_cms_field('_aoc_description_en', __('English description', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_description_en'), 'textarea', ['rows' => 5]);
    aoc_cms_field('_aoc_description_ar', __('Arabic description', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_description_ar'), 'textarea', ['rows' => 5]);
    ?>
    <p>
        <label for="aoc_gallery_ids"><strong><?php esc_html_e('Gallery images', 'alosaimi-consulting'); ?></strong></label><br />
        <input id="aoc_gallery_ids" name="aoc_cms[_aoc_gallery_ids]" type="text" value="<?php echo esc_attr(aoc_cms_meta($post->ID, '_aoc_gallery_ids')); ?>" class="regular-text" data-aoc-gallery-ids />
        <button type="button" class="button" data-aoc-gallery-select data-target="aoc_gallery_ids"><?php esc_html_e('Choose gallery images', 'alosaimi-consulting'); ?></button>
        <button type="button" class="button" data-aoc-gallery-clear data-target="aoc_gallery_ids"><?php esc_html_e('Clear', 'alosaimi-consulting'); ?></button>
        <span class="description"><?php esc_html_e('Stored as Media Library attachment IDs. Leave empty to use the built-in gallery for migrated projects.', 'alosaimi-consulting'); ?></span>
    </p>
    <?php
    aoc_cms_field('_aoc_source_image', __('Built-in fallback image path', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_source_image'), 'text', ['readonly' => true]);
    aoc_cms_field('_aoc_source_folder', __('Built-in fallback gallery folder', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_source_folder'), 'text', ['readonly' => true]);
}

function aoc_cms_render_logo_fields(WP_Post $post): void
{
    wp_nonce_field('aoc_cms_save', 'aoc_cms_nonce');
    aoc_cms_featured_image_note();
    aoc_cms_image_picker($post->ID, '_aoc_image_id', __('Main logo image', 'alosaimi-consulting'), __('This overrides the built-in migrated logo.', 'alosaimi-consulting'));
    aoc_cms_field('_aoc_url', __('Website URL', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_url'), 'url', ['placeholder' => 'https://example.com']);
    aoc_cms_field('_aoc_alt', __('Image alt text', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_alt', get_the_title($post)));
    aoc_cms_field('_aoc_source_image', __('Built-in fallback image path', 'alosaimi-consulting'), aoc_cms_meta($post->ID, '_aoc_source_image'), 'text', ['readonly' => true]);
}

function aoc_cms_save_post(int $post_id): void
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (wp_is_post_revision($post_id) || empty($_POST['aoc_cms_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['aoc_cms_nonce'])), 'aoc_cms_save')) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $post_type = get_post_type($post_id);
    $raw = isset($_POST['aoc_cms']) && is_array($_POST['aoc_cms']) ? wp_unslash($_POST['aoc_cms']) : [];
    $raw = is_array($raw) ? $raw : [];

    $fields_by_type = [
        'aoc_service' => [
            '_aoc_image_id' => 'id',
            '_aoc_key' => 'key',
            '_aoc_title_ar' => 'text',
            '_aoc_description_en' => 'textarea',
            '_aoc_description_ar' => 'textarea',
            '_aoc_full_description_en' => 'textarea',
            '_aoc_full_description_ar' => 'textarea',
            '_aoc_place_en' => 'text',
            '_aoc_place_ar' => 'text',
            '_aoc_source_image' => 'text',
        ],
        'aoc_project' => [
            '_aoc_image_id' => 'id',
            '_aoc_title_ar' => 'text',
            '_aoc_year' => 'text',
            '_aoc_location_en' => 'text',
            '_aoc_location_ar' => 'text',
            '_aoc_description_en' => 'textarea',
            '_aoc_description_ar' => 'textarea',
            '_aoc_gallery_ids' => 'ids',
            '_aoc_source_image' => 'text',
            '_aoc_source_folder' => 'text',
        ],
        'aoc_client' => [
            '_aoc_image_id' => 'id',
            '_aoc_url' => 'url',
            '_aoc_alt' => 'text',
            '_aoc_source_image' => 'text',
        ],
        'aoc_certificate' => [
            '_aoc_image_id' => 'id',
            '_aoc_url' => 'url',
            '_aoc_alt' => 'text',
            '_aoc_source_image' => 'text',
        ],
    ];

    if (empty($fields_by_type[$post_type])) {
        return;
    }

    foreach ($fields_by_type[$post_type] as $key => $kind) {
        if (!array_key_exists($key, $raw)) {
            continue;
        }

        $value = is_scalar($raw[$key]) ? (string) $raw[$key] : '';
        if ('textarea' === $kind) {
            $value = sanitize_textarea_field($value);
        } elseif ('url' === $kind) {
            $value = esc_url_raw($value);
        } elseif ('ids' === $kind) {
            $ids = array_filter(array_map('absint', preg_split('/[\s,]+/', $value)));
            $value = implode(',', $ids);
        } elseif ('id' === $kind) {
            $attachment_id = absint($value);
            $value = $attachment_id ? (string) $attachment_id : '';
        } elseif ('key' === $kind) {
            $value = preg_replace('/[^A-Za-z0-9_-]/', '', $value);
            $value = '' !== $value ? $value : sanitize_title(get_the_title($post_id));
        } else {
            $value = sanitize_text_field($value);
        }

        if ('' === $value) {
            delete_post_meta($post_id, $key);
        } else {
            update_post_meta($post_id, $key, $value);
        }
    }
}
add_action('save_post', 'aoc_cms_save_post');

function aoc_cms_find_seeded_post(string $post_type, string $seed_key): int
{
    $posts = get_posts([
        'post_type' => $post_type,
        'post_status' => ['publish', 'draft', 'private'],
        'posts_per_page' => 1,
        'fields' => 'ids',
        'meta_key' => '_aoc_seed_key',
        'meta_value' => $seed_key,
    ]);

    return $posts ? (int) $posts[0] : 0;
}

function aoc_cms_seed_project_terms(array $data): void
{
    $labels = [];
    foreach ($data['translations']['en']['projectsGallery']['categories'] as $category) {
        $labels[$category['key']]['en'] = $category['label'];
    }
    foreach ($data['translations']['ar']['projectsGallery']['categories'] as $category) {
        $labels[$category['key']]['ar'] = $category['label'];
    }

    foreach ($labels as $key => $localized) {
        $slug = aoc_cms_category_slug($key);
        $term = term_exists($slug, 'aoc_project_category');
        if (!$term) {
            $term = wp_insert_term($localized['en'] ?? $key, 'aoc_project_category', ['slug' => $slug]);
        }
        if (!is_wp_error($term) && !empty($term['term_id'])) {
            update_term_meta((int) $term['term_id'], '_aoc_category_key', $key);
            update_term_meta((int) $term['term_id'], '_aoc_label_en', $localized['en'] ?? $key);
            update_term_meta((int) $term['term_id'], '_aoc_label_ar', $localized['ar'] ?? ($localized['en'] ?? $key));
        }
    }
}

function aoc_cms_project_term_id(string $key): int
{
    $term = get_term_by('slug', aoc_cms_category_slug($key), 'aoc_project_category');
    return $term && !is_wp_error($term) ? (int) $term->term_id : 0;
}

function aoc_cms_seed_default_content(): void
{
    if (!current_user_can('manage_options') || AOC_CMS_SEED_VERSION === get_option('aoc_cms_seed_version')) {
        return;
    }

    $data = aoc_default_site_data();
    aoc_cms_seed_project_terms($data);

    foreach ($data['services'] as $index => $service) {
        $seed_key = 'service:' . $service['id'];
        $post_id = aoc_cms_find_seeded_post('aoc_service', $seed_key);
        if (!$post_id) {
            $post_id = wp_insert_post([
                'post_type' => 'aoc_service',
                'post_status' => 'publish',
                'post_title' => $service['en']['title'],
                'menu_order' => $index,
            ]);
        }
        if (!is_wp_error($post_id) && $post_id) {
            update_post_meta($post_id, '_aoc_seed_key', $seed_key);
            update_post_meta($post_id, '_aoc_key', $service['id']);
            update_post_meta($post_id, '_aoc_source_image', $service['image']);
            update_post_meta($post_id, '_aoc_title_ar', $service['ar']['title'] ?? '');
            update_post_meta($post_id, '_aoc_description_en', $service['en']['description'] ?? '');
            update_post_meta($post_id, '_aoc_description_ar', $service['ar']['description'] ?? '');
            update_post_meta($post_id, '_aoc_full_description_en', $service['en']['fullDescription'] ?? '');
            update_post_meta($post_id, '_aoc_full_description_ar', $service['ar']['fullDescription'] ?? '');
            update_post_meta($post_id, '_aoc_place_en', $service['en']['place'] ?? '');
            update_post_meta($post_id, '_aoc_place_ar', $service['ar']['place'] ?? '');
        }
    }

    foreach ($data['projects'] as $index => $project) {
        $seed_key = 'project:' . $index . ':' . ($project['en']['title'] ?? '');
        $post_id = aoc_cms_find_seeded_post('aoc_project', $seed_key);
        if (!$post_id) {
            $post_id = wp_insert_post([
                'post_type' => 'aoc_project',
                'post_status' => 'publish',
                'post_title' => $project['en']['title'],
                'menu_order' => $index,
            ]);
        }
        if (!is_wp_error($post_id) && $post_id) {
            update_post_meta($post_id, '_aoc_seed_key', $seed_key);
            update_post_meta($post_id, '_aoc_source_image', $project['image']);
            update_post_meta($post_id, '_aoc_source_folder', $project['folder']);
            update_post_meta($post_id, '_aoc_title_ar', $project['ar']['title'] ?? '');
            update_post_meta($post_id, '_aoc_year', $project['en']['year'] ?? '');
            update_post_meta($post_id, '_aoc_location_en', $project['en']['location'] ?? '');
            update_post_meta($post_id, '_aoc_location_ar', $project['ar']['location'] ?? '');
            update_post_meta($post_id, '_aoc_description_en', $project['en']['description'] ?? '');
            update_post_meta($post_id, '_aoc_description_ar', $project['ar']['description'] ?? '');
            $term_id = aoc_cms_project_term_id($project['category']);
            if ($term_id) {
                wp_set_object_terms($post_id, [$term_id], 'aoc_project_category', false);
            }
        }
    }

    foreach ($data['clients'] as $index => $client) {
        $seed_key = 'client:' . ($client['alt'] ?? $index);
        $post_id = aoc_cms_find_seeded_post('aoc_client', $seed_key);
        if (!$post_id) {
            $post_id = wp_insert_post([
                'post_type' => 'aoc_client',
                'post_status' => 'publish',
                'post_title' => $client['alt'],
                'menu_order' => $index,
            ]);
        }
        if (!is_wp_error($post_id) && $post_id) {
            update_post_meta($post_id, '_aoc_seed_key', $seed_key);
            update_post_meta($post_id, '_aoc_source_image', $client['image']);
            update_post_meta($post_id, '_aoc_url', $client['url'] ?? '');
            update_post_meta($post_id, '_aoc_alt', $client['alt'] ?? '');
        }
    }

    foreach ($data['certificates'] as $index => $cert) {
        $seed_key = 'certificate:' . ($cert['name'] ?? $index);
        $post_id = aoc_cms_find_seeded_post('aoc_certificate', $seed_key);
        if (!$post_id) {
            $post_id = wp_insert_post([
                'post_type' => 'aoc_certificate',
                'post_status' => 'publish',
                'post_title' => $cert['name'],
                'menu_order' => $index,
            ]);
        }
        if (!is_wp_error($post_id) && $post_id) {
            update_post_meta($post_id, '_aoc_seed_key', $seed_key);
            update_post_meta($post_id, '_aoc_source_image', $cert['image']);
            update_post_meta($post_id, '_aoc_url', $cert['url'] ?? '');
            update_post_meta($post_id, '_aoc_alt', $cert['name'] ?? '');
        }
    }

    update_option('aoc_cms_seed_version', AOC_CMS_SEED_VERSION);
}
add_action('admin_init', 'aoc_cms_seed_default_content');

function aoc_cms_posts(string $post_type): array
{
    return get_posts([
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC'],
        'order' => 'ASC',
    ]);
}

function aoc_cms_image_value(int $post_id): string
{
    $image_id = absint(get_post_meta($post_id, '_aoc_image_id', true));
    if ($image_id) {
        $image = wp_get_attachment_image_url($image_id, 'full');
        if ($image) {
            return $image;
        }
    }

    $featured = get_the_post_thumbnail_url($post_id, 'full');
    if ($featured) {
        return $featured;
    }

    return aoc_cms_meta($post_id, '_aoc_source_image');
}

function aoc_cms_gallery_values(int $post_id): array
{
    $ids = array_filter(array_map('absint', explode(',', aoc_cms_meta($post_id, '_aoc_gallery_ids'))));
    $urls = [];

    foreach ($ids as $id) {
        $url = wp_get_attachment_image_url($id, 'full');
        if ($url) {
            $urls[] = $url;
        }
    }

    return $urls;
}

function aoc_cms_category_slug(string $key): string
{
    return strtolower(str_replace('_', '-', $key));
}

function aoc_cms_category_key_from_project(int $post_id): string
{
    $terms = get_the_terms($post_id, 'aoc_project_category');
    if (!$terms || is_wp_error($terms)) {
        return 'RESIDENTIAL';
    }

    $term = array_shift($terms);
    $key = get_term_meta($term->term_id, '_aoc_category_key', true);

    return is_string($key) && '' !== $key ? $key : strtoupper(str_replace('-', '_', $term->slug));
}

function aoc_cms_project_categories(string $language): array
{
    $terms = get_terms([
        'taxonomy' => 'aoc_project_category',
        'hide_empty' => false,
        'orderby' => 'term_id',
        'order' => 'ASC',
    ]);

    if (!$terms || is_wp_error($terms)) {
        return [];
    }

    return array_map(static function (WP_Term $term) use ($language): array {
        $key = get_term_meta($term->term_id, '_aoc_category_key', true);
        $label = get_term_meta($term->term_id, '_aoc_label_' . $language, true);

        return [
            'key' => is_string($key) && '' !== $key ? $key : strtoupper(str_replace('-', '_', $term->slug)),
            'label' => is_string($label) && '' !== $label ? $label : $term->name,
        ];
    }, $terms);
}

function aoc_cms_site_data(array $data): array
{
    $seeded = (bool) get_option('aoc_cms_seed_version');

    $services = aoc_cms_posts('aoc_service');
    if ($services || $seeded) {
        $data['services'] = array_map(static function (WP_Post $post): array {
            $title_en = get_the_title($post);
            $title_ar = aoc_cms_meta($post->ID, '_aoc_title_ar', $title_en);
            return [
                'id' => aoc_cms_meta($post->ID, '_aoc_key', $post->post_name ?: 'service-' . $post->ID),
                'image' => aoc_cms_image_value($post->ID),
                'en' => [
                    'title' => $title_en,
                    'description' => aoc_cms_meta($post->ID, '_aoc_description_en'),
                    'place' => aoc_cms_meta($post->ID, '_aoc_place_en'),
                    'fullDescription' => aoc_cms_meta($post->ID, '_aoc_full_description_en'),
                ],
                'ar' => [
                    'title' => $title_ar,
                    'description' => aoc_cms_meta($post->ID, '_aoc_description_ar', aoc_cms_meta($post->ID, '_aoc_description_en')),
                    'place' => aoc_cms_meta($post->ID, '_aoc_place_ar', aoc_cms_meta($post->ID, '_aoc_place_en')),
                    'fullDescription' => aoc_cms_meta($post->ID, '_aoc_full_description_ar', aoc_cms_meta($post->ID, '_aoc_full_description_en')),
                ],
            ];
        }, $services);
    }

    $projects = aoc_cms_posts('aoc_project');
    if ($projects || $seeded) {
        $categories_en = aoc_cms_project_categories('en');
        $categories_ar = aoc_cms_project_categories('ar');
        if ($categories_en) {
            $data['translations']['en']['projectsGallery']['categories'] = $categories_en;
        }
        if ($categories_ar) {
            $data['translations']['ar']['projectsGallery']['categories'] = $categories_ar;
        }

        $data['projects'] = array_map(static function (WP_Post $post): array {
            $title_en = get_the_title($post);
            $year = aoc_cms_meta($post->ID, '_aoc_year');
            return [
                'category' => aoc_cms_category_key_from_project($post->ID),
                'folder' => aoc_cms_meta($post->ID, '_aoc_source_folder'),
                'image' => aoc_cms_image_value($post->ID),
                'gallery' => aoc_cms_gallery_values($post->ID),
                'en' => [
                    'title' => $title_en,
                    'year' => $year,
                    'location' => aoc_cms_meta($post->ID, '_aoc_location_en'),
                    'description' => aoc_cms_meta($post->ID, '_aoc_description_en'),
                ],
                'ar' => [
                    'title' => aoc_cms_meta($post->ID, '_aoc_title_ar', $title_en),
                    'year' => $year,
                    'location' => aoc_cms_meta($post->ID, '_aoc_location_ar', aoc_cms_meta($post->ID, '_aoc_location_en')),
                    'description' => aoc_cms_meta($post->ID, '_aoc_description_ar', aoc_cms_meta($post->ID, '_aoc_description_en')),
                ],
            ];
        }, $projects);
    }

    $clients = aoc_cms_posts('aoc_client');
    if ($clients || $seeded) {
        $data['clients'] = array_map(static function (WP_Post $post): array {
            return [
                'alt' => aoc_cms_meta($post->ID, '_aoc_alt', get_the_title($post)),
                'url' => aoc_cms_meta($post->ID, '_aoc_url'),
                'image' => aoc_cms_image_value($post->ID),
            ];
        }, $clients);
    }

    $certificates = aoc_cms_posts('aoc_certificate');
    if ($certificates || $seeded) {
        $data['certificates'] = array_map(static function (WP_Post $post): array {
            return [
                'name' => aoc_cms_meta($post->ID, '_aoc_alt', get_the_title($post)),
                'url' => aoc_cms_meta($post->ID, '_aoc_url'),
                'image' => aoc_cms_image_value($post->ID),
            ];
        }, $certificates);
    }

    return $data;
}
add_filter('aoc_site_data', 'aoc_cms_site_data', 20);
