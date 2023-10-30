import {EmailWebsocket} from "../web/sockets/email.websocket";
import {Job, Worker} from "bullmq";
import * as queueConfig from "./email.queue.config";
import {Logger} from "@nestjs/common";

export const emailWorkerFactory = (gateway: EmailWebsocket) => {
    return new Worker(queueConfig.queueName,
        async (job: Job) => {
            const numberOfEmails = job.data.numberOfEmails;
            const sessionId = job.name;

            for (let i = 0; i < numberOfEmails; i++) {
                await sendEmail()
                gateway.sendMessage(sessionId,
                    {
                        jobId: job.id, messagesSent: i + 1,
                        totalMessages: +numberOfEmails
                    },
                    'emailReport')
            }
            return numberOfEmails;
        },
        {connection: queueConfig.connection, concurrency: 10}
    )
}
const sendEmail = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));

}