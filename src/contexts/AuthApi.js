class AuthApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _onResponce(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject('Ошибка', res.status)
        }
    }

    register(email, password) {
        return fetch(`${this._baseUrl}signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(this._onResponce)
    }

    login(email, password) {
        return fetch(`${this._baseUrl}signin`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(this._onResponce)
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}users/me`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(this._onResponce)
    }
}

export const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co/'
})