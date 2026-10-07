// Decorative particles behind the wish, drawn with CSS only (no emoji, no canvas, no libraries).
// A small fixed number of elements; `burst` adds a short extra wave for the tap moment.
const GLYPH = { heart: '♥', sparkle: '✦', star: '★' };
const GLOW = ['#ffe9a8', '#ffffff', '#f5b942'];
const BASE = 14;
const EXTRA = 10;

export default function FloatingBackground({ types, accent = '#ff4f9a', burst = false }) {
  const palette = [accent, '#f5b942', '#ff8fb8', '#b48cff', '#ff6b6b'];
  const n = BASE + (burst ? EXTRA : 0);
  return (
    <div className="fxwrap" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const type = types[i % types.length];
        const extra = i >= BASE;
        const glow = type === 'sparkle' || type === 'star';
        const size = 16 + ((i * 7) % 5) * (type === 'balloon' ? 9 : 6) + (extra ? 8 : 0);
        const style = {
          left: `${(i * 37 + 6) % 92}%`,
          top: glow ? `${(i * 29 + 8) % 80}%` : undefined,
          '--c': glow ? GLOW[i % 3] : palette[i % palette.length],
          '--s': `${size}px`,
          '--r': String((i % 5) - 2),
          animationDelay: extra ? `${(i % 4) * 0.12}s` : `${(i % 7) * 0.7}s`,
          animationDuration: extra ? '2.6s' : glow ? `${2.4 + (i % 4) * 0.6}s` : `${8 + (i % 5) * 1.4}s`,
        };
        return <i key={i} className={`px px-${type}`} style={style}>{GLYPH[type]}</i>;
      })}
    </div>
  );
}
