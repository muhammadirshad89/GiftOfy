import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ReplyForm from './ReplyForm.jsx';
import { db, repliesDb } from '../test/fakeSupabase.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
beforeEach(() => { db.length = 0; repliesDb.length = 0; db.push({ short_id: 'Ab3dE6gH', status: 'published' }); });

describe('ReplyForm (Part C: recipient reply UI)', () => {
  it('offers exactly the six requested quick reactions', () => {
    render(<ReplyForm shortId="Ab3dE6gH" />);
    ['❤️ Love it', '🥰 Made me smile', '😍 So sweet', '🤗 Thank you', '😂 Made me laugh', '💖 You’re amazing']
      .forEach((label) => expect(screen.getByRole('button', { name: label })).toBeTruthy());
  });
  it('the Send Reply button stays disabled until a message is written', () => {
    render(<ReplyForm shortId="Ab3dE6gH" />);
    expect(screen.getByRole('button', { name: 'Send Reply' }).disabled).toBe(true);
    fireEvent.change(screen.getByLabelText(/Your message/), { target: { value: 'Thank you!' } });
    expect(screen.getByRole('button', { name: 'Send Reply' }).disabled).toBe(false);
  });
  it('picking a reaction shows a small confirmation animation (the picked state), and submitting saves it', async () => {
    render(<ReplyForm shortId="Ab3dE6gH" />);
    const love = screen.getByRole('button', { name: '❤️ Love it' });
    fireEvent.click(love);
    expect(love.className).toContain('picked');
    fireEvent.change(screen.getByLabelText(/Your message/), { target: { value: 'So happy right now' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Reply' }));
    await waitFor(() => expect(screen.getByText('Reply sent successfully 💌')).toBeTruthy());
    expect(repliesDb[0]).toMatchObject({ wish_short_id: 'Ab3dE6gH', message: 'So happy right now', reaction: 'love' });
  });
});
