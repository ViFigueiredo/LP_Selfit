
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://sjijaizgfxpamhaarnvg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqaWphaXpnZnhwYW1oYWFybnZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzQ2MTMyNywiZXhwIjoyMDUzMDM3MzI3fQ.rSK_E9AhFTXXd4L-IHdM0vy651sHMrn0DvBwuxDpgGs'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };