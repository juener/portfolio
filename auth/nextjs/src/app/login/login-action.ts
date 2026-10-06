'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { loginApi } from './login-api'

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
})

export type LoginState = {
	error: string | null
	field: 'email' | 'password' | null
}

export async function loginAction(
	_previousState: LoginState,
	formData: FormData,
): Promise<LoginState> {
	const { data, success, error } = loginSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!success) {
		const issue = error.issues[0]
		const field = issue?.path[0]

		return {
			error: issue?.message ?? 'Check the form and try again.',
			field: field === 'email' || field === 'password' ? field : null,
		}
	}

	const response = await loginApi(data.email, data.password)

	if (!response.ok) {
		const body = await response.json().catch(() => null)
		const message = typeof body?.message === 'string' ? body.message : 'Request failed'

		return {
			error: `${response.status} ${message}`,
			field: null,
		}
	}

	const accessToken = response.headers
		.getSetCookie()
		.find((cookie) => cookie.startsWith('accessToken='))
		?.split(';')[0]
		?.slice('accessToken='.length)

	if (!accessToken) {
		return { error: `${response.status} Login did not set a session`, field: null }
	}

	const cookieStore = await cookies()
	cookieStore.set('accessToken', accessToken, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24,
	})

	redirect('/choose-app')
}
