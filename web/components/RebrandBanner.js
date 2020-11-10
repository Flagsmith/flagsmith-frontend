import React from 'react';

const RebrandBanner = class extends React.Component {
  static displayName = 'RebrandBanner'

  constructor(props, context) {
      super(props, context);
      this.state = {};
  }


  render() {
      return (
          <div className="bottom-banner">
              <div className="inner">
                  <Row>
                  Bullet Train is now Flagsmith, read about it
                      {' '}
                      <a className="ml-1" target="_blank" href="https://flagsmith.com/blog/rebrand">here</a>.
                      <Button onClick={this.dismiss} className="btn--small ml-2">Ok</Button>
                  </Row>
              </div>
          </div>
      );
  }
};

RebrandBanner.propTypes = {

};

module.exports = RebrandBanner;
