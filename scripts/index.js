// @todo: Темплейт карточки

function createCard (cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
  const cardButton = cardElement.querySelector('.card__delete-button')

  cardElement.querySelector('.card__image').src = cardData.link
  cardElement.querySelector('.card__title').textContent = cardData.name

  if (cardButton) {
    cardButton.addEventListener('click', deleteCard)
  }

  return cardElement
}

function addCard () {
  const addPlaces = document.querySelector('.places__list')
  for (let i=0; i< initialCards.length; i++) {
    addPlaces.append(createCard(initialCards[i], deleteCard))
  }

}

addCard()

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

function deleteCard (evt) {

evt.target.closest('.card').remove()

}

// @todo: Вывести карточки на страницу
