import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import App from './App.jsx';
import { createWish } from './services/wishService.js';
import { db, state } from './test/fakeSupabase.js';

vi.mock('./lib/supabase.js', async () => import('./test/fakeSupabase.js'));
beforeAll(() => { window.scrollTo = () => {}; });
const at = (p) => render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>);

describe('GiftOfy', () => {
  it('create → publish → share → recipient journey uses a short saved id', async () => {
    at('/create');
    fireEvent.click(await screen.findByRole('button', { name: /Birthday/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Ayesha' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
    fireEvent.click(screen.getByRole('button', { name: /Publish wish/ }));
    const wa = await screen.findByRole('link', { name: 'Share on WhatsApp' });
    const id = db.at(-1).short_id;
    expect(id).toHaveLength(8);
    expect(decodeURIComponent(wa.href)).toContain(`/wish/${id}`);
    fireEvent.click(screen.getByRole('link', { name: 'Preview as recipient' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Open' }));
    expect(await screen.findByText(/Happy Birthday, Ayesha/)).toBeTruthy();
  });
  it('surprise mode hides the sender until reveal', async () => {
    const id = await createWish({ o: 'birthday', n: 'Sara', r: '', s: 'Irshad', h: true, t: 'paper', st: 'simple', m: 'Hi' });
    at(`/wish/${id}`);
    expect(await screen.findByText(/special surprise/)).toBeTruthy();
    expect(screen.queryByText(/Irshad/)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Reveal Message' }));
    expect(await screen.findByText(/Irshad/)).toBeTruthy();
  });
  it('hidden and invalid wish links show not-found', async () => {
    db.push({ short_id: 'Hidden88', occasion: 'eid', recipient_name: 'X', message: 'Hi', tone: 'dua', design: 'paper', status: 'hidden' });
    at('/wish/Hidden88');
    expect(await screen.findByText(/This wish could not be found/)).toBeTruthy();
  });
  it('info pages, footer credit and brand spelling', async () => {
    at('/privacy');
    expect(await screen.findByRole('heading', { name: 'Privacy' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /\+923218100537/ }).href).toBe('https://wa.me/923218100537');
    expect(document.body.textContent).toContain('Designed & Developed by Syyed Muhamamd Irshad');
    expect(document.body.textContent).not.toMatch(/Giftofy|Digital Wishes/);
  });
  it('mobile menu toggles', async () => {
    at('/');
    const b = await screen.findByLabelText('Menu');
    fireEvent.click(b);
    expect(b.getAttribute('aria-expanded')).toBe('true');
  });
  it('redirects anonymous visitors from /admin to the login page', async () => {
    state.session = null;
    at('/admin');
    expect(await screen.findByRole('heading', { name: 'Admin login' })).toBeTruthy();
  });
  it('blocks signed-in users who are not admins', async () => {
    state.session = { user: { id: 'u1' } }; state.admin = false;
    at('/admin');
    expect(await screen.findByText(/doesn’t have admin access/)).toBeTruthy();
  });
});
