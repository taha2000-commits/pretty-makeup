import { supabase } from "../init";

export async function logout() {
  return await supabase.auth.signOut();
}
