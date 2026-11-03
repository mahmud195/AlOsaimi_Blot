(function ($) {
  'use strict';

  $(document).on('click', '[data-aoc-image-select]', function (event) {
    event.preventDefault();

    const target = $(this).data('target');
    const input = $('#' + target);
    const preview = input.closest('.aoc-image-picker').find('[data-aoc-image-preview]');

    const frame = wp.media({
      title: 'Choose image',
      button: { text: 'Use this image' },
      multiple: false,
      library: { type: 'image' },
    });

    frame.on('select', function () {
      const attachment = frame.state().get('selection').first().toJSON();
      input.val(attachment.id);
      const url = attachment.sizes && attachment.sizes.medium ? attachment.sizes.medium.url : attachment.url;
      preview.html(`<img src="${url}" alt="" style="max-width:220px;height:auto;border:1px solid #ccd0d4;background:#fff;padding:4px;" />`);
    });

    frame.open();
  });

  $(document).on('click', '[data-aoc-image-clear]', function (event) {
    event.preventDefault();
    const input = $('#' + $(this).data('target'));
    input.val('');
    input.closest('.aoc-image-picker').find('[data-aoc-image-preview]').empty();
  });

  $(document).on('click', '[data-aoc-gallery-select]', function (event) {
    event.preventDefault();

    const target = $(this).data('target');
    const input = $('#' + target);
    const existing = String(input.val() || '')
      .split(',')
      .map((id) => parseInt(id, 10))
      .filter(Boolean);

    const frame = wp.media({
      title: 'Choose gallery images',
      button: { text: 'Use selected images' },
      multiple: true,
      library: { type: 'image' },
    });

    frame.on('open', function () {
      const selection = frame.state().get('selection');
      existing.forEach((id) => {
        const attachment = wp.media.attachment(id);
        attachment.fetch();
        selection.add(attachment ? [attachment] : []);
      });
    });

    frame.on('select', function () {
      const ids = frame.state().get('selection').map((attachment) => attachment.id);
      input.val(ids.join(','));
    });

    frame.open();
  });

  $(document).on('click', '[data-aoc-gallery-clear]', function (event) {
    event.preventDefault();
    $('#' + $(this).data('target')).val('');
  });
})(jQuery);
