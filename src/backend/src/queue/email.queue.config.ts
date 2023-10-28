import * as process from "process";

export const connection = {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT
}

export const queueName = 'email-queue'

