
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://sjijaizgfxpamhaarnvg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqaWphaXpnZnhwYW1oYWFybnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NjEzMjcsImV4cCI6MjA1MzAzNzMyN30.-6YQewypfc8pdnm1YaFpcXjtNWbjKF5tpwGV1L2UJBU'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };