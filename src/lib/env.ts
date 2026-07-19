import { z } from "zod";

/**
 * Strongly-typed, validated environment variables.
 *
 * - Phase 1 (active): Sanity only. Missing Sanity vars throw a clear error.
 * - Phase 3-5 (optional): R2, PostgreSQL, Algolia. Optional now, validated
 *   when their service is activated; absence logs a "activate in Phase N" notice.
 */

const boolString = z
  .union([z.boolean(), z.literal("true"), z.literal("false")])
  .transform((v) => v === true || v === "true");

const envSchema = z.object({
  // ─── App ──────────────────────────────────────────────────────────────
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://aakarias.com")
    .transform((u) => u.replace(/\/$/, "")),

  // ─── Sanity (Phase 1 — REQUIRED) ──────────────────────────────────────
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_SANITY_PROJECT_ID is required for Phase 1 (Sanity content source)."),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default("production"),
  SANITY_API_READ_TOKEN: z
    .string()
    .optional()
    .describe("Required only if your dataset is private or for draft previews."),
  SANITY_API_WRITE_TOKEN: z.string().optional(),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z
    .string()
    .url()
    .optional()
    .describe("CORS origin for embedded Studio, e.g. https://aakarias.com"),
  SANITY_REVALIDATE_SECRET: z
    .string()
    .optional()
    .describe("Secret for the on-demand revalidation webhook from Sanity."),

  // ─── Content source toggle (future adapter seam) ─────────────────────
  CONTENT_SOURCE: z.enum(["sanity"]).default("sanity"),

  // ─── Cloudflare R2 (Phase 3 — OPTIONAL) ──────────────────────────────
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET_NAME: z.string().optional(),
  R2_PUBLIC_BASE_URL: z.string().url().optional(),

  // ─── PostgreSQL / Prisma (Phase 4 — OPTIONAL) ────────────────────────
  DATABASE_URL: z.string().optional(),

  // ─── Supabase (Phase 2 — OPTIONAL) ─────────────────────────────────────
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // ─── Algolia (Phase 5 — OPTIONAL) ────────────────────────────────────
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().optional(),
  ALGOLIA_ADMIN_API_KEY: z.string().optional(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string().optional(),
  ALGOLIA_INDEX_NAME: z.string().optional(),

  // ─── Analytics ───────────────────────────────────────────────────────
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION: z.string().optional(),

  // ─── Feature flags ───────────────────────────────────────────────────
  NEXT_PUBLIC_ENABLE_STUDIO: boolString.default(true),

  // ─── Admin Configuration ─────────────────────────────────────────────
  ADMIN_EMAILS: z.string().optional().describe("Comma-separated list of administrator emails."),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const envObj = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
    CONTENT_SOURCE: process.env.CONTENT_SOURCE,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_BASE_URL: process.env.R2_PUBLIC_BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION: process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION,
    NEXT_PUBLIC_ENABLE_STUDIO: process.env.NEXT_PUBLIC_ENABLE_STUDIO,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
  };

  const parsed = envSchema.safeParse(envObj);

  if (!parsed.success) {
    // Only the *required* (Phase 1) vars cause a hard failure.
    const missing = parsed.error.issues
      .filter((i) => i.code === "too_small" || i.code === "invalid_type")
      .map((i) => `${i.path.join(".")}: ${i.message}`);

    if (missing.length > 0) {
      console.error("\n❌ Environment validation failed:\n" + missing.join("\n") + "\n");
      throw new Error(
        "Missing required environment variables. Copy .env.example to .env.local and fill in your Sanity credentials.",
      );
    }
  }

  return parsed.success ? parsed.data : (envSchema.parse(envObj) as Env);
}

/**
 * Cached validated env. Throws on first access if Phase 1 Sanity vars are missing.
 * Call lazily (inside modules / request handlers), not at import time during builds
 * where Next may pre-evaluate the module without env.
 */
let _env: Env | null = null;
export function env(): Env {
  if (_env) return _env;
  _env = parseEnv();
  return _env;
}

/** True if a Phase 3+ service is configured (used to gate optional integrations). */
export const featureFlags = {
  get supabase() {
    const e = env();
    return Boolean(
      e.NEXT_PUBLIC_SUPABASE_URL &&
      e.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      e.SUPABASE_SERVICE_ROLE_KEY,
    );
  },
  get r2() {
    const e = env();
    return Boolean(e.R2_ACCOUNT_ID && e.R2_ACCESS_KEY_ID && e.R2_SECRET_ACCESS_KEY);
  },
  get database() {
    return Boolean(env().DATABASE_URL);
  },
  get algolia() {
    const e = env();
    return Boolean(
      e.NEXT_PUBLIC_ALGOLIA_APP_ID && e.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY && e.ALGOLIA_INDEX_NAME,
    );
  },
  get studio() {
    return env().NEXT_PUBLIC_ENABLE_STUDIO;
  },
  get analytics() {
    const e = env();
    return Boolean(e.NEXT_PUBLIC_GA_ID || e.NEXT_PUBLIC_CLARITY_ID);
  },
};
