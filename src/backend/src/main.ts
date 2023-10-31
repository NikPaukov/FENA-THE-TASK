import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as session from "express-session";
import * as process from "process";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:process.env.FRONTEND_URL,credentials:true})
  app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        cookie:{
            maxAge: 86400000
        },
        saveUninitialized: true,
    }))
app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix("/api")
    console.log('PORT:' + process.env.BACKEND_PORT)
    await app.listen(+process.env.BACKEND_PORT);
 }
bootstrap();
