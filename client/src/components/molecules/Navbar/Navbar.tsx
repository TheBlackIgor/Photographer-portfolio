/* eslint-disable jsx-a11y/alt-text */
import "./Navbar.scss";

import { NavLink } from "react-router-dom";

import { useTheme } from "@/theme";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <header
      className="navbar-main"
      style={{
        backgroundColor: `${theme.navbar.background}`,
        boxShadow: `0 8px 32px 0 ${theme.boxshadow.primary}`,
      }}
    >
      <div className="navbar-logo flex-center">
        <img src="/logo.jpg" />
      </div>
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Strona główna
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Galeria
        </NavLink>

        <NavLink
          to="/aboutMe"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          O mnie
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Kontakt
        </NavLink>
      </nav>
    </header>
  );
};
