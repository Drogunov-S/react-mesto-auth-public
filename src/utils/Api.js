import {propertiesApiCard} from "./properties";

class Api {
    constructor({baseUrl, headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
    }

    updateUserInfo(userData) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
        })
    }

    updateAvatar(urlAvatar) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(urlAvatar)
        })
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }

    postCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        });
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        });
    }

    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    unlikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        });
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }
}

const api = new Api(propertiesApiCard);
export default api;
