import {
	ArgumentsHost,
	Catch,
	ConflictException,
	ExceptionFilter,
	ForbiddenException,
	HttpException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import type { FastifyReply } from 'fastify'

@Catch()
export class ErrorHandler implements ExceptionFilter {
	catch(error: unknown, host: ArgumentsHost) {
		const reply = host.switchToHttp().getResponse<FastifyReply>()

		if (error instanceof UnauthorizedException) {
			return reply.code(401).send({ message: error.message })
		}

		if (error instanceof ForbiddenException) {
			return reply.code(403).send({ message: error.message })
		}

		if (error instanceof NotFoundException) {
			return reply.code(404).send({ message: error.message })
		}

		if (error instanceof ConflictException) {
			return reply.code(409).send({ message: error.message })
		}

		if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
			return reply.code(409).send({ message: 'Unique constraint failed' })
		}

		if (error instanceof HttpException) {
			return reply.code(error.getStatus()).send({ message: error.message })
		}

		console.error(error)

		reply.code(500).send({ message: 'Internal server error' })
	}
}
