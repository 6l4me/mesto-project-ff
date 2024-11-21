const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message || "Ошибка сервера");
  });
}

const userData = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then(checkResponse);

const cardData = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then(checkResponse);

function updateUserData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(checkResponse);
}

function postNewPlace(newInfo) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newInfo.name,
      link: newInfo.link,
    }),
  }).then(checkResponse);
}

function deleteCardPromise(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function likePromise(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

function dislikePromise(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(checkResponse);
}

export { userData, cardData, updateUserData, postNewPlace, deleteCardPromise, likePromise, dislikePromise, updateAvatar };
