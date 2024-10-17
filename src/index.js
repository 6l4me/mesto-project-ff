import './pages/index.css';
import {initialCards} from './cards.js'
import {openPopup, closePopup, closePopupOnEscape, closeOverlay} from './modal.js'
import {createCard, addCards, deleteCard, openImage, likeClick} from './card.js'

addCards()

const editButton = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const closeEdit = editPopup.querySelector('.popup__close')

editButton.addEventListener('click', function () {
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

const imageButton = document.querySelector('.places__list')
const imagePopup = document.querySelector('.popup_type_image')
const closeImage = imagePopup.querySelector('.popup__close')
const popupCaption = document.querySelector('.popup__caption')

imageButton.addEventListener('click', openImage)

closeImage.addEventListener('click', function() {
  closePopup(imagePopup)
})


const nameInput = editPopup.querySelector('.popup__input_type_name')
const jobInput = editPopup.querySelector('.popup__input_type_description')

nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value
    
    editPopup.classList.add('popup_is-animated')
    editPopup.classList.remove('popup_is-opened')
}

editPopup.addEventListener('submit', handleFormSubmit);

function handleFormAddCard (evt) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardList = document.querySelector('.places__list')
  const cardNameInput = document.querySelector('.popup__input_type_card-name')
  const urlInput = document.querySelector('.popup__input_type_url')
  const cardButton = cardElement.querySelector('.card__delete-button')
  const likeButton = cardElement.querySelector('.card__like-button')

  evt.preventDefault()
  
  cardList.prepend(cardElement)

  document.querySelector('.card__image').src = urlInput.value
  document.querySelector('.card__title').textContent = cardNameInput.value

  if (cardButton) {
    cardButton.addEventListener('click', deleteCard)
  }

  if (likeButton) {
    likeButton.addEventListener('click', likeClick)
  }

  addPopup.classList.add('popup_is-animated')
  addPopup.classList.remove('popup_is-opened')
  

  urlInput.value = ''
  cardNameInput.value = ''
}

export {editButton, editPopup, closeEdit, addButton, addPopup, closeAdd, imageButton, imagePopup, closeImage, popupCaption, nameInput, jobInput, handleFormSubmit, handleFormAddCard}