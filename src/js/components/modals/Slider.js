import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';
import Select from 'react-select';

const options = [
  { value: 'DuPage', label: 'DuPage' },
  { value: 'DeKalb', label: 'Dekalb' },
  { value: 'Lake', label: 'Lake' },
  { value: 'Cook', label: 'Cook' }
]

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
          onChange={this.props.onChangeSlider}/>

          <Select value={this.props.county} options={options} onChange={this.props.onChangeCounty} />

      </div>
    );
  }
}
