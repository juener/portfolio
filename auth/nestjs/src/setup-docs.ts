import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { cleanupOpenApiDoc } from 'nestjs-zod'

const PAGE_TITLE = 'Portfolio - Auth API Documentation'

export function setupDocs(app: NestFastifyApplication) {
	const openApiDocument = cleanupOpenApiDoc(
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder().setTitle(PAGE_TITLE).setVersion('1.0').build(),
		),
	)

	const fastify = app.getHttpAdapter().getInstance()
	const openApiPath = `/openapi.json`

	fastify.get(openApiPath, (_request, reply) => {
		reply.send(openApiDocument)
	})

	app.use(
		`/docs`,
		apiReference({
			withFastify: true,
			url: openApiPath,
			pageTitle: PAGE_TITLE,
		}),
	)
}
