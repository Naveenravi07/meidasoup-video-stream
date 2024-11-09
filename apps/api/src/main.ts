import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'comon/filters/execption-filter';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: "some cool pass",
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 3600000 }
        })
    )
    app.useGlobalFilters(new AllExceptionsFilter())
    
    app.use(passport.initialize())
    app.use(passport.session())
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
