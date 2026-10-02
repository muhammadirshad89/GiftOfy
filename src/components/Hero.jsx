import Button from './Button.jsx';
import { SampleCard } from './TemplateGallery.jsx';

const DECOR = [['💜', { left: '5%', top: '12%' }], ['✨', { right: '6%', top: '9%', animationDelay: '-2s' }], ['⭐', { left: '9%', top: '52%', animationDelay: '-4s' }], ['🎁', { right: '8%', top: '48%', animationDelay: '-1s' }]];

export default function Hero() {
  return (
    <div className="hs">
      {DECOR.map(([e, style]) => <i key={e} className="dc" aria-hidden="true" style={style}>{e}</i>)}
      <section className="wrap hero">
        <h1>Make Someone’s Day Extra Special ❤️</h1>
        <p className="lead">Create beautiful digital wishes, personalize your message, and share a memorable surprise with someone you care about.</p>
        <div className="row"><Button to="/create">Create a Wish</Button><Button to="/#occasions" variant="ghost">Explore Occasions</Button></div>
        <p className="tag">Create a Wish. Share the Moment. Send a Gift. ❤️</p>
      </section>
      <div className="rail" role="list" aria-label="Example wishes">
        {['aurora', 'paper', 'sunset', 'gold', 'garden'].map((t) => <div role="listitem" key={t}><SampleCard t={t} /></div>)}
      </div>
    </div>
  );
}
