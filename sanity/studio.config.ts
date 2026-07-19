"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

/**
 * Sanity Studio config, embedded at /studio via next-sanity.
 * @see https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router
 */
export const sanityStudioConfig = defineConfig({
  name: "aakar-ias-studio",
  title: "Aakar IAS Studio",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
