import './pages/index.css';
import initialCards from './cards.js'

// @todo: Темплейт карточки

function createCards (cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardButton = cardElement.querySelector('.card__delete-button')

  cardElement.querySelector('.card__image').src = cardData.link
  cardElement.querySelector('.card__title').textContent = cardData.name
  cardElement.querySelector('.card__image').alt = `Локация: ${cardData.name}`

  if (cardButton) {
    cardButton.addEventListener('click', deleteCard)
  }

  return cardElement
}

function addCards () {
  const addPlaces = document.querySelector('.places__list')
  for (let i=0; i< initialCards.length; i++) {
    addPlaces.append(createCards(initialCards[i], deleteCard))
  }

}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

function deleteCard (evt) {
  evt.target.closest('.card').remove()
}

// @todo: Вывести карточки на страницу

addCards()
