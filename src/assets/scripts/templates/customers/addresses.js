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

  countryProvinceSelector.build(
    $('#AddressCountryNew')[0],
    $('#AddressProvinceNew')[0],
    {
      hideClass: 'hide',
      hideElement: $('#AddressProvinceContainerNew')[0],
    },
  );

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    const formId = $(this).data('form-id');
    const countrySelector = $(`AddressCountry_${formId}`)[0];
    const provinceSelector = $(`AddressProvince_${formId}`)[0];
    const containerSelector = $(`AddressProvinceContainer_${formId}`)[0];

    countryProvinceSelector.build(
      countrySelector,
      provinceSelector,
      {
        hideClass: 'hide',
        hideElement: containerSelector,
      },
    );
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
