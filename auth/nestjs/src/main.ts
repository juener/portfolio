import cookie from '@fastify/cookie'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { env } from './env'
import { setupDocs } from './setup-docs'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
	await app.register(cookie)
	// app.setGlobalPrefix(API_PREFIX)
	setupDocs(app)
	await app.listen(env.NEST_PORT)
}
bootstrap()
