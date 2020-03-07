// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import RCSwitch from 'rc-switch';

export default class Switch extends PureComponent {
  static displayName = 'Switch';

  static propTypes = {};

  render() {
      // const { props } = this;
      return (
          <div style={{ height: '28px', display: 'inline-block', position: 'relative' }}>
              <RCSwitch {...this.props}/>
              {this.props.checked ? <div className="switch-checked">On</div> : (
                  <div className="switch-unchecked">Off</div>
              )}
          </div>
      );
  }
}
