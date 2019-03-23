import React, { Component } from 'react';
import logoImg from 'images/logo.svg';

export default class Header extends Component {
  displayName: 'Header';

  render () {
    const {title, subtitle} = this.props;

    return (
      <div>
        <div className='app-header'>
          <h1 className='app-title'>{title}</h1>
          <h2 className='app-subtitle'>{subtitle}</h2>
          <img className="app-logo" src={logoImg} alt="app-logo" />
        </div>
        <div>
          <select id="tree"></select>
        </div>
      </div>
    );
  }
}
