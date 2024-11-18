import './pages/index.css';
import {openPopup, closePopup, closePopupOnEscape, closeOverlay} from './modal.js'
import {createCard, deleteCard, likeClick} from './card.js'
import {showError, hideError, checkInputValidity, setEventListener, enableValidation, hasInvalidInput, toggleButtonState} from './validation.js'
import { userData, cardData, updateUserData, postNewPlace, deleteCardPromise, likePromise, dislikePromise, updateAvatar } from './api.js'

const editButton = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const closeEdit = editPopup.querySelector('.popup__close')
const editForm = editPopup.querySelector('.popup__form')

editButton.addEventListener('click', function () {
  const nameInput = editPopup.querySelector('.popup__input_type_name')
  const jobInput = editPopup.querySelector('.popup__input_type_description')

  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent

  clearValidation(editPopup)
  openPopup(editPopup)
})

closeEdit.addEventListener('click', function () {
  closePopup(editPopup)
})

const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_new-card')
const closeAdd = addPopup.querySelector('.popup__close')
const addForm = addPopup.querySelector('.popup__form')

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
    const submitButton = editForm.querySelector('.popup__button');

    handleSaveButton(submitButton, true);

    document.querySelector('.profile__title').textContent = nameInput.value
    document.querySelector('.profile__description').textContent = jobInput.value
    
    
    updateUserData()
    .then (() => {
      closePopup(editPopup)
    })
    .finally (() => {
      handleSaveButton(submitButton, false);
    })
}

editPopup.addEventListener('submit', addCardFormElement);

function handleFormAddCard (evt) {
  evt.preventDefault()
  const cardNameInput = document.querySelector('.popup__input_type_card-name')
  const urlInput = document.querySelector('.popup__input_type_url')
  const addPlaces = document.querySelector('.places__list');
  const submitButton = addForm.querySelector('.popup__button');
  const cardInfo = {
    name: cardNameInput.value, 
    link: urlInput.value,
  }

  handleSaveButton(submitButton, true);

  postNewPlace(cardInfo)
  .then((result) => { 
    addPlaces.prepend(createCard(result, deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise));
  })
  .finally(() => {
    closePopup(addPopup);
    handleSaveButton(submitButton, false);

    cardNameInput.value = '';
    urlInput.value = '';
  });

}

document.forms['new-place'].addEventListener('submit', handleFormAddCard)

function addCards (data) {
  const addPlaces = document.querySelector('.places__list')
  for (let i=0; i< data.length; i++) {
    addPlaces.append(createCard(data[i], deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise))
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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.button_inactive',
  inputErrorClass: '.form__input_type_error',
  errorClass: '.form__input-error'
})

function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement);
  });
  
}

const nameAuthor = document.querySelector('.profile__title')
const aboutAuthor = document.querySelector('.profile__description')
const avatarAuthor = document.querySelector('.profile__image')
const nameInput = document.querySelector('.popup__input_type_name')
const descriptionInput = document.querySelector('.popup__input_type_description')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const urlInput = document.querySelector('.popup__input_type_url')

let userID

const promises = [userData, cardData]

Promise.all(promises)
  .then((result) => {
    
    nameAuthor.textContent = result[0].name
    aboutAuthor.textContent = result[0].about
    avatarAuthor.style.backgroundImage = `url(${result[0].avatar})`

    userID = result[0]._id
    
    result[1].map((cardData) => {
      const cardElement = createCard(cardData, deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise);
      document.querySelector('.places__list').insertAdjacentElement('beforeend', cardElement);
    });
    
    addCards(result[1])
    console.log(result[1])
  })

const deletePopup = document.querySelector('.popup_type_delete')
const closeDelete = deletePopup.querySelector('.popup__close')

closeDelete.addEventListener('click', function () {
  closePopup(deletePopup)
})

let cardForDelete = {}
function openDeletePopup (cardId, cardElement) {
  cardForDelete = {
    id: cardId,
    cardElement
  }
  openPopup(deletePopup)
}

function closeDeletePopup(evt) {
  evt.preventDefault();

  if (!cardForDelete.cardElement) return;

  deleteCardPromise(cardForDelete.id)
  .then(() => {
    cardForDelete.cardElement.remove();
    closePopup(deletePopup)
    cardForDelete = {};
  })
} 

deletePopup.addEventListener('submit', closeDeletePopup)



const profileImage = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_avatar')
const closeAvatar = avatarPopup.querySelector('.popup__close')
const avatarUrl = avatarPopup.querySelector('.popup__input_avatar')
const avatarForm = avatarPopup.querySelector('.popup__form');

profileImage.addEventListener('click', function (){
  openPopup(avatarPopup)
})

closeAvatar.addEventListener('click', function() {
  closePopup(avatarPopup)
})


function closeAvatarPopup(evt) {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector('.popup__button');
  
  handleSaveButton(submitButton, true);

  updateAvatar()
    .then(() => {
      closePopup(avatarPopup);
    })
    .finally(() => {
      handleSaveButton(submitButton, false);
    });
} 

avatarForm.addEventListener('submit', closeAvatarPopup);

function handleSaveButton(button, isSaving) {
  if (isSaving) {
    button.disabled = true;
    button.textContent = 'Сохранение...';
  } else {
    button.disabled = false;
    button.textContent = 'Сохранить';
  }
}

export {nameAuthor, aboutAuthor, nameInput, descriptionInput, avatarUrl, profileImage}