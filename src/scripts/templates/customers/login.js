/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

const selectors = {
  recoverPasswordFormTriggers: document.querySelectorAll('[data-recover-toggle]'),
  recoverPasswordForm: document.querySelector('[data-recover-form]'),
  loginForm: document.querySelector('[data-login-form]'),
  formState: document.querySelector('[data-form-state]'),
  resetSuccess: document.querySelector('[data-reset-success]'),
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
  selectors.recoverPasswordForm.classList.toggle('hide');
  selectors.loginForm.classList.toggle('hide');
}

/**
 *  Show reset password success message
 */
function resetPasswordSuccess() {
  // check if reset password form was
  // successfully submited and show success message.

  if (selectors.formState) {
    selectors.resetSuccess.classList.remove('hide');
  }
}

if (selectors.recoverPasswordForm) {
  checkUrlHash();
  resetPasswordSuccess();

  selectors.recoverPasswordFormTriggers.forEach((trigger) => {
    trigger.addEventListener('click', onShowHidePasswordForm);
  });
}
