# FENA-THE-TASK

## How to run:
- In root folder rename .env.example to .env
- execute in cmd `docker-compose up --build`

## Notes
- Backend url: https://localhost:3000
- Frontend url: https://localhost:3001
- Used [bullMQ](https://www.npmjs.com/package/bullmq) for queue implementation
- Used socket.io for real-time messaging
- Did not use any databases(besides redis)
- User-persistence is implemented through Session 

## Task:

FENA - THE TASK

Services:
1. frontend: react
2. backend: nestjs
3. queue: kafka (or other if you prefer)
4. database: mysql (if required)

Task description:
1. Create a simple input box with number (e.g. 100000) of emails to send and send button in frontend, which calls the backend to trigger the process
2. The request handler should respond with some sort of job id / email sending id right away
3. The request handler adds the job in the Kafka queue (or other)
4. Which eventually is picked up by workers to send emails. Note it doesn't need to send the actual email, just write a worker and comment out the last send part
5. Update the user browser with the status of how many emails are sent in near realtime
6. User can close the browser and come back and should be able to see the status of a job

