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
                Set Income Level Cutoff: {this.props.incomeLevel}
        <input 
          type="range"
          className="custom-range"
          defaultValue={this.props.incomeLevel}
          min={0}
          max={100000}
          step={10000}
          onChange={this.props.onChangeValue}/>

      </div>
    );
  }
}