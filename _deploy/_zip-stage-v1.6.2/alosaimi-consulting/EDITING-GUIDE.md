# Al Osaimi Consulting WordPress Editing Guide

## Free Editing Setup

This theme uses the free WordPress Block Editor (Gutenberg). It does not require Elementor, Elementor Pro, Divi, WPBakery, or any paid page builder.

Required plugins: none.

Optional free form plugins: WPForms Lite or Contact Form 7, only if you want a plugin-managed form instead of the built-in contact form block.

## Install On Hostinger

1. Upload the final theme ZIP from WordPress admin: Appearance > Themes > Add New > Upload Theme.
2. Activate "Al Osaimi Consulting".
3. Open any WordPress admin page once. The theme creates the Home page and the synced Header/Footer patterns.
4. Go to Settings > Reading and confirm "A static page" is selected with "Home" as the homepage.
5. Go to Pages > Home > Edit.

## Edit The Home Page Visually

Open: Pages > Home > Edit.

The Home page is built from native Gutenberg blocks:

- Synced Header pattern
- Intro animation HTML block
- Hero Cover block
- About section Group and Columns
- Services card Groups
- Clients logo blocks
- Projects card Groups
- Contact section
- Synced Footer pattern

You can drag sections up or down, duplicate sections, remove sections, edit text, replace images, change alignment, change font sizes, and adjust spacing from the right sidebar.

## Add A New Section

1. Open Pages > Home > Edit.
2. Click the blue + button.
3. Open Patterns.
4. Choose "Al Osaimi Sections".
5. Insert Hero, About, Services, Clients, Projects, Certificates, Contact, Header, or Footer.
6. Edit it visually and click Update.

## Edit Text, Font Size, Weight, And Alignment

1. Click any Heading or Paragraph block.
2. Use the right sidebar:
   - Typography for size, weight, line height, letter spacing, and case.
   - Align for left, center, or right.
   - Color for text and background.
3. Click Update.

## Edit Spacing, Padding, And Margins

1. Click a section Group, Columns block, or card Group.
2. Open the right sidebar.
3. Use Dimensions to change padding, margin, and block spacing.
4. Click Update.

## Replace Images

1. Click the image.
2. Choose Replace.
3. Select Media Library or Upload.
4. Pick the new image and click Update.

The initial theme images are seeded from the theme files so the ZIP works immediately. Any replacement image should be uploaded through Media > Library.

## Edit Header, Logo, Menu, And Social Links

The header is a synced WordPress pattern.

1. Open Pages > Home > Edit.
2. Click the Header block.
3. Click "Edit original" if WordPress shows the synced pattern toolbar.
4. Replace the logo image visually.
5. Click the Navigation block to edit menu links.
6. Click Social Icons to edit social media links.
7. Save the pattern.

The same Header pattern is reused on other pages.

## Edit Footer

The footer/bottom bar is also a synced WordPress pattern.

1. Open Pages > Home > Edit.
2. Click the Footer block.
3. Click "Edit original".
4. Edit the text, partner logo, or layout.
5. Save the pattern.

## Edit Services And Projects

The Home page service and project cards are normal editable block Groups. Click any card to edit the title, paragraph, image, spacing, alignment, or layout.

The old "Al Osaimi Content" custom post types still exist for structured content and future expansion, but they are no longer the main way to control the Home page layout.

## Edit The Contact Form

The theme includes a built-in free contact form that sends through WordPress AJAX.

- Edit the visible section title from Pages > Home > Edit.
- To change form fields visually with drag and drop, install WPForms Lite or Contact Form 7 and replace the built-in form block with that plugin's free block/shortcode.
- Recipient email is controlled from Appearance > Al Osaimi Settings.

## Create A New Page With The Same Design

1. Go to Pages > Add New.
2. Add patterns from "Al Osaimi Sections".
3. Use Groups, Columns, Images, Headings, Buttons, and Cover blocks.
4. Use the right sidebar for typography, spacing, colors, alignment, and layout.
5. Publish.

## What Is Still In Code

The code now only provides:

- Theme setup and assets.
- Global design tokens in theme.json.
- Default block patterns.
- Fallback PHP templates if the Home page has no block content.
- JavaScript for preserved animations such as the intro circle, custom cursor, active navigation state, and contact form submit.

The Home page layout itself is editable in Gutenberg instead of being controlled by PHP shortcodes.
