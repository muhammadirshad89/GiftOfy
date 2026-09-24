import { MSG } from '../data/content.js';

/** Builds a suggested message from style, name and relationship. Swap for an AI call later. */
export function suggest({ style, name, rel }, i = 0) {
  const list = MSG[style];
  let m = list[i % list.length].replaceAll('{n}', name.trim());
  if (rel && !['Other', 'Someone Special'].includes(rel)) m += `\n\nYou’re the best ${rel.toLowerCase()} anyone could ask for.`;
  return m;
}
