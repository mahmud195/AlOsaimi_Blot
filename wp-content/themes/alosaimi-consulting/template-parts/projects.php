<?php
if (!defined('ABSPATH')) {
    exit;
}

$data = $args['data'];
$language = $args['language'];
$t = $args['t'];
$categories = $t['projectsGallery']['categories'];
$projects = $data['projects'];
$global_index = 0;
?>
<section id="projects" class="scroll-mt-16 relative h-[62svh] min-h-[24rem] sm:h-[68svh] md:h-screen flex items-center overflow-hidden bg-aoc-black">
    <div class="absolute inset-0 flex items-center justify-center">
        <?php foreach ($data['media']['project_section_images'] as $index => $image) : ?>
            <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-700" data-project-bg="<?php echo esc_attr((string) $index); ?>" style="opacity:<?php echo 0 === $index ? '1' : '0'; ?>;">
                <img src="<?php echo esc_url(aoc_asset_url($image)); ?>" alt="<?php echo esc_attr('Project ' . ($index + 1)); ?>" loading="lazy" class="w-full h-full object-cover" />
            </div>
        <?php endforeach; ?>
        <div class="absolute inset-0 bg-gradient-to-t from-aoc-black/80 via-aoc-indigo/30 to-transparent"></div>
    </div>

    <div class="absolute inset-0 z-10 <?php echo esc_attr('ar' === $language ? 'rtl' : ''); ?>">
        <div class="absolute bottom-[56%] md:bottom-[55%] left-0 right-0 px-5 md:px-16 <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>">
            <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-darker-grotesque font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase leading-[0.9]" style="color:#F2F2F2;"><?php echo esc_html($t['projectsGallery']['sectionTitle']); ?></h2>
        </div>

        <div class="left-0 right-0 w-full backdrop-blur-sm absolute top-1/2 -translate-y-1/2 border-t border-b border-white/20 bg-aoc-black/20" data-project-learn-bar>
            <div class="px-3 md:px-16 py-2.5 md:py-3 transition-opacity duration-300" data-project-learn-inner>
                <button type="button" data-open-projects class="group flex items-center gap-1.5 md:gap-2 text-aoc-gold hover:text-aoc-white transition-colors <?php echo esc_attr('ar' === $language ? 'flex-row-reverse' : ''); ?>">
                    <span class="flex flex-col gap-1 w-4"><span class="block h-px bg-current"></span><span class="block h-px bg-current"></span><span class="block h-px bg-current"></span></span>
                    <span class="text-[10px] md:text-sm font-inter-tight font-light tracking-[0.12em] md:tracking-[0.15em] uppercase"><?php echo esc_html($t['projectsGallery']['learnMore']); ?></span>
                </button>
            </div>
        </div>
    </div>
</section>

