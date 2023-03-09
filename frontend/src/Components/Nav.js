import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      {/* <img src={logo} alt="logo" />
        <div>About Us</div> */}
      <nav className="flex sm:justify-around space-x-4 py-3 bg-light-pink font-worksans">
        <NavLink
          to="/"
          className="rounded-lg px-3 py-2 text-lg font-bold hover:bg-green hover:text-yellow text-green"
        >
          Home
        </NavLink>
        <NavLink
          to="/aboutus"
          className="rounded-lg px-3 py-2 text-lg font-bold hover:bg-green hover:text-yellow text-green"
        >
          About Us
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
