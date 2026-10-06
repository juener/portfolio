import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const postUserSchema = z
	.object({
		name: z.string().min(3).max(100),
		email: z.email(),
		password: z.string().min(6).max(128),
		avatarUrl: z.string().default('https://api.vallete.com/auth/avatar/avatar-default.png'),
	})
	.strict()

export class PostUserDto extends createZodDto(postUserSchema) {}
