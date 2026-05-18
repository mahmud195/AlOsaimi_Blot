<?php
if (!defined('ABSPATH')) {
    exit;
}

$data = $args['data'];
$clients = array_merge($data['clients'], $data['clients']);
?>
<section class="relative overflow-hidden py-8 md:py-12" style="background:rgba(255,255,255,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.4);border-bottom:1px solid rgba(255,255,255,0.4);">
    <div class="absolute inset-0 pointer-events-none"></div>
    <div class="flex" style="animation:marquee 40s linear infinite;width:max-content;">
        <?php foreach ($clients as $logo) : ?>
            <div class="flex-shrink-0 flex items-center justify-center mx-6 md:mx-10 h-16 md:h-24 w-32 md:w-48">
                <?php if (!empty($logo['url'])) : ?>
                    <a href="<?php echo esc_url($logo['url']); ?>" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center h-full w-full">
                        <img src="<?php echo esc_url(aoc_asset_url($logo['image'])); ?>" alt="<?php echo esc_attr($logo['alt']); ?>" loading="lazy" class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" />
                    </a>
                <?php else : ?>
                    <img src="<?php echo esc_url(aoc_asset_url($logo['image'])); ?>" alt="<?php echo esc_attr($logo['alt']); ?>" loading="lazy" class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" />
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</section>

