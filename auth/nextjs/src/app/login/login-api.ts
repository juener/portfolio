import { env } from '@/env'

export async function loginApi(email: string, password: string) {
	return fetch(`${env.NEXT_API_URL}/v1/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	})
}
