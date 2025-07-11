import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://llobhwcebmowtsmuobhd.supabase.co",
  process.env.SERVICE_ROLE_KEY as string
);
