import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Throttle } from "@nestjs/throttler";
import { Request, Response } from "express";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthThrottlerGuard } from "../common/guards/throttler.guard";
import { AuthService } from "./auth.service";
import { cookieOptions } from "./cookie.options";
import { LoginDto } from "./dto/login.dto";
import { SessionDto } from "./dto/session.dto";
import { SignupDto } from "./dto/signup.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    // 3 signups per hour per IP.
    @Post("signup")
    @UseGuards(AuthThrottlerGuard)
    @Throttle({ default: { limit: 3, ttl: 60 * 60 * 1000 } })
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    // 5 login attempts per 15 minutes per IP.
    @Post("login")
    @UseGuards(AuthThrottlerGuard)
    @Throttle({ default: { limit: 5, ttl: 15 * 60 * 1000 } })
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token = await this.authService.login(dto);
        res.cookie("token", token, cookieOptions);
        return { message: "Login successful" };
    }

    @Post("logout")
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie("token", cookieOptions);
        return { message: "Logout successful" };
    }

    // Exchange a token issued by the Google OAuth callback for a first-party auth cookie.
    @Post("session")
    async session(
        @Body() dto: SessionDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token = await this.authService.establishSession(dto.token);
        res.cookie("token", token, cookieOptions);
        return { message: "Session established" };
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    async me(@CurrentUser("userId") userId: number) {
        const user = await this.authService.getProfile(userId);
        return { message: "user found", user };
    }

    @Put("me")
    @UseGuards(JwtAuthGuard)
    async updateMe(
        @CurrentUser("userId") userId: number,
        @Body() dto: UpdateProfileDto,
    ) {
        const user = await this.authService.updateProfile(userId, dto);
        return { message: "Profile updated successfully", user };
    }

    // Redirects the user to Google's login page (handled by the guard/strategy).
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    googleAuth() {
        // Intentionally empty: the guard initiates the OAuth redirect.
    }

    // Google redirects back here; issue a JWT and hand it to the frontend via the URL fragment.
    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    googleCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user as { user_id: number };
        const token = this.authService.signToken(user.user_id);
        const clientUrl =
            this.configService.get<string>("CLIENT_URL") ?? "http://localhost:5173";
        res.redirect(`${clientUrl}/auth/callback#token=${token}`);
    }
}
