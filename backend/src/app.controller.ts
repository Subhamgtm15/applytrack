import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    // Public health check used by Render's healthCheckPath. Must return 200.
    @Get()
    health() {
        return { status: "ok" };
    }
}
