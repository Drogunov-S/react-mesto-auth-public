import {propertiesApiAuth} from "./properties";

class Auth {
    constructor({baseUrl, baseJsonHeaders}) {
        this._baseUrl = baseUrl;
        this._baseJsonHeaders = baseJsonHeaders
    }

    register = (username, password) => {
        return this._request(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._baseJsonHeaders,
            body: JSON.stringify({email: username, password})
        })
    }

    authorize(email, password) {
        return this._request(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._baseJsonHeaders,
            body: JSON.stringify({email, password})
        })
    }

    checkToken(token) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                ...this._baseJsonHeaders,
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                return data.data;
            })
    }


    _request(url, options) {
        return fetch(url, options)
            .then(response => {
                return response.ok
                    ? response.json()
                    : Promise.reject(response.json());
            })
    }
}

const auth = new Auth(propertiesApiAuth);

export default auth;
