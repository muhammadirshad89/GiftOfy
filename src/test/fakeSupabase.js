// In-memory stand-in for the Supabase client, used by tests via vi.mock.
export const isConfigured = true;
export const db = [];
export const state = { session: null, admin: false };
export const supabase = {
  from: () => ({
    insert: async (row) => {
      if (db.some((r) => r.short_id === row.short_id)) return { error: { code: '23505' } };
      db.push({ ...row });
      return { error: null };
    },
  }),
  rpc: async (fn, args) => (fn === 'is_admin'
    ? { data: state.admin, error: null }
    : { data: db.filter((r) => r.short_id === args.p_short_id && r.status === 'published'), error: null }),
  auth: {
    getSession: async () => ({ data: { session: state.session } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signOut: async () => { state.session = null; },
  },
};
