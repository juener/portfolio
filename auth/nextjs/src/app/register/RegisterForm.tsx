'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type RegisterState, registerAction } from './register-action'

const initialState: RegisterState = { error: null, field: null }

export default function RegisterForm() {
	const [state, formAction, pending] = useActionState(registerAction, initialState)

	return (
		<form
			action={formAction}
			className='w-full min-h-24 bg-background/80 rounded-xl p-4 flex flex-col gap-2'
		>
			<label className='sr-only' htmlFor='name'>
				Name
			</label>
			<Input
				id='name'
				name='name'
				type='text'
				autoComplete='name'
				placeholder='Name'
				required
				aria-invalid={state.field === 'name' ? true : undefined}
				className='bg-background'
			/>
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
				autoComplete='new-password'
				placeholder='Password'
				required
				aria-invalid={state.field === 'password' ? true : undefined}
				className='bg-background'
			/>
			<label className='sr-only' htmlFor='avatarUrl'>
				Avatar URL
			</label>
			<Input
				id='avatarUrl'
				name='avatarUrl'
				type='url'
				autoComplete='avatar-url'
				placeholder='Avatar URL'
				required
				aria-invalid={state.field === 'avatarUrl' ? true : undefined}
				className='bg-background'
			/>
			{state.error ? (
				<p className='text-sm text-destructive' role='alert'>
					{state.error}
				</p>
			) : null}
			<Button type='submit' className='w-full' disabled={pending}>
				{pending ? 'Registering' : 'Register'}
			</Button>
		</form>
	)
}
