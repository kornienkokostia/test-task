import React from 'react';
import logo from './../../assets/logo.svg';
import './header.scss';

export const Header = () => {
  return (
    <header className="header-container">
      <div className="header">
        <img src={logo} alt="logo" className="header-logo" />
        <div className="header-btns">
          <a href="#users" className="btn">
            Users
          </a>
          <a href="#registration" className="btn">
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
};
