/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import {CountryProvinceSelector} from '@shopify/theme-addresses';

const selectors = {
  addressContainer: '.address-wrapper',
  addressToggle: '.address-toggle',
  addressCountry: '[data-address-country]',
  addressProvince: '[data-address-province]',
  addressProvinceWrapper: '.address-province-wrapper',
  addressForm: '.address-form',
  addressDeleteForm: '.address-delete-form',
};
const hideClass = 'hide';

function initializeAddressForm(countryProvinceSelector, container) {
  const countrySelector = container.querySelector(selectors.addressCountry);
  const provinceSelector = container.querySelector(selectors.addressProvince);
  const provinceWrapper = container.querySelector(selectors.addressProvinceWrapper);
  const addressForm = container.querySelector(selectors.addressForm);
  const deleteForm = container.querySelector(selectors.addressDeleteForm);

  countryProvinceSelector.build(countrySelector, provinceSelector, {
    onCountryChange: (provinces) => provinceWrapper.classList.toggle(hideClass, !provinces.length),
  });

  container.querySelectorAll(selectors.addressToggle).forEach((button) => {
    button.addEventListener('click', () => {
      addressForm.classList.toggle(hideClass);
    });
  });

  if (deleteForm) {
    deleteForm.addEventListener('submit', (event) => {
      const confirmMessage = deleteForm.getAttribute('data-confirm-message');

      if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
        event.preventDefault();
      }
    });
  }
}

const addresses = document.querySelectorAll(selectors.addressContainer);

if (addresses.length) {

  const countryProvinceSelector = new CountryProvinceSelector(window.theme.allCountryOptionTags);

  addresses.forEach((addressContainer) => {
    initializeAddressForm(countryProvinceSelector, addressContainer);
  });
}
