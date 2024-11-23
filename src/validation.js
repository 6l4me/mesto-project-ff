const showError = (formElement, input, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`)
  input.classList.add(settings.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(settings.errorClass)
}

const hideError = (formElement, input, settings) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`)
  input.classList.remove(settings.inputErrorClass)
  errorElement.classList.remove(settings.errorClass)
  errorElement.textContent = ''
}

function checkInputValidity (formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
  } else { 
    inputElement.setCustomValidity('');
  }  


  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideError(formElement, inputElement, settings)
  }
}

function setEventListener (formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
  const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, settings)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings)
      toggleButtonState(inputList, buttonElement, settings)
    })
  })
}

function enableValidation (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))

  formList.forEach((formElement) => {
    setEventListener(formElement, settings)
  })
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass)
  }
}

function clearValidation(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, settings);
  });
  
}

function disableButton(buttonElement, settings) {
  buttonElement.disabled = true; 
  buttonElement.classList.add(settings.inactiveButtonClass);
  console.log(buttonElement)
}

export {showError, hideError, checkInputValidity, setEventListener, enableValidation, hasInvalidInput, toggleButtonState, clearValidation, disableButton}