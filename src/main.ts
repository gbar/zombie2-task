import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'nestjs-config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EntityNotFoundErrorFilter } from './common/exception-filters/entity-not-found-error.filter';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = app.get<ConfigService>(ConfigService).get('config.port')

  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
    })
  );

  const options = new DocumentBuilder()
    .setTitle('Zombie 2 - TASK')
    .setDescription('Docs for zombs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs/api', app, document)

  await app.listen(Number.parseInt(port));

  Logger.log(`App is listening on port ${port}.`, 'Bootstrap');
})();
