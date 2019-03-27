import React, { Component } from 'react';
import logoImg from 'images/logo.svg';

export default class Header extends Component {
  displayName: 'Header';

  render () {
    const {title, subtitle, filterTitle} = this.props;

    return (
      <div>
        <div className='app-header'>
          <h1 className='app-title'>{title}</h1>
          <h2 className='app-subtitle'>{subtitle}</h2>
          <img className="app-logo" src={logoImg} alt="app-logo" />
        </div>
        <div className='filter'>
          <h3 className="filter-title">{filterTitle}</h3>
          <select id="tree">
          </select>
        </div>
      </div>
    );
  }
}
