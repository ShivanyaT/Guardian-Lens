import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aigzkpdnhgmjvqlgctsv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZ3prcGRuaGdtanZxbGdjdHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTQwNTUsImV4cCI6MjA2NDYzMDA1NX0.jUIpbypHx_qL1B0UZxcAhhFX6qtg7XVX2hRgnXI97lQ";


export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
