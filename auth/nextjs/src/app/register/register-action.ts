'use server'

import { z } from 'zod'
import { registerApi } from './register-api'

const registerSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string().min(6),
	avatarUrl: z.url().default('https://api.vallete.com/auth/avatar/avatar-default.png'),
})

export type RegisterState = {
	error: string | null
	field: 'name' | 'email' | 'password' | 'avatarUrl' | null
}

export async function registerAction(
	_previousState: RegisterState,
	formData: FormData,
): Promise<RegisterState> {
	const parsed = registerSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		avatarUrl: formData.get('avatarUrl'),
	})

	if (!parsed.success) {
		const issue = parsed.error.issues[0]
		const field = issue?.path[0]

		return {
			error: issue?.message ?? 'Check the form and try again.',
			field:
				field === 'name' || field === 'email' || field === 'password' || field === 'avatarUrl'
					? field
					: null,
		}
	}

	const response = await registerApi(
		parsed.data.name,
		parsed.data.email,
		parsed.data.password,
		parsed.data.avatarUrl,
	)

	if (!response.ok) {
		const body = await response.json().catch(() => null)
		const message = typeof body?.message === 'string' ? body.message : 'Request failed'

		return {
			error: `${response.status} ${message}`,
			field: null,
		}
	}

	return { error: null, field: null }
}
