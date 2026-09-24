const LABELS = ['Occasion', 'Personalize', 'Design', 'Preview', 'Share'];

export default function ProgressBar({ current }) {
  return (
    <>
      <ol className="stp" aria-label="Progress">
        {LABELS.map((l, i) => (
          <li key={l} className={i < current ? 'dn' : i === current ? 'cu' : ''} aria-current={i === current ? 'step' : undefined}>
            <b>{i < current ? '✓' : i + 1}</b><span>{l}</span>
          </li>
        ))}
      </ol>
      <p className="sn">Step {current + 1} of 5 · {LABELS[current]}</p>
    </>
  );
}
