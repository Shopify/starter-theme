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

const qrCodeCanvas = document.querySelector(selectors.qrCodeCanvas);

QRCode.toCanvas(qrCodeCanvas, qrCodeCanvas.getAttribute('data-identifier'));

document.querySelectorAll(selectors.printButton).forEach((printButton) => {
  printButton.addEventListener('click', () => {
    window.print();
  });
});

// Auto-select gift card code on click, based on ID passed to the function
document.querySelectorAll(selectors.giftCardCode).forEach((giftCardCode) => {
  giftCardCode.addEventListener('click', selectText);
});

function selectText(evt) {
  const text = evt.target;
  let range = '';

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
