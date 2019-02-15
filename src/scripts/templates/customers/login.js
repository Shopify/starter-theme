/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

const selectors = {
  recoverPasswordFormTriggers: '[data-recover-toggle]',
  recoverPasswordForm: '[data-recover-form]',
  loginForm: '[data-login-form]',
  formState: '[data-form-state]',
  resetSuccess: '[data-reset-success]',
};

function onShowHidePasswordForm(evt) {
  evt.preventDefault();
  toggleRecoverPasswordForm();
}

function checkUrlHash() {
  const hash = window.location.hash;

  // Allow deep linking to recover password form
  if (hash === '#recover') {
    toggleRecoverPasswordForm();
  }
}

/**
 *  Show/Hide recover password form
 */
function toggleRecoverPasswordForm() {
  document.querySelector(selectors.recoverPasswordForm).classList.toggle('hide');
  document.querySelector(selectors.loginForm).classList.toggle('hide');
}

/**
 *  Show reset password success message
 */
function resetPasswordSuccess() {
  // check if reset password form was
  // successfully submitted and show success message.

  if (document.querySelector(selectors.formState)) {
    document.querySelector(selectors.resetSuccess).classList.remove('hide');
  }
}

if (document.querySelector(selectors.recoverPasswordForm)) {
  checkUrlHash();
  resetPasswordSuccess();

  document.querySelector(selectors.recoverPasswordFormTriggers).forEach((trigger) => {
    trigger.addEventListener('click', onShowHidePasswordForm);
  });
}
