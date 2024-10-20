import {initialCards} from './cards.js'
import {openPopup, closePopup, closePopupOnEscape, closeOverlay} from './modal.js'

function createCard (cardData, deleteCard, likeClick, openImage) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardButton = cardElement.querySelector('.card__delete-button')
  const likeButton = cardElement.querySelector('.card__like-button')
  const imageButton = cardElement.querySelector('.card__image')

  cardElement.querySelector('.card__image').src = cardData.link
  cardElement.querySelector('.card__title').textContent = cardData.name
  cardElement.querySelector('.card__image').alt = `Локация: ${cardData.name}`

  if (cardButton) {
    cardButton.addEventListener('click', deleteCard)
  }

  if (likeButton) {
    likeButton.addEventListener('click', likeClick)
  }
  
  if (imageButton) {
    imageButton.addEventListener('click', openImage)
  }
  

  return cardElement
}

// function addCards () {
//   const addPlaces = document.querySelector('.places__list')
//   for (let i=0; i< initialCards.length; i++) {
//     addPlaces.append(createCard(initialCards[i], deleteCard, likeClick, openImage))
//   }
// }

function deleteCard (evt) {
  evt.target.closest('.card').remove()
}

// addCards()

// function openImage (evt) {
//   openPopup(imagePopup)
//   const imageTarget = evt.target.closest('.card__image')
//   if (imageTarget) {
//     const cardElement = imageTarget.closest('.places__item');
//     const popupImage = document.querySelector('.popup__image')

//     popupImage.src = imageTarget.src

//     popupCaption.textContent = cardElement.querySelector('.card__title').textContent;
// }
// }

// imageButton.addEventListener('click', openImage)

// closeImage.addEventListener('click', function() {
//   closePopup(imagePopup)
// })

function likeClick (evt) {
  evt.target.classList.add('card__like-button_is-active')
} 

export {createCard, deleteCard, likeClick}