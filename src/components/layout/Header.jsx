import React from "react";
import {NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <header className="header mb-5 text-white flex items-center justify-center gap-x-5 py-10">
      <NavLink to={"/"} className={({isActive}) => isActive ? 'text-primary' : ''}>
        Home
      </NavLink>
      <NavLink to={"/movies"} className={({isActive}) => isActive ? 'text-primary' : ''}>
        Movie
      </NavLink>
    </header>
  );
};

export default Header;
