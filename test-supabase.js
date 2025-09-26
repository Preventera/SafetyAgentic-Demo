import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const test = async () => {
  try {
    const { data, error } = await supabase.from('projects').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Connexion à Supabase OK', data);
  } catch (err) {
    console.error('❌ Erreur de connexion à Supabase :', err);
  }
};

test();
