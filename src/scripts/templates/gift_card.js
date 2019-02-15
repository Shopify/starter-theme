import QRCode from 'qrcode';

/**
 * Gift Card Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Gift Card template.
 */

const selectors = {
  qrCodeCanvas: '[data-gift-card-qr]',
  printButton: '[data-gift-card-print]',
  giftCardCode: '[data-gift-card-digits]',
};

// This is the QR code that allows customers to use at a POS
document.querySelectorAll(selectors.qrCodeCanvas).forEach((element) => {
  QRCode.toCanvas(element, element.dataset.identifier);
});

document.querySelectorAll(selectors.printButton).forEach((element) => {
  element.addEventListener('click', () => {
    window.print();
  });
});

// Auto-select gift card code on click, based on ID passed to the function
document.querySelectorAll(selectors.giftCardCode).forEach((element) => {
  element.addEventListener('click', (evt) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(evt.target);
    selection.removeAllRanges();
    selection.addRange(range);
  });
});
