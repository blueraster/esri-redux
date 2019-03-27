import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, { Component } from 'react';
import { TEXT, FILTER_TEXT } from 'js/config';

export default class App extends Component {
  displayName: 'App';

  render () {
    return (
      <div className='root'>
        <Header title={TEXT.title} subtitle={TEXT.subtitle} filterTitle={FILTER_TEXT.filterTitle} />
        <MapView />
      </div>
    );
  }

}
