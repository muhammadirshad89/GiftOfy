// Admin authentication via Supabase Auth. Authorization is decided by the database (is_admin()).
import { supabase } from '../lib/supabase.js';

export async function signIn(email, password) {
  if (!supabase) throw new Error('Admin sign-in isn’t configured on this deployment.');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.status === 400 ? 'Incorrect email or password.' : 'Sign-in failed. Please try again.');
}
export const signOut = () => supabase?.auth.signOut();
export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}
export async function isAdmin() {
  const { data, error } = await supabase.rpc('is_admin');
  if (error) throw new Error('admin check failed');
  return data === true;
}
export function onAuthChange(cb) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange(cb);
  return () => data.subscription.unsubscribe();
}
