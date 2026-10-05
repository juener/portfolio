import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { PostUserDto } from './dto/post-user'
import type { PublicUserDto } from './dto/public-user'
import { UsersService } from './users.service'

@ApiTags('v1/users')
@Controller('v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async postUser(@Body() postUserDto: PostUserDto): Promise<PublicUserDto> {
		return this.usersService.postUser(postUserDto)
	}
}
