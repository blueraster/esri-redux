import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';

export default class SliderModal extends Component {
  displayName: 'SliderModal';
  constructor(props) {
    super(props);

  }


  render () {
    let { visible } = this.props;

    return (
      <div className="range-container">
        <b>Median Income Level > {this.props.incomeLevel}</b>
        <input 
          type="range"
          className="custom-range"
          defaultValue={this.props.incomeLevel}
          min={0}
          max={300000}
          step={10000}
          onChange={this.props.onChangeValue}/>
      </div>
    );
  }
}