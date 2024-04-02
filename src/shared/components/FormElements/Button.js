import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
        href={props.href}
        target='_blank'
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props.classes} button button--${props.size || 'default'}${props.inverse ? ' button--inverse' : ''}${props.danger ? ' button--danger' : ''}${props.controls ? ' button--controls' : ''}${props.modal ? ' button--modal' : ''}${props.primary ? ' button--primary' : ''}${props.plus ? ' button--plus' : ''}${props.success ? ' button--success' : ''}${props.transparent ? ' button--transparent' : ''}${props.noAnimation ? ' button--noAnimation' : ''}${props.activeButton ? ' active' : ''}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
