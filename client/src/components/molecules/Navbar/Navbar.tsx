import "./Navbar.scss";
import { useTheme } from "@/theme";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <header
      className="navbar-main"
      style={{
        backgroundColor: `${theme.navbar.background}`,
        //   boxShadow: `0 8px 32px 0 ${theme.boxshadow.primary}`,
        //   borderBottom: `1px solid ${theme.border.secondary}`,
      }}
    >
      <div className="navbar-logo flex-center">Logo</div>
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
