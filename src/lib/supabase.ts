import { createClient } from '@supabase/supabase-js';

// Ensure these environment variables are set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL and Anon Key must be provided as environment variables.");
  // In a production app, you might want to throw an error or handle this more gracefully
  // For now, we'll throw an error to ensure they are set during development.
  throw new Error("Supabase environment variables are not set. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);