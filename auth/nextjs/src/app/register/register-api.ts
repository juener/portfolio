import { env } from '@/env'

export async function registerApi(
	name: string,
	email: string,
	password: string,
	avatarUrl: string,
) {
	return fetch(`${env.NEXT_API_URL}/v1/users`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, password, avatarUrl }),
	})
}
