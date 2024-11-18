const form = document.querySelector('.popup__form')
const formInput = form.querySelector('.popup__input')

const showError = (formElement, input, errorMessage) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`)
  input.classList.add('form__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('form__input_type_error_active')
}

const hideError = (formElement, input) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`)
  input.classList.remove('form__input_type_error')
  errorElement.classList.remove('form__input_type_error_active')
  errorElement.textContent = ''
}

function checkInputValidity (formElement, inputElement) {
  if (inputElement.value === '') {
    inputElement.setCustomValidity('Вы пропустили это поле.')
  } else if (inputElement.value.length === 1) {
    inputElement.setCustomValidity(`Минимальное количество символов: 2. Длина текста сейчас ${inputElement.value.length} символ.`)
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (inputElement.validity.typeMismatch && !inputElement.checkValidity()) {
    inputElement.setCustomValidity('Введите адрес сайта.')
  } else {
    inputElement.setCustomValidity("");
  } 

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
}

formInput.addEventListener('input', function () {
  checkInputValidity(form, formInput)
})

function setEventListener (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__button')
  // toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListener(formElement)
  })
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive')
  } else {
    buttonElement.classList.remove('button_inactive')
  }
}

export {showError, hideError, checkInputValidity, setEventListener, enableValidation, hasInvalidInput, toggleButtonState}