import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/shop", label: "Toy Shop" },
  { to: "/users", label: "Users" },
  { to: "/market", label: "Market" },
  { to: "/facts", label: "Facts" },
];

const Navbar = () => {
  return (
    <header className="top-nav">
      <div className="brand-block">
        <p className="brand-title">API Multi Page</p>
        <p className="brand-subtitle">API Multi page</p>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
