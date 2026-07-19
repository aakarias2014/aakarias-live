/**
 * Cloudflare R2 storage adapter — STUB (Phase 3).
 *
 * Implements the `StorageAdapter` interface so image/PDF uploads can be routed
 * through R2 without touching calling code. Today it is inactive; activating it
 * in Phase 3 only requires installing `@aws-sdk/client-s3` and removing the
 * TODO gates.
 *
 * To activate (Phase 3):
 *   1. npm i @aws-sdk/client-s3
 *   2. Set R2_* env vars (see .env.example)
 *   3. Replace the throw blocks below with real S3Client calls.
 */

import { env, featureFlags } from "@/lib/env";

export interface StorageAdapter {
  /** Upload a file; return its public URL. */
  upload(params: {
    key: string;
    body: Buffer | Uint8Array;
    contentType: string;
    cacheControl?: string;
  }): Promise<{ url: string; key: string }>;

  /** Generate a time-limited signed URL for a private object. */
  signedUrl(key: string, expiresIn?: number): Promise<string>;

  /** Delete an object. */
  delete(key: string): Promise<void>;
}

const PHASE_3_NOTICE =
  "Cloudflare R2 is not activated (Phase 3). Set R2_* env vars and wire the S3Client to enable uploads.";

class R2StubAdapter implements StorageAdapter {
  constructor() {
    if (featureFlags.r2) {
      // When credentials are present we still can't act — SDK not installed yet.
      console.warn("[r2] Credentials detected but adapter not wired yet — Phase 3 TODO.");
    }
  }

  async upload(): Promise<{ url: string; key: string }> {
    throw new Error(PHASE_3_NOTICE);
  }
  async signedUrl(): Promise<string> {
    throw new Error(PHASE_3_NOTICE);
  }
  async delete(): Promise<void> {
    throw new Error(PHASE_3_NOTICE);
  }
}

export function getStorage(): StorageAdapter {
  // TODO(phase-3): when featureFlags.r2, return new R2Adapter(env()).
  void env;
  return new R2StubAdapter();
}
