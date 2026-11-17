// Bundled by scripts/prerender.mjs and run in Node. Renders the real <App /> for one URL to an HTML string,
// waiting for every lazy page chunk, so the output is exactly what a visitor's browser would show after JS loads.
import { PassThrough } from 'node:stream';
import ReactDOMServer from 'react-dom/server';
import * as RouterServer from 'react-router-dom/server';
import App from '../src/App.jsx';

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new PassThrough();
    sink.on('data', (c) => { html += c; });
    sink.on('end', () => resolve(html));
    const { pipe } = ReactDOMServer.renderToPipeableStream(
      <RouterServer.StaticRouter location={url}><App /></RouterServer.StaticRouter>,
      { onAllReady() { pipe(sink); }, onShellError: reject, onError: reject },
    );
  });
}
