import { Link } from 'react-router-dom';

/** One button system: renders a router Link (to), an anchor (href) or a button. */
export default function Button({ to, href, variant = '', size = '', className = '', ...rest }) {
  const c = ['btn', variant, size, className].filter(Boolean).join(' ');
  if (to) return <Link className={c} to={to} {...rest} />;
  if (href) return <a className={c} href={href} {...rest} />;
  return <button className={c} {...rest} />;
}
