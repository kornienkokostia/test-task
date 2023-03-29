import React from 'react';
import logo from './../../assets/logo.svg';
import './header.scss';

export const Header = () => {
  return (
    <header className="header-container">
      <div className="header">
        <img src={logo} alt="logo" className="header-logo" />
        <div className="header-btns">
          <button className="btn">
            <a href="#users"></a>Users
          </button>
          <button className="btn">Sign up</button>
        </div>
      </div>
    </header>
  );
};
