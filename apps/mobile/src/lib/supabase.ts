import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl  = process.env.EXPO_PUBLIC_SUPABASE_URL  || "https://ccayplyyuziuocdvcrpm.supabase.co";
const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_j8rUvRwDbIlCJ8rhwpHaHQ_N3z9bGq7";

if (!supabaseUrl || !supabaseAnon) {
  console.error("Supabase env vars missing — app will not connect to backend");
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
