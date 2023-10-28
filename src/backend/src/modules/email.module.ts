import {Module} from "@nestjs/common";
import {EmailController} from "../web/controllers/email.controller";
import {EmailService} from "../services/email.service";
import {Queue} from "bullmq";
import * as queueConfig from '../queue/email.queue.config'
import {EmailWebsocket} from "../web/sockets/email.websocket";
import {SessionController} from "../web/controllers/session.controller";
import {emailWorkerFactory} from "../queue/emailWorkerFactory";

@Module({
        imports: [],
        controllers: [EmailController, SessionController],
        providers: [
            EmailService,
            EmailWebsocket,
            {
                provide: "EMAIL_QUEUE",
                useFactory: () => {
                    return new Queue(queueConfig.queueName, {connection: queueConfig.connection})
                }
            },
            {
                provide: "EMAIL_WORKER",
                useFactory: emailWorkerFactory,
                inject: [EmailWebsocket]
            },
        ]
    }
)
export class EmailModule {
}