<div class="fixed inset-0 bg-aoc-indigo z-50 overflow-hidden hidden" data-project-modal>
    <nav class="fixed top-0 left-0 right-0 z-[70] bg-aoc-black/30 backdrop-blur-md border-b border-white/10 <?php echo esc_attr('ar' === $language ? 'rtl' : 'ltr'); ?>">
        <div class="max-w-screen-2xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
            <a href="#projects" data-close-projects class="h-10 w-auto absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                <img src="<?php echo esc_url(aoc_asset_url($data['media']['logo_mobile'])); ?>" alt="AOC Logo" class="h-full w-auto md:hidden" />
                <img src="<?php echo esc_url(aoc_asset_url($data['media']['logo_white'])); ?>" alt="AOC Logo" class="h-full w-auto hidden md:block" />
            </a>
            <button type="button" class="md:hidden text-aoc-white/80 hover:text-aoc-white transition-colors" data-project-category-toggle>
                <span data-open-icon><?php echo aoc_icon('menu', '', 24); ?></span>
                <span data-close-icon class="hidden"><?php echo aoc_icon('x', '', 24); ?></span>
            </button>
            <button type="button" data-close-projects class="relative w-10 h-10 flex items-center justify-center" aria-label="<?php esc_attr_e('Close projects', 'alosaimi-consulting'); ?>">
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#CAB64B" stroke-width="1"></circle></svg>
                <?php echo aoc_icon('x', 'text-aoc-white hover:text-aoc-gold transition-colors', 20); ?>
            </button>
        </div>
    </nav>

    <div class="fixed inset-0 z-[65] md:hidden transition-all duration-300 invisible opacity-0" data-project-category-panel>
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-project-category-backdrop></div>
        <div class="absolute top-[61px] <?php echo esc_attr('ar' === $language ? 'right-0 border-l translate-x-full' : 'left-0 border-r -translate-x-full'); ?> w-[88vw] max-w-64 h-[calc(100vh-61px)] bg-aoc-black/30 backdrop-blur-md border-white/10 transform transition-transform duration-300" data-project-category-drawer>
            <div class="p-5 space-y-2">
                <?php foreach ($categories as $cat_index => $cat) : ?>
                    <button type="button" data-project-category="<?php echo esc_attr($cat['key']); ?>" class="block w-full <?php echo esc_attr('ar' === $language ? 'text-right' : 'text-left'); ?> py-2.5 font-darker-grotesque font-medium tracking-[0.12em] uppercase transition-all duration-300 <?php echo 0 === $cat_index ? 'text-aoc-gold text-lg' : 'text-aoc-white/70 hover:text-aoc-white text-sm'; ?>"><?php echo esc_html($cat['label']); ?></button>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <div class="h-full pb-14 md:pb-16 flex <?php echo esc_attr('ar' === $language ? 'flex-row-reverse' : 'flex-row'); ?>" style="padding-top:72px;">
        <div class="hidden md:flex w-56 lg:w-64 shrink-0 flex-col justify-center px-6 lg:px-8 <?php echo esc_attr('ar' === $language ? 'border-l border-white/10' : 'border-r border-white/10'); ?>">
            <nav class="space-y-4">
                <?php foreach ($categories as $cat_index => $cat) : ?>
                    <button type="button" data-project-category="<?php echo esc_attr($cat['key']); ?>" class="block w-full text-left font-darker-grotesque font-medium tracking-[0.15em] uppercase transition-all duration-300 <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?> <?php echo 0 === $cat_index ? 'text-aoc-gold text-xl lg:text-2xl' : 'text-aoc-white/70 hover:text-aoc-white text-base'; ?>"><?php echo esc_html($cat['label']); ?></button>
                <?php endforeach; ?>
            </nav>
        </div>

        <div class="flex-1 overflow-y-auto px-4 sm:px-5 md:px-10 lg:px-14 pt-6 md:pt-16 pb-20 md:pb-6 [&::-webkit-scrollbar]:hidden" style="scrollbar-width:none;ms-overflow-style:none;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;contain:layout paint;" data-project-scroll>
            <div class="max-w-5xl mx-auto relative" data-project-content>
                <div class="absolute pointer-events-none hidden md:block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100]" style="opacity:0;will-change:top,left,width,height;" data-project-ring>
                    <svg class="absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 <?php echo esc_attr('ar' === $language ? '-right-6 md:-right-8 lg:-right-10' : '-left-6 md:-left-8 lg:-left-10'); ?> -top-6 md:-top-8 lg:-top-10" viewBox="0 0 100 100" style="overflow:visible;"><circle cx="50" cy="50" r="48" fill="none" stroke="#CAB64B" stroke-width="1.5"></circle></svg>
                </div>

                <?php foreach ($categories as $cat) : ?>
                    <?php $cat_projects = array_values(array_filter($projects, static fn($project) => $project['category'] === $cat['key'])); ?>
                    <?php if (!$cat_projects) { continue; } ?>
                    <div>
                        <div class="h-6 md:h-10 w-full" data-project-section="<?php echo esc_attr($cat['key']); ?>"></div>
                        <div class="space-y-0 pb-12 md:pb-24">
                            <?php foreach ($cat_projects as $local_index => $project) : ?>
                                <?php
                                $localized = $project[$language];
                                $all_images = array_merge([aoc_asset_url($project['image'])], aoc_gallery_urls($project['folder']));
                                ?>
                                <div class="relative" data-project-card data-project-index="<?php echo esc_attr((string) $global_index); ?>">
                                    <?php if ($local_index > 0) : ?>
                                        <div class="w-full flex items-center gap-4 py-6 md:py-14"><div class="flex-1 h-px bg-white/10"></div><div class="w-1 h-1 rounded-full bg-aoc-gold/60"></div><div class="flex-1 h-px bg-white/10"></div></div>
                                    <?php endif; ?>
                                    <div class="rounded-sm overflow-visible transition-all duration-700 p-5 sm:p-6 md:p-12 aoc-glass-card <?php echo 0 === $global_index ? 'is-active' : ''; ?>">
                                        <div class="flex flex-col md:flex-row gap-5 md:gap-8 <?php echo esc_attr('ar' === $language ? 'md:flex-row-reverse' : ''); ?>">
                                            <div class="relative w-full max-w-[15rem] sm:max-w-[17rem] md:max-w-none mx-auto md:mx-0 md:w-[45%] shrink-0" data-project-image>
                                                <div class="relative select-none group aoc-gallery" data-gallery="<?php echo esc_attr(wp_json_encode($all_images)); ?>">
                                                    <div class="aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing relative" data-gallery-stage>
                                                        <img src="<?php echo esc_url($all_images[0]); ?>" alt="<?php echo esc_attr($localized['title']); ?>" loading="lazy" draggable="false" class="absolute inset-0 w-full h-full object-cover" data-gallery-image />
                                                        <?php if (count($all_images) > 1) : ?>
                                                            <button type="button" data-gallery-prev class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-all"><?php echo aoc_icon('chevron-left', '', 16); ?></button>
                                                            <button type="button" data-gallery-next class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-all"><?php echo aoc_icon('chevron-right', '', 16); ?></button>
                                                        <?php endif; ?>
                                                        <button type="button" data-gallery-fullscreen class="absolute top-2 right-2 z-10 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-all"><?php echo aoc_icon('maximize-2', '', 14); ?></button>
                                                    </div>
                                                    <?php if (count($all_images) > 1) : ?>
                                                        <div class="flex justify-center gap-2 md:gap-2.5 mt-2.5 md:mt-3" data-gallery-dots>
                                                            <?php foreach ($all_images as $dot_index => $_image) : ?>
                                                                <button type="button" data-gallery-dot="<?php echo esc_attr((string) $dot_index); ?>" class="relative w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center" aria-label="<?php echo esc_attr('Go to image ' . ($dot_index + 1)); ?>">
                                                                    <span class="w-1.5 h-1.5 rounded-full transition-colors duration-300 <?php echo 0 === $dot_index ? 'bg-aoc-gold' : 'bg-white/50 hover:bg-white/70'; ?>"></span>
                                                                    <?php if (0 === $dot_index) : ?><span class="absolute inset-0 rounded-full border border-aoc-gold transition-opacity duration-300"></span><?php endif; ?>
                                                                </button>
                                                            <?php endforeach; ?>
                                                        </div>
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                            <div class="flex-1 flex flex-col justify-center <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>">
                                                <h2 class="text-[2rem] sm:text-[2.35rem] md:text-4xl lg:text-5xl font-darker-grotesque font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase leading-[0.9] mb-3 md:mb-4" style="color:#F2F2F2;"><?php echo esc_html($localized['title']); ?></h2>
                                                <div class="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 text-aoc-white/60 font-inter-tight font-light text-[0.8rem] md:text-sm <?php echo esc_attr('ar' === $language ? 'flex-row-reverse justify-end' : ''); ?>">
                                                    <span><?php echo esc_html($localized['year']); ?></span><span>/</span><span><?php echo esc_html($localized['location']); ?></span>
                                                </div>
                                                <p class="text-aoc-white/80 text-[0.95rem] md:text-base font-inter-tight font-light leading-[1.85] md:leading-relaxed text-justify"><?php echo esc_html($localized['description']); ?></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php $global_index++; ?>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-aoc-black/30 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center text-aoc-white/50 text-[10px] md:text-sm font-inter-tight font-light tracking-[0.18em] md:tracking-widest z-[70]">
        <span>A</span><span>FOUNDATION</span><span>OF</span><span>TRUST</span>
    </div>
