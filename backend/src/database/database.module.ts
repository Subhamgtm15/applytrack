import { Global, Module } from "@nestjs/common";
import { pool } from "../db";
import { PG_POOL } from "./database.constants";

// Global so any service can inject the pg Pool via @Inject(PG_POOL).
// Reuses the existing pool (DATABASE_URL in prod, DB_* locally) from db.ts.
@Global()
@Module({
    providers: [{ provide: PG_POOL, useValue: pool }],
    exports: [PG_POOL],
})
export class DatabaseModule {}
