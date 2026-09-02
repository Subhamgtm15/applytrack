import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

// Validates the JWT carried in the httpOnly `token` cookie (set at login / OAuth session exchange).
// The returned object becomes `req.user` and is read via the @CurrentUser() decorator.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        const secret = config.get<string>("JWT_SECRET");
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.token ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    validate(payload: { userId: number }) {
        return { userId: payload.userId };
    }
}
