import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as session from "express-session";
import * as process from "process";

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

    app.setGlobalPrefix("/api")

    await app.listen(3000);
 }
bootstrap();
