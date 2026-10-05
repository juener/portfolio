import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import argon2 from 'argon2'
import { env } from '@/env'
import { PrismaService } from '@/prisma/prisma.service'
import type { PostLoginDto } from './dto/post-login'

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async login(postLoginDto: PostLoginDto): Promise<{ accessToken: string }> {
		const user = await this.prisma.user.findUnique({
			where: {
				email: postLoginDto.email,
			},
		})

		if (!user) {
			throw new UnauthorizedException()
		}

		const doesPasswordMatch = await argon2.verify(user?.passwordHash, postLoginDto.password)

		if (!doesPasswordMatch) {
			throw new UnauthorizedException()
		}

		const accessToken = this.jwtService.sign({
			sub: user.id,
			email: user.email,
			name: user.name,
			avatarUrl: user.avatarUrl,
			isPlatformAdmin: user.id === env.NEST_PLATFORM_ADMIN_USER_ID,
		})

		return {
			accessToken,
		}
	}
}
