import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApplicationsService } from "./applications.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

// Every route requires a valid JWT and is scoped to the authenticated user.
@Controller("applications")
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @Post()
    async create(
        @CurrentUser("userId") userId: number,
        @Body() dto: CreateApplicationDto,
    ) {
        const application = await this.applicationsService.create(userId, dto);
        return { message: "Application added successfully", application };
    }

    @Get()
    async findAll(@CurrentUser("userId") userId: number) {
        const applications = await this.applicationsService.findAll(userId);
        return { message: "application fetched", applications };
    }

    @Get(":id")
    async findOne(
        @CurrentUser("userId") userId: number,
        @Param("id") id: string,
    ) {
        const application = await this.applicationsService.findOne(userId, id);
        return { success: true, application };
    }

    @Put(":id")
    async update(
        @CurrentUser("userId") userId: number,
        @Param("id") id: string,
        @Body() dto: UpdateApplicationDto,
    ) {
        const application = await this.applicationsService.update(userId, id, dto);
        return { message: "Application updated successfully", application };
    }

    @Delete(":id")
    async remove(
        @CurrentUser("userId") userId: number,
        @Param("id") id: string,
    ) {
        const deletedApplication = await this.applicationsService.remove(userId, id);
        return { deletedApplication, message: "Application deleted successfully" };
    }
}
