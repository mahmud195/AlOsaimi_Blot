<?php
/**
 * Global content fields – editable from WordPress admin without JSON.
 *
 * Adds a tabbed settings page under the "Al Osaimi Content" menu that
 * lets the client edit hero, about, CEO, social, media, and contact
 * sections from a clean form interface.
 */

if (!defined('ABSPATH')) {
    exit;
}

/* ──────────────────────────────────────────────
 * 1.  Option key & defaults
 * ────────────────────────────────────────────── */

const AOC_GLOBAL_OPTION = 'aoc_global_fields';

function aoc_global_defaults(): array
{
    return [
        /* Hero */
        'hero_title_en'   => 'PRECISION   •   INNOVATION   •   TRUST   •   PRECISION   •   INNOVATION   •   TRUST   •   ',
        'hero_words_ar'   => 'الثقة • الابتكار • الدقة • الثقة • الابتكار • الدقة • الثقة • الابتكار • الدقة •',

        /* About */
        'about_title_en'       => "ABOUT\nUS",
        'about_title_ar'       => "من\nنحن",
        'about_paragraph1_en'  => 'Al Osaimi Consulting Office is a trusted partner dedicated to advancing the future of urban development and engineering. Guided by extensive expertise and an ambitious vision, we strive to build stronger connections with our clients while reinforcing our presence in the Kingdom of Saudi Arabia and pursuing continuous expansion beyond its borders.',
        'about_paragraph1_ar'  => 'مكتب العصيمي للاستشارات شريك موثوق مكرس للنهوض بمستقبل التنمية العمرانية والهندسة. مسترشدين بخبرة واسعة ورؤية طموحة، نسعى لبناء روابط أقوى مع عملائنا مع تعزيز حضورنا في المملكة العربية السعودية ومتابعة التوسع المستمر خارج حدودها.',
        'about_paragraph2_en'  => 'At Al Osaimi Consulting, we place quality and innovation at the core of everything we do, delivering engineering solutions that exceed standards and meet the aspirations of our clients, affirming our mission to lead in the world of engineering consultancy.',
        'about_paragraph2_ar'  => 'في العصيمي للاستشارات، نضع الجودة والابتكار في صميم كل ما نقوم به، ونقدم حلولاً هندسية تتجاوز المعايير وتلبي تطلعات عملائنا، مؤكدين على مهمتنا في الريادة في عالم الاستشارات الهندسية.',

        /* CEO */
        'ceo_speech_title_en'  => "CEO'S\nSPEECH",
        'ceo_speech_title_ar'  => "كلمة\nالرئيس التنفيذي",
        'ceo_name_en'          => "ENG. ABDULLAH\nMOHAMMED HAMDAN",
        'ceo_name_ar'          => "م. عبدالله\nمحمد حمدان",
        'ceo_title_en'         => 'CHIEF EXECUTIVE OFFICER & HEAD OF DEVELOPMENT',
        'ceo_title_ar'         => 'الرئيس التنفيذي ورئيس التطوير',
        'ceo_speech_en'        => "At Al Osaimi Consulting, we take pride in a legacy built through perseverance and a commitment to excellence.\nThe principles that guided our foundation hard work, precision, and reliability, remain the cornerstone of our continued growth and success.\nAs we move forward, our focus is on developing this legacy through innovation, expanding our expertise, and maintaining the same level of dedication that has defined us since the beginning.\nEach project we undertake is a new opportunity to reaffirm our standards, strengthen our relationships, and create lasting value for our clients and communities.\nOur journey is one of continuous growth grounded in the belief that progress is achieved through consistent effort and an unwavering pursuit of quality.\nAt Al Osaimi Consulting, we honor our foundation not by looking back, but by building forward with the same determination that brought us here.",
        'ceo_speech_ar'        => "في الاستشارات، نفتخر بإرث تم بناؤه من خلال المثابرة والالتزام بالتميز.\nالمبادئ التي وجهت أساسنا من العمل الجاد والدقة والموثوقية، تظل حجر الزاوية في نمونا المستمر ونجاحنا.\nبينما نمضي قدماً، ينصب تركيزنا على تطوير هذا الإرث من خلال الابتكار، وتوسيع خبراتنا، والحفاظ على نفس المستوى من التفاني الذي ميزنا منذ البداية.\nكل مشروع نتولاه هو فرصة جديدة للتأكيد على معاييرنا، وتعزيز علاقاتنا، وخلق قيمة دائمة لعملائنا ومجتمعاتنا.\nرحلتنا هي رحلة نمو مستمر يرتكز على الإيمان بأن التقدم يتحقق من خلال الجهد المستمر والسعي الدؤوب لتحقيق الجودة.\nفي الاستشارات، لا نكرم أساسنا من خلال النظر إلى الوراء، ولكن من خلال البناء إلى الأمام بنفس التصميم الذي أوصلنا إلى هنا.",

        /* Services section intro */
        'services_title_en'    => "OUR\nSERVICES",
        'services_title_ar'    => 'خدماتنا',
        'services_intro_en'    => 'We provide comprehensive architectural and engineering solutions tailored to transform your vision into exceptional built environments. Our services span from conceptual design through project delivery, combining innovative thinking with technical excellence.',
        'services_intro_ar'    => 'نقدم حلولاً معمارية وهندسية شاملة مصممة خصيصاً لتحويل رؤيتك إلى بيئات مبنية استثنائية. تمتد خدماتنا من التصميم الأولي حتى تسليم المشروع، حيث نجمع بين التفكير المبتكر والتميز التقني.',
        'services_builton_en'  => 'Built on a solid foundation of trust and driven by a relentless passion for excellence, we create innovative solutions that contribute to building a sustainable future.',
        'services_builton_ar'  => 'بُنيت على أساس متين من الثقة ومدفوعة بشغف لا هوادة فيه للتميز، نعمل على إيجاد حلول مبتكرة تساهم في بناء مستقبل مستدام.',

        /* Projects section */
        'projects_title_en'    => 'OUR PROJECTS',
        'projects_title_ar'    => 'مشاريعنا',

        /* Contact */
        'contact_title_en'     => "CONTACT\nUS",
        'contact_title_ar'     => 'اتصل بنا',

        /* Social */
        'social_linkedin'      => 'https://www.linkedin.com/company/alosaimiconsulting/',
        'social_instagram'     => 'https://www.instagram.com/alosaimiconsulting/',
        'social_facebook'      => 'https://www.facebook.com/alosaimiconsulting',
        'social_befound'       => 'https://www.befound.design/',

        /* Media (attachment IDs – 0 means use built-in) */
        'media_logo_white_id'   => 0,
        'media_logo_mobile_id'  => 0,
        'media_favicon_id'      => 0,
        'media_hero_video_id'   => 0,
        'media_hero_poster_id'  => 0,
        'media_about_image_id'  => 0,
        'media_befound_logo_id' => 0,

        /* Bottom bar text */
        'bottom_bar_text'       => 'A FOUNDATION OF TRUST',
    ];
}

