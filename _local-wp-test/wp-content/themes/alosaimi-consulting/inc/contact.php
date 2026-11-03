<?php
/**
 * Contact form backend.
 */

if (!defined('ABSPATH')) {
    exit;
}

function aoc_contact_handler(): void
{
    check_ajax_referer('aoc_contact_nonce', 'nonce');

    $honeypot = isset($_POST['company']) ? sanitize_text_field(wp_unslash($_POST['company'])) : '';
    if ('' !== $honeypot) {
        wp_send_json_error(['message' => __('Unable to send message.', 'alosaimi-consulting')], 400);
    }

    $first_name = isset($_POST['firstName']) ? sanitize_text_field(wp_unslash($_POST['firstName'])) : '';
    $last_name = isset($_POST['lastName']) ? sanitize_text_field(wp_unslash($_POST['lastName'])) : '';
    $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';
    $language = isset($_POST['language']) && 'ar' === sanitize_key(wp_unslash($_POST['language'])) ? 'ar' : 'en';

    if ('' === $first_name || '' === $last_name || !is_email($email) || '' === $message) {
        $fallback = 'ar' === $language ? 'يرجى مراجعة البيانات والمحاولة مرة أخرى.' : 'Please check the form and try again.';
        wp_send_json_error(['message' => $fallback], 422);
    }

    $recipient = sanitize_email(get_option('aoc_contact_recipient', get_option('admin_email')));
    if (!is_email($recipient)) {
        $recipient = get_option('admin_email');
    }

    $subject = sprintf('Al Osaimi website contact: %s %s', $first_name, $last_name);
    $body = implode("\n\n", [
        'Name: ' . $first_name . ' ' . $last_name,
        'Email: ' . $email,
        'Language: ' . strtoupper($language),
        'Message:',
        $message,
    ]);
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $first_name . ' ' . $last_name . ' <' . $email . '>',
    ];

    $sent = wp_mail($recipient, $subject, $body, $headers);

    if (!$sent) {
        $fallback = 'ar' === $language ? 'تعذر إرسال الرسالة الآن. يرجى المحاولة لاحقاً.' : 'The message could not be sent right now. Please try again later.';
        wp_send_json_error(['message' => $fallback], 500);
    }

    $success = 'ar' === $language ? 'شكراً لك. تم إرسال رسالتك بنجاح.' : 'Thank you. Your message has been sent.';
    wp_send_json_success(['message' => $success]);
}
add_action('wp_ajax_aoc_contact_submit', 'aoc_contact_handler');
add_action('wp_ajax_nopriv_aoc_contact_submit', 'aoc_contact_handler');

