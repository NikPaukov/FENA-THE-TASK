import {Body, Controller, Get, Logger, Post} from "@nestjs/common";
import {EmailService} from "../../services/email.service";
import {Session} from '@nestjs/common'
import {EmailPostRequestDto} from "../dtos/email-post-request.dto";
import {EmailPostResponseDto} from "../dtos/email-post-response.dto";

@Controller("email")
export class EmailController {
    constructor(private emailService: EmailService) {
    }

    private readonly logger = new Logger(EmailController.name)

    @Post()
    startEmailing(@Session() session: Record<string, any>,
                  @Body() body: EmailPostRequestDto
    ): EmailPostResponseDto {
        this.logger.log('Post: /email request with sessionId: ' + session.id)
    this.emailService.startEmailing(session.id, body.numberOfEmails);

        return {jobId: session.id};
    }
    @Get('/lastJob')
    async getLastJob(@Session() session: Record<string, any>) {
        return await this.emailService.getLastJob(session.id);
    }
}