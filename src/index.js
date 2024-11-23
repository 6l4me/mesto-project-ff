import './pages/index.css';
import {openPopup, closePopup, closePopupOnEscape, closeOverlay} from './modal.js'
import {createCard, deleteCard, likeClick} from './card.js'
import {showError, hideError, checkInputValidity, setEventListener, enableValidation, hasInvalidInput, toggleButtonState, clearValidation, disableButton} from './validation.js'
import { userData, cardData, updateUserData, postNewPlace, deleteCardPromise, likePromise, dislikePromise, updateAvatar } from './api.js'

const editButton = document.querySelector('.profile__edit-button')
const editPopup = document.querySelector('.popup_type_edit')
const closeEdit = getCloseButton(editPopup)
const editForm = getForm(editPopup)
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = editPopup.querySelector('.popup__input_type_description')
const aboutAuthor = document.querySelector('.profile__description')
const nameAuthor = document.querySelector('.profile__title')
const addPlaces = document.querySelector('.places__list')
const profileImage = document.querySelector('.profile__image')
const editResetButton = getSubmitButton(editPopup)
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
};

function getSubmitButton(form) {
  return form.querySelector('.popup__button');
}

function getCloseButton(popup) {
  return popup.querySelector('.popup__close');
}

function getForm (form) {
  return form.querySelector('.popup__form')
}

editButton.addEventListener('click', function () {  

  nameInput.value = nameAuthor.textContent
  jobInput.value = aboutAuthor.textContent

  clearValidation(editForm, settings)
  openPopup(editPopup)
})

closeEdit.addEventListener('click', function () {
  closePopup(editPopup)
  
})

const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_new-card')
const closeAdd = getCloseButton(addPopup)
const addForm = getForm(addPopup)
const addResetButton = getSubmitButton(addPopup)

addButton.addEventListener('click', function() {
  clearValidation(editPopup, settings)
  openPopup(addPopup)
})

closeAdd.addEventListener('click', function() {
  closePopup(addPopup)
})

const imagePopup = document.querySelector('.popup_type_image')
const closeImage = getCloseButton(imagePopup)
const popupCaption = document.querySelector('.popup__caption')

closeImage.addEventListener('click', function() {
  closePopup(imagePopup)
})

const editSubmitButton = getSubmitButton(editForm);

function handleFormEditCard(evt) {
    evt.preventDefault(); 

    handleSaveButton(editSubmitButton, true);
    
    updateUserData(nameInput.value, jobInput.value)
    .then((res) => {
      nameAuthor.textContent = res.name;
      aboutAuthor.textContent = res.about;
      closePopup(editPopup);
      disableButton(editResetButton, settings)
    })
    .catch((err) => console.log('Ошибка обновления профиля:', err))
    .finally(() => handleSaveButton(editSubmitButton, false));
}

editPopup.addEventListener('submit', handleFormEditCard);

const cardNameInput = document.querySelector('.popup__input_type_card-name')
const urlInput = document.querySelector('.popup__input_type_url')
const addSubmitButton = getSubmitButton(addForm);

function handleFormAddCard (evt) {
  evt.preventDefault()
  const cardInfo = {
    name: cardNameInput.value, 
    link: urlInput.value,
  }

  handleSaveButton(addSubmitButton, true);

  postNewPlace(cardInfo)
  .then((result) => { 
    addPlaces.prepend(createCard(result, deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise));

    closePopup(addPopup);
    disableButton(addResetButton, settings)
    cardNameInput.value = '';
    urlInput.value = '';
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })
  .finally(() => {
    handleSaveButton(addSubmitButton, false);
  })

}

document.forms['new-place'].addEventListener('submit', handleFormAddCard)

function addCards (data) {
  
  for (let i=0; i< data.length; i++) {
    addPlaces.append(createCard(data[i], deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise))
  }
}

const popupImage = document.querySelector('.popup__image')

function openImage (evt) {
  openPopup(imagePopup)
  const imageTarget = evt.target.closest('.card__image')
  if (imageTarget) {
    const cardElement = imageTarget.closest('.places__item');

    popupImage.src = imageTarget.src

    popupCaption.textContent = cardElement.querySelector('.card__title').textContent;
  }
}

enableValidation(settings);


let userID

const promises = [userData, cardData]

Promise.all(promises)
  .then((result) => {
    
    nameAuthor.textContent = result[0].name
    aboutAuthor.textContent = result[0].about
    profileImage.style.backgroundImage = `url(${result[0].avatar})`

    userID = result[0]._id
    
    result[1].map((cardData) => {
      const cardElement = createCard(cardData, deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise);
      addPlaces.insertAdjacentElement('beforeend', cardElement);
    });
    
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })

const deletePopup = document.querySelector('.popup_type_delete')
const closeDelete = getCloseButton(deletePopup)

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
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  })
} 

deletePopup.addEventListener('submit', closeDeletePopup)

const avatarPopup = document.querySelector('.popup_type_avatar')
const closeAvatar = getCloseButton(avatarPopup)
const avatarUrl = avatarPopup.querySelector('.popup__input_avatar')
const avatarForm = getForm(avatarPopup)
const avatarResetButton = getSubmitButton(avatarPopup)

profileImage.addEventListener('click', function (){
  clearValidation(avatarPopup, settings)
  openPopup(avatarPopup)
})

closeAvatar.addEventListener('click', function() {
  closePopup(avatarPopup)
})

const avatarSubmitButton = getSubmitButton(avatarForm);

function closeAvatarPopup(evt) {
  evt.preventDefault();

  handleSaveButton(avatarSubmitButton, true);

  updateAvatar(avatarUrl.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      disableButton(avatarResetButton, settings)
      avatarForm.reset();
    })
    .catch((err) => console.log('Ошибка обновления аватара:', err))
    .finally(() => { 
      handleSaveButton(avatarSubmitButton, false)
      
    });
} 

avatarForm.addEventListener('submit', closeAvatarPopup);

function handleSaveButton(button, isSaving) {
  if (isSaving) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}