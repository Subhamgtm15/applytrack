import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

// Starts the Google OAuth flow and, on callback, resolves the matching (or newly created) user.
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        config: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            clientID: config.get<string>("CLIENT_ID")!,
            clientSecret: config.get<string>("CLIENT_SECRET")!,
            callbackURL: config.get<string>("CALLBACK_URL")!,
            scope: ["profile", "email"],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<void> {
        try {
            const user = await this.authService.validateGoogleUser(profile);
            done(null, user);
        } catch (error) {
            done(error as Error, undefined);
        }
    }
}
