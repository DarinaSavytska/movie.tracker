import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "79b1z406",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});
