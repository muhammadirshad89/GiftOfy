// Drives the real v1.3.0 wizard with the REAL supabase-js client; only the HTTP layer is stubbed.
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

beforeAll(() => { window.scrollTo = () => {}; });
afterAll(() => vi.unstubAllEnvs());

async function publish({ env, respond }) {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', env ? 'https://example.supabase.co' : '');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', env ? 'anon-placeholder' : '');
  const calls = [];
  globalThis.fetch = vi.fn(async (url, opts) => { calls.push({ url: String(url), method: opts?.method, body: opts?.body }); return respond(); });
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const { default: App } = await import('../App.jsx');
  render(<MemoryRouter initialEntries={['/create/birthday?t=bd-confetti']}><App /></MemoryRouter>);
  fireEvent.click(await screen.findByRole('button', { name: 'Next' }));
  fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Ayesha' } });
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Irshad' } });
  fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
  fireEvent.click(await screen.findByRole('button', { name: /Publish wish/ }));
  return calls;
}
const inserts = (calls) => calls.filter((c) => c.url.includes('/rest/v1/wishes'));

describe('publish path with the real Supabase client', () => {
  it('sends a schema-compatible INSERT and shows the share screen', async () => {
    const calls = await publish({ env: true, respond: () => new Response(null, { status: 201 }) });
    await screen.findByRole('link', { name: 'Share on WhatsApp' });
    const [c] = inserts(calls);
    expect(c.method).toBe('POST');
    const b = JSON.parse(c.body);
    expect(Object.keys(b).sort()).toEqual(['design', 'message', 'occasion', 'recipient_name', 'relationship', 'sender_name', 'short_id', 'status', 'surprise_mode', 'tone'].sort());
    expect(b).toMatchObject({ occasion: 'birthday', recipient_name: 'Ayesha', sender_name: 'Irshad', relationship: null, tone: 'funny', design: 'bd-confetti', surprise_mode: false, status: 'published' });
    expect(b.short_id).toMatch(/^[A-Za-z0-9]{6,16}$/);
    expect(b.message.length).toBeGreaterThan(0);
    expect(b.message.length).toBeLessThanOrEqual(500);
    expect('photo_url' in b).toBe(false); // omitted on purpose: the public has no column privilege on photo_url
  });
  it('a database rejection is reported as a publish failure, not as "unavailable"', async () => {
    await publish({ env: true, respond: () => new Response(JSON.stringify({ code: '42501', message: 'denied' }), { status: 403, headers: { 'Content-Type': 'application/json' } }) });
    expect(await screen.findByText(/couldn’t publish your wish/)).toBeTruthy();
  });
  it('missing env variables: no request is made and the cause is named (dev)', async () => {
    const calls = await publish({ env: false, respond: () => new Response(null, { status: 201 }) });
    expect(await screen.findByText(/Supabase env variables are missing/)).toBeTruthy();
    expect(inserts(calls)).toHaveLength(0);
  });
});
