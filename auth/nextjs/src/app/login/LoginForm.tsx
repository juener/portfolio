'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type LoginState, loginAction } from './login-action'

const initialState: LoginState = { error: null, field: null }

export default function LoginForm() {
	const [state, formAction, pending] = useActionState(loginAction, initialState)

	return (
		<form
			action={formAction}
			className='w-full min-h-24 bg-background/80 rounded-xl p-4 md:p-8 flex flex-col gap-2'
		>
			<label className='sr-only' htmlFor='email'>
				Email
			</label>
			<Input
				id='email'
				name='email'
				type='email'
				autoComplete='email'
				placeholder='Email'
				required
				aria-invalid={state.field === 'email' ? true : undefined}
				className='bg-background'
			/>
			<label className='sr-only' htmlFor='password'>
				Password
			</label>
			<Input
				id='password'
				name='password'
				type='password'
				autoComplete='current-password'
				placeholder='Password'
				required
				aria-invalid={state.field === 'password' ? true : undefined}
				className='bg-background'
			/>
			{state.error ? (
				<p className='text-sm text-destructive' role='alert'>
					{state.error}
				</p>
			) : null}
			<Button type='submit' className='w-full' disabled={pending}>
				{pending ? 'Logging in' : 'Login'}
			</Button>

			<p className='text-sm text-center'>Feel free to register or use user@user.com / 123456</p>
		</form>
	)
}
