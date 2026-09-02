import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

// Same rate-limiting behaviour as the old express-rate-limit setup, but as a NestJS guard.
// Overrides the default exception so clients get a friendly 429 message.
@Injectable()
export class AuthThrottlerGuard extends ThrottlerGuard {
    protected async throwThrottlingException(): Promise<void> {
        throw new HttpException(
            "Too many requests. Please try again later.",
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}
