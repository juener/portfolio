import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '../env'
import { PrismaClient } from '../generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor() {
		const adapter = new PrismaPg({
			connectionString: env.NEST_DATABASE_URL,
			max: 5,
		})
		super({ adapter })
	}

	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
