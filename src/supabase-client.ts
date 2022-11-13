import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://wewhonxcyqxrsimdodpl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indld2hvbnhjeXF4cnNpbWRvZHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDc3NDcsImV4cCI6MTk4MzkyMzc0N30.1nq0Zf98BmX6gtzg1H65Kyu4c6co2xR7ptmjXAXn7_0'
);
