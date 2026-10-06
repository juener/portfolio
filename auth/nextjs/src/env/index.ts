import { resolve } from 'node:path'
import { loadEnvConfig } from '@next/env'
import { z } from 'zod'

loadEnvConfig(resolve(process.cwd(), '..'), process.env.NODE_ENV !== 'production', undefined, true)

const envSchema = z.object({
	NEXT_API_URL: z.string(),
})

export const env = envSchema.parse(process.env)
