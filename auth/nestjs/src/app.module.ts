import { Module } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { AuthenticationModule } from './authentication/authentication.module'
import { ErrorHandler } from './error-handler'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [PrismaModule, UsersModule, AuthenticationModule],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
		{
			provide: APP_FILTER,
			useClass: ErrorHandler,
		},
	],
})
export class AppModule {}
