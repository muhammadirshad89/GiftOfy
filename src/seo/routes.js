// Server-side-safe (no React, no DOM) SEO resolution for any pathname. Used by the Vercel edge
// middleware, the build-time pre-renderer and the tests, so the three can never disagree.
import { SITE_URL, BRAND } from '../data/siteConfig.js';
import { HOME, META_BY_PATH } from '../data/pageMeta.js';
import { titleize } from './format.js';

export const DEFAULT_TITLE = 'GiftOfy – Create Digital Wishes & Share Special Moments';
export const DEFAULT_DESC = HOME.desc;
export const DEFAULT_SOCIAL_DESC = 'Create beautiful personalized digital wishes and share special moments with the people you care about.';
export const ROBOTS_INDEX = 'index,follow,max-image-preview:large';
export const ROBOTS_NOINDEX = 'noindex,nofollow';

const priv = (title) => ({ status: 200, kind: 'private', title: titleize(title), description: DEFAULT_DESC, social: DEFAULT_SOCIAL_DESC, robots: ROBOTS_NOINDEX, canonicalPath: null, prerendered: false });

/**
 * @returns {{status:number, kind:string, title:string, description:string, social:string, robots:string,
 *            canonicalPath:string|null, prerendered:boolean, meta?:object}}
 * kind: page (indexable, pre-rendered) | create | private | notfound
 */
export function seoForPath(pathname) {
  if (pathname === '/') {
    return { status: 200, kind: 'page', title: DEFAULT_TITLE, description: HOME.desc, social: DEFAULT_SOCIAL_DESC, robots: ROBOTS_INDEX, canonicalPath: '/', prerendered: true, meta: HOME };
  }
  const meta = META_BY_PATH[pathname];
  if (meta) {
    return { status: 200, kind: 'page', title: titleize(meta.title, DEFAULT_TITLE), description: meta.desc, social: meta.desc, robots: ROBOTS_INDEX, canonicalPath: meta.path, prerendered: true, meta };
  }
  // /create/:occasion is the same wizard as /create with a preselected occasion: consolidate to /create.
  if (/^\/create\/[^/]+$/.test(pathname)) {
    const c = META_BY_PATH['/create'];
    return { status: 200, kind: 'create', title: titleize(c.title), description: c.desc, social: c.desc, robots: ROBOTS_INDEX, canonicalPath: '/create', prerendered: false };
  }
  if (/^\/wish\/[^/]+$/.test(pathname)) return priv('A special wish for you');
  if (/^\/reply\/[^/]+$/.test(pathname)) return priv('A reply to your wish');
  if (pathname === '/admin' || pathname === '/admin/login') return priv('Admin');
  return { ...priv('Not found'), status: 404, kind: 'notfound' };
}

export const absoluteUrl = (path) => `${SITE_URL}${path === '/' ? '/' : path}`;
export { BRAND };
