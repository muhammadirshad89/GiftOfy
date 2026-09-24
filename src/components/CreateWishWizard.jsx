import { useState } from 'react';
import { OCC, REL, STY, TPL } from '../data/content.js';
import { suggest } from '../utils/message.js';
import { createWish, wishUrl } from '../services/wishService.js';
import Button from './Button.jsx';
import OccasionGrid from './OccasionGrid.jsx';
import ProgressBar from './ProgressBar.jsx';
import ShareButtons from './ShareButtons.jsx';
import WishCard from './WishCard.jsx';

const BLANK = { step: 0, occ: 'birthday', name: '', rel: '', sender: '', hide: false, style: 'romantic', tpl: 'aurora', msg: '', vi: 0 };
const PROGRESS = [0, 1, 1, 2, 3]; // wizard screen -> progress step

export default function CreateWishWizard({ initialOcc }) {
  const [s, setS] = useState(() => ({ ...BLANK, occ: initialOcc || 'birthday', step: initialOcc ? 1 : 0 }));
  const [err, setErr] = useState('');
  const [pubId, setPubId] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (p) => setS((x) => ({ ...x, ...p }));
  const o = OCC.find((x) => x.id === s.occ);
  const go = (n) => set({ step: n, msg: n === 4 && !s.msg ? suggest(s, s.vi) : s.msg });

  const next = async () => {
    if (s.step === 1 && !s.name.trim()) { setErr('Please enter the recipient’s name.'); return; }
    setErr('');
    if (s.step < 4) return go(s.step + 1);
    const msg = s.msg.trim() ? s.msg : suggest(s, s.vi);
    setBusy(true);
    try { setPubId(await createWish({ o: s.occ, n: s.name.trim(), r: s.rel, s: s.sender.trim(), h: s.hide, t: s.tpl, st: s.style, m: msg })); }
    catch (e) { setErr(e.userMessage || 'We couldn’t publish your wish. Please try again.'); } finally { setBusy(false); }
  };

  if (pubId) {
    const url = wishUrl(pubId);
    return (
      <section className="wrap narrow c">
        <ProgressBar current={4} />
        <div className="wcard">
          <div className="big" aria-hidden="true">🎉</div>
          <h2>Your wish is ready</h2>
          <p className="lead">Share this link. The recipient doesn’t need an account.</p>
          <input readOnly aria-label="Wish link" value={url} onFocus={(e) => e.target.select()} />
          <div style={{ marginTop: 16 }}><ShareButtons id={pubId} url={url} /></div>
          <p className="tag"><Button variant="ghost" size="sm" onClick={() => { setPubId(null); setS({ ...BLANK }); }}>Create another wish</Button></p>
        </div>
      </section>
    );
  }

  const body = [
    <>
      <h2>What are we celebrating?</h2>
      <OccasionGrid selected={s.occ} onPick={(id) => set({ occ: id, msg: '', step: 1 })} />
    </>,
    <>
      <h2>{o.icon} Who is it for?</h2>
      <label>Recipient name<input value={s.name} maxLength={40} placeholder="e.g. Ayesha" autoComplete="off" onChange={(e) => set({ name: e.target.value, msg: '' })} /></label>
      <label>Relationship <small>(optional)</small>
        <select value={s.rel} onChange={(e) => set({ rel: e.target.value, msg: '' })}><option value="">Skip</option>{REL.map((r) => <option key={r}>{r}</option>)}</select>
      </label>
      <label>Your name <small>(optional)</small><input value={s.sender} maxLength={40} placeholder="e.g. Irshad" autoComplete="off" onChange={(e) => set({ sender: e.target.value })} /></label>
      <label className="chk"><input type="checkbox" checked={s.hide} onChange={(e) => set({ hide: e.target.checked })} />Surprise mode: keep my name hidden until the recipient reveals the message</label>
    </>,
    <>
      <h2>Pick a style</h2>
      <div className="chips">{STY.map(([id, n, e]) => <button key={id} className={`chip${id === s.style ? ' sel' : ''}`} aria-pressed={id === s.style} onClick={() => set({ style: id, msg: '' })}>{n} {e}</button>)}</div>
    </>,
    <>
      <h2>Choose a design</h2>
      <div className="grid tp3">
        {TPL.map((t) => (
          <button key={t.id} className={`tpl${t.id === s.tpl ? ' sel' : ''}`} disabled={!!t.premium} onClick={() => set({ tpl: t.id })}>
            <WishCard className="mini" tpl={t.id} occ={s.occ} name={s.name} />{t.name}{t.premium && ' 🔒 Premium soon'}
          </button>
        ))}
      </div>
    </>,
    <>
      <h2>Make it yours</h2>
      <label>Your message<textarea rows={5} maxLength={400} value={s.msg} onChange={(e) => set({ msg: e.target.value })} /></label>
      <Button variant="ghost" size="sm" onClick={() => set({ vi: s.vi + 1, msg: suggest(s, s.vi + 1) })}>Suggest another message</Button>
      <WishCard className="pv" floaties tpl={s.tpl} occ={s.occ} name={s.name.trim()} sender={s.sender.trim()} msg={s.msg} />
    </>,
  ][s.step];

  return (
    <section className="wrap narrow">
      <ProgressBar current={PROGRESS[s.step]} />
      <div className="wcard">
        {body}
        {err && <p className="err" role="alert">{err}</p>}
        <div className="nav">
          {s.step > 0 ? <Button variant="ghost" onClick={() => { setErr(''); go(s.step - 1); }}>Back</Button> : <span />}
          {s.step > 0 && <Button onClick={next} disabled={busy}>{s.step === 4 ? (busy ? 'Publishing…' : 'Publish wish ✨') : s.step === 3 ? 'Preview Wish' : 'Next'}</Button>}
        </div>
      </div>
    </section>
  );
}
