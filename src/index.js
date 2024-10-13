import './pages/index.css';
import {initialCards, addCards} from './cards.js'
import {getImage} from './modal.js'


// function createCards (cardData, deleteCard, handleFormAddCard, likeClick) {
//   const cardTemplate = document.querySelector('#card-template').content
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
//   const cardButton = cardElement.querySelector('.card__delete-button')
//   const addPopup = document.querySelector('.popup_type_new-card')
//   const likeButton = cardElement.querySelector('.card__like-button')
//   const popupCaption = document.querySelector('.popup__caption')

//   cardElement.querySelector('.card__image').src = cardData.link
//   cardElement.querySelector('.card__title').textContent = cardData.name
//   cardElement.querySelector('.card__image').alt = `Локация: ${cardData.name}`

//   if (cardButton) {
//     cardButton.addEventListener('click', deleteCard)
//   }

//   addPopup.addEventListener('submit', handleFormAddCard)

//   if (likeButton) {
//     likeButton.addEventListener('click', likeClick)
//   }

//   // console.log(cardElement.querySelector('.card__title').textContent)
//   // console.log(popupCaption.textContent)
//   // popupCaption.textContent = cardElement.querySelector('.card__title').textContent

//   return cardElement
// }

// function addCards () {
//   const addPlaces = document.querySelector('.places__list')
//   for (let i=0; i< initialCards.length; i++) {
//     addPlaces.append(createCards(initialCards[i], deleteCard, handleFormAddCard, likeClick))
//   }
// }

// function deleteCard (evt) {
//   evt.target.closest('.card').remove()
// }

addCards()



const editButton = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const closeEdit = editPopup.querySelector('.popup__close')

editButton.addEventListener('click', function () {
  editPopup.classList.add('popup_is-animated')
  editPopup.classList.add('popup_is-opened')
})

closeEdit.addEventListener('click', function() {
  editPopup.classList.add('popup_is-animated')
  editPopup.classList.remove('popup_is-opened')
  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent
})

document.addEventListener('keydown', function(evt){
  if (evt.key === 'Escape') {
    editPopup.classList.add('popup_is-animated')
    editPopup.classList.remove('popup_is-opened')
  }
})

editPopup.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('.popup__close') || evt.target === evt.currentTarget) {
    editPopup.classList.add('popup_is-animated')
    editPopup.classList.remove('popup_is-opened')
  }
})


const formElement = document.querySelector('.popup_type_edit')

const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value
    
    editPopup.classList.add('popup_is-animated')
    editPopup.classList.remove('popup_is-opened')
}

formElement.addEventListener('submit', handleFormSubmit);



// const addButton = document.querySelector('.profile__add-button')
// const addPopup = document.querySelector('.popup_type_new-card')
// const closeAdd = addPopup.querySelector('.popup__close')

// addButton.addEventListener('click', function() {
//   addPopup.classList.add('popup_is-animated')
//   addPopup.classList.toggle('popup_is-opened')
// })

// closeAdd.addEventListener('click', function() {
//   addPopup.classList.add('popup_is-animated')
//   addPopup.classList.toggle('popup_is-opened')
// })

// document.addEventListener('keydown', function(evt){
//   if (evt.key === 'Escape') {
//     addPopup.classList.add('popup_is-animated')
//     addPopup.classList.remove('popup_is-opened')
//   }
// })

// addPopup.addEventListener('click', function (evt) {
//   if (evt.target.classList.contains('.popup__close') || evt.target === evt.currentTarget) {
//     addPopup.classList.add('popup_is-animated')
//     addPopup.classList.remove('popup_is-opened')
//   }
// })


// function handleFormAddCard (evt) {
//   const cardTemplate = document.querySelector('#card-template').content
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
//   const cardList = document.querySelector('.places__list')
//   const cardNameInput = document.querySelector('.popup__input_type_card-name')
//   const urlInput = document.querySelector('.popup__input_type_url')
//   const cardButton = cardElement.querySelector('.card__delete-button')
//   const likeButton = cardElement.querySelector('.card__like-button')

//   evt.preventDefault()
  
//   cardList.prepend(cardElement)

//   document.querySelector('.card__image').src = urlInput.value
//   document.querySelector('.card__title').textContent = cardNameInput.value

//   if (cardButton) {
//     cardButton.addEventListener('click', deleteCard)
//   }

//   if (likeButton) {
//     likeButton.addEventListener('click', likeClick)
//   }

//   addPopup.classList.add('popup_is-animated')
//   addPopup.classList.remove('popup_is-opened')

//   urlInput.value = ''
//   cardNameInput.value = ''
// }

// function likeClick (evt) {
//   evt.target.classList.add('card__like-button_is-active')
// } 

const imageButton = document.querySelector('.places__list')
const imagePopup = document.querySelector('.popup_type_image')
const closeImage = imagePopup.querySelector('.popup__close')
const popupCaption = document.querySelector('.popup__caption')

function openPopup (evt) {
  const imageTarget = evt.target.closest('.card__image')
  if (imageTarget) {
    const cardElement = imageTarget.closest('.places__item');
    const popupImage = document.querySelector('.popup__image')

    popupImage.src = imageTarget.src

    popupCaption.textContent = cardElement.querySelector('.card__title').textContent;

    imagePopup.classList.add('popup_is-animated')
    imagePopup.classList.add('popup_is-opened')
  }

}


function closePopup (evt) {
  if (evt.target) {
    imagePopup.classList.add('popup_is-animated')
    imagePopup.classList.remove('popup_is-opened')
  }
}

function closeImageEsc (evt) {
  if (evt.key === 'Escape') {
    imagePopup.classList.add('popup_is-animated')
    imagePopup.classList.remove('popup_is-opened')
  }
}

function closeImageOverlay (evt) {
  if (evt.target.classList.contains('.popup__close') || evt.target === evt.currentTarget) {
    imagePopup.classList.add('popup_is-animated')
    imagePopup.classList.remove('popup_is-opened')
  }
}


// function getImage () {
//   for (let i=0; i<initialCards.length; i++) {
//     imageButton.addEventListener('click', openPopup)
//     closeImage.addEventListener('click', closePopup)
//     imagePopup.querySelector('.popup__image').src = initialCards[i].link
//     document.addEventListener('keydown', closeImageEsc)
//     imagePopup.addEventListener('click', closeImageOverlay)
//   }
// }

getImage()


export {editButton, editPopup, closeEdit, formElement, nameInput, jobInput, imageButton, imagePopup, closeImage, popupCaption, openPopup, closePopup, closeImageEsc, closeImageOverlay}
