<?php
/**
 * Fallback template.
 */

get_header();
?>
<main class="min-h-screen bg-aoc-indigo flex items-center justify-center px-4">
    <div class="max-w-3xl text-center">
        <h1 class="text-5xl font-darker-grotesque font-light tracking-[0.15em] uppercase text-aoc-gold"><?php bloginfo('name'); ?></h1>
        <p class="mt-4 text-aoc-white/80 font-inter-tight font-light"><?php esc_html_e('Assign a static front page to display the Al Osaimi Consulting website.', 'alosaimi-consulting'); ?></p>
    </div>
</main>
<?php
get_footer();

