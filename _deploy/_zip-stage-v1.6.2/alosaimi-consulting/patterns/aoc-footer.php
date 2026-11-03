<?php
/**
 * Title: AOC Footer Bar
 * Slug: alosaimi-consulting/aoc-footer
 * Categories: aoc-sections
 */

if (function_exists('aoc_gutenberg_footer_block')) {
    echo aoc_gutenberg_footer_block(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}
