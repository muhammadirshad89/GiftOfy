// 'rp_' + 40 hex characters (160 bits) from the browser's secure random source. Long and
// unpredictable on purpose: unlike a wish short_id (meant to be short enough to type/share), this
// token alone grants read access to one specific reply, so it must not be guessable or enumerable.
export function generateReplyToken() {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(20));
  return 'rp_' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
