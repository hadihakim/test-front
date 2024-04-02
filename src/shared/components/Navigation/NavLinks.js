import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className={`nav-links ${props.classes ? props.classes : 'default'}`}>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/product">Product</NavLink>
    </li>
  </ul>
};

export default NavLinks;