<?php
/**
 * Front page: PHP conversion of the original React single page.
 */

get_header();

$editor_language = aoc_current_language();

if (aoc_should_render_wp_page_content()) {
    ?>
    <main id="aoc-site" class="aoc-site bg-aoc-black text-aoc-white overflow-x-clip <?php echo esc_attr('ar' === $editor_language ? 'rtl' : 'ltr'); ?>" data-language="<?php echo esc_attr($editor_language); ?>">
        <?php aoc_render_wp_page_content(); ?>
        <div class="custom-cursor" data-custom-cursor></div>
    </main>
    <?php
    get_footer();
    return;
}

$data = aoc_site_data();
$language = aoc_current_language();
$t = aoc_lang_data($data, $language);
?>
<main id="aoc-site" class="aoc-site bg-aoc-black text-aoc-white overflow-x-clip <?php echo esc_attr('ar' === $language ? 'rtl' : 'ltr'); ?>" data-language="<?php echo esc_attr($language); ?>">
    <?php
    get_template_part('template-parts/intro', null, compact('data', 'language', 't'));
    get_template_part('template-parts/top-nav', null, compact('data', 'language', 't'));
    get_template_part('template-parts/hero', null, compact('data', 'language', 't'));
    get_template_part('template-parts/about', null, compact('data', 'language', 't'));
    get_template_part('template-parts/services', null, compact('data', 'language', 't'));
    get_template_part('template-parts/clients', null, compact('data', 'language', 't'));
    get_template_part('template-parts/projects', null, compact('data', 'language', 't'));
    get_template_part('template-parts/contact', null, compact('data', 'language', 't'));
    get_template_part('template-parts/bottom-bar', null, compact('data', 'language', 't'));
    ?>
    <div class="custom-cursor" data-custom-cursor></div>
</main>
<?php
get_footer();
