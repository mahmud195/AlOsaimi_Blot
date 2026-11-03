<?php
/**
 * Standard page template.
 */

get_header();
?>
<main id="aoc-page-content" class="aoc-page-content bg-aoc-black text-aoc-white overflow-x-clip">
    <?php
    if (function_exists('aoc_gutenberg_render_synced_pattern')) {
        aoc_gutenberg_render_synced_pattern('aoc-site-header', 'AOC Header', aoc_gutenberg_header_block());
    }
    ?>
    <?php aoc_render_wp_page_content(); ?>
    <?php
    if (function_exists('aoc_gutenberg_render_synced_pattern')) {
        aoc_gutenberg_render_synced_pattern('aoc-site-footer', 'AOC Footer', aoc_gutenberg_footer_block());
    }
    ?>
</main>
<?php
get_footer();
