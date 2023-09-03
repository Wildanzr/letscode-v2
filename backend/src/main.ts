import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormater } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // CORS
  const options: CorsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(options);

  // Global interceptor to format response
  const reflector = new Reflector();
  app.useGlobalInterceptors(new ResponseFormater(reflector));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('LetsCode V2')
    .setDescription('LetsCode v2 API documentation and playground')
    .setVersion('2.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Global prefix
  // app.setGlobalPrefix('api/v2');

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}
bootstrap();
