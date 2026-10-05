import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { env } from '../env'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { WellKnownController } from './well-known.controller'

@Module({
	imports: [
		JwtModule.register({
			privateKey: env.NEST_JWT_PRIVATE_KEY,
			publicKey: env.NEST_JWT_PUBLIC_KEY,
			signOptions: { algorithm: 'RS256', expiresIn: 60 * 60 * 24 }, // 24 hours
		}),
	],
	controllers: [AuthenticationController, WellKnownController],
	providers: [AuthenticationService],
})
export class AuthenticationModule {}
