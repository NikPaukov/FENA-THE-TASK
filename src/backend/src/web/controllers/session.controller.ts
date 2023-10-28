import {Controller, Get, Logger, Session} from "@nestjs/common";

@Controller("session")
export class SessionController {
    logger = new Logger(SessionController.name)
    @Get()
    getSessionId(@Session() session: Record<string, any>): any {
        this.logger.log("Get: /session returnedSessionId: " + session.id)
        return session.id
    }
}