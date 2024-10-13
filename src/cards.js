// import {handleFormSubmit, closePopup, closeImageEsc,closeImageOverlay, getImage} from './modal.js'
// import {editButton, editPopup, closeEdit, formElement, nameInput, jobInput, imageButton, imagePopup, closeImage, popupCaption, openPopup} from './index.js'

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


function createCards (cardData, deleteCard, handleFormAddCard, likeClick) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardButton = cardElement.querySelector('.card__delete-button')
  const addPopup = document.querySelector('.popup_type_new-card')
  const likeButton = cardElement.querySelector('.card__like-button')
  const popupCaption = document.querySelector('.popup__caption')

  cardElement.querySelector('.card__image').src = cardData.link
  cardElement.querySelector('.card__title').textContent = cardData.name
  cardElement.querySelector('.card__image').alt = `Локация: ${cardData.name}`

  if (cardButton) {
    cardButton.addEventListener('click', deleteCard)
  }

  addPopup.addEventListener('submit', handleFormAddCard)

  if (likeButton) {
    likeButton.addEventListener('click', likeClick)
  }

  return cardElement
}

function addCards () {
  const addPlaces = document.querySelector('.places__list')
  for (let i=0; i< initialCards.length; i++) {
    addPlaces.append(createCards(initialCards[i], deleteCard, handleFormAddCard, likeClick))
  }
}

function deleteCard (evt) {
  evt.target.closest('.card').remove()
}




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

function likeClick (evt) {
  evt.target.classList.add('card__like-button_is-active')
} 

const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_new-card')
const closeAdd = addPopup.querySelector('.popup__close')

addButton.addEventListener('click', function() {
  addPopup.classList.add('popup_is-animated')
  addPopup.classList.toggle('popup_is-opened')
})

closeAdd.addEventListener('click', function() {
  addPopup.classList.add('popup_is-animated')
  addPopup.classList.toggle('popup_is-opened')
})

document.addEventListener('keydown', function(evt){
  if (evt.key === 'Escape') {
    addPopup.classList.add('popup_is-animated')
    addPopup.classList.remove('popup_is-opened')
  }
})

addPopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('.popup__close') || evt.target === evt.currentTarget) {
    addPopup.classList.add('popup_is-animated')
    addPopup.classList.remove('popup_is-opened')
  }
})


export {initialCards, createCards, addCards, deleteCard, handleFormAddCard, likeClick}