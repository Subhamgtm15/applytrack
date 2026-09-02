import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Reads the authenticated user (attached by the JWT strategy) off the request.
// Use @CurrentUser() for the whole object or @CurrentUser("userId") for a single field.
export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user?.[data] : user;
    },
);
