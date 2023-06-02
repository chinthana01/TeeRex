import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

library.add(faShoppingCart);

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        TeeRex
      </Link>
      <nav className="header__nav">
        <NavLink to="/products" className="header__nav-link" activeClassName="header__nav-link--active">
          Products
        </NavLink>
        <NavLink to="/cart" className="header__nav-link" activeClassName="header__nav-link--active">
          <FontAwesomeIcon icon="shopping-cart" />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
