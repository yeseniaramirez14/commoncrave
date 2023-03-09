import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
const Nav = () => {
  return (
    <>
      <nav className="flex sm:justify-around space-x-4 py-3 bg-light-pink font-worksans">
        <NavLink to="/" className="home-button">
          <img className="logo" src={logo} alt="" width="50px" height="30px" />
        </NavLink>

        <NavLink
          to="/aboutus"
          className="rounded-lg px-3 py-2 text-xl font-bold hover:bg-green hover:text-yellow text-green"
        >
          About Us
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
