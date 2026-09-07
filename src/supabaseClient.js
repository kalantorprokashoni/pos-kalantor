import { createClient } from "@supabase/supabase-js";

/* Project: kalantor pos (sjrtlpjxcxmklqziotxs)
   The "anon public" key is safe to ship in client-side code -- it only
   grants whatever Row Level Security policies are defined on the tables
   (see supabase-setup.sql), it is not a secret. */
const SUPABASE_URL = "https://sjrtlpjxcxmklqziotxs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcnRscGp4Y3hta2xxemlvdHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0Mzc5OTIsImV4cCI6MjEwNDAxMzk5Mn0.nlCqv141du_RTFFJAwJeSniPuyIYnCTLcOF9GZ3iBSg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* All devices share this single row -- simplest possible sync model for
   a small single-shop POS. If Ekalantor Prokashoni ever needs separate
   data per branch/user, this id would become per-branch instead of a
   fixed constant. */
export const STATE_ROW_ID = "main";
