import { useState } from 'react';
import { OCC, REL, STY } from '../data/content.js';
import { TEMPLATES, TEMPLATE_MAP, STYLE_TONE } from '../data/templates.js';
import { suggest } from '../utils/message.js';
import { createWish, wishUrl } from '../services/wishService.js';
import Button from './Button.jsx';
import OccasionGrid from './OccasionGrid.jsx';
import ProgressBar from './ProgressBar.jsx';
import ShareButtons from './ShareButtons.jsx';
import TemplatePicker from './TemplatePicker.jsx';
import WishCard from './WishCard.jsx';

const MAX = 500; // matches the wishes.message check in supabase/schema.sql
const firstFor = (occ) => TEMPLATES.find((t) => t.occ === occ && !t.premium) || TEMPLATE_MAP.aurora;
const pick = (t) => ({ tpl: t.id, tone: STYLE_TONE[t.style] || 'simple' });
const BLANK = { step: 0, occ: 'birthday', ...pick(TEMPLATE_MAP.aurora), custom: false, edited: false, msg: '', name: '', rel: '', sender: '', hide: false, vi: 0 };

/** Steps: 0 Occasion, 1 Template (or own message), 2 Personalize, 3 Preview, then Share. */
export default function CreateWishWizard({ initialOcc, initialTpl }) {
  const [s, setS] = useState(() => ({ ...BLANK, ...(initialOcc ? { occ: initialOcc, ...pick(TEMPLATE_MAP[initialTpl] || firstFor(initialOcc)), step: 1 } : {}) }));
  const [err, setErr] = useState('');
  const [pubId, setPubId] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (p) => setS((x) => ({ ...x, ...p }));
  const o = OCC.find((x) => x.id === s.occ);
  const name = s.name.trim();
  // The message the recipient will see: the template's text until the user edits it.
  const text = s.edited ? s.msg : TEMPLATE_MAP[s.tpl].msg.replaceAll('{n}', name || 'friend');

  const next = async () => {
    if (s.step === 2) {
      if (!name) return setErr('Please enter the recipient’s name.');
      if (!text.trim()) return setErr('Please write a message, or switch back to a template message.');
    }
    setErr('');
    if (s.step < 3) return set({ step: s.step + 1 });
    setBusy(true);
    try { setPubId(await createWish({ o: s.occ, n: name, r: s.rel, s: s.sender.trim(), h: s.hide, t: s.tpl, st: s.tone, m: text })); }
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
      <OccasionGrid selected={s.occ} onPick={(id) => set({ occ: id, ...pick(firstFor(id)), step: 1 })} />
    </>,
    <>
      <h2>Choose a design</h2>
      <div className="chips" role="group" aria-label="Message type">
        <button className={`chip${!s.custom ? ' sel' : ''}`} aria-pressed={!s.custom} onClick={() => set({ custom: false, edited: false, msg: '' })}>Use a template message</button>
        <button className={`chip${s.custom ? ' sel' : ''}`} aria-pressed={s.custom} onClick={() => set({ custom: true, edited: true, msg: '' })}>✍️ Write your own message</button>
      </div>
      <TemplatePicker key={s.occ} occ={s.occ} value={s.tpl} name={name} onSelect={(t) => set(pick(t))} />
    </>,
    <>
      <h2>{o.icon} Personalize</h2>
      <label>Recipient name<input value={s.name} maxLength={40} placeholder="e.g. Ayesha" autoComplete="off" onChange={(e) => set({ name: e.target.value })} /></label>
      <label>Relationship <small>(optional)</small>
        <select value={s.rel} onChange={(e) => set({ rel: e.target.value })}><option value="">Skip</option>{REL.map((r) => <option key={r}>{r}</option>)}</select>
      </label>
      <label>Your name <small>(optional)</small><input value={s.sender} maxLength={40} placeholder="e.g. Irshad" autoComplete="off" onChange={(e) => set({ sender: e.target.value })} /></label>
      <label className="chk"><input type="checkbox" checked={s.hide} onChange={(e) => set({ hide: e.target.checked })} />Surprise mode: keep my name hidden until the recipient reveals the message</label>
      <label>Your message<textarea rows={5} maxLength={MAX} value={text} placeholder="Write something from the heart…" onChange={(e) => set({ edited: true, msg: e.target.value })} /></label>
      <div className="cnt">
        <span aria-live="polite">{text.length}/{MAX}</span>
        <span className="row">
          <Button variant="ghost" size="sm" onClick={() => set({ edited: true, vi: s.vi + 1, msg: suggest({ style: s.tone, name: name || 'friend', rel: s.rel }, s.vi + 1) })}>Suggest another</Button>
          {!s.custom && s.edited && <Button variant="ghost" size="sm" onClick={() => set({ edited: false, msg: '' })}>Use template message</Button>}
        </span>
      </div>
      <label>Tone <small>(used for suggestions)</small>
        <select value={s.tone} onChange={(e) => set({ tone: e.target.value })}>{STY.map(([id, n, e]) => <option key={id} value={id}>{n} {e}</option>)}</select>
      </label>
      <div className="gift" aria-disabled="true"><span>🎁 Add a Gift ❤️</span><span className="bd gd">Coming soon</span></div>
    </>,
    <>
      <h2>Preview</h2>
      <p className="mut">This is exactly what {name} will see.</p>
      <WishCard className="pv" floaties tpl={s.tpl} occ={s.occ} name={name} sender={s.sender.trim()} msg={text} />
    </>,
  ][s.step];

  return (
    <section className="wrap narrow">
      <ProgressBar current={s.step} />
      <div className="wcard">
        {body}
        {err && <p className="err" role="alert">{err}</p>}
        <div className="nav">
          {s.step > 0 ? <Button variant="ghost" onClick={() => { setErr(''); set({ step: s.step - 1 }); }}>Back</Button> : <span />}
          {s.step > 0 && <Button onClick={next} disabled={busy}>{s.step === 3 ? (busy ? 'Publishing…' : 'Publish wish ✨') : s.step === 2 ? 'Preview Wish' : 'Next'}</Button>}
        </div>
      </div>
    </section>
  );
}
