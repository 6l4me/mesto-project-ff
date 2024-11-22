function createCard(cardData, deleteCard, likeClick, openImage, userID, openDeletePopup, likePromise, dislikePromise) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const imageButton = cardElement.querySelector('.card__image');
  const likeNumber = cardElement.querySelector('.card__like-number');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = `Локация: ${cardData.name}`;

  if (userID !== cardData.owner._id) {
    deleteButton.remove();
  }

  const isLiked = cardData.likes.some((like) => like._id === userID);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  if (imageButton) {
    imageButton.addEventListener('click', openImage)
  }

  likeNumber.textContent = cardData.likes.length;

  deleteButton.addEventListener('click', () => {
    openDeletePopup(cardData._id, cardElement);
  });

  likeButton.addEventListener('click', function () {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    
    likeNumber.textContent = cardData.likes.length;

    const promise = isLiked ? dislikePromise(cardData._id) : likePromise(cardData._id);
    promise
      .then((updatedCard) => {
        if (isLiked) {
          likeButton.classList.remove('card__like-button_is-active');
        } else {
          likeButton.classList.add('card__like-button_is-active');
        }

        cardData.likes.length = updatedCard.likes.length;
        likeNumber.textContent = updatedCard.likes.length;
        
      })
  });

  return cardElement;
}


function deleteCard (evt) {
  evt.target.closest('.card').remove()
}

function likeClick (evt) {
  evt.target.classList.add('card__like-button_is-active')
} 

export {createCard, deleteCard, likeClick}