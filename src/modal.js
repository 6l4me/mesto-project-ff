import {editButton, editPopup, closeEdit, formElement, nameInput, jobInput, imageButton, imagePopup, closeImage, popupCaption, openPopup, closePopup, closeImageEsc, closeImageOverlay} from './index.js'
import {initialCards, createCards, addCards, deleteCard, handleFormAddCard, likeClick} from './cards.js'

function getImage () {
  for (let i=0; i<initialCards.length; i++) {
    imageButton.addEventListener('click', openPopup)
    closeImage.addEventListener('click', closePopup)
    imagePopup.querySelector('.popup__image').src = initialCards[i].link
    document.addEventListener('keydown', closeImageEsc)
    imagePopup.addEventListener('click', closeImageOverlay)
  }
}

export {getImage}







