// Drives the real recipient page: tap the interactive object → staggered reveal → closing line → reaction.
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.jsx';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAGIC, magicFor } from '../data/magic.js';
import { db, state } from '../test/fakeSupabase.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
const at = (p) => render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>);
beforeEach(() => { window.scrollTo = () => {}; db.length = 0; state.session = null; state.admin = false; });

const row = (o, extra = {}) => ({ short_id: 'Ab3dE6gH', occasion: o, recipient_name: 'Sara', sender_name: 'Irshad', message: 'Happy day', tone: 'simple', design: 'aurora', status: 'published', created_at: '2026-01-01', ...extra });

describe('magic wish: birthday balloon', () => {
  it('shows the tap prompt first, then reveals the wish, closing line and reaction after tapping', async () => {
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    const btn = await screen.findByRole('button', { name: 'Open birthday surprise' });
    expect(btn.className).toMatch(/\bio-balloon\b/); // the actual interactive object rendered, not a generic reveal button
    expect(screen.getByText(/Touch the balloon/)).toBeTruthy();
    expect(screen.queryByText('Happy day')).toBeNull();
    fireEvent.click(btn);
    expect(await screen.findByText('Happy day', {}, { timeout: 3000 })).toBeTruthy();
    expect(screen.getByText('One little thing before you go... ✨')).toBeTruthy();
    expect(screen.getByText(/countless reasons to smile/)).toBeTruthy();
    // the reaction picker now lives inside the reply form (Part C), not as its own standalone row
    expect(screen.getByRole('button', { name: '❤️ Love it' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Send a Reply 💌' })).toBeTruthy();
  });
});

describe('magic wish: wedding envelope', () => {
  it('uses the envelope object and its own closing line', async () => {
    db.push(row('wedding'));
    at('/wish/Ab3dE6gH');
    const btn = await screen.findByRole('button', { name: 'Open wedding envelope' });
    expect(btn.className).toMatch(/\bio-envelope\b/);
    fireEvent.click(btn);
    expect(await screen.findByText(/become forever/)).toBeTruthy();
  });
});

describe('magic wish: engagement ring', () => {
  it('uses the ring object', async () => {
    db.push(row('engagement'));
    at('/wish/Ab3dE6gH');
    const btn = await screen.findByRole('button', { name: 'Reveal engagement wish' });
    expect(btn.className).toMatch(/\bio-ring\b/);
    fireEvent.click(btn);
    expect(await screen.findByText(/beginning of something beautiful/)).toBeTruthy();
  });
});

describe('reduced motion', () => {
  it('still reaches the full wish when prefers-reduced-motion is on', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    fireEvent.click(await screen.findByRole('button', { name: 'Open birthday surprise' }));
    await waitFor(() => expect(screen.getByText('Happy day')).toBeTruthy());
  });
});

describe('old wishes stay compatible', () => {
  it('a v1.3 wish with no magic-related data still opens fully', async () => {
    db.push(row('congrats')); // pre-existing occasion, no new fields needed
    at('/wish/Ab3dE6gH');
    fireEvent.click(await screen.findByRole('button', { name: 'Open your gift' }));
    expect(await screen.findByText('Happy day', {}, { timeout: 3000 })).toBeTruthy();
    expect(screen.getByText(/beginning of something amazing/)).toBeTruthy();
  });
});

describe('freshly created wish carries the right occasion into the magic config', () => {
  it('a birthday wish made through the real wizard opens with the balloon, not a generic object', async () => {
    at('/create/birthday');
    fireEvent.click(await screen.findByRole('button', { name: 'Next' }));
    fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Ayesha' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
    fireEvent.click(await screen.findByRole('button', { name: /Publish wish/ }));
    fireEvent.click(await screen.findByRole('link', { name: 'Preview as recipient' }));
    const btn = await screen.findByRole('button', { name: 'Open birthday surprise' });
    expect(btn.className).toMatch(/\bio-balloon\b/);
  });
});

const css = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../styles/magic.css'), 'utf8');

describe('the object itself is the tap target; no button UI', () => {
  it('birthday: a text-less, unstyled control with the hint placed below it', async () => {
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    const btn = await screen.findByRole('button', { name: 'Open birthday surprise' });
    expect(btn.textContent).toBe('');
    expect(btn.className).not.toMatch(/\bbtn\b/);
    const hint = screen.getByText('Touch the balloon to open your surprise');
    expect(btn.compareDocumentPosition(hint) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(document.querySelectorAll('.btn').length).toBe(0); // no styled buttons anywhere on the opening screen
  });
  it('the stylesheet strips every trace of native button chrome, including the mobile tap flash', () => {
    const rule = css.match(/\.iobj\{[^}]*\}/)[0];
    // all:unset is the robust cross-browser reset (covers in-app WebViews like WhatsApp's that can
    // ignore individual overrides); appearance/-moz-appearance/tap-highlight are reasserted after it.
    ['all:unset', 'appearance:none', '-webkit-appearance:none', '-moz-appearance:none', '-webkit-tap-highlight-color:transparent'].forEach((t) => expect(rule).toContain(t));
  });
  it('tapping pops the balloon (burst pieces + shock ring) and then reveals the wish', async () => {
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    const btn = await screen.findByRole('button', { name: 'Open birthday surprise' });
    expect(document.querySelector('.io-burst')).toBeNull();
    fireEvent.click(btn);
    expect(btn.className).toMatch(/\bpopped\b/);
    expect(document.querySelectorAll('.io-burst i').length).toBeGreaterThanOrEqual(10);
    expect(document.querySelector('.io-wave')).toBeTruthy();
    expect(await screen.findByText('Happy day', {}, { timeout: 3000 })).toBeTruthy();
  });
  it('no debug banners or test labels are rendered', async () => {
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    await screen.findByRole('button', { name: 'Open birthday surprise' });
    expect(document.body.textContent).not.toMatch(/TEST 999|ROUTE TEST|MAGIC TEST|received shape/);
  });
  it('every occasion gets its own object and a matching "Touch the … to open your surprise" hint', () => {
    const nouns = { balloon: 'balloon', envelope: 'envelope', ring: 'ring', heart: 'heart', hearts: 'hearts', gift: 'gift box', moon: 'moon', bouquet: 'bouquet' };
    Object.keys(MAGIC).forEach((o) => expect(magicFor(o).tapHint, o).toBe(`Touch the ${nouns[magicFor(o).shape]} to open your surprise`));
  });
  it('the floating background stays small and uses no emoji', async () => {
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    await screen.findByRole('button', { name: 'Open birthday surprise' });
    const n = document.querySelectorAll('.fxwrap .px').length;
    expect(n).toBeGreaterThan(8);
    expect(n).toBeLessThanOrEqual(24);
    expect(document.querySelector('.fxwrap').textContent).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
  it('the celebration starts at the tap, while the pop is still playing (not only after the reveal)', async () => {
    db.push(row('birthday'));
    at('/wish/Ab3dE6gH');
    const btn = await screen.findByRole('button', { name: 'Open birthday surprise' });
    const before = document.querySelectorAll('.fxwrap .px').length;
    fireEvent.click(btn);
    expect(screen.queryByText('Touch the balloon to open your surprise')).toBeNull(); // hint leaves at once
    expect(document.querySelectorAll('.fxwrap .px').length).toBeGreaterThan(before);   // extra particles join the pop
    expect(screen.queryByText('Happy day')).toBeNull();                                // wish not revealed yet
    expect(await screen.findByText('Happy day', {}, { timeout: 3000 })).toBeTruthy();
    expect(document.querySelectorAll('.fxwrap .px').length).toBeGreaterThan(before);   // confetti wave continues after the reveal
  });
  it('anniversary uses two hearts; valentine one heart; both are the object itself', async () => {
    db.push(row('anniversary'));
    const { unmount } = at('/wish/Ab3dE6gH');
    const a = await screen.findByRole('button', { name: 'Reveal anniversary wish' });
    expect(a.className).toMatch(/\bio-hearts\b/);
    expect(a.textContent).toBe('');
    unmount(); db.length = 0; db.push(row('valentines'));
    at('/wish/Ab3dE6gH');
    expect((await screen.findByRole('button', { name: 'Open your valentine' })).className).toMatch(/\bio-heart\b/);
  });
  it('hearts are drawn as one seamless masked shape (the earlier two-lobe version drew a "V")', () => {
    expect(css).toMatch(/\.io-heart \.io-a,\.io-hearts \.io-a[^{]*\{[^}]*mask:var\(--heart\)/);
    expect(css).not.toMatch(/\.io-heart \.io-a\{[^}]*rotate\(-45deg\)/);
  });
  it('the stage exposes which object it chose, for DevTools, without any visible marker', async () => {
    db.push(row('wedding'));
    at('/wish/Ab3dE6gH');
    await screen.findByRole('button', { name: 'Open wedding envelope' });
    const stage = document.querySelector('.magicstage');
    expect(stage.dataset.magicShape).toBe('envelope');
    expect(stage.dataset.occasion).toBe('wedding');
  });
});
