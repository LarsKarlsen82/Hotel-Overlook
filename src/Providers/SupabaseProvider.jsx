import { createClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

const SupabaseContext = createContext();

// Create the GoTrueClient instance outside the component
const supabaseUrl = 'https://ouxemfujuurkzesgdrsu.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const SupabaseProvider = ({ children }) => {
  const [supabaseState, setSupabaseState] = useState(supabase);

  useEffect(() => {
    if (supabaseKey && !supabase) {
      // Check if supabase is not already set to avoid creating multiple instances
      setSupabase(createClient(supabaseUrl, supabaseKey));
    }
    setSupabaseState(supabase);
  }, [supabaseKey]);

  return <SupabaseContext.Provider value={{ supabase: supabaseState }}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => useContext(SupabaseContext);