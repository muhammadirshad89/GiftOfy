// @vitest-environment node
// Exercises the real build-time pre-render pipeline: bundle the app for Node, render routes, and check the HTML a
// crawler that does not run JavaScript would receive.
import { beforeAll, describe, expect, it } from 'vitest';
import { loadRenderer } from './prerender-lib.mjs';
import { applySeo } from '../src/seo/applySeo.js';
import { seoForPath } from '../src/seo/routes.js';
import fs from 'node:fs';

let render;
beforeAll(async () => { render = await loadRenderer(process.cwd()); }, 60000);
const text = (html) => html.replace(/<script[^>]*>.*?<\/script>/gs, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

describe('pre-rendered HTML (no JavaScript needed to read it)', () => {
  it('a content page contains its real article text, headings, sample messages, FAQs and links', async () => {
    const html = await render('/birthday-wishes');
    expect(html).toMatch(/<h1[^>]*>.*Birthday Wishes<\/h1>/);
    expect(html.match(/<h2/g).length).toBeGreaterThanOrEqual(6);
    expect(text(html)).toContain('Wishing you a year as bright and wonderful as you are');
    expect(html).toContain('<details');
    expect(html).toContain('href="/anniversary-wishes"');
    expect(html).toContain('application/ld+json');
    expect(text(html).split(' ').length).toBeGreaterThan(900);
  });
  it('the homepage, About and Privacy pages are fully rendered', async () => {
    expect(text(await render('/'))).toContain('Pick an occasion');
    const about = text(await render('/about'));
    expect(about).toContain('Who runs GiftOfy');
    expect(about).toContain('50 free designs');
    expect(text(await render('/privacy'))).toContain('Third-party services we use');
  });
  it('no page leaks template tokens or "undefined"', async () => {
    for (const p of ['/about', '/how-it-works', '/guides/how-to-create-personalized-digital-wishes']) expect(text(await render(p)), p).not.toMatch(/\{templates\}|\{occasions\}|undefined/);
  });
  it('injects into the real index.html: exactly one root, route tags applied, hydration marker set', async () => {
    const shell = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
    const p = '/guides/digital-gifts-vs-greeting-cards';
    const seo = seoForPath(p);
    const html = applySeo(shell.replace('<div id="root"></div>', () => `<div id="root" data-prerendered="1">${'x'}</div>`), seo, `https://giftofy.vercel.app${p}`, { ogType: 'article' });
    expect(html.match(/<div id="root"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/rel="canonical"/g)).toHaveLength(1);
    expect(html).toContain('<meta property="og:type" content="article">');
    expect(html).toContain('data-prerendered="1"');
  });
});
