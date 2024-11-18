import { createCard, deleteCard, likeClick } from "./card.js";
import {nameAuthor, aboutAuthor, nameInput, descriptionInput, avatarUrl, profileImage} from './index.js'

const userData = fetch(
  "https://mesto.nomoreparties.co/v1/wff-cohort-25/users/me",
  {
    headers: {
      authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
    },
  }
).then((res) => res.json());

const cardData = fetch(
  "https://mesto.nomoreparties.co/v1/wff-cohort-25/cards",
  {
    headers: {
      authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
    },
  }
).then((res) => res.json());

function updateUserData() {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-25/users/me", {
    method: "PATCH",
    headers: {
      authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: descriptionInput.value,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      nameAuthor.textContent = result.name;
      aboutAuthor.textContent = result.about;
    });
}

function postNewPlace(newInfo) {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-25/cards", {
    method: "POST",
    headers: {
      authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newInfo.name,
      link: newInfo.link,
    }),
  }).then((res) => res.json());
}

function deleteCardPromise(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

function likePromise(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

function dislikePromise(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-25/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

function updateAvatar() {
  return fetch(
    "https://mesto.nomoreparties.co/v1/wff-cohort-25/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: "363c28ba-378d-466a-b536-c9d6e75fceb3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl.value,
      }),
    }
  )
    .then((res) => res.json())
    .then((result) => {
      profileImage.style.backgroundImage = `url(${result.avatar})`;
    });
}

export { userData, cardData, updateUserData, postNewPlace, deleteCardPromise, likePromise, dislikePromise, updateAvatar };
