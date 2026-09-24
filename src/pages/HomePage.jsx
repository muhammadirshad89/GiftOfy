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
          <div className="card"><span className="n">2</span><b>Personalize your wish</b>Add a name, pick a style and design, then edit the message.</div>
          <div className="card"><span className="n">3</span><b>Share the surprise</b>Send the link on WhatsApp. No account needed to open it.</div>
        </div>
      </section>
      <section className="wrap"><div className="cta"><h2>Create something special</h2><p>It takes under two minutes.</p><Button to="/create">Create a Wish</Button></div></section>
      <section className="wrap narrow">
        <h2>Questions</h2>
        <details><summary>Does the recipient need an account?</summary><p>No. They open the link and see the wish.</p></details>
        <details><summary>Is GiftOfy free?</summary><p>The free designs cost nothing. Premium designs are planned but not available yet.</p></details>
        <details><summary>Can I send a gift with a wish?</summary><p>Monetary gifts through regulated payment providers are planned. They are not live yet.</p></details>
      </section>
    </>
  );
}
