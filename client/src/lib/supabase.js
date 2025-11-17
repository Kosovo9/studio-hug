import { createClient } from '@supabase/supabase-js';

// Comet configurará las credenciales reales en Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Funciones helper
export async function getSpaces() {
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function createSpace(spaceData) {
  const { data, error } = await supabase
    .from('spaces')
    .insert([spaceData])
    .select();
  
  return { data, error };
}

export async function getAnalytics(spaceId) {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('space_id', spaceId)
    .order('date', { ascending: true });
  
  return { data, error };
}

