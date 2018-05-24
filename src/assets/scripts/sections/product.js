/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

import $ from 'jquery';
import Variants from '@shopify/theme-variants';
import {imageSize, preload, getSizedImageUrl} from '@shopify/theme-images';
import {formatMoney} from '@shopify/theme-currency';
import sections from '@shopify/theme-sections';

const selectors = {
  addToCart: '[data-add-to-cart]',
  addToCartText: '[data-add-to-cart-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  originalSelectorId: '[data-product-select]',
  priceWrapper: '[data-price-wrapper]',
  productImageWraps: '[data-product-image-wrapper]',
  productFeaturedImage: '[data-product-featured-image]',
  productJson: '[data-product-json]',
  productPrice: '[data-product-price]',
  productThumbs: '[data-product-single-thumbnail]',
  singleOptionSelector: '[data-single-option-selector]',
};

/**
 * Product section constructor. Runs on page load as well as Theme Editor
 * `section:load` events.
 * @param {string} container - selector for the section container DOM element
 */

sections.register('product', {
  onLoad() {
    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    this.productSingleObject = JSON.parse(
      $(selectors.productJson, this.$container).html(),
    );

    const options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject,
    };

    this.settings = {};
    this.variants = new Variants(options);
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container);

    this.$container.on(
      `variantChange${this.namespace}`,
      this.updateAddToCartState.bind(this),
    );
    this.$container.on(
      `variantPriceChange${this.namespace}`,
      this.updateProductPrices.bind(this),
    );
    this.$container.on(
      `variantImageChange${this.namespace}`,
      this.updateImages.bind(this),
    );

    if (this.$featuredImage.length > 0) {
      this.settings.imageSize = imageSize(this.$featuredImage.attr('src'));
      preload(this.productSingleObject.images, this.settings.imageSize);

      this.$container.on(
        `variantImageChange${this.namespace}`,
        this.updateProductImage.bind(this),
      );
    }
  },

  setActiveThumbnail(imageId) {
    const activeClass = 'active-thumb';
    let newImageId = imageId;

    // If there is no element passed, find it by the current product image
    if (typeof newImageId === 'undefined') {
      newImageId = $(`${selectors.productImageWraps}:not('.hide')`).data(
        'image-id',
      );
    }

    const $thumbnail = $(
      `${selectors.productThumbs}[data-thumbnail-id='${newImageId}']`,
    );

    $(selectors.productThumbs)
      .removeClass(activeClass)
      .removeAttr('aria-current');

    $thumbnail.addClass(activeClass);
    $thumbnail.attr('aria-current', true);
  },

  switchImage(imageId) {
    const $newImage = $(
      `${selectors.productImageWraps}[data-image-id='${imageId}']`,
      this.$container,
    );
    const $otherImages = $(
      `${selectors.productImageWraps}:not([data-image-id='${imageId}'])`,
      this.$container,
    );
    $newImage.removeClass('hide');
    $newImage.find(selectors.productFeaturedImage).focus();
    $otherImages.addClass('hide');
  },

  /**
   * Updates the DOM state of the add to cart button
   *
   * @param {boolean} enabled - Decides whether cart is enabled or disabled
   * @param {string} text - Updates the text notification content of the cart
   */
  updateAddToCartState(evt) {
    const variant = evt.variant;

    if (variant) {
      $(selectors.priceWrapper, this.$container).removeClass('hide');
    } else {
      $(selectors.addToCart, this.$container).prop('disabled', true);
      $(selectors.addToCartText, this.$container).html(
        theme.strings.unavailable,
      );
      $(selectors.priceWrapper, this.$container).addClass('hide');
      return;
    }

    if (variant.available) {
      $(selectors.addToCart, this.$container).prop('disabled', false);
      $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
    } else {
      $(selectors.addToCart, this.$container).prop('disabled', true);
      $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
    }
  },

  updateImages(evt) {
    const variant = evt.variant;
    const imageId = variant.featured_image.id;

    this.switchImage(imageId);
    this.setActiveThumbnail(imageId);
  },

  /**
   * Updates the DOM with specified prices
   *
   * @param {string} productPrice - The current price of the product
   * @param {string} comparePrice - The original price of the product
   */
  updateProductPrices(evt) {
    const variant = evt.variant;
    const $comparePrice = $(selectors.comparePrice, this.$container);
    const $compareEls = $comparePrice.add(
      selectors.comparePriceText,
      this.$container,
    );

    $(selectors.productPrice, this.$container).html(
      formatMoney(variant.price, theme.moneyFormat),
    );

    if (variant.compare_at_price > variant.price) {
      $comparePrice.html(
        formatMoney(variant.compare_at_price, theme.moneyFormat),
      );
      $compareEls.removeClass('hide');
    } else {
      $comparePrice.html('');
      $compareEls.addClass('hide');
    }
  },

  /**
   * Updates the DOM with the specified image URL
   *
   * @param {string} src - Image src URL
   */
  updateProductImage(evt) {
    const variant = evt.variant;
    const sizedImgUrl = getSizedImageUrl(
      variant.featured_image.src,
      this.settings.imageSize,
    );

    this.$featuredImage.attr('src', sizedImgUrl);
  },

  /**
   * Event callback for Theme Editor `section:unload` event
   */
  onUnload() {
    this.$container.off(this.namespace);
  },
});
