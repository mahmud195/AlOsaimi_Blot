<?php
/**
 * Theme header.
 */

if (!defined('ABSPATH')) {
    exit;
}

$language = aoc_current_language();
$dir = 'ar' === $language ? 'rtl' : 'ltr';
$data = aoc_site_data();
$language_attributes = get_language_attributes();
$language_attributes = preg_replace('/\sdir="[^"]*"/', '', $language_attributes);
$language_attributes = preg_replace('/lang="[^"]*"/', 'lang="' . esc_attr($language) . '"', $language_attributes);
?>
<!doctype html>
<html <?php echo $language_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> dir="<?php echo esc_attr($dir); ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
    <link rel="icon" type="image/png" href="<?php echo esc_url(aoc_media_url($data['media']['favicon'])); ?>" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <?php
    $tracking = aoc_tracking_options();
    if (!empty($tracking['search_console_verification'])) {
        echo '<meta name="google-site-verification" content="' . esc_attr($tracking['search_console_verification']) . '" />' . "\n";
    }
    if (!empty($tracking['bing_verification'])) {
        echo '<meta name="msvalidate.01" content="' . esc_attr($tracking['bing_verification']) . '" />' . "\n";
    }
    wp_head();
    ?>
</head>
<body <?php body_class('bg-aoc-black text-aoc-white overflow-x-clip'); ?> data-aoc-language="<?php echo esc_attr($language); ?>">
<?php wp_body_open(); ?>
