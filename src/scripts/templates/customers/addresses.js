/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

import $ from 'jquery';
import {CountryProvinceSelector} from '@shopify/theme-addresses';

const $newAddressForm = $('#AddressNewForm');

if ($newAddressForm.length) {
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
  $('.address-country-option').each(function() {
    const formId = $(this).data('form-id');
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
  $('.address-new-toggle').on('click', () => {
    $newAddressForm.toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function() {
    const formId = $(this).data('form-id');
    $(`#EditAddress_${formId}`).toggleClass('hide');
  });

  $('.address-delete').on('click', function() {
    const $el = $(this);
    const formId = $el.data('form-id');
    const confirmMessage = $el.data('confirm-message');
    if (
      window.confirm(
        confirmMessage || 'Are you sure you wish to delete this address?',
      )
    ) {
      Shopify.postLink(`/account/addresses/${formId}`, {
        parameters: {_method: 'delete'},
      });
    }
  });
}
