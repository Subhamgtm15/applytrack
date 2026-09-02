import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Render terminates TLS at its proxy; trust it so secure cookies are honored in production.
    if (process.env.NODE_ENV === "production") {
        app.getHttpAdapter().getInstance().set("trust proxy", 1);
    }

    app.use(cookieParser());

    // The frontend origin is configurable so the same code works locally and in production.
    app.enableCors({
        origin: process.env.CLIENT_URL ?? "http://localhost:5173",
        credentials: true,
    });

    // Strip unknown properties, transform payloads to DTO instances, and return a single
    // human-readable error message (matches the string shape the frontend expects).
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) => {
                const constraints = errors[0]?.constraints;
                const message = constraints
                    ? Object.values(constraints)[0]
                    : "Validation failed";
                return new BadRequestException(message);
            },
        }),
    );

    const port = Number(process.env.PORT) || 5000;
    await app.listen(port);
    console.log(`Server running on port ${port}`);
}

bootstrap();
