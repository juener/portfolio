import { resolve } from 'node:path'
import { config } from 'dotenv'
import { z } from 'zod'

config({ path: resolve(process.cwd(), '../.env') })

function normalizePem(value: string) {
	return value.replace(/\\n/g, '\n').trim()
}

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'staging']),
	NEST_DATABASE_URL: z.string(),
	NEST_PORT: z.coerce.number(),
	NEST_JWT_PRIVATE_KEY: z.string().min(10).transform(normalizePem),
	NEST_JWT_PUBLIC_KEY: z.string().min(10).transform(normalizePem),
	NEST_PLATFORM_ADMIN_USER_ID: z.cuid(),
})

const parsed = envSchema.parse(process.env)

export const env = parsed
