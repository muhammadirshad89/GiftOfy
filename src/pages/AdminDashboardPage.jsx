import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import { listAdminWishes, updateWishStatus } from '../services/wishService.js';
import { signOut } from '../services/authService.js';
import useSeo from '../utils/useSeo.js';

const fmt = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export default function AdminDashboardPage() {
  useSeo({ title: 'Admin', noindex: true });
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState('');

  const load = useCallback(async () => {
    setErr('');
    try { setRows(await listAdminWishes()); } catch (e) { setErr(e.userMessage || 'Something went wrong.'); setRows([]); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const act = async (id, status) => {
    if (status === 'deleted' && !window.confirm('Delete this wish? It will be hidden from everyone.')) return;
    setBusy(id); setErr('');
    try { await updateWishStatus(id, status); setRows((r) => r.map((x) => (x.short_id === id ? { ...x, status } : x))); }
    catch (e) { setErr(e.userMessage || 'That action failed.'); } finally { setBusy(''); }
  };

  const count = (s) => (rows || []).filter((r) => r.status === s).length;
  const shown = useMemo(() => (rows || []).filter((r) =>
    (filter === 'all' || r.status === filter) &&
    [r.short_id, r.recipient_name, r.sender_name, r.occasion].join(' ').toLowerCase().includes(q.trim().toLowerCase())), [rows, q, filter]);

  return (
    <section className="wrap adm">
      <div className="adh"><h1 className="h2">Admin dashboard</h1><Button variant="ghost" size="sm" onClick={() => signOut()}>Log out</Button></div>
      <div className="ast">
        {[['Total wishes', (rows || []).length], ['Published', count('published')], ['Hidden', count('hidden')], ['Deleted', count('deleted')]].map(([l, n]) => <div key={l}><b>{rows ? n : '–'}</b>{l}</div>)}
      </div>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="wcard">
        <div className="atb">
          <input type="search" aria-label="Search wishes" placeholder="Search ID, recipient, sender, occasion" value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Filter by status" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All statuses</option><option value="published">Published</option><option value="hidden">Hidden</option><option value="deleted">Deleted</option>
          </select>
        </div>
        {rows === null ? <p role="status">Loading wishes…</p> : shown.length === 0 ? <p>No wishes match.</p> : (
          <div className="tw">
            <table className="at">
              <thead><tr><th>ID</th><th>Occasion</th><th>Recipient</th><th>Sender</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
              <tbody>
                {shown.map((r) => (
                  <Fragment key={r.short_id}>
                    <tr>
                      <td><code>{r.short_id}</code></td><td>{r.occasion}</td><td>{r.recipient_name}</td><td>{r.sender_name || '–'}</td>
                      <td><span className={`pill ${r.status}`}>{r.status}</span></td><td>{fmt(r.created_at)}</td>
                      <td className="act">
                        <Button variant="ghost" size="sm" onClick={() => setOpen(open === r.short_id ? null : r.short_id)} aria-expanded={open === r.short_id}>View</Button>
                        {r.status !== 'published' && <Button variant="ghost" size="sm" disabled={busy === r.short_id} onClick={() => act(r.short_id, 'published')}>{r.status === 'deleted' ? 'Restore' : 'Publish'}</Button>}
                        {r.status === 'published' && <Button variant="ghost" size="sm" disabled={busy === r.short_id} onClick={() => act(r.short_id, 'hidden')}>Hide</Button>}
                        {r.status !== 'deleted' && <Button variant="ghost" size="sm" disabled={busy === r.short_id} onClick={() => act(r.short_id, 'deleted')}>Delete</Button>}
                      </td>
                    </tr>
                    {open === r.short_id && <tr><td colSpan={7}><div className="det"><b>{r.relationship || 'No relationship'} · {r.tone} · {r.design}{r.surprise_mode ? ' · surprise mode' : ''}</b><br />{r.message}</div></td></tr>}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
