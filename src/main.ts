import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
    optionsSuccessStatus: 204, 
});

 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  
    forbidNonWhitelisted: true,  
    transform: true,  
  }));
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
