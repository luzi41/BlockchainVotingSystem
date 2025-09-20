// prisma.config.ts
import { defineConfig } from "prisma/config";
import path from "node:path";
import "dotenv/config";

export default defineConfig({
    schema: path.join("prisma", "schema.prisma"),
    migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts"
    }
});
