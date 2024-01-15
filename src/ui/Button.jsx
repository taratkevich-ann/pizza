import { Link } from "react-router-dom";

function Button({ disabled, to, type = "primary", onClick, children }) {
  const base =
    "inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: `${base} px-4 py-3`,
    small: `${base} px-3 py-2 text-xs`,
    secondary:
      "tracking-widetransition-colors inline-block rounded-full border-2 border-stone-300 px-4 py-3 font-semibold uppercase text-stone-400 duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed",
    rounded: `${base} px-2.5 py-1 text-sm`,
  };

  const className = styles[type];

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
