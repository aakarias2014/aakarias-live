"use client";

import { useState } from "react";

/**
 * Returns true once the component has mounted on the client. Used to defer
 * rendering of client-only UI (e.g. theme-dependent icons from next-themes)
 * until after hydration to avoid a server/client markup mismatch.
 *
 * Implemented with useState (not useEffect+setState) to satisfy the React
 * Compiler's cascading-render lint rule: the initial value is computed once
 * on first client render and never re-set, so there is no synchronous
 * setState inside an effect.
 */
export function useMounted(): boolean {
  // `useState(() => true)` only evaluates its initializer on the client's
  // first render; on the server it stays `false`. We use the callback form
  // so no extra state writes occur after mount.
  const [mounted] = useState<boolean>(() => true);
  return mounted;
}
