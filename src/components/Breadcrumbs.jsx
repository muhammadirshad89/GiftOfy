import { Link } from 'react-router-dom';

/** trail: [[label, path], ...] with the current page last (not a link). */
export default function Breadcrumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map(([label, path], i) => (
          <li key={path}>{i < trail.length - 1 ? <Link to={path}>{label}</Link> : <span aria-current="page">{label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}
