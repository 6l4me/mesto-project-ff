// @todo: Темплейт карточки

function addCard () {
  for (let i=0; i<initialCards.length; i++) {
    const addPlaces = document.querySelector('.places__list')
    const cardTemplate = document.querySelector('#card-template').content
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
    const cardButton = cardElement.querySelector('.card__delete-button')

    cardElement.querySelector('.card__image').src = initialCards[i].link
    cardElement.querySelector('.card__title').textContent = initialCards[i].name

    if (cardButton) {
      cardButton.addEventListener('click', deleteButton)
    }
    
    addPlaces.append(cardElement)
  }
}

addCard()

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

function deleteButton (evt) {
 
  const eventTarget = evt.target.closest('.card').remove()

    
}

// @todo: Вывести карточки на страницу
