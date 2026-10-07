// In-memory, table-aware stand-in for the Supabase client, used by tests via vi.mock.
// `db` stays the name of the wishes table's rows for backward compatibility with existing tests.
export const isConfigured = true;
export const db = []; // wishes
export const repliesDb = []; // wish_replies
export const state = { session: null, admin: false };
const tableOf = (name) => (name === 'wish_replies' ? repliesDb : db);

function project(row, cols) {
  if (!cols || cols === '*') return { ...row };
  const picked = {};
  cols.split(',').forEach((k) => { picked[k.trim()] = row[k.trim()]; });
  return picked;
}
function chain(table, rows, cols) {
  const api = {
    eq: (k, v) => chain(table, rows.filter((r) => r[k] === v), cols),
    order: (k, { ascending = true } = {}) => chain(table, [...rows].sort((a, b) => (ascending ? 1 : -1) * (a[k] > b[k] ? 1 : -1)), cols),
    limit: (n) => chain(table, rows.slice(0, n), cols),
    then: (resolve) => resolve({ data: rows.map((r) => project(r, cols)), error: null }),
  };
  return api;
}

export const supabase = {
  from: (table) => ({
    insert: async (row) => {
      if (table === 'wishes' && db.some((r) => r.short_id === row.short_id)) return { error: { code: '23505' } };
      if (table === 'wish_replies' && !db.some((r) => r.short_id === row.wish_short_id && r.status === 'published')) {
        return { error: { code: '42501', message: 'row-level security policy violation' } }; // mirrors wish_replies_public_insert
      }
      if (table === 'wish_replies' && repliesDb.some((r) => r.reply_token === row.reply_token)) {
        return { error: { code: '23505' } }; // mirrors wish_replies_reply_token_idx
      }
      tableOf(table).push({ ...row });
      return { error: null };
    },
    select: (cols) => chain(table, tableOf(table), cols),
    update: (patch) => ({
      eq: (k, v) => ({
        select: async () => {
          const r = tableOf(table).find((x) => x[k] === v);
          if (r) Object.assign(r, patch);
          return { data: r ? [{ short_id: v }] : [], error: null };
        },
      }),
    }),
  }),
  rpc: async (fn, args) => {
    if (fn === 'is_admin') return { data: state.admin, error: null };
    if (fn === 'get_reply_by_token') {
      const r = repliesDb.find((x) => x.reply_token === args.p_token);
      return { data: r ? [{ sender_name: r.sender_name, message: r.message, reaction: r.reaction, created_at: r.created_at }] : [], error: null };
    }
    return { data: db.filter((r) => r.short_id === args.p_short_id && r.status === 'published'), error: null };
  },
  auth: {
    getSession: async () => ({ data: { session: state.session } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signOut: async () => { state.session = null; },
  },
};
