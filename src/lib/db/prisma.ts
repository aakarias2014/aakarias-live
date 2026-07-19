/**
 * Prisma client singleton — STUB (Phase 4).
 *
 * Phase 4 activates PostgreSQL for: newsletter subscribers, contact messages,
 * downloads, and search logs. Today this module exists only to document the
 * intended shape; calling code gates on `featureFlags.database`.
 *
 * To activate (Phase 4):
 *   1. Upgrade Node to >= 20.19 (Prisma engine requirement) and
 *      `npm i @prisma/client && npm i -D prisma` (install failed on Node 20.11).
 *   2. Set DATABASE_URL and run `npx prisma migrate dev`.
 *   3. Uncomment the client below.
 */

import { featureFlags } from "@/lib/env";

// import { PrismaClient } from "@prisma/client";
//
// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({ log: ["error", "warn"] });
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const dbStatus = {
  active: featureFlags.database,
  notice:
    "PostgreSQL/Prisma is a Phase 4 feature. Server actions (newsletter, contact) currently return success without persisting.",
};
