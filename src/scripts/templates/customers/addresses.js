/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import {AddressForm} from '@shopify/theme-addresses';

const selectors = {
  addressContainer: '[data-address]',
  addressFields: '[data-address-fields]',
  addressToggle: '[data-address-toggle]',
  addressForm: '[data-address-form]',
  addressDeleteForm: '[data-address-delete-form]',
};
const hideClass = 'hide';

function initializeAddressForm(container) {
  const addressFields = container.querySelector(selectors.addressFields);
  const addressForm = container.querySelector(selectors.addressForm);
  const deleteForm = container.querySelector(selectors.addressDeleteForm);

  container.querySelectorAll(selectors.addressToggle).forEach((button) => {
    button.addEventListener('click', () => {
      addressForm.classList.toggle(hideClass);
    });
  });

  AddressForm(addressFields, 'en');

  if (deleteForm) {
    deleteForm.addEventListener('submit', (event) => {
      const confirmMessage = deleteForm.getAttribute('data-confirm-message');

      if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
        event.preventDefault();
      }
    });
  }
}

const addressForms = document.querySelectorAll(selectors.addressContainer);

if (addressForms.length) {
  addressForms.forEach((addressContainer) => {
    initializeAddressForm(addressContainer);
  });
}
