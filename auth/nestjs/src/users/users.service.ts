import { Injectable } from '@nestjs/common'
import argon2 from 'argon2'
import { PrismaService } from '@/prisma/prisma.service'
import type { PostUserDto } from './dto/post-user'
import type { PublicUserDto } from './dto/public-user'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async postUser(postUserDto: PostUserDto): Promise<PublicUserDto> {
		const passwordHash = await argon2.hash(postUserDto.password)

		return this.prisma.user.create({
			data: {
				name: postUserDto.name,
				email: postUserDto.email,
				passwordHash,
				avatarUrl: postUserDto.avatarUrl,
			},
		})
	}
}
