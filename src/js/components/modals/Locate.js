import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';

export default class LocateModal extends Component {
  displayName: 'LocateModal';

  close = () => {
    this.props.toggleLocateModal();
  };

  render () {
    let { visible } = this.props;

    return (
      <Wrapper theme='locate-modal' visible={visible} close={this.close}>
        <h3>Locate Something</h3>
      </Wrapper>
    );
  }
}