function aoc_global_get(string $key, string $fallback = ''): string
{
    $all = get_option(AOC_GLOBAL_OPTION, []);
    $defaults = aoc_global_defaults();

    if (is_array($all) && isset($all[$key]) && '' !== $all[$key]) {
        return (string) $all[$key];
    }

    return isset($defaults[$key]) ? (string) $defaults[$key] : $fallback;
}

function aoc_global_get_int(string $key): int
{
    return absint(aoc_global_get($key, '0'));
}

/* ──────────────────────────────────────────────
 * 2.  Admin sub-page
 * ────────────────────────────────────────────── */

function aoc_global_fields_menu(): void
{
    add_submenu_page(
        'aoc-content',
        __('Global Settings', 'alosaimi-consulting'),
        __('Global Settings', 'alosaimi-consulting'),
        'manage_options',
        'aoc-global-fields',
        'aoc_global_fields_page'
    );
}
add_action('admin_menu', 'aoc_global_fields_menu');

function aoc_global_fields_register(): void
{
    register_setting('aoc_global_fields_group', AOC_GLOBAL_OPTION, [
        'type' => 'array',
        'sanitize_callback' => 'aoc_global_fields_sanitize',
    ]);
}
add_action('admin_init', 'aoc_global_fields_register');

function aoc_global_fields_sanitize(array $input): array
{
    $clean = [];
    $defaults = aoc_global_defaults();

    foreach ($defaults as $key => $default) {
        if (!isset($input[$key])) {
            $clean[$key] = $default;
            continue;
        }

        if (str_ends_with($key, '_id')) {
            $clean[$key] = absint($input[$key]);
        } elseif (str_starts_with($key, 'social_')) {
            $clean[$key] = esc_url_raw($input[$key]);
        } else {
            $clean[$key] = sanitize_textarea_field($input[$key]);
        }
    }

    return $clean;
}

