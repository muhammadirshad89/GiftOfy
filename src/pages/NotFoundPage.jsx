import Button from '../components/Button.jsx';
import useSeo from '../utils/useSeo.js';

export default function NotFoundPage({ message = 'Oops! This page could not be found.' }) {
  useSeo({ title: 'Not found', noindex: true });
  return (
    <section className="wrap narrow c">
      <div className="big" aria-hidden="true">🎈</div>
      <h1>{message}</h1>
      <p className="lead">The link may be incomplete, or the wish may have been removed.</p>
      <Button to="/create">Create Your Own Wish</Button>
    </section>
  );
}
