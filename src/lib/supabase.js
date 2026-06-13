import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fwnfvnjqclgprjizbkwf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bmZ2bmpxY2xncHJqaXpia3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzI2MjEsImV4cCI6MjA5Njc0ODYyMX0.vFni0T0tR6QBCnAcpMCdRVYXjQx9z4J9D3uPDeOkl40'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
