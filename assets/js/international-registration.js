// const scriptURL = 'https://script.google.com/macros/s/AKfycbw0kLmWiw0GW25Oky3Q-2FDroDvpAa2d2G6Um1M4RzdgaMwneCS0hskTntKUij8n0pZBQ/exec';
const internationalForm = document.forms['internationalForm'];
const internationalNotification = document.getElementById('internationalNotification');
const internationalSubmitButton = document.getElementById('internationalSubmitButton');
const internationalSpinner = document.getElementById('internationalSpinner');
const internationalButtonText = document.getElementById('internationalButtonText');

internationalForm.addEventListener('submit', e => {
  e.preventDefault();

  // Validate form
  if (!validateInternationalForm()) {
    return;
  }

  internationalSubmitButton.disabled = true; 
  internationalSpinner.style.display = 'inline-block'; 
  internationalButtonText.style.display = 'none'; 

  fetch(scriptURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(internationalForm)) 
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      showNotification('Success! Your information has been submitted.', 'success');
      internationalForm.reset(); // Clear the form
    } else {
      showNotification('Error! ' + data.message, 'error');
    }
    internationalSubmitButton.disabled = false; // Re-enable submit button
    internationalSpinner.style.display = 'none'; // Hide spinner
    internationalButtonText.style.display = 'inline'; // Show button text
  })
  .catch(error => {
    showNotification('Error! ' + error.message, 'error');
    internationalSubmitButton.disabled = false; 
    internationalSpinner.style.display = 'none'; 
    internationalButtonText.style.display = 'inline'; 
  });
});

function validateInternationalForm() {
  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');

  const firstName = document.getElementById('internationalFirstName');
  if (firstName.value.trim() === '') {
    document.getElementById('internationalFirstNameError').style.display = 'block';
    isValid = false;
  }

  const lastName = document.getElementById('internationalLastName');
  if (lastName.value.trim() === '') {
    document.getElementById('internationalLastNameError').style.display = 'block';
    isValid = false;
  }

  const email = document.getElementById('internationalEmail');
  if (!validateEmail(email.value)) {
    document.getElementById('internationalEmailError').style.display = 'block';
    isValid = false;
  }

  const phone = document.getElementById('internationalPhone');
  if (phone.value.trim() === '') {
    document.getElementById('internationalPhoneError').style.display = 'block';
    isValid = false;
  }

  const jobTitle = document.getElementById('internationalJobTitle');
  if (jobTitle.value.trim() === '') {
    document.getElementById('internationalJobTitleError').style.display = 'block';
    isValid = false;
  }

  const company = document.getElementById('internationalCompany');
  if (company.value.trim() === '') {
    document.getElementById('internationalCompanyError').style.display = 'block';
    isValid = false;
  }

  const country = document.getElementById('internationalCountry');
  if (country.value.trim() === '') {
    document.getElementById('internationalCountryError').style.display = 'block';
    isValid = false;
  }

  const contactMethodSelected = document.querySelector('input[name="Contact Method"]:checked');
  if (!contactMethodSelected) {
    document.getElementById('internationalContactMethodError').style.display = 'block';
    isValid = false;
  }

  return isValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showNotification(message, type) {
  internationalNotification.innerText = message;
  internationalNotification.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
  internationalNotification.style.display = 'block';
  setTimeout(() => {
    internationalNotification.style.display = 'none';
  }, 5000);
}
