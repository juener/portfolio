import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { FastifyReply } from 'fastify'
import { AuthenticationService } from './authentication.service'
import { clearAuthCookie, setAuthCookie } from './authentication-cookies'
import { PostLoginDto } from './dto/post-login'

@ApiTags('v1/authentication')
@Controller('v1')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() postLoginDto: PostLoginDto, @Res() reply: FastifyReply): Promise<void> {
		const { accessToken } = await this.authenticationService.login(postLoginDto)
		setAuthCookie(reply, accessToken)
		reply.code(HttpStatus.OK).send()
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Res() reply: FastifyReply): Promise<void> {
		clearAuthCookie(reply)
		reply.code(HttpStatus.OK).send()
	}
}
