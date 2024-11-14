import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'comon/filters/execption-filter';
import session from 'express-session';
import passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    session({
      secret: configService.getOrThrow('SESSION_STORE_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
