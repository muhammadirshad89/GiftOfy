import Button from '../components/Button.jsx';
import Hero from '../components/Hero.jsx';
import OccasionGrid from '../components/OccasionGrid.jsx';
import TemplateGallery from '../components/TemplateGallery.jsx';
import useSeo from '../utils/useSeo.js';

export default function HomePage() {
  useSeo({ path: '/' });
  return (
    <>
      <Hero />
      <section className="wrap" id="occasions"><h2>Pick an occasion</h2><OccasionGrid /></section>
      <section className="wrap"><h2>Designs worth sharing</h2><TemplateGallery /></section>
      <section className="wrap" id="how">
        <h2>How it works</h2>
        <div className="grid how">
          <div className="card"><span className="n">1</span><b>Choose an occasion</b>Birthdays, weddings, Eid, thank-yous and more.</div>
          <div className="card"><span className="n">2</span><b>Create your personal wish</b>Add a name, pick a style and design, then edit the message.</div>
          <div className="card"><span className="n">3</span><b>Share the surprise</b>Send the link on WhatsApp. No account needed to open it.</div>
          <div className="card"><span className="n">4</span><b>They open it</b>A tap-to-open surprise reveals the wish, made just for them.</div>
          <div className="card"><span className="n">5</span><b>They can reply 💌</b>The recipient can send a message straight back to you.</div>
        </div>
      </section>
      <section className="wrap"><div className="cta"><h2>Make Someone Smile Today ❤️</h2><p>It takes under two minutes, and it's completely free.</p><Button to="/create">Create a Wish</Button></div></section>
      <section className="wrap narrow">
        <h2>Questions</h2>
        <details><summary>Does the recipient need an account?</summary><p>No. They open the link and see the wish.</p></details>
        <details><summary>Is GiftOfy free?</summary><p>Yes — GiftOfy is completely free to use. Premium designs are planned for the future but every design available today is free.</p></details>
        <details><summary>Can the recipient reply?</summary><p>Yes. After they open the wish, they can send a reply straight back — no account needed for either side.</p></details>
      </section>
    </>
  );
}
