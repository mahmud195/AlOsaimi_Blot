<?php
if (!defined('ABSPATH')) {
    exit;
}

$data = $args['data'];
$language = $args['language'];
$t = $args['t'];
?>
<section id="home" class="relative min-h-[100svh] md:min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
        <div class="relative w-full h-full aspect-[9/16] sm:aspect-[3/4] md:aspect-auto md:min-h-screen">
            <video
                autoplay
                muted
                loop
                playsinline
                preload="auto"
                poster="<?php echo esc_url(aoc_asset_url($data['media']['hero_poster'])); ?>"
                disableRemotePlayback
                class="absolute inset-0 w-full h-full object-cover"
            >
                <source src="<?php echo esc_url(aoc_asset_url($data['media']['hero_video'])); ?>" type="video/mp4" />
            </video>
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-aoc-black/60 via-aoc-indigo/20 to-aoc-black/70"></div>
    </div>

    <div class="absolute left-0 right-0 z-20 w-screen overflow-hidden <?php echo esc_attr('ar' === $language ? 'top-[63%] md:top-[65%]' : 'top-[66%] md:top-[70%]'); ?>">
        <?php if ('ar' === $language) : ?>
            <div class="flex whitespace-nowrap" style="width:max-content;">
                <?php foreach ($t['hero']['words'] as $word) : ?>
                    <span class="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-fustat font-extralight text-aoc-white <?php echo esc_attr('•' === $word ? 'mx-4 sm:mx-6' : 'mx-8 sm:mx-12'); ?>"><?php echo esc_html($word); ?></span>
                <?php endforeach; ?>
            </div>
        <?php else : ?>
            <div class="flex whitespace-nowrap" style="width:max-content;" data-hero-banner>
                <?php for ($i = 0; $i < 6; $i++) : ?>
                    <span class="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-darker-grotesque font-extralight tracking-[0.16em] md:tracking-[0.2em] uppercase mx-3 sm:mx-4 text-aoc-white"><?php echo esc_html($t['hero']['title']); ?></span>
                <?php endfor; ?>
            </div>
        <?php endif; ?>
    </div>

    <div class="absolute bottom-5 left-3 md:bottom-8 md:left-8 z-30">
        <div class="flex flex-col items-center gap-1.5 px-2.5 py-3 md:px-3 md:py-4 border border-aoc-white/30 rounded-full">
            <span class="text-aoc-white/80 text-[10px] md:text-xs font-inter-tight font-light tracking-[0.12em] md:tracking-[0.15em] uppercase writing-vertical">SCROLL</span>
            <?php echo aoc_icon('chevron-down', 'w-3.5 h-3.5 md:w-4 md:h-4 text-aoc-white/80 animate-bounce', 16); ?>
        </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 z-30">
        <div class="w-full px-3 py-3 md:px-4 md:py-4 relative flex items-center justify-between">
            <div class="hidden md:block w-20"></div>
            <div class="flex items-center gap-2.5 md:gap-6 md:absolute md:left-[55%] md:-translate-x-1/2">
                <a href="<?php echo esc_url($data['social']['linkedin']); ?>" target="_blank" rel="noopener noreferrer" class="text-aoc-white/80 hover:text-aoc-white transition-colors"><?php echo aoc_icon('linkedin', 'w-4 h-4 md:w-[22px] md:h-[22px]', 22); ?></a>
                <a href="<?php echo esc_url($data['social']['instagram']); ?>" target="_blank" rel="noopener noreferrer" class="text-aoc-white/80 hover:text-aoc-white transition-colors"><?php echo aoc_icon('instagram', 'w-4 h-4 md:w-[22px] md:h-[22px]', 22); ?></a>
                <a href="<?php echo esc_url($data['social']['facebook']); ?>" target="_blank" rel="noopener noreferrer" class="text-aoc-white/80 hover:text-aoc-white transition-colors"><?php echo aoc_icon('facebook', 'w-4 h-4 md:w-[22px] md:h-[22px]', 22); ?></a>
            </div>
            <div class="flex items-center">
                <a href="<?php echo esc_url($data['social']['befound']); ?>" target="_blank" rel="noopener noreferrer">
                    <img src="<?php echo esc_url(aoc_asset_url($data['media']['befound'])); ?>" alt="BeFound Design Studio" class="h-5 md:h-6 w-auto" />
                </a>
            </div>
        </div>
    </div>
</section>

