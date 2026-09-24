import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import App from './../App.jsx';
import { db } from '../test/fakeSupabase.js';

vi.mock('../lib/supabase.js', async () => import('../test/fakeSupabase.js'));
beforeAll(() => { window.scrollTo = () => {}; });
const at = (p) => render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>);

describe('create wish: templates and custom message', () => {
  it('custom message: counter, exact preview, saved to the database', async () => {
    at('/create/birthday');
    fireEvent.click(await screen.findByRole('button', { name: /Write your own message/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Sara' } });
    fireEvent.change(screen.getByLabelText(/Your message/), { target: { value: 'Hello from me' } });
    expect(screen.getByText('13/500')).toBeTruthy();
    expect(screen.getByText(/Coming soon/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
    expect(await screen.findByText('Hello from me')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Publish wish/ }));
    await screen.findByRole('link', { name: 'Share on WhatsApp' });
    expect(db.at(-1)).toMatchObject({ message: 'Hello from me', recipient_name: 'Sara' });
  });
  it('an empty message is blocked with a clear error', async () => {
    at('/create/birthday');
    fireEvent.click(await screen.findByRole('button', { name: /Write your own message/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Sara' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
    expect(await screen.findByRole('alert')).toBeTruthy();
  });
  it('a chosen template saves its id as the design', async () => {
    at('/create/eid?t=ed-emerald');
    fireEvent.click(await screen.findByRole('button', { name: 'Next' }));
    fireEvent.change(screen.getByLabelText(/Recipient name/), { target: { value: 'Ali' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview Wish' }));
    fireEvent.click(await screen.findByRole('button', { name: /Publish wish/ }));
    await screen.findByRole('link', { name: 'Share on WhatsApp' });
    expect(db.at(-1)).toMatchObject({ design: 'ed-emerald', occasion: 'eid' });
    expect(db.at(-1).message).toContain('Ali');
  });
  it('filters and searches templates', async () => {
    at('/create/birthday');
    expect(await screen.findByText('Confetti Pop')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Minimal' }));
    expect(screen.queryByText('Confetti Pop')).toBeNull();
    expect(screen.getByText('Simple Cake')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Search templates'), { target: { value: 'zzzz' } });
    expect(screen.getByText(/No designs match/)).toBeTruthy();
  });
  it('previews a template in a dialog and selects it', async () => {
    at('/create/birthday');
    fireEvent.click(await screen.findByRole('button', { name: 'Preview Confetti Pop' }));
    const d = screen.getByRole('dialog');
    expect(within(d).getByText(/Happy Birthday, Ayesha/)).toBeTruthy();
    fireEvent.click(within(d).getByRole('button', { name: 'Use this design' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText('Selected')).toBeTruthy();
  });
});
