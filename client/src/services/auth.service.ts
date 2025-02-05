import Cookies from 'js-cookie'

import { clearAuthData, setAuthData } from '@/store/auth.slice'

import { axiosClassic } from '@/api/axios'

import type { IAuthData } from '@/app/auth/auth-form.types'
import { store } from '@/store'
import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

class AuthService {
	private _AUTH = '/auth'

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			headers: {
				recaptcha: recaptchaToken
			}
		})

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}

		return response
	}

	async initializeAuth() {
		const initialStore = store.getState().auth
		if (initialStore.user) return

		try {
			await this.getNewTokens()
		} catch (error) {
			store.dispatch(clearAuthData())
		}
	}

	async getNewTokens() {
		try {
			const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`)

			if (response.data.accessToken) {
				this._saveTokenStorage(response.data.accessToken)

				store.dispatch(setAuthData(response.data))
			}

			return response
		} catch (error) {
			return null
		}
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`)

		if (response.data) {
			this.removeFromStorage()
		}

		return response
	}

	private _saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			expires: 1 / 24,
			sameSite: 'strict',
			secure: true
		})
	}

	removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
		store.dispatch(clearAuthData())
	}
}

export const authService = new AuthService()
