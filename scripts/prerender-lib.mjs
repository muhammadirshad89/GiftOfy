// Shared by scripts/prerender.mjs (the build step) and scripts/prerender.test.js (the test), so both exercise identical code.
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Bundles scripts/prerender-entry.jsx for Node and returns its `render(url)` function. */
export async function loadRenderer(root) {
  const esbuild = await import('esbuild'); // installed with Vite
  // import.meta.env as the browser build would see it, minus secrets: the pre-render never talks to Supabase.
  const env = {
    MODE: 'production', DEV: false, PROD: true, SSR: true, BASE_URL: '/',
    VITE_SITE_URL: process.env.VITE_SITE_URL || '',
    VITE_ADSENSE_ENABLED: process.env.VITE_ADSENSE_ENABLED || '',
    VITE_ADSENSE_SLOT_CONTENT: process.env.VITE_ADSENSE_SLOT_CONTENT || '',
  };
  const outfile = path.join(root, 'node_modules', '.cache', 'giftofy-prerender', `entry-${process.pid}.mjs`);
  await esbuild.build({
    entryPoints: [path.join(root, 'scripts', 'prerender-entry.jsx')], outfile, bundle: true, platform: 'node', format: 'esm',
    // Bundle everything (react, router, supabase client...) so Node never has to resolve CommonJS/ESM package quirks;
    // the banner gives bundled CommonJS code a working require().
    banner: { js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);" },
    jsx: 'automatic', loader: { '.css': 'empty' }, define: { 'import.meta.env': JSON.stringify(env) }, logLevel: 'warning',
  });
  return (await import(pathToFileURL(outfile).href)).render;
}
