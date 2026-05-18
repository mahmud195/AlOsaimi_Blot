<?php
/**
 * Lightweight admin editability without requiring plugins.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_admin_menu(): void
{
    add_theme_page(
        __('Al Osaimi Settings', 'alosaimi-consulting'),
        __('Al Osaimi Settings', 'alosaimi-consulting'),
        'manage_options',
        'aoc-settings',
        'aoc_render_settings_page'
    );
}
add_action('admin_menu', 'aoc_admin_menu');

function aoc_register_settings(): void
{
    register_setting('aoc_settings', 'aoc_contact_recipient', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_email',
        'default' => get_option('admin_email'),
    ]);

    register_setting('aoc_settings', 'aoc_site_content_json', [
        'type' => 'string',
        'sanitize_callback' => 'wp_kses_post',
        'default' => '',
    ]);

    register_setting('aoc_settings', 'aoc_tracking_options', [
        'type' => 'array',
        'sanitize_callback' => 'aoc_sanitize_tracking_options',
        'default' => [],
    ]);
}
add_action('admin_init', 'aoc_register_settings');

function aoc_sanitize_tracking_options($value): array
{
    $value = is_array($value) ? $value : [];
    return [
        'gtm_id' => isset($value['gtm_id']) ? sanitize_text_field($value['gtm_id']) : '',
        'ga_id' => isset($value['ga_id']) ? sanitize_text_field($value['ga_id']) : '',
        'search_console_verification' => isset($value['search_console_verification']) ? sanitize_text_field($value['search_console_verification']) : '',
        'bing_verification' => isset($value['bing_verification']) ? sanitize_text_field($value['bing_verification']) : '',
        'clarity_id' => isset($value['clarity_id']) ? sanitize_text_field($value['clarity_id']) : '',
    ];
}

function aoc_render_settings_page(): void
{
    if (!current_user_can('manage_options')) {
        return;
    }

    $tracking = aoc_tracking_options();
    $sample = wp_json_encode(aoc_default_site_data(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Al Osaimi Settings', 'alosaimi-consulting'); ?></h1>
        <p><?php esc_html_e('Use these fields for contact routing, tracking IDs, and optional structured content overrides. Leave the JSON override empty to use the migrated React content exactly.', 'alosaimi-consulting'); ?></p>
        <form method="post" action="options.php">
            <?php settings_fields('aoc_settings'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="aoc_contact_recipient"><?php esc_html_e('Contact recipient email', 'alosaimi-consulting'); ?></label></th>
                    <td><input name="aoc_contact_recipient" id="aoc_contact_recipient" type="email" class="regular-text" value="<?php echo esc_attr(get_option('aoc_contact_recipient', get_option('admin_email'))); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aoc_gtm_id"><?php esc_html_e('Google Tag Manager ID', 'alosaimi-consulting'); ?></label></th>
                    <td><input name="aoc_tracking_options[gtm_id]" id="aoc_gtm_id" type="text" class="regular-text" placeholder="GTM-XXXXXXX" value="<?php echo esc_attr($tracking['gtm_id']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aoc_ga_id"><?php esc_html_e('Google Analytics ID', 'alosaimi-consulting'); ?></label></th>
                    <td><input name="aoc_tracking_options[ga_id]" id="aoc_ga_id" type="text" class="regular-text" placeholder="G-XXXXXXXXXX" value="<?php echo esc_attr($tracking['ga_id']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aoc_clarity_id"><?php esc_html_e('Microsoft Clarity ID', 'alosaimi-consulting'); ?></label></th>
                    <td><input name="aoc_tracking_options[clarity_id]" id="aoc_clarity_id" type="text" class="regular-text" value="<?php echo esc_attr($tracking['clarity_id']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aoc_search_console_verification"><?php esc_html_e('Search Console verification', 'alosaimi-consulting'); ?></label></th>
                    <td><input name="aoc_tracking_options[search_console_verification]" id="aoc_search_console_verification" type="text" class="regular-text" value="<?php echo esc_attr($tracking['search_console_verification']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aoc_bing_verification"><?php esc_html_e('Bing verification', 'alosaimi-consulting'); ?></label></th>
                    <td><input name="aoc_tracking_options[bing_verification]" id="aoc_bing_verification" type="text" class="regular-text" value="<?php echo esc_attr($tracking['bing_verification']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aoc_site_content_json"><?php esc_html_e('Content override JSON', 'alosaimi-consulting'); ?></label></th>
                    <td>
                        <textarea name="aoc_site_content_json" id="aoc_site_content_json" rows="14" class="large-text code"><?php echo esc_textarea(get_option('aoc_site_content_json', '')); ?></textarea>
                        <p class="description"><?php esc_html_e('Optional. Paste only the keys you need to override. The default source structure is shown below for reference.', 'alosaimi-consulting'); ?></p>
                        <details>
                            <summary><?php esc_html_e('Show default content structure', 'alosaimi-consulting'); ?></summary>
                            <pre style="max-height: 420px; overflow: auto; background: #111; color: #eee; padding: 16px;"><?php echo esc_html($sample); ?></pre>
                        </details>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

