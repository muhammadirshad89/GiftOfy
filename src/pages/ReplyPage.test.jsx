// Exercises /reply/:token end to end: real sendReply() → real token → real ReplyPage lookup.
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.jsx';
import { sendReply, getReplyByToken } from '../services/replyService.js';
import { db, repliesDb } from '../test/fakeSupabase.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
const at = (p) => render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>);
beforeEach(() => { window.scrollTo = () => {}; db.length = 0; repliesDb.length = 0; });

describe('private reply links', () => {
  it('a valid token shows exactly that reply: name, reaction, message, friendly date', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    const token = await sendReply('Ab3dE6gH', { senderName: 'Sara', message: 'This made my whole week!', reaction: 'love' });
    expect(token).toMatch(/^rp_[0-9a-f]{40}$/);
    at(`/reply/${token}`);
    expect(await screen.findByRole('heading', { name: /Someone replied to your GiftOfy wish/ })).toBeTruthy();
    expect(screen.getByText('Sara')).toBeTruthy();
    expect(screen.getByText('This made my whole week!')).toBeTruthy();
    expect(screen.getByText(/Loved it/)).toBeTruthy();
  });
  it('an invalid/mistyped token shows "not found", never another reply', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    await sendReply('Ab3dE6gH', { senderName: 'Sara', message: 'Real reply', reaction: 'love' });
    at('/reply/rp_0000000000000000000000000000000000000000');
    expect(await screen.findByText(/reply link isn’t valid/)).toBeTruthy();
    expect(screen.queryByText('Real reply')).toBeNull();
  });
  it('a syntactically-wrong token is rejected locally, with no network call at all', async () => {
    expect(await getReplyByToken('not-a-real-token')).toBeNull();
    expect(await getReplyByToken('')).toBeNull();
  });
  it('the reply page sets noindex', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    const token = await sendReply('Ab3dE6gH', { senderName: '', message: 'Hi', reaction: null });
    at(`/reply/${token}`);
    await screen.findByRole('heading', { name: /Someone replied/ });
    expect(document.querySelector('meta[name="robots"]').content).toBe('noindex,nofollow');
  });
  it('the reply page keeps the normal GiftOfy header/footer (unlike the immersive /wish/:id page)', async () => {
    db.push({ short_id: 'Ab3dE6gH', status: 'published' });
    const token = await sendReply('Ab3dE6gH', { senderName: '', message: 'Hi', reaction: null });
    at(`/reply/${token}`);
    await screen.findByRole('heading', { name: /Someone replied/ });
    expect(document.getElementById('hdr')).toBeTruthy();
    expect(document.getElementById('ftr')).toBeTruthy();
  });
});
