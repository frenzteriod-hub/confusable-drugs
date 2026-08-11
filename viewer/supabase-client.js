import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js?v=20260808-1";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL
  && SUPABASE_ANON_KEY
  && !SUPABASE_URL.includes("YOUR_PROJECT")
  && !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE")
);

async function loadSupabaseLibrary() {
  const sources = [
    "https://esm.sh/@supabase/supabase-js@2",
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm",
  ];
  let lastError;
  for (const source of sources) {
    try {
      return await import(source);
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`Supabase client could not load from either trusted CDN. Check the internet connection and reload. ${lastError?.message || ""}`.trim());
}

const { createClient } = isSupabaseConfigured
  ? await loadSupabaseLibrary()
  : { createClient: null };

export const supabase = createClient
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export function configurationMessage() {
  return "Supabase is not connected yet. Add the project URL and anon key to supabase-config.js.";
}
