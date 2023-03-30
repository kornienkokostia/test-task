import React from 'react';
import './preloader.scss';
import spinnerImg from './../../assets/spinner.svg';

export const Preloader = () => {
  return (
    <div className="spinner">
      <img src={spinnerImg} alt="spinner" />
    </div>
  );
};
