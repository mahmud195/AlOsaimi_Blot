<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="fixed bottom-0 left-0 right-0 z-40 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 transition-opacity duration-300 opacity-0 pointer-events-none" data-bottom-bar>
    <div class="w-full px-4 md:px-12 py-2.5 md:py-3 flex items-center justify-between">
        <?php
        $bar_text = function_exists('aoc_global_get') ? aoc_global_get('bottom_bar_text', 'A FOUNDATION OF TRUST') : 'A FOUNDATION OF TRUST';
        $bar_words = array_filter(explode(' ', $bar_text));
        foreach ($bar_words as $word) :
        ?>
            <span class="text-aoc-white/60 text-[10px] md:text-sm font-inter-tight font-light tracking-[0.18em] md:tracking-[0.3em] uppercase"><?php echo esc_html($word); ?></span>
        <?php endforeach; ?>
    </div>
</div>

