var data = require('../../common/data/base/_data');

const Footer = class extends React.Component {
  state = {
    operational: true
  }
  componentDidMount() {
  }
  render() {
    const { hasFeature, className } = this.props;
    return (
      <footer className={className + " clearfix"}>
        <a href="https://status.bullet-train.io/" target="_blank" className="service-status text-center">
          {this.state.operational ?
            <div><span className={"dot green"} />Bullet Train services are operational</div> :
            <div><span className={"dot orange"} />Bullet Train services are experiencing problems. Click <a href="https://cachet.dokku1.solidstategroup.com/">here</a> for more info</div>
          }
        </a>
        <div className="clearfix">
          <div className="float-left">
            <div className="brand-footer float-left">
              <ul className="list-unstyled">
                <li><img src="/images/icon-light-2.png" alt="Bullet Train" /></li>
                <li><a href="http://www.solidstategroup.com"><img src="/images/ssg-logotype-white-transparent-bg.png" alt="Solid state group" className="brand-ssg" /></a></li>
              </ul>
            </div>
          </div>
          <div className="float-right">
            <ul className=" float-left nav-list">
              <li><Link to={"/demo"}>Demo</Link></li>
              <li><a href="https://docs.bullet-train.io/">Docs</a></li>
              <li><Link to={"/pricing"}>Pricing</Link></li>
              {hasFeature("explain") && (
                <li><Link to={"/blog/remote-config-and-feature-flags"}>What are feature flags?</Link></li>
              )}
              {hasFeature("explain") && (
                <li><Link to={"/blog/remote-config-and-feature-flags"}>What is remote config?</Link></li>
              )}
            </ul>
            <ul className=" float-left nav-list">
              <li><a href="https://github.com/SolidStateGroup?utf8=%E2%9C%93&q=bullet+train" target="_blank">GitHub</a></li>
              <li><a href="mailto:support@bullet-train.io">Support</a></li>
              <li><Link to={"/legal/tos"}  target="_blank">Terms of Service</Link></li>
              <li><Link to={"/legal/privacy-policy"} target="_blank">Privacy Policy</Link></li>
              <li><Link to={"/legal/sla"} target="_blank">Service Level Agreement</Link></li>
            </ul>
          </div>
        </div>

      </footer>
    )
  }
}

export default ConfigProvider(Footer);
