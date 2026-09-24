// Exercises /wish/:id → WishPage → wishService → the REAL supabase-js client, with only the HTTP layer stubbed.
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

const row = { short_id: 'Ab3dE6gH', occasion: 'birthday', recipient_name: 'Ayesha', sender_name: 'Irshad', relationship: 'Friend', message: 'Hello', tone: 'romantic', design: 'aurora', surprise_mode: false, photo_url: null, created_at: '2026-01-01T00:00:00Z' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

beforeAll(() => { window.scrollTo = () => {}; });
afterAll(() => vi.unstubAllEnvs());

async function openWish(id, respond) {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-placeholder');
  const calls = [];
  globalThis.fetch = vi.fn(async (url, opts) => { calls.push({ url: String(url), body: opts?.body }); return respond(); });
  const { default: App } = await import('../App.jsx');
  render(<MemoryRouter initialEntries={[`/wish/${id}`]}><App /></MemoryRouter>);
  return calls;
}

describe('recipient wish retrieval', () => {
  it('sends the exact URL id to get_wish and shows the wish (array response)', async () => {
    const calls = await openWish('Ab3dE6gH', () => json([row]));
    expect(await screen.findByText(/Irshad made something special/)).toBeTruthy();
    expect(calls[0].url).toBe('https://example.supabase.co/rest/v1/rpc/get_wish');
    expect(JSON.parse(calls[0].body)).toEqual({ p_short_id: 'Ab3dE6gH' });
    expect(calls.every((c) => !c.url.includes('/rest/v1/wishes'))).toBe(true); // never a direct table read
  });
  it('accepts a single-object response too', async () => {
    await openWish('Ab3dE6gH', () => json(row));
    expect(await screen.findByText(/Irshad made something special/)).toBeTruthy();
  });
  it('shows "not found" only when the RPC succeeds with no row', async () => {
    await openWish('Zzzzzzzz', () => json([]));
    expect(await screen.findByText(/This wish could not be found/)).toBeTruthy();
  });
  it('shows a load error, not "not found", when the RPC returns an error', async () => {
    await openWish('Ab3dE6gH', () => json({ code: '42501', message: 'permission denied for function get_wish' }, 403));
    expect(await screen.findByText(/couldn’t load this wish/)).toBeTruthy();
    expect(screen.queryByText(/could not be found/)).toBeNull();
    expect(document.body.textContent).not.toMatch(/permission denied/); // raw DB errors stay hidden
  });
  it('shows a load error on a network failure', async () => {
    await openWish('Ab3dE6gH', () => { throw new TypeError('Failed to fetch'); });
    expect(await screen.findByText(/couldn’t load this wish/)).toBeTruthy();
  });
});
