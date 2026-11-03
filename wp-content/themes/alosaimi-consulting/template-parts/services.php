<?php
if (!defined('ABSPATH')) {
    exit;
}

$data = $args['data'];
$language = $args['language'];
$t = $args['t'];
$services = $data['services'];
$service_count = count($services);
?>
<section id="services" class="scroll-mt-16 min-h-screen flex items-start py-16 md:pt-0 md:pb-4 <?php echo esc_attr('ar' === $language ? 'rtl' : ''); ?>" style="background-color:rgb(0,48,135);">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-5 md:px-8 w-full">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start md:items-center <?php echo esc_attr('ar' === $language ? 'rtl' : ''); ?>">
            <div class="space-y-4 md:space-y-8 animate-slide-right <?php echo esc_attr('ar' === $language ? 'md:order-2 text-right' : ''); ?>">
                <h2 class="text-4xl sm:text-5xl md:text-6xl font-darker-grotesque font-extralight tracking-[0.12em] md:tracking-[0.2em] uppercase leading-[0.95] text-aoc-white mt-0 md:-mt-20 text-right whitespace-pre-line"><?php aoc_multiline($t['services']['title']); ?></h2>
                <p class="text-aoc-white/80 text-[0.95rem] md:text-base font-inter-tight font-light leading-[1.85] md:leading-relaxed text-justify <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>"><?php echo esc_html($t['services']['intro']); ?></p>
                <p class="text-aoc-white/80 text-[0.95rem] md:text-base font-inter-tight font-light leading-[1.85] md:leading-relaxed text-justify <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>"><?php echo esc_html($t['services']['builtOn']); ?></p>
            </div>

            <div class="md:col-span-2 relative mt-2 md:mt-16 animate-fade-in delay-300 <?php echo esc_attr('ar' === $language ? 'md:order-1' : ''); ?>">
                <div
                    class="flex gap-5 sm:gap-6 md:gap-10 overflow-x-auto pb-3 md:pb-4 pr-4 <?php echo esc_attr('ar' === $language ? 'flex-row-reverse pl-4 pr-0' : ''); ?> cursor-grab"
                    style="scroll-behavior:auto;scrollbar-width:none;ms-overflow-style:none;"
                    data-service-carousel
                    data-service-count="<?php echo esc_attr((string) $service_count); ?>"
                >
                    <?php for ($round = 0; $round < 2; $round++) : ?>
                        <?php foreach ($services as $index => $service) : ?>
                            <?php
                            $localized = $service[$language];
                            $clone = 1 === $round;
                            ?>
                            <div
                                aria-hidden="<?php echo esc_attr($clone ? 'true' : 'false'); ?>"
                                class="flex-shrink-0 w-[82vw] max-w-[18rem] md:w-80 group cursor-pointer <?php echo esc_attr(!$clone ? 'card-deal card-stack-' . $index : 'opacity-100'); ?>"
                                style="<?php echo esc_attr(!$clone ? 'transition-delay:' . ($index * 0.2) . 's;' : ''); ?>"
                            >
                                <button type="button" class="relative w-full aspect-[3/4] overflow-hidden mb-4 md:mb-6 transition-transform duration-300 ease-out hover:scale-105 text-left" data-open-services>
                                    <img src="<?php echo esc_url(aoc_media_url($service['image'])); ?>" alt="<?php echo esc_attr($localized['title']); ?>" loading="lazy" class="w-full h-full object-cover" />
                                    <span class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></span>
                                    <span class="absolute bottom-6 md:bottom-8 left-0 right-0 px-4">
                                        <span class="block text-lg md:text-xl font-darker-grotesque font-light tracking-[0.1em] md:tracking-[0.12em] uppercase text-aoc-white <?php echo esc_attr('ar' === $language ? 'text-right' : 'text-left'); ?>"><?php echo esc_html($localized['title']); ?></span>
                                    </span>
                                </button>
                                <p class="text-aoc-white/70 text-sm font-inter-tight font-light leading-[1.75] md:leading-relaxed mb-3 md:mb-4 <?php echo esc_attr('ar' === $language ? 'text-right' : 'text-left'); ?>"><?php echo esc_html($localized['description']); ?></p>
                                <button type="button" data-open-services class="text-xs md:text-sm font-inter-tight font-light tracking-[0.08em] md:tracking-[0.1em] uppercase text-blue-300 hover:text-aoc-white transition-colors underline block <?php echo esc_attr('ar' === $language ? 'ml-auto mr-0' : 'mr-auto ml-0'); ?>"><?php echo esc_html($t['services']['readMore']); ?></button>
                            </div>
                        <?php endforeach; ?>
                    <?php endfor; ?>
                </div>

                <div class="relative mt-8 pt-4 h-12 hidden md:flex items-center justify-between">
                    <div class="absolute <?php echo esc_attr('ar' === $language ? 'left-0' : 'right-0'); ?> flex items-center gap-4">
                        <button type="button" class="flex items-center gap-4 px-8 py-3 rounded-full border-2 border-aoc-gold/50 hover:border-aoc-gold hover:bg-aoc-gold/5 transition-all group <?php echo esc_attr('ar' === $language ? 'flex-row-reverse' : ''); ?>" data-service-scroll-button>
                            <span class="text-aoc-gold font-inter-tight font-light tracking-[0.15em] uppercase text-sm group-hover:tracking-[0.2em] transition-all"><?php echo esc_html($t['services']['scroll']); ?></span>
                            <?php echo aoc_icon('chevron-right', 'text-aoc-gold animate-pulse ' . ('ar' === $language ? 'rotate-180' : ''), 20); ?>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed inset-0 bg-aoc-indigo z-50 overflow-hidden hidden" data-services-modal>
        <nav class="fixed top-0 left-0 right-0 z-[70] bg-aoc-black/30 backdrop-blur-md border-b border-white/10 <?php echo esc_attr('ar' === $language ? 'rtl' : 'ltr'); ?>">
            <div class="max-w-screen-2xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
                <a href="#services" class="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0" data-close-services>
                    <img src="<?php echo esc_url(aoc_media_url($data['media']['logo_mobile'])); ?>" alt="AOC Logo" class="h-full w-auto md:hidden" />
                    <img src="<?php echo esc_url(aoc_media_url($data['media']['logo_white'])); ?>" alt="AOC Logo" class="h-full w-auto hidden md:block" />
                </a>
                <div class="md:hidden w-10"></div>
                <button type="button" data-close-services class="relative w-10 h-10 flex items-center justify-center" aria-label="<?php esc_attr_e('Close services', 'alosaimi-consulting'); ?>">
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" stroke-width="1"></circle></svg>
                    <?php echo aoc_icon('x', 'text-aoc-white hover:text-aoc-gold transition-colors', 20); ?>
                </button>
            </div>
        </nav>

        <div class="h-full flex <?php echo esc_attr('ar' === $language ? 'flex-row-reverse' : 'flex-row'); ?>" style="padding-top:61px;">
            <aside class="hidden md:flex w-56 lg:w-64 shrink-0 flex-col justify-center px-6 lg:px-8 <?php echo esc_attr('ar' === $language ? 'border-l border-white/10' : 'border-r border-white/10'); ?>">
                <nav class="space-y-5">
                    <?php foreach ($services as $index => $service) : ?>
                        <button type="button" data-service-jump="<?php echo esc_attr($service['id']); ?>" class="block w-full font-darker-grotesque font-medium tracking-[0.1em] uppercase truncate transition-colors duration-300 text-sm <?php echo esc_attr('ar' === $language ? 'text-right' : 'text-left'); ?> <?php echo 0 === $index ? 'text-aoc-gold' : 'text-aoc-white/60 hover:text-aoc-white'; ?>"><?php echo esc_html($service[$language]['title']); ?></button>
                    <?php endforeach; ?>
                </nav>
            </aside>

            <div class="flex-1 overflow-y-auto px-4 sm:px-5 md:px-10 lg:px-14 pt-6 md:pt-12 pb-24 md:pb-32 [&::-webkit-scrollbar]:hidden" style="scrollbar-width:none;ms-overflow-style:none;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;contain:layout paint;" data-services-scroll>
                <div class="max-w-5xl mx-auto relative" data-services-content>
                    <div class="absolute pointer-events-none hidden md:block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100]" style="opacity:0;will-change:top,left,width,height;" data-services-ring>
                        <svg class="absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 <?php echo esc_attr('ar' === $language ? '-right-6 md:-right-8 lg:-right-10' : '-left-6 md:-left-8 lg:-left-10'); ?> -top-6 md:-top-8 lg:-top-10" viewBox="0 0 100 100" style="overflow:visible;"><circle cx="50" cy="50" r="48" fill="none" stroke="#CAB64B" stroke-width="1.5"></circle></svg>
                    </div>

                    <?php foreach ($services as $index => $service) : ?>
                        <?php
                        $localized = $service[$language];
                        $title_words = preg_split('/\s+/u', $localized['title']);
                        $half = (int) ceil(count($title_words) / 2);
                        $first_line = implode(' ', array_slice($title_words, 0, $half));
                        $second_line = implode(' ', array_slice($title_words, $half));
                        ?>
                        <div class="relative" data-service-card="<?php echo esc_attr($service['id']); ?>">
                            <?php if ($index > 0) : ?>
                                <div class="w-full flex items-center gap-4 py-6 md:py-14"><div class="flex-1 h-px bg-white/10"></div><div class="w-1 h-1 rounded-full bg-aoc-gold/60"></div><div class="flex-1 h-px bg-white/10"></div></div>
                            <?php endif; ?>
                            <section class="rounded-sm overflow-visible transition-all duration-700 p-5 sm:p-6 md:p-12 aoc-glass-card <?php echo esc_attr(0 === $index ? 'is-active' : ''); ?>">
                                <div class="flex flex-col-reverse lg:flex-row gap-5 md:gap-8 lg:gap-14 <?php echo esc_attr('ar' === $language ? 'lg:flex-row-reverse' : ''); ?>">
                                    <div class="flex-1 flex flex-col justify-center <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>">
                                        <div class="mb-4 md:mb-5 lg:mb-8">
                                            <h2 class="text-[2rem] sm:text-[2.35rem] md:text-4xl lg:text-5xl font-darker-grotesque font-extralight tracking-[0.04em] md:tracking-[0.05em] uppercase text-aoc-white leading-[0.95]"><?php echo esc_html($first_line); ?></h2>
                                            <?php if ($second_line) : ?><h2 class="text-[2rem] sm:text-[2.35rem] md:text-4xl lg:text-5xl font-darker-grotesque font-extralight tracking-[0.04em] md:tracking-[0.05em] uppercase text-aoc-white leading-[0.95]"><?php echo esc_html($second_line); ?></h2><?php endif; ?>
                                        </div>
                                        <div class="max-w-none lg:max-w-lg space-y-4">
                                            <p class="text-aoc-white/80 text-[0.95rem] md:text-base font-inter-tight font-light leading-[1.85] md:leading-relaxed text-justify"><?php echo esc_html($localized['fullDescription']); ?></p>
                                            <p class="text-aoc-white/50 text-[0.75rem] md:text-sm font-inter-tight font-light"><?php echo esc_html($t['services']['locationPrefix'] . $localized['place']); ?></p>
                                            <?php if ('designServices' === $service['id']) : ?>
                                                <div class="mt-5">
                                                    <p class="text-[10px] md:text-xs font-inter-tight font-light tracking-[0.1em] text-aoc-white/60 mb-2 uppercase"><?php echo esc_html($t['services']['creativePartner']); ?></p>
                                                    <a href="<?php echo esc_url($data['social']['befound']); ?>" target="_blank" rel="noopener noreferrer" class="inline-block transition-opacity hover:opacity-80"><img src="<?php echo esc_url(aoc_media_url($data['media']['befound'])); ?>" alt="BeFound Design Studio" class="h-6 w-auto" /></a>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="w-full max-w-[15rem] sm:max-w-[17rem] lg:w-72 xl:w-80 mx-auto lg:mx-0 shrink-0" data-services-image>
                                        <div class="w-full aspect-[3/4] overflow-hidden rounded-sm"><img src="<?php echo esc_url(aoc_media_url($service['image'])); ?>" alt="<?php echo esc_attr($localized['title']); ?>" loading="lazy" class="w-full h-full object-cover" /></div>
                                    </div>
                                </div>

                                <?php if ('architectOfRecord' === $service['id']) : ?>
                                    <div class="mt-8">
                                        <div class="rounded-lg p-5 border border-white/40" style="background:rgba(255,255,255,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);">
                                            <p class="text-[10px] md:text-xs font-inter-tight font-bold tracking-[0.15em] text-aoc-indigo mb-4 uppercase <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>"><?php echo esc_html($t['services']['accreditations']); ?></p>
                                            <div class="flex flex-col gap-5 md:gap-8 mt-4">
                                                <div class="grid grid-cols-3 gap-4 sm:gap-5 md:flex md:items-center md:justify-between md:gap-4">
                                                    <?php foreach (array_slice($data['certificates'], 0, 5) as $cert) : ?>
                                                        <a href="<?php echo esc_url($cert['url']); ?>" target="_blank" rel="noopener noreferrer" title="<?php echo esc_attr($cert['name']); ?>" class="flex flex-1 items-center justify-center hover:scale-110 transition-transform duration-300 min-w-0"><img src="<?php echo esc_url(aoc_media_url($cert['image'])); ?>" alt="<?php echo esc_attr($cert['name']); ?>" loading="lazy" class="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-full object-contain filter drop-shadow-md" /></a>
                                                    <?php endforeach; ?>
                                                </div>
                                                <div class="grid grid-cols-2 gap-5 justify-items-center md:flex md:items-center md:justify-center md:gap-8 lg:gap-12">
                                                    <?php foreach (array_slice($data['certificates'], 5) as $cert) : ?>
                                                        <a href="<?php echo esc_url($cert['url']); ?>" target="_blank" rel="noopener noreferrer" title="<?php echo esc_attr($cert['name']); ?>" class="flex items-center justify-center hover:scale-110 transition-transform duration-300 shrink-0"><img src="<?php echo esc_url(aoc_media_url($cert['image'])); ?>" alt="<?php echo esc_attr($cert['name']); ?>" loading="lazy" class="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain filter drop-shadow-md" /></a>
                                                    <?php endforeach; ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <?php endif; ?>
                            </section>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="fixed bottom-0 left-0 right-0 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center text-aoc-white/50 text-[10px] md:text-sm font-inter-tight font-light tracking-[0.18em] md:tracking-widest">
            <?php
            $bar_text = function_exists('aoc_global_get') ? aoc_global_get('bottom_bar_text', 'A FOUNDATION OF TRUST') : 'A FOUNDATION OF TRUST';
            foreach (array_filter(explode(' ', $bar_text)) as $word) :
            ?><span><?php echo esc_html($word); ?></span><?php endforeach; ?>
        </div>
    </div>
</section>
