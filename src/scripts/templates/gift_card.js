/**
 * Gift Card Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Gift Card template.
 */

const config = {
  qrCode: '#QrCode',
  printButton: 'PrintGiftCard',
  giftCardCode: 'GiftCardDigits',
};

// new QRCode($qrCode[0], {
//   text: $qrCode.attr('data-identifier'),
//   width: 120,
//   height: 120,
// });

document.getElementById(config.printButton).addEventListener('click', () => {
  window.print();
});

// Auto-select gift card code on click, based on ID passed to the function
document
  .getElementById(config.giftCardCode)
  .addEventListener('click', selectText);

function selectText(evt) {
  const text = document.getElementById(config.giftCardCode);
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
