<?php
/**
 * Template Name: Full Width Page
 * Template Post Type: page
 */

get_header();
?>
<main id="aoc-full-width" class="aoc-full-width bg-aoc-black text-aoc-white overflow-x-clip">
    <?php
    if (!is_front_page() && function_exists('aoc_gutenberg_render_synced_pattern')) {
        aoc_gutenberg_render_synced_pattern('aoc-site-header', 'AOC Header', aoc_gutenberg_header_block());
    }
    ?>
    <?php aoc_render_wp_page_content(); ?>
    <?php
    if (!is_front_page() && function_exists('aoc_gutenberg_render_synced_pattern')) {
        aoc_gutenberg_render_synced_pattern('aoc-site-footer', 'AOC Footer', aoc_gutenberg_footer_block());
    }
    ?>
</main>
<?php
get_footer();
