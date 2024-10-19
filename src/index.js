import './pages/index.css';
import {initialCards} from './cards.js'
import {openPopup, closePopup, closePopupOnEscape, closeOverlay} from './modal.js'
import {createCard, deleteCard, likeClick} from './card.js'

addCards()

const editButton = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const closeEdit = editPopup.querySelector('.popup__close')

editButton.addEventListener('click', function () {
  const nameInput = editPopup.querySelector('.popup__input_type_name')
  const jobInput = editPopup.querySelector('.popup__input_type_description')

  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent
  openPopup(editPopup)
})

closeEdit.addEventListener('click', function () {
  closePopup(editPopup)
})

const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_new-card')
const closeAdd = addPopup.querySelector('.popup__close')

addButton.addEventListener('click', function() {
  openPopup(addPopup)
})

closeAdd.addEventListener('click', function() {
  closePopup(addPopup)
})

const imageButton = document.querySelector('.card__image')
const imagePopup = document.querySelector('.popup_type_image')
const closeImage = imagePopup.querySelector('.popup__close')
const popupCaption = document.querySelector('.popup__caption')

closeImage.addEventListener('click', function() {
  closePopup(imagePopup)
})

function addCardFormElement(evt) {
    evt.preventDefault(); 

    const nameInput = editPopup.querySelector('.popup__input_type_name')
    const jobInput = editPopup.querySelector('.popup__input_type_description')

    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value
    
    closePopup(editPopup)
}

editPopup.addEventListener('submit', addCardFormElement);

function handleFormAddCard (evt) {
  evt.preventDefault()
  const cardNameInput = document.querySelector('.popup__input_type_card-name')
  const urlInput = document.querySelector('.popup__input_type_url')
  const addPlaces = document.querySelector('.places__list')
  const cardInfo = {
    name: cardNameInput.value, 
    link: urlInput.value,
  }

  

  addPlaces.prepend(createCard(cardInfo, deleteCard, likeClick, openImage))

  closePopup(addPopup)
  closePopup(editPopup)

  cardNameInput.value = ''
  urlInput.value = ''

}
document.forms['new-place'].addEventListener('submit', handleFormAddCard)

function addCards () {
  const addPlaces = document.querySelector('.places__list')
  for (let i=0; i< initialCards.length; i++) {
    addPlaces.append(createCard(initialCards[i], deleteCard, likeClick, openImage))
  }
}

function openImage (evt) {
  openPopup(imagePopup)
  const imageTarget = evt.target.closest('.card__image')
  if (imageTarget) {
    const cardElement = imageTarget.closest('.places__item');
    const popupImage = document.querySelector('.popup__image')

    popupImage.src = imageTarget.src

    popupCaption.textContent = cardElement.querySelector('.card__title').textContent;
}
}
