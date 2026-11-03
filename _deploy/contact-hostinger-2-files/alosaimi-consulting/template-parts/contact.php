<?php
if (!defined('ABSPATH')) {
    exit;
}

$language = $args['language'];
$t = $args['t'];
$contact = $t['contact'] ?? [];
$is_ar = 'ar' === $language;

$phone_1 = $contact['phone1'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_phone_1', '+966 54 419 9866') : '+966 54 419 9866');
$phone_2 = $contact['phone2'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_phone_2', '+966 59 876 5719') : '+966 59 876 5719');
$phones = array_values(array_unique(array_filter([$phone_1, $phone_2], static fn($value): bool => '' !== trim((string) $value))));

$address_fallback = $is_ar ? '19 شارع 207 - دجلة المعادي' : '19 Street 207 - Degla Maadi';
$address = $contact['address'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_address_' . $language, $address_fallback) : $address_fallback);
$maps_url = $contact['mapsUrl'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_maps_url') : '');
$saudi_address_fallback = $is_ar ? 'مبنى مليباري سنتر برج A، شارع صاري، جدة' : 'Malibari Center, Tower A, Sari Street, Jeddah';
$saudi_address = $contact['saAddress'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_address_sa_' . $language, $saudi_address_fallback) : $saudi_address_fallback);
$saudi_maps_url = $contact['saMapsUrl'] ?? (function_exists('aoc_global_get') ? aoc_global_get('contact_maps_sa_url') : '');
$display_email = get_option('aoc_contact_recipient', 'info@alosaimi.sa.com');

if (!$maps_url) {
    $maps_url = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode($address ?: '19 Street 207 Degla Maadi');
}

if (!$saudi_maps_url) {
    $saudi_maps_url = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode($saudi_address ?: 'Malibari Center Tower A Sari Street Jeddah');
}

$normalize_phone = static function (string $phone): string {
    $phone_href = preg_replace('/[^0-9+]/', '', $phone);
    if (!$phone_href) {
        return '';
    }

    if (0 === strpos($phone_href, '00')) {
        return '+' . substr($phone_href, 2);
    }

    if (0 === strpos($phone_href, '0')) {
        return '+966' . substr($phone_href, 1);
    }

    if (0 === strpos($phone_href, '966')) {
        return '+' . $phone_href;
    }

    return 0 === strpos($phone_href, '+') ? $phone_href : '+' . $phone_href;
};

$phone_links = [];
foreach ($phones as $phone) {
    $phone_links[] = [
        'label' => $phone,
        'href' => $normalize_phone($phone),
    ];
}

$labels = [
    'email' => $is_ar ? 'البريد الإلكتروني' : 'Email',
    'phone' => $is_ar ? 'أرقام التواصل' : 'Phone',
    'headquarter' => $is_ar ? 'العنوان' : 'Address',
    'follow' => $is_ar ? 'تابعنا' : 'Follow Us',
    'message' => $is_ar ? 'الرسالة:' : 'Message:',
    'message_placeholder' => $is_ar ? 'اكتب رسالتك' : 'type your message',
    'email_required' => $is_ar ? 'البريد الإلكتروني (مطلوب)' : 'E-mail (Required)',
    'submit' => $is_ar ? 'إرسال' : 'Submit',
    'egypt_office' => $is_ar ? 'مكتب القاهرة' : 'Cairo Office',
    'saudi_office' => $is_ar ? 'مكتب جدة' : 'Jeddah Office',
    'open_maps' => $is_ar ? 'فتح في خرائط جوجل' : 'Open in Google Maps',
];

$field_labels = [
    'first_name' => $contact['firstName'] ?? ($is_ar ? 'الاسم الأول' : 'FIRST NAME'),
    'last_name' => $contact['lastName'] ?? ($is_ar ? 'الاسم الأخير' : 'LAST NAME'),
    'email' => $labels['email_required'],
];

$social_links = [
    'linkedin' => function_exists('aoc_global_get') ? aoc_global_get('social_linkedin') : '',
    'instagram' => function_exists('aoc_global_get') ? aoc_global_get('social_instagram') : '',
    'facebook' => function_exists('aoc_global_get') ? aoc_global_get('social_facebook') : '',
];

$title_lines = preg_split('/\r\n|\r|\n/', trim((string) ($contact['title'] ?? '')));
if (!$title_lines || '' === trim(implode('', $title_lines))) {
    $title_lines = $is_ar ? ['اتصل بنا'] : ['CONTACT', 'US'];
}

if (!$is_ar && 1 === count($title_lines) && preg_match('/^(.*?)\s+(US)$/i', $title_lines[0], $matches)) {
    $title_lines = [trim($matches[1]), strtoupper($matches[2])];
}
?>
<style>
    .aoc-hero-scroll,
    .aoc-hero-scroll-label {
        display: none !important;
    }

    .aoc-final-contact {
        min-height: 100svh;
        scroll-margin-top: 4rem;
        position: relative;
        overflow: hidden;
        padding: clamp(58px, 5.3vw, 76px) clamp(34px, 5vw, 88px) clamp(28px, 3vw, 40px);
        background: #003087;
        color: #f2f2f2;
    }

    .aoc-final-contact,
    .aoc-final-contact * {
        box-sizing: border-box;
    }

    .aoc-final-contact.rtl {
        direction: rtl;
    }

    .aoc-final-contact__wrap {
        width: min(100%, 1480px);
        margin: 0 auto;
        display: grid;
        grid-template-columns: clamp(110px, 10vw, 150px) minmax(340px, 0.82fr) minmax(420px, 1fr);
        gap: clamp(24px, 2.8vw, 48px);
        align-items: start;
    }

    .aoc-final-contact__circle-column {
        min-height: 100%;
        padding-top: 10px;
    }

    .aoc-final-contact__ring {
        width: clamp(96px, 7.6vw, 122px);
        aspect-ratio: 1;
        border: 2px solid rgba(202, 182, 75, 0.86);
        border-radius: 50%;
        pointer-events: none;
    }

    .aoc-final-contact__content-column {
        min-width: 0;
    }

    .aoc-final-contact__title {
        width: max-content;
        max-width: 100%;
        margin: 0;
        color: #f2f2f2;
        font-family: "Darker Grotesque", sans-serif;
        font-size: clamp(66px, 7vw, 104px);
        font-weight: 300;
        line-height: 0.78;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }

    .aoc-final-contact__title-line {
        display: block;
        width: max-content;
        max-width: 100%;
    }

    .aoc-final-contact__title-line--second {
        margin-top: clamp(-8px, -0.6vw, -4px);
        margin-left: auto;
    }

    .rtl .aoc-final-contact__title {
        width: 100%;
        font-family: "Fustat", sans-serif;
        font-size: clamp(54px, 5.5vw, 82px);
        line-height: 1.08;
        text-align: right;
    }

    .rtl .aoc-final-contact__title-line,
    .rtl .aoc-final-contact__title-line--second {
        width: auto;
        margin: 0;
    }

    .aoc-final-contact__info {
        width: 100%;
        margin-top: clamp(42px, 5vw, 68px);
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: clamp(26px, 3vw, 42px) clamp(22px, 2.5vw, 38px);
    }

    .aoc-final-contact__item {
        min-width: 0;
        color: rgba(242, 242, 242, 0.92);
        text-decoration: none;
    }

    .aoc-final-contact__label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: #f2f2f2;
        font-family: "Inter Tight", sans-serif;
        font-size: clamp(16px, 1.25vw, 22px);
        font-weight: 400;
        line-height: 1.1;
    }

    .aoc-final-contact__icon {
        width: clamp(18px, 1.35vw, 23px);
        height: clamp(18px, 1.35vw, 23px);
        flex: 0 0 auto;
        color: #cab64b;
    }

    .aoc-final-contact__text,
    .aoc-final-contact__phone-link {
        display: block;
        color: rgba(242, 242, 242, 0.82);
        font-family: "Inter Tight", sans-serif;
        font-size: clamp(14px, 1.05vw, 18px);
        font-weight: 300;
        line-height: 1.3;
        text-decoration: none;
    }

    .aoc-final-contact__phone-link {
        direction: ltr;
        unicode-bidi: isolate;
    }

    .rtl .aoc-final-contact__phone-link {
        text-align: right;
    }

    .aoc-final-contact__phone-list {
        display: grid;
        gap: 5px;
    }

    .aoc-final-contact__address-list {
        display: grid;
        gap: 10px;
    }

    .aoc-final-contact__address-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 30px;
        gap: 8px;
        align-items: start;
    }

    .aoc-final-contact__address-row--saudi {
        order: 1;
    }

    .aoc-final-contact__address-row--egypt {
        order: 2;
    }

    .aoc-final-contact__address-copy {
        min-width: 0;
    }

    .aoc-final-contact__address-name {
        display: block;
        margin-bottom: 2px;
        color: rgba(242, 242, 242, 0.62);
        font-family: "Inter Tight", sans-serif;
        font-size: 12px;
        font-weight: 300;
        line-height: 1.2;
    }

    .aoc-final-contact__map-button {
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(202, 182, 75, 0.52);
        color: #cab64b;
        text-decoration: none;
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .aoc-final-contact__map-button:hover {
        border-color: #cab64b;
        background: #cab64b;
        color: #003087;
    }

    .aoc-final-contact__map-button svg {
        width: 16px;
        height: 16px;
    }

    .aoc-final-contact__phone-link:hover,
    .aoc-final-contact__item[href]:hover .aoc-final-contact__text {
        color: #cab64b;
    }

    .aoc-final-contact__social {
        display: flex;
        gap: 10px;
        margin-top: 8px;
    }

    .aoc-final-contact__social a {
        color: #f2f2f2;
        opacity: 0.9;
        transition: color 0.2s ease, opacity 0.2s ease;
    }

    .aoc-final-contact__social a:hover {
        color: #cab64b;
        opacity: 1;
    }

    .aoc-final-contact__social svg {
        width: clamp(18px, 1.35vw, 23px);
        height: clamp(18px, 1.35vw, 23px);
    }

    .aoc-final-contact__form {
        min-width: 0;
        padding-top: clamp(52px, 5vw, 70px);
        display: grid;
        gap: clamp(14px, 1.35vw, 20px);
    }

    .aoc-final-contact__row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: clamp(22px, 3vw, 38px);
    }

    .aoc-final-contact__field {
        position: relative;
        display: block;
        min-width: 0;
    }

    .aoc-final-contact__input {
        width: 100%;
        height: 36px;
        padding: 0 0 9px;
        border: 0;
        border-bottom: 1px solid rgba(242, 242, 242, 0.24);
        border-radius: 0;
        outline: none;
        background: transparent;
        color: #f2f2f2;
        font-family: "Inter Tight", sans-serif;
        font-size: clamp(16px, 1.25vw, 21px);
        font-weight: 300;
        line-height: 1;
    }

    .aoc-final-contact__input::placeholder {
        color: transparent;
        opacity: 0;
    }

    .aoc-final-contact__field-label {
        position: absolute;
        top: 50%;
        left: 0;
        max-width: 100%;
        overflow: hidden;
        color: rgba(242, 242, 242, 0.68);
        font-family: "Inter Tight", sans-serif;
        font-size: clamp(16px, 1.25vw, 21px);
        font-weight: 300;
        line-height: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
        transform: translateY(-72%);
        transition: opacity 0.16s ease;
    }

    .rtl .aoc-final-contact__field-label {
        right: 0;
        left: auto;
    }

    .aoc-final-contact__field:focus-within .aoc-final-contact__field-label,
    .aoc-final-contact__input:not(:placeholder-shown) + .aoc-final-contact__field-label {
        opacity: 0;
    }

    .aoc-final-contact__input:focus {
        border-bottom-color: #cab64b;
    }

    .aoc-final-contact__message-label {
        margin: 0 0 10px;
        color: rgba(242, 242, 242, 0.92);
        font-family: "Inter Tight", sans-serif;
        font-size: clamp(22px, 2vw, 30px);
        font-weight: 300;
        line-height: 1;
    }

    .aoc-final-contact__textarea-field {
        position: relative;
    }

    .aoc-final-contact__textarea {
        width: 100%;
        min-height: clamp(178px, 20vw, 238px);
        padding: 20px 22px;
        border: 0;
        outline: none;
        resize: vertical;
        background: rgba(0, 42, 94, 0.82);
        color: #f2f2f2;
        font-family: "Inter Tight", sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.6;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 18px 44px rgba(0, 26, 73, 0.12);
    }

    .aoc-final-contact__textarea::placeholder {
        color: transparent;
        opacity: 0;
    }

    .aoc-final-contact__textarea-field-label {
        position: absolute;
        top: 20px;
        left: 22px;
        color: rgba(242, 242, 242, 0.68);
        font-family: "Inter Tight", sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.2;
        pointer-events: none;
        transition: opacity 0.16s ease;
    }

    .rtl .aoc-final-contact__textarea-field-label {
        right: 22px;
        left: auto;
    }

    .aoc-final-contact__textarea-field:focus-within .aoc-final-contact__textarea-field-label,
    .aoc-final-contact__textarea:not(:placeholder-shown) + .aoc-final-contact__textarea-field-label {
        opacity: 0;
    }

    .aoc-final-contact__status {
        min-height: 16px;
        margin: -6px 0 0;
        color: #cab64b;
        font-family: "Inter Tight", sans-serif;
        font-size: 13px;
        font-weight: 300;
    }

    .aoc-final-contact__submit {
        justify-self: end;
        min-width: 114px;
        padding: 10px 26px 11px;
        border: 0;
        background: #cab64b;
        color: #003087;
        font-family: "Inter Tight", sans-serif;
        font-size: clamp(15px, 1.2vw, 19px);
        font-weight: 300;
        line-height: 1;
        transition: background 0.2s ease, color 0.2s ease;
    }

    .aoc-final-contact__submit:hover {
        background: #d7c553;
        color: #001f5f;
    }

    .rtl .aoc-final-contact__submit {
        justify-self: start;
    }

    @media (max-width: 980px) {
        .aoc-final-contact {
            min-height: 100svh;
            overflow: visible;
            padding: 104px clamp(26px, 6vw, 54px) 58px;
        }

        .aoc-final-contact__wrap {
            position: relative;
            grid-template-columns: 96px minmax(0, 1fr);
            grid-template-areas:
                "circle title"
                "form form"
                "info info";
            gap: 34px 20px;
        }

        .aoc-final-contact__circle-column {
            grid-area: circle;
            min-height: 96px;
            padding: 0;
        }

        .aoc-final-contact__ring {
            width: 88px;
        }

        .aoc-final-contact__content-column {
            display: contents;
        }

        .aoc-final-contact__title {
            grid-area: title;
            align-self: start;
            font-size: clamp(58px, 14vw, 82px);
        }

        .aoc-final-contact__info {
            grid-area: info;
            margin-top: 0;
        }

        .aoc-final-contact__form {
            grid-area: form;
            padding-top: 0;
        }

        .aoc-final-contact__textarea {
            min-height: 250px;
        }
    }

    @media (max-width: 640px) {
        .aoc-final-contact {
            padding: 96px 24px 50px;
        }

        .aoc-final-contact__wrap {
            grid-template-columns: 88px minmax(0, 1fr);
            gap: 30px 18px;
        }

        .aoc-final-contact__title {
            font-size: clamp(52px, 16vw, 70px);
        }

        .aoc-final-contact__info {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .aoc-final-contact__label {
            font-size: 18px;
        }

        .aoc-final-contact__text,
        .aoc-final-contact__phone-link {
            font-size: 15px;
        }

        .aoc-final-contact__row {
            grid-template-columns: 1fr;
            gap: 22px;
        }

        .aoc-final-contact__textarea {
            min-height: 220px;
        }

        .aoc-final-contact__submit {
            justify-self: stretch;
        }
    }
</style>

<section id="contact" class="aoc-final-contact <?php echo esc_attr($is_ar ? 'rtl' : ''); ?>">
    <div class="aoc-final-contact__wrap">
        <div class="aoc-final-contact__circle-column" aria-hidden="true">
            <div class="aoc-final-contact__ring"></div>
        </div>

        <div class="aoc-final-contact__content-column">
            <h2 class="aoc-final-contact__title">
                <?php foreach ($title_lines as $line_index => $title_line) : ?>
                    <?php if ('' !== trim($title_line)) : ?>
                        <span class="aoc-final-contact__title-line <?php echo esc_attr(1 === $line_index ? 'aoc-final-contact__title-line--second' : ''); ?>">
                            <?php echo esc_html($title_line); ?>
                        </span>
                    <?php endif; ?>
                <?php endforeach; ?>
            </h2>

            <div class="aoc-final-contact__info">
                <?php if ($display_email) : ?>
                    <a class="aoc-final-contact__item" href="mailto:<?php echo esc_attr($display_email); ?>">
                        <span class="aoc-final-contact__label"><?php echo esc_html($labels['email']); ?></span>
                        <span class="aoc-final-contact__text"><?php echo esc_html($display_email); ?></span>
                    </a>
                <?php endif; ?>

                <div class="aoc-final-contact__item">
                    <span class="aoc-final-contact__label"><?php echo esc_html($labels['headquarter']); ?></span>
                    <div class="aoc-final-contact__address-list">
                        <?php if ($address) : ?>
                            <div class="aoc-final-contact__address-row aoc-final-contact__address-row--egypt">
                                <div class="aoc-final-contact__address-copy">
                                    <span class="aoc-final-contact__address-name"><?php echo esc_html($labels['egypt_office']); ?></span>
                                    <span class="aoc-final-contact__text"><?php echo esc_html($address); ?></span>
                                </div>
                                <a class="aoc-final-contact__map-button" href="<?php echo esc_url($maps_url); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr($labels['open_maps'] . ': ' . $labels['egypt_office']); ?>" title="<?php echo esc_attr($labels['open_maps']); ?>">
                                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        <?php endif; ?>

                        <?php if ($saudi_address) : ?>
                            <div class="aoc-final-contact__address-row aoc-final-contact__address-row--saudi">
                                <div class="aoc-final-contact__address-copy">
                                    <span class="aoc-final-contact__address-name"><?php echo esc_html($labels['saudi_office']); ?></span>
                                    <span class="aoc-final-contact__text"><?php echo esc_html($saudi_address); ?></span>
                                </div>
                                <a class="aoc-final-contact__map-button" href="<?php echo esc_url($saudi_maps_url); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr($labels['open_maps'] . ': ' . $labels['saudi_office']); ?>" title="<?php echo esc_attr($labels['open_maps']); ?>">
                                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if ($phone_links) : ?>
                    <div class="aoc-final-contact__item">
                        <span class="aoc-final-contact__label">
                            <?php echo esc_html($labels['phone']); ?>
                            <svg class="aoc-final-contact__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.69a16 16 0 0 0 6.31 6.31l1.25-1.25a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <div class="aoc-final-contact__phone-list">
                            <?php foreach ($phone_links as $phone_link) : ?>
                                <a class="aoc-final-contact__phone-link" href="tel:<?php echo esc_attr($phone_link['href']); ?>">
                                    <?php echo esc_html($phone_link['label']); ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>

                <div class="aoc-final-contact__item">
                    <span class="aoc-final-contact__label"><?php echo esc_html($labels['follow']); ?></span>
                    <div class="aoc-final-contact__social">
                        <?php foreach ($social_links as $name => $url) : ?>
                            <?php if ($url && function_exists('aoc_icon')) : ?>
                                <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr(ucfirst($name)); ?>">
                                    <?php echo aoc_icon($name, '', 16); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                                </a>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

        <form class="aoc-final-contact__form" data-contact-form>
            <?php wp_nonce_field('aoc_contact_nonce', 'aoc_contact_nonce'); ?>
            <input type="text" name="company" value="" tabindex="-1" autocomplete="off" class="aoc-honeypot" aria-hidden="true" />
            <input type="hidden" name="language" value="<?php echo esc_attr($language); ?>" />

            <div class="aoc-final-contact__row">
                <label class="aoc-final-contact__field">
                    <input type="text" name="firstName" placeholder=" " aria-label="<?php echo esc_attr($field_labels['first_name']); ?>" class="aoc-final-contact__input" required />
                    <span class="aoc-final-contact__field-label"><?php echo esc_html($field_labels['first_name']); ?></span>
                </label>
                <label class="aoc-final-contact__field">
                    <input type="text" name="lastName" placeholder=" " aria-label="<?php echo esc_attr($field_labels['last_name']); ?>" class="aoc-final-contact__input" required />
                    <span class="aoc-final-contact__field-label"><?php echo esc_html($field_labels['last_name']); ?></span>
                </label>
            </div>

            <label class="aoc-final-contact__field">
                <input type="email" name="email" placeholder=" " aria-label="<?php echo esc_attr($field_labels['email']); ?>" class="aoc-final-contact__input" required />
                <span class="aoc-final-contact__field-label"><?php echo esc_html($field_labels['email']); ?></span>
            </label>

            <div>
                <p class="aoc-final-contact__message-label"><?php echo esc_html($labels['message']); ?></p>
                <div class="aoc-final-contact__textarea-field">
                    <textarea name="message" placeholder=" " aria-label="<?php echo esc_attr($labels['message_placeholder']); ?>" rows="7" class="aoc-final-contact__textarea" required></textarea>
                    <span class="aoc-final-contact__textarea-field-label"><?php echo esc_html($labels['message_placeholder']); ?></span>
                </div>
            </div>

            <p class="aoc-final-contact__status hidden" data-contact-message></p>

            <button type="submit" class="aoc-final-contact__submit">
                <?php echo esc_html($labels['submit']); ?>
            </button>
        </form>
    </div>
</section>
