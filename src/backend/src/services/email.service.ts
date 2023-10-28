import {Inject, Injectable} from "@nestjs/common";
import {Queue} from "bullmq";

@Injectable()
export class EmailService {

    constructor(@Inject("EMAIL_QUEUE") private queue: Queue) {
    }

    async startEmailing(sessionId: string, numberOfEmails: number) {
        this.queue.add(sessionId,
            {numberOfEmails: numberOfEmails})
    }

    async getLastJob(sessionId: string) {
        let jobs = await this.queue.getJobs()
       jobs= jobs.filter(job => job.name === sessionId)
        return jobs.sort((jobA, jobB) => jobB.finishedOn - jobA.finishedOn)
            [0]?.data?.numberOfEmails | 0;
    }
}