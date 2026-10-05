import { createPublicKey } from 'node:crypto'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { env } from '../env'

@ApiTags('.well-known')
@Controller('.well-known')
export class WellKnownController {
	@Get('jwks.json')
	jwks() {
		const publicKey = createPublicKey(env.NEST_JWT_PRIVATE_KEY).export({ format: 'jwk' })

		return { keys: [{ ...publicKey, use: 'sig', alg: 'RS256' }] }
	}
}
