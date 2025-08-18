import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZnh5Ymt0cnR2dGRqcHVicXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNjQxODksImV4cCI6MjA3MDc0MDE4OX0.vSsgxe1HBLSKG48er3n9Ru0F6tBFnJBNjGSh0DdRknU';
const SUPABASE_URL = 'https://ylfxybktrtvtdjpubqvn.supabase.co'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)