// 8 characters from a 58-symbol alphabet (no 0/O/I/l): about 1.3e14 combinations,
// generated with the browser's secure random source, so ids can't be guessed or enumerated.
export const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function generateShortId(len = 8) {
  const limit = 256 - (256 % ALPHABET.length); // rejection sampling avoids modulo bias
  let out = '';
  while (out.length < len) {
    for (const b of globalThis.crypto.getRandomValues(new Uint8Array(len * 2))) {
      if (b < limit && out.length < len) out += ALPHABET[b % ALPHABET.length];
    }
  }
  return out;
}