/* ──────────────────────────────────────────────
 * 3.  Admin page renderer
 * ────────────────────────────────────────────── */

function aoc_global_fields_page(): void
{
    if (!current_user_can('manage_options')) {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_script(
        'aoc-admin-cms',
        get_template_directory_uri() . '/assets/js/admin-cms.js',
        ['jquery'],
        filemtime(get_template_directory() . '/assets/js/admin-cms.js'),
        true
    );

    $tabs = [
        'hero'     => __('Hero', 'alosaimi-consulting'),
        'about'    => __('About & CEO', 'alosaimi-consulting'),
        'services' => __('Services', 'alosaimi-consulting'),
        'projects' => __('Projects', 'alosaimi-consulting'),
        'contact'  => __('Contact', 'alosaimi-consulting'),
        'social'   => __('Social Links', 'alosaimi-consulting'),
        'media'    => __('Media & Logo', 'alosaimi-consulting'),
        'misc'     => __('Misc', 'alosaimi-consulting'),
    ];

    $active_tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'hero';
    if (!isset($tabs[$active_tab])) {
        $active_tab = 'hero';
    }

    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Global Settings', 'alosaimi-consulting'); ?></h1>
        <p><?php esc_html_e('Edit the website global content. Changes apply immediately on the front-end.', 'alosaimi-consulting'); ?></p>

        <h2 class="nav-tab-wrapper">
            <?php foreach ($tabs as $slug => $label) : ?>
                <a href="<?php echo esc_url(admin_url('admin.php?page=aoc-global-fields&tab=' . $slug)); ?>"
                   class="nav-tab <?php echo $slug === $active_tab ? 'nav-tab-active' : ''; ?>"
                ><?php echo esc_html($label); ?></a>
            <?php endforeach; ?>
        </h2>

        <form method="post" action="options.php">
            <?php settings_fields('aoc_global_fields_group'); ?>

            <?php
            switch ($active_tab) {
                case 'hero':
                    aoc_gf_render_hero();
                    break;
                case 'about':
                    aoc_gf_render_about();
                    break;
                case 'services':
                    aoc_gf_render_services();
                    break;
                case 'projects':
                    aoc_gf_render_projects();
                    break;
                case 'contact':
                    aoc_gf_render_contact();
                    break;
                case 'social':
                    aoc_gf_render_social();
                    break;
                case 'media':
                    aoc_gf_render_media();
                    break;
                case 'misc':
                    aoc_gf_render_misc();
                    break;
            }
            ?>

            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

/* ──────────────────────────────────────────────
 * 4.  Field helpers
 * ────────────────────────────────────────────── */

function aoc_gf_text(string $key, string $label, string $desc = ''): void
{
    $value = aoc_global_get($key);
    $id = 'aoc_gf_' . $key;
    ?>
    <tr>
        <th scope="row"><label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label></th>
        <td>
            <input id="<?php echo esc_attr($id); ?>" name="<?php echo esc_attr(AOC_GLOBAL_OPTION . '[' . $key . ']'); ?>"
                   type="text" class="large-text" value="<?php echo esc_attr($value); ?>" />
            <?php if ($desc) : ?><p class="description"><?php echo esc_html($desc); ?></p><?php endif; ?>
        </td>
    </tr>
    <?php
}

function aoc_gf_textarea(string $key, string $label, int $rows = 4, string $desc = ''): void
{
    $value = aoc_global_get($key);
    $id = 'aoc_gf_' . $key;
    ?>
    <tr>
        <th scope="row"><label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label></th>
        <td>
            <textarea id="<?php echo esc_attr($id); ?>" name="<?php echo esc_attr(AOC_GLOBAL_OPTION . '[' . $key . ']'); ?>"
                      rows="<?php echo esc_attr((string) $rows); ?>" class="large-text"><?php echo esc_textarea($value); ?></textarea>
            <?php if ($desc) : ?><p class="description"><?php echo esc_html($desc); ?></p><?php endif; ?>
        </td>
    </tr>
    <?php
}

function aoc_gf_url(string $key, string $label): void
{
    $value = aoc_global_get($key);
    $id = 'aoc_gf_' . $key;
    ?>
    <tr>
        <th scope="row"><label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label></th>
        <td>
            <input id="<?php echo esc_attr($id); ?>" name="<?php echo esc_attr(AOC_GLOBAL_OPTION . '[' . $key . ']'); ?>"
                   type="url" class="large-text" value="<?php echo esc_attr($value); ?>" placeholder="https://" />
        </td>
    </tr>
    <?php
}

function aoc_gf_image(string $key, string $label, string $desc = ''): void
{
    $att_id = aoc_global_get_int($key);
    $image_url = $att_id ? wp_get_attachment_image_url($att_id, 'medium') : '';
    $input_id = 'aoc_gf_' . $key;
    ?>
    <tr>
        <th scope="row"><label><?php echo esc_html($label); ?></label></th>
        <td>
            <div class="aoc-image-picker" style="margin:0;">
                <input id="<?php echo esc_attr($input_id); ?>" name="<?php echo esc_attr(AOC_GLOBAL_OPTION . '[' . $key . ']'); ?>"
                       type="hidden" value="<?php echo esc_attr((string) $att_id); ?>" data-aoc-image-id />
                <div data-aoc-image-preview style="margin:10px 0;">
                    <?php if ($image_url) : ?>
                        <img src="<?php echo esc_url($image_url); ?>" alt="" style="max-width:220px;height:auto;border:1px solid #ccd0d4;background:#fff;padding:4px;" />
                    <?php endif; ?>
                </div>
                <button type="button" class="button" data-aoc-image-select data-target="<?php echo esc_attr($input_id); ?>"><?php esc_html_e('Choose', 'alosaimi-consulting'); ?></button>
                <button type="button" class="button" data-aoc-image-clear data-target="<?php echo esc_attr($input_id); ?>"><?php esc_html_e('Clear', 'alosaimi-consulting'); ?></button>
                <?php if ($desc) : ?><p class="description"><?php echo esc_html($desc); ?></p><?php endif; ?>
            </div>
        </td>
    </tr>
    <?php
}

/* ──────────────────────────────────────────────
 * 5.  Tab renderers
 * ────────────────────────────────────────────── */

function aoc_gf_render_hero(): void
{
    ?>
    <h3><?php esc_html_e('Hero Section', 'alosaimi-consulting'); ?></h3>
    <p class="description"><?php esc_html_e('The scrolling banner text that appears over the hero video.', 'alosaimi-consulting'); ?></p>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_text('hero_title_en', __('English banner text', 'alosaimi-consulting'), __('Use • to separate words. Repeat the pattern so the scroll loop looks seamless.', 'alosaimi-consulting'));
        aoc_gf_text('hero_words_ar', __('Arabic banner words', 'alosaimi-consulting'), __('Use • to separate words.', 'alosaimi-consulting'));
        ?>
    </table>
    <?php
}

function aoc_gf_render_about(): void
{
    ?>
    <h3><?php esc_html_e('About Section', 'alosaimi-consulting'); ?></h3>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_textarea('about_title_en', __('English title', 'alosaimi-consulting'), 2, __('Use a new line between words (e.g. ABOUT then US on the next line).', 'alosaimi-consulting'));
        aoc_gf_textarea('about_title_ar', __('Arabic title', 'alosaimi-consulting'), 2);
        aoc_gf_textarea('about_paragraph1_en', __('English paragraph 1', 'alosaimi-consulting'), 4);
        aoc_gf_textarea('about_paragraph1_ar', __('Arabic paragraph 1', 'alosaimi-consulting'), 4);
        aoc_gf_textarea('about_paragraph2_en', __('English paragraph 2', 'alosaimi-consulting'), 4);
        aoc_gf_textarea('about_paragraph2_ar', __('Arabic paragraph 2', 'alosaimi-consulting'), 4);
        ?>
    </table>

    <h3><?php esc_html_e('CEO Speech', 'alosaimi-consulting'); ?></h3>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_textarea('ceo_speech_title_en', __('English speech heading', 'alosaimi-consulting'), 2);
        aoc_gf_textarea('ceo_speech_title_ar', __('Arabic speech heading', 'alosaimi-consulting'), 2);
        aoc_gf_text('ceo_name_en', __('English CEO name', 'alosaimi-consulting'), __('Use a new line between first and last name if needed.', 'alosaimi-consulting'));
        aoc_gf_text('ceo_name_ar', __('Arabic CEO name', 'alosaimi-consulting'));
        aoc_gf_text('ceo_title_en', __('English CEO title', 'alosaimi-consulting'));
        aoc_gf_text('ceo_title_ar', __('Arabic CEO title', 'alosaimi-consulting'));
        aoc_gf_textarea('ceo_speech_en', __('English CEO speech', 'alosaimi-consulting'), 8, __('Each paragraph on a new line.', 'alosaimi-consulting'));
        aoc_gf_textarea('ceo_speech_ar', __('Arabic CEO speech', 'alosaimi-consulting'), 8, __('Each paragraph on a new line.', 'alosaimi-consulting'));
        ?>
    </table>
    <?php
}

function aoc_gf_render_services(): void
{
    ?>
    <h3><?php esc_html_e('Services Section (titles & intro text)', 'alosaimi-consulting'); ?></h3>
    <p class="description"><?php esc_html_e('Individual services are managed from Al Osaimi Content > Services.', 'alosaimi-consulting'); ?></p>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_textarea('services_title_en', __('English section title', 'alosaimi-consulting'), 2);
        aoc_gf_textarea('services_title_ar', __('Arabic section title', 'alosaimi-consulting'), 2);
        aoc_gf_textarea('services_intro_en', __('English intro paragraph', 'alosaimi-consulting'), 4);
        aoc_gf_textarea('services_intro_ar', __('Arabic intro paragraph', 'alosaimi-consulting'), 4);
        aoc_gf_textarea('services_builton_en', __('English "built on" paragraph', 'alosaimi-consulting'), 3);
        aoc_gf_textarea('services_builton_ar', __('Arabic "built on" paragraph', 'alosaimi-consulting'), 3);
        ?>
    </table>
    <?php
}

function aoc_gf_render_projects(): void
{
    ?>
    <h3><?php esc_html_e('Projects Section Title', 'alosaimi-consulting'); ?></h3>
    <p class="description"><?php esc_html_e('Individual projects are managed from Al Osaimi Content > Projects.', 'alosaimi-consulting'); ?></p>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_text('projects_title_en', __('English section title', 'alosaimi-consulting'));
        aoc_gf_text('projects_title_ar', __('Arabic section title', 'alosaimi-consulting'));
        ?>
    </table>
    <?php
}

function aoc_gf_render_contact(): void
{
    ?>
    <h3><?php esc_html_e('Contact Section', 'alosaimi-consulting'); ?></h3>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_textarea('contact_title_en', __('English title', 'alosaimi-consulting'), 2);
        aoc_gf_textarea('contact_title_ar', __('Arabic title', 'alosaimi-consulting'), 2);
        ?>
    </table>
    <?php
}

function aoc_gf_render_social(): void
{
    ?>
    <h3><?php esc_html_e('Social Media Links', 'alosaimi-consulting'); ?></h3>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_url('social_linkedin', __('LinkedIn', 'alosaimi-consulting'));
        aoc_gf_url('social_instagram', __('Instagram', 'alosaimi-consulting'));
        aoc_gf_url('social_facebook', __('Facebook', 'alosaimi-consulting'));
        aoc_gf_url('social_befound', __('BeFound website', 'alosaimi-consulting'));
        ?>
    </table>
    <?php
}

function aoc_gf_render_media(): void
{
    ?>
    <h3><?php esc_html_e('Logo & Media', 'alosaimi-consulting'); ?></h3>
    <p class="description"><?php esc_html_e('Upload replacements from the Media Library. Leave empty to use the built-in defaults.', 'alosaimi-consulting'); ?></p>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_image('media_logo_white_id', __('Desktop logo (white)', 'alosaimi-consulting'), __('The full logo shown in the navigation bar on desktop.', 'alosaimi-consulting'));
        aoc_gf_image('media_logo_mobile_id', __('Mobile logo', 'alosaimi-consulting'), __('The compact logo shown on mobile devices.', 'alosaimi-consulting'));
        aoc_gf_image('media_favicon_id', __('Favicon', 'alosaimi-consulting'));
        aoc_gf_image('media_hero_poster_id', __('Hero video poster', 'alosaimi-consulting'), __('The fallback image shown while the hero video loads.', 'alosaimi-consulting'));
        aoc_gf_image('media_about_image_id', __('About section image', 'alosaimi-consulting'));
        aoc_gf_image('media_befound_logo_id', __('BeFound partner logo', 'alosaimi-consulting'));
        ?>
    </table>
    <?php
}

function aoc_gf_render_misc(): void
{
    ?>
    <h3><?php esc_html_e('Bottom Bar', 'alosaimi-consulting'); ?></h3>
    <table class="form-table" role="presentation">
        <?php
        aoc_gf_text('bottom_bar_text', __('Bottom bar text', 'alosaimi-consulting'), __('Words will be evenly spaced across the bar. Default: A FOUNDATION OF TRUST', 'alosaimi-consulting'));
        ?>
    </table>
    <?php
}

/* ──────────────────────────────────────────────
 * 6.  Apply global fields to site data
 * ────────────────────────────────────────────── */

function aoc_global_fields_apply(array $data): array
{
    /* Hero */
    $hero_en = aoc_global_get('hero_title_en');
    if ($hero_en) {
        $data['translations']['en']['hero']['title'] = $hero_en;
        $words = array_filter(array_map('trim', preg_split('/\s{2,}/', $hero_en)));
        $data['translations']['en']['hero']['words'] = $words ?: $data['translations']['en']['hero']['words'];
    }

    $hero_ar_raw = aoc_global_get('hero_words_ar');
    if ($hero_ar_raw) {
        $words_ar = array_filter(array_map('trim', preg_split('/\s+/u', $hero_ar_raw)));
        $data['translations']['ar']['hero']['words'] = $words_ar ?: $data['translations']['ar']['hero']['words'];
    }

    /* About */
    foreach (['en', 'ar'] as $lang) {
        $title = aoc_global_get('about_title_' . $lang);
        if ($title) { $data['translations'][$lang]['about']['title'] = $title; }

        $p1 = aoc_global_get('about_paragraph1_' . $lang);
        if ($p1) { $data['translations'][$lang]['about']['paragraph1'] = $p1; }

        $p2 = aoc_global_get('about_paragraph2_' . $lang);
        if ($p2) { $data['translations'][$lang]['about']['paragraph2'] = $p2; }

        $cst = aoc_global_get('ceo_speech_title_' . $lang);
        if ($cst) { $data['translations'][$lang]['about']['ceoSpeechTitle'] = $cst; }

        $cn = aoc_global_get('ceo_name_' . $lang);
        if ($cn) { $data['translations'][$lang]['about']['ceoName'] = $cn; }

        $ct = aoc_global_get('ceo_title_' . $lang);
        if ($ct) { $data['translations'][$lang]['about']['ceoTitle'] = $ct; }

        $cs = aoc_global_get('ceo_speech_' . $lang);
        if ($cs) {
            $paragraphs = array_filter(array_map('trim', explode("\n", $cs)));
            $data['translations'][$lang]['about']['ceoSpeech'] = array_values($paragraphs);
        }

        /* Services section text */
        $st = aoc_global_get('services_title_' . $lang);
        if ($st) { $data['translations'][$lang]['services']['title'] = $st; }

        $si = aoc_global_get('services_intro_' . $lang);
        if ($si) { $data['translations'][$lang]['services']['intro'] = $si; }

        $sb = aoc_global_get('services_builton_' . $lang);
        if ($sb) { $data['translations'][$lang]['services']['builtOn'] = $sb; }

        /* Projects title */
        $pt = aoc_global_get('projects_title_' . $lang);
        if ($pt) { $data['translations'][$lang]['projectsGallery']['sectionTitle'] = $pt; }

        /* Contact title */
        $cot = aoc_global_get('contact_title_' . $lang);
        if ($cot) { $data['translations'][$lang]['contact']['title'] = $cot; }
    }

    /* Social links */
    $linkedin = aoc_global_get('social_linkedin');
    if ($linkedin) { $data['social']['linkedin'] = $linkedin; }

    $instagram = aoc_global_get('social_instagram');
    if ($instagram) { $data['social']['instagram'] = $instagram; }

    $facebook = aoc_global_get('social_facebook');
    if ($facebook) { $data['social']['facebook'] = $facebook; }

    $befound = aoc_global_get('social_befound');
    if ($befound) { $data['social']['befound'] = $befound; }

    /* Media – replace paths with attachment URLs when available */
    $media_map = [
        'media_logo_white_id'   => 'logo_white',
        'media_logo_mobile_id'  => 'logo_mobile',
        'media_favicon_id'      => 'favicon',
        'media_hero_poster_id'  => 'hero_poster',
        'media_about_image_id'  => 'about_image',
        'media_befound_logo_id' => 'befound',
    ];

    foreach ($media_map as $option_key => $media_key) {
        $att_id = aoc_global_get_int($option_key);
        if ($att_id) {
            $url = wp_get_attachment_url($att_id);
            if ($url) {
                $data['media'][$media_key] = $url;
            }
        }
    }

    return $data;
}
add_filter('aoc_site_data', 'aoc_global_fields_apply', 10);
