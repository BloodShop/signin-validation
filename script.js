document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullName = form.querySelector('[name=full-name');
  const price = form.querySelector('[name=purchase-price]');
  const checkBox = form.querySelector('[name=charge-checkbox]');
  const creditType = form.querySelector('[name=credit-type]');

  form.addEventListener("submit", onSubmitForm);
  fullName.addEventListener("input", ensureOneSpaceAtLeast);
  price.addEventListener("input", checkPriceUnder200);
  checkBox.addEventListener("input", creditAllowed);

  function creditAllowed() {
    if(checkBox.checked) {
      creditType.disabled = true;
      creditType.value = '';
      creditType.removeAttribute('required');
    } else {
      creditType.disabled = false;
      creditType.setAttribute('required', '');
    }
  }

  function checkPriceUnder200() {
    if(price.value > 0 && price.value <= 200) {
      checkBox.disabled = false;
    }
    else {
      checkBox.checked = false;
      checkBox.disabled = true;
      creditAllowed();
    }
  }

  function ensureOneSpaceAtLeast(event) { // currentTarget is fullName - event not in use
    let spaceIncluded = false;
    fullName.setCustomValidity("");
    const fullNameValue = fullName.value.trim();
    
    if(!alphabetAndSpacesOnly(fullNameValue)) {
      fullName.setCustomValidity("There must be only alphabets!")
      return false;
    }

    for (let i = 0; i < fullNameValue.length; i++) {
      if(fullNameValue[i] === ' ') {
        spaceIncluded = true;
        break;
      }
    }

    if(!spaceIncluded) {
      fullName.setCustomValidity("There must be spaces between!")
      return false;
    }
    return true;
  }

  function ensurePriceAndCheckBox() {
    return ((price.value <= 200 && price.value > 0 && checkBox.checked) || (!checkBox.checked && price.value > 0));
  }
  function ensureCheckboxAndCreditType() {
    return ((!checkBox.checked && creditType.value !== '') || (checkBox.checked && creditType.value === ""));
  }

  function onSubmitForm(event) {
    let isValid = ensureOneSpaceAtLeast() && ensurePriceAndCheckBox() && ensureCheckboxAndCreditType();
    if(!isValid) {
      event.preventDefault();
    } 
  }
})

function alphabetAndSpacesOnly(str) {
  return /^[A-Za-z\s]*$/.test(str);
}