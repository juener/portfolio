import '@fastify/cookie'

import type { FastifyReply } from 'fastify'
import { env } from '../env'

export const AUTH_COOKIE_NAMES = {
	accessToken: 'accessToken',
} as const

const isLocal = env.NODE_ENV === 'development'
const cookieDomain = isLocal ? undefined : '.vallete.com'

const baseCookieOptions = {
	httpOnly: true,
	secure: Boolean(cookieDomain),
	sameSite: 'lax' as const,
	path: '/',
	...(cookieDomain ? { domain: cookieDomain } : {}),
}

export function setAuthCookie(reply: FastifyReply, accessToken: string) {
	const JWT_EXPIRES_IN = 60 * 60 * 24 // 24 hours

	reply.setCookie(AUTH_COOKIE_NAMES.accessToken, accessToken, {
		...baseCookieOptions,
		maxAge: JWT_EXPIRES_IN,
	})
}

export function clearAuthCookie(reply: FastifyReply) {
	reply.clearCookie(AUTH_COOKIE_NAMES.accessToken, {
		path: '/',
		secure: baseCookieOptions.secure,
		sameSite: baseCookieOptions.sameSite,
		...(cookieDomain ? { domain: cookieDomain } : {}),
	})
}
