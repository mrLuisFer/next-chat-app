import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "https://rzvqvfxbrmoqphzcfhpk.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dnF2Znhicm1vcXBoemNmaHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NzA2NjcsImV4cCI6MTk5MDQ0NjY2N30.mQI22EgRpwkxh2qbrt7uxm-1kLeImsKD4lLLs-fWLr0";

export const supabase = createClient(supabaseUrl, supabaseKey);
