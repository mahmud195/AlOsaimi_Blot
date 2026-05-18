<?php
if (!defined('ABSPATH')) {
    exit;
}

$data = $args['data'];
$language = $args['language'];
$t = $args['t'];
$next_language = 'ar' === $language ? 'en' : 'ar';
?>
<div data-top-nav-wrapper>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-aoc-black/30 backdrop-blur-md border-b border-white/10 transition-all duration-300 <?php echo esc_attr('ar' === $language ? 'rtl' : 'ltr'); ?>" data-main-nav>
        <div class="max-w-screen-2xl mx-auto px-4 md:px-8 py-3 md:py-4 relative flex items-center justify-between transition-all duration-300">
            <button class="md:hidden text-aoc-white/80 hover:text-aoc-white transition-colors" data-mobile-nav-toggle aria-label="<?php esc_attr_e('Toggle menu', 'alosaimi-consulting'); ?>">
                <span data-open-icon><?php echo aoc_icon('menu', '', 24); ?></span>
                <span data-close-icon class="hidden"><?php echo aoc_icon('x', '', 24); ?></span>
            </button>

            <a href="#home" class="h-10 w-auto transition-all duration-300 md:flex-none absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                <img src="<?php echo esc_url(aoc_asset_url($data['media']['logo_mobile'])); ?>" alt="AOC Logo" class="h-full w-auto md:hidden" />
                <img src="<?php echo esc_url(aoc_asset_url($data['media']['logo_white'])); ?>" alt="AOC Logo" class="h-full w-auto hidden md:block" />
            </a>

            <a
                href="<?php echo aoc_language_url($next_language); ?>"
                class="text-aoc-white/80 hover:text-aoc-gold transition-colors text-xs md:text-sm font-inter-tight font-light tracking-[0.15em] uppercase"
                data-language-switch
                data-language="<?php echo esc_attr($next_language); ?>"
            ><?php echo esc_html(strtoupper($next_language)); ?></a>

            <div class="hidden md:flex items-center gap-8 transition-all duration-300 absolute left-1/2 -translate-x-1/2 <?php echo esc_attr('ar' === $language ? 'flex-row-reverse' : ''); ?>">
                <?php foreach ($data['nav_items'] as $item) : ?>
                    <a
                        href="<?php echo esc_url($item['href']); ?>"
                        data-nav-link="<?php echo esc_attr($item['id']); ?>"
                        class="<?php echo esc_attr('ar' === $language ? 'text-base' : 'text-xs'); ?> font-inter-tight font-light tracking-[0.2em] uppercase transition-all duration-300 text-aoc-white/80 hover:text-aoc-white"
                    ><?php echo esc_html($t['nav'][$item['id']]); ?></a>
                <?php endforeach; ?>
            </div>
        </div>
    </nav>

    <div class="fixed inset-0 z-40 md:hidden transition-all duration-300 invisible opacity-0" data-mobile-nav-panel>
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-mobile-nav-backdrop></div>
        <div class="absolute top-[61px] <?php echo esc_attr('ar' === $language ? 'right-0 border-l translate-x-full' : 'left-0 border-r -translate-x-full'); ?> w-[88vw] max-w-64 h-[calc(100vh-61px)] bg-aoc-black/30 backdrop-blur-md border-white/10 transform transition-transform duration-300" data-mobile-nav-drawer>
            <div class="p-5 space-y-2">
                <?php foreach ($data['nav_items'] as $item) : ?>
                    <a
                        href="<?php echo esc_url($item['href']); ?>"
                        data-mobile-nav-link
                        data-nav-link="<?php echo esc_attr($item['id']); ?>"
                        class="block py-2.5 <?php echo esc_attr('ar' === $language ? 'text-right text-base' : 'text-left text-sm'); ?> font-inter-tight font-light tracking-[0.12em] uppercase transition-all duration-300 text-aoc-white/80 hover:text-aoc-white"
                    ><?php echo esc_html($t['nav'][$item['id']]); ?></a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

