import { PrismaClient } from "@prisma/client";

// Declare globalThis with an index signature to avoid TypeScript error
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient | undefined;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export const db = prisma;
