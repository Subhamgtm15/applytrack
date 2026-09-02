import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Protects routes by requiring a valid JWT cookie (see JwtStrategy).
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