</div>

<div class="fixed inset-0 z-[100] bg-black/95 hidden items-center justify-center" data-lightbox>
    <button type="button" data-lightbox-close class="absolute top-3 right-3 md:top-4 md:right-4 z-[110] w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-colors"><?php echo aoc_icon('x', '', 20); ?></button>
    <div class="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 md:gap-3">
        <button type="button" data-lightbox-zoom-out class="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-colors disabled:opacity-30 disabled:pointer-events-none"><?php echo aoc_icon('zoom-out', '', 16); ?></button>
        <span class="text-white/70 text-xs md:text-sm font-inter-tight font-light min-w-[2.5rem] md:min-w-[3rem] text-center" data-lightbox-zoom>100%</span>
        <button type="button" data-lightbox-zoom-in class="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-colors disabled:opacity-30 disabled:pointer-events-none"><?php echo aoc_icon('zoom-in', '', 16); ?></button>
    </div>
    <button type="button" data-lightbox-prev class="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-9 h-9 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-colors bg-black/40"><?php echo aoc_icon('chevron-left', '', 20); ?></button>
    <button type="button" data-lightbox-next class="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-9 h-9 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-aoc-gold hover:text-aoc-gold transition-colors bg-black/40"><?php echo aoc_icon('chevron-right', '', 20); ?></button>
    <div class="w-full h-full flex items-center justify-center overflow-hidden" data-lightbox-stage>
        <img src="" alt="" draggable="false" class="max-w-[86vw] md:max-w-[90vw] max-h-[72vh] md:max-h-[85vh] object-contain select-none pointer-events-none" data-lightbox-image />
    </div>
</div>

