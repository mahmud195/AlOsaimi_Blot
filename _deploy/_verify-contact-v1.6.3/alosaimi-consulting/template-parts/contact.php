<?php
if (!defined('ABSPATH')) {
    exit;
}

$language = $args['language'];
$t = $args['t'];
$contact = $t['contact'] ?? [];
$phone = $contact['phone'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_phone', '0560740142') : '0560740142');
$address = $contact['address'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_address_' . $language, 'ar' === $language ? 'مبنى مليباري سنتر برج A، شارع صاري، جدة' : 'Malibari Center, Tower A, Sari Street, Jeddah') : '');
$phone_href = preg_replace('/[^0-9+]/', '', $phone);
$phone_label = 'ar' === $language ? 'رقم التواصل' : 'Phone';
$address_label = 'ar' === $language ? 'العنوان' : 'Address';
?>
<section id="contact" class="scroll-mt-16 min-h-screen bg-aoc-indigo flex items-center py-16 md:py-24 <?php echo esc_attr('ar' === $language ? 'rtl' : ''); ?>">
    <div class="max-w-3xl mx-auto px-4 sm:px-5 md:px-8 w-full animate-slide-up <?php echo esc_attr('ar' === $language ? 'text-right' : ''); ?>">
        <h2 class="text-[3.5rem] sm:text-[4.5rem] md:text-6xl font-darker-grotesque font-extralight tracking-[0.12em] md:tracking-[0.2em] uppercase mb-3 md:mb-4 leading-[0.9] md:leading-tight text-aoc-gold whitespace-pre-line"><?php aoc_multiline($t['contact']['title']); ?></h2>
        <div class="w-24 h-[1px] bg-aoc-gold mb-8 md:mb-10 <?php echo esc_attr('ar' === $language ? 'ml-auto' : ''); ?>"></div>

        <div class="aoc-contact-info grid gap-4 md:grid-cols-2 mb-10 md:mb-14">
            <?php if ($phone) : ?>
                <a href="tel:<?php echo esc_attr($phone_href); ?>" class="group block border border-aoc-gold/30 px-5 py-4 transition-colors hover:border-aoc-gold">
                    <span class="block text-[10px] md:text-xs font-inter-tight font-light tracking-[0.18em] uppercase text-aoc-gold mb-2"><?php echo esc_html($phone_label); ?></span>
                    <span class="block text-aoc-white/85 text-base md:text-lg font-inter-tight font-light tracking-[0.05em] group-hover:text-aoc-white"><?php echo esc_html($phone); ?></span>
                </a>
            <?php endif; ?>

            <?php if ($address) : ?>
                <div class="block border border-aoc-gold/30 px-5 py-4">
                    <span class="block text-[10px] md:text-xs font-inter-tight font-light tracking-[0.18em] uppercase text-aoc-gold mb-2"><?php echo esc_html($address_label); ?></span>
                    <span class="block text-aoc-white/85 text-base md:text-lg font-inter-tight font-light leading-relaxed"><?php echo esc_html($address); ?></span>
                </div>
            <?php endif; ?>
        </div>

        <form class="space-y-6 md:space-y-8" data-contact-form>
            <?php wp_nonce_field('aoc_contact_nonce', 'aoc_contact_nonce'); ?>
            <input type="text" name="company" value="" tabindex="-1" autocomplete="off" class="aoc-honeypot" aria-hidden="true" />
            <input type="hidden" name="language" value="<?php echo esc_attr($language); ?>" />
            <div class="grid md:grid-cols-2 gap-6 md:gap-8">
                <input type="text" name="firstName" placeholder="<?php echo esc_attr($t['contact']['firstName']); ?>" class="w-full bg-transparent border-b border-aoc-gold/30 py-3 md:py-4 text-base text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] md:tracking-[0.15em] transition-colors" required />
                <input type="text" name="lastName" placeholder="<?php echo esc_attr($t['contact']['lastName']); ?>" class="w-full bg-transparent border-b border-aoc-gold/30 py-3 md:py-4 text-base text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] md:tracking-[0.15em] transition-colors" required />
            </div>
            <input type="email" name="email" placeholder="<?php echo esc_attr($t['contact']['email']); ?>" class="w-full bg-transparent border-b border-aoc-gold/30 py-3 md:py-4 text-base text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] md:tracking-[0.15em] transition-colors" required />
            <textarea name="message" placeholder="<?php echo esc_attr($t['contact']['message']); ?>" rows="6" class="w-full bg-transparent border-b border-aoc-gold/30 py-3 md:py-4 text-base text-aoc-white placeholder-aoc-white/40 focus:border-aoc-gold focus:outline-none font-inter-tight font-light tracking-[0.08em] md:tracking-[0.15em] resize-none transition-colors" required></textarea>
            <p class="hidden text-sm font-inter-tight font-light tracking-[0.08em]" data-contact-message></p>
            <button type="submit" class="w-full sm:w-auto bg-aoc-gold text-aoc-black px-8 md:px-12 py-3.5 md:py-4 text-xs md:text-sm font-inter-tight font-light tracking-[0.14em] md:tracking-[0.2em] uppercase hover:bg-aoc-gold/90 transition-colors">
                <?php echo esc_html($t['contact']['send']); ?>
            </button>
        </form>
    </div>
</section>
