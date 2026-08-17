import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Avoid instantiating PrismaClient at build time when DATABASE_URL is absent.
// At runtime (server start / request time) the env var will always be present.
function createPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    // Return a proxy that throws a clear error on first use rather than crashing
    // the module during `next build` static analysis.
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        throw new Error(
          `PrismaClient accessed before DATABASE_URL is set (property: ${String(prop)})`
        );
      },
    });
  }
  return new PrismaClient({ log: ["error"] });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
