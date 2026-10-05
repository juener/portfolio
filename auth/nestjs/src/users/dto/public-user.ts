import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const publicUserSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		email: z.email(),
		avatarUrl: z.string(),
	})
	.strict();

export class PublicUserDto extends createZodDto(publicUserSchema) {}
