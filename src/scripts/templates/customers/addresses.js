/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import {CountryProvinceSelector} from '@shopify/theme-addresses';

const newAddressForm = document.querySelector('#AddressNewForm');

if (newAddressForm) {
  const countryProvinceSelector = new CountryProvinceSelector(window.theme.allCountryOptionTags);
  const newCountrySelector = document.querySelector('#AddressCountryNew');
  const newProvinceSelector = document.querySelector('#AddressProvinceNew');
  const newContainerSelector = document.querySelector('#AddressProvinceContainerNew');

  countryProvinceSelector.build(newCountrySelector, newProvinceSelector, {
    onCountryChange: (provinces) => {
      if (provinces.length) {
        newContainerSelector.classList.remove('hide');
      } else {
        newContainerSelector.classList.add('hide');
      }
    },
  });

  // Initialize each edit form's country/province selector
  document.querySelectorAll('.address-country-option').forEach((el) => {
    const formId = el.getAttribute('data-form-id');
    const countrySelector = document.querySelector(`#AddressCountry_${formId}`);
    const provinceSelector = document.querySelector(`#AddressProvince_${formId}`);
    const containerSelector = document.querySelector(`#AddressProvinceContainer_${formId}`);

    countryProvinceSelector.build(countrySelector, provinceSelector, {
      onCountryChange: (provinces) => {
        if (provinces.length) {
          containerSelector.classList.remove('hide');
        } else {
          containerSelector.classList.add('hide');
        }
      },
    });
  });

  // Toggle new/edit address forms
  document.querySelector('.address-new-toggle').addEventListener('click', () => {
    newAddressForm.classList.toggle('hide');
  });

  document.querySelectorAll('.address-edit-toggle').forEach((el) => {
    el.addEventListener('click', () => {
      const formId = el.getAttribute('data-form-id');
      document.querySelector(`#EditAddress_${formId}`).classList.toggle('hide');
    });
  });

  document.querySelectorAll('.address-delete').forEach((el) => {
    el.addEventListener('submit', (event) => {
      const confirmMessage = el.getAttribute('data-confirm-message');

      if (!window.confirm(
          confirmMessage || 'Are you sure you wish to delete this address?',
      )) {
        event.preventDefault();
      }
    });
  });
}
