import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const postLoginSchema = z.object({
	email: z.email(),
	password: z.string().min(6).max(128),
})

export class PostLoginDto extends createZodDto(postLoginSchema) {}
