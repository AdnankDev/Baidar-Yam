import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// 1. Ensure the adapter is initialized correctly
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing");

const adapter = new PrismaPg({ connectionString }); 

// 2. Initialize Prisma Client with the adapter
export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// 3. Save to global object in development to prevent multiple instances
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
