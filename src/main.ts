import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, HttpStatus, HttpException } from '@nestjs/common';
import { ValidationException } from 'comon/classes/validationExecptions';
import { AllExceptionsFilter } from 'comon/filters/execption-filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const formattedErrors = errors.map(error => ({
        property: error.property,
        message: Object.values(error.constraints || {})[0],
      }));
      return new ValidationException(
        {
          message: formattedErrors,
          error: 'Validation Failed',
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    },
  }));

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
