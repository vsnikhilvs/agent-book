"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("./generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set for Prisma");
}
// Use Prisma's Postgres adapter so Prisma 7 can connect using DATABASE_URL
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = global.prisma || new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
exports.default = prisma;
//# sourceMappingURL=prismaClient.js.map