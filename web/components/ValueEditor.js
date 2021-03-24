import React from 'react';
import { Component } from 'react';
import Highlight from './Highlight';

class ValueEditor extends Component {
  state = {};

  render() {
      const { ...rest } = this.props;
      return (
        <>
            <Highlight onChange={rest.onChange} className="json">
                {rest.value}
            </Highlight>
            <textarea
              {...rest}
            />

          </>
      );
  }
}

export default ValueEditor;
