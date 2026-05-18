<?php
if (!defined('ABSPATH')) {
    exit;
}

$data = $args['data'];
$language = $args['language'];
$t = $args['t'];
$about_title = explode("\n", $t['about']['title']);
?>
<section id="about" class="min-h-screen bg-aoc-indigo flex flex-col justify-center py-24 gap-16 md:gap-32">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 w-full <?php echo esc_attr('ar' === $language ? 'rtl' : ''); ?>">
        <div class="relative">
            <div class="absolute top-20 md:top-10 z-20 w-max <?php echo esc_attr('ar' === $language ? 'right-[5%] md:right-[8.5%]' : 'left-[12%] -translate-x-1/2 md:left-[18%] md:-translate-x-1/2'); ?>">
                <div class="animate-slide-right">
                    <h2 class="md:hidden text-4xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>"><?php echo esc_html($about_title[0] ?? ''); ?></h2>
                    <h2 class="md:hidden text-4xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white -mt-1 text-right"><?php echo esc_html($about_title[1] ?? ''); ?></h2>
                    <h2 class="hidden md:block text-8xl lg:text-9xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white <?php echo esc_attr('ar' === $language ? 'text-left' : ''); ?>"><?php echo esc_html($about_title[0] ?? ''); ?></h2>
                    <h2 class="hidden md:block text-8xl lg:text-9xl font-darker-grotesque font-extralight tracking-[0.1em] uppercase leading-[0.85] text-aoc-white -mt-2 <?php echo esc_attr('ar' === $language ? 'text-left' : 'text-right'); ?>"><?php echo esc_html($about_title[1] ?? ''); ?></h2>
                </div>
            </div>

            <div class="relative w-full flex flex-col md:block">
                <div class="relative pt-16 md:pt-16 w-[80%] md:w-[50%] mx-auto animate-fade-in <?php echo esc_attr('ar' === $language ? 'md:mr-[15%] md:ml-auto' : 'md:ml-[17%] md:mr-auto'); ?>">
                    <svg class="absolute z-10 w-16 h-16 md:w-32 md:h-32 top-[55%] -translate-y-1/2 <?php echo esc_attr('ar' === $language ? '-right-8 md:-right-16' : '-left-8 md:-left-16'); ?>" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#CAB64B" stroke-width="2" class="circle-draw"></circle>
                    </svg>
                    <div class="relative aspect-[4/5] md:h-[600px] md:aspect-auto overflow-hidden">
                        <img src="<?php echo esc_url(aoc_asset_url($data['media']['about_image'])); ?>" alt="Architecture" loading="lazy" class="w-full h-full object-cover" />
                    </div>
                </div>

                <div class="relative md:absolute z-10 p-4 md:p-12 mt-6 md:mt-0 md:top-1/2 md:-translate-y-1/4 w-full md:w-[60%] overflow-hidden <?php echo esc_attr('ar' === $language ? 'md:left-0 text-right' : 'md:right-0'); ?>">
                    <div class="animate-slide-left">
                        <div class="space-y-4 md:space-y-6">
                            <p class="text-aoc-white/80 text-sm md:text-[1.35rem] font-inter-tight font-light leading-relaxed text-justify <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>"><?php echo esc_html($t['about']['paragraph1']); ?></p>
                            <p class="text-aoc-white/80 text-sm md:text-[1.35rem] font-inter-tight font-light leading-relaxed text-justify <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>"><?php echo esc_html($t['about']['paragraph2']); ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-24 w-full <?php echo esc_attr('ar' === $language ? 'rtl' : ''); ?>">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div class="col-span-1 lg:col-span-3 text-right">
                <h2 class="text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-darker-grotesque font-light tracking-[0.05em] uppercase leading-[0.85] text-aoc-white whitespace-pre-line">
                    <?php aoc_multiline($t['about']['ceoSpeechTitle']); ?>
                </h2>
            </div>

            <div class="col-span-1 lg:col-span-5 flex flex-col md:flex-row items-center justify-center gap-6">
                <div class="flex-shrink-0">
                    <svg class="w-20 h-20 md:w-28 md:h-28" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#CAB64B" stroke-width="1.5" class="circle-draw"></circle>
                    </svg>
                </div>
                <div class="flex flex-col items-start">
                    <h3 class="text-2xl md:text-3xl lg:text-[1.85rem] xl:text-[2.1rem] font-darker-grotesque font-medium tracking-[0.03em] uppercase text-aoc-gold whitespace-pre-line leading-[0.7] mb-2.5"><?php aoc_multiline($t['about']['ceoName']); ?></h3>
                    <p class="text-xs md:text-sm lg:text-[13px] font-inter-tight font-normal tracking-[0.05em] text-aoc-white/80 uppercase whitespace-nowrap"><?php echo esc_html($t['about']['ceoTitle']); ?></p>
                </div>
            </div>

            <div class="col-span-1 lg:col-span-4">
                <div class="space-y-4 animate-slide-left">
                    <?php foreach ($t['about']['ceoSpeech'] as $speech) : ?>
                        <p class="text-aoc-white/80 text-sm md:text-base font-inter-tight font-light leading-relaxed text-justify <?php echo esc_attr('ar' === $language ? 'text-right rtl' : 'ltr'); ?>"><?php echo esc_html($speech); ?></p>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>

