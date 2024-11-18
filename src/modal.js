// import resetValidation from './index.js'

function openPopup (popup) {
  popup.classList.add('popup_is-animated')
  popup.classList.add('popup_is-opened')

  document.addEventListener('keydown', closePopupOnEscape)

  popup.addEventListener('click', closeOverlay)
}

function closePopup (popup) {
  removeEventListener()
  popup.classList.add('popup_is-animated')
  popup.classList.remove('popup_is-opened')
}

function closePopupOnEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

function closeOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

function removeEventListener () {
  const removeOpenPopup = document.querySelector('.popup_is-opened')
  document.removeEventListener('keydown', closePopupOnEscape)
  removeOpenPopup.removeEventListener('click', closeOverlay)
}

export {openPopup, closePopup, closePopupOnEscape, closeOverlay}