import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cogaheelmgfxrxwxjfmw.supabase.co",
  process.env.SERVICE_ROLE_KEY as string
)