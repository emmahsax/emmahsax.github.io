const code = 'na7iKQolB9SFbmOCe19NPi82mHPY4ILTbQ9QR4PxHIr5SIl7p5L8Ta9ZSppZ3HHS'
const form = document.getElementById('form')
const iframe = document.getElementById('iframe')
let formSubmitted = false
let recaptchaCompleted = false

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.getElementById('recaptcha').setAttribute('data-theme', 'dark')
};

iframe.onload = function showFormResponse () {
  if (formSubmitted) {
    document.getElementById('formDiv').remove()
    document.getElementById('formResponseDiv').classList.remove('invisible')
  };
}

form.onsubmit = function verifyRecaptcha () {
  if (recaptchaCompleted) {
    formSubmitted = true
  } else {
    alert('Please fill out the reCAPTCHA to send a message.') // eslint-disable-line no-undef
  };
}

function recaptchaCallback (verificationResponse) { // eslint-disable-line no-unused-vars
  document.getElementById('submitButton').removeAttribute('disabled')
  document.getElementById('verification').value = verificationResponse + code + verificationResponse
  recaptchaCompleted = true
};

function recaptchaExpiredCallback () { // eslint-disable-line no-unused-vars
  document.getElementById('submitButton').setAttribute('disabled', true)
  document.getElementById('verification').value = null
  recaptchaCompleted = false
};
