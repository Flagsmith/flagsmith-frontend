export default ConfigProvider(({hasFeature, className}) => (
    <footer className="homepage clearfix">
      <div className="clearfix">
        <div className="float-left">
          <div className="brand-footer float-left">
            <ul className="list-unstyled">
              <li><img src="./images/icon-light-2.png" alt="Bullet Train"/></li>
              <li><a href="http://www.solidstategroup.com"><img src="./images/ssg-logotype-white-transparent-bg.png" alt="Solid state group" className="brand-ssg"/></a></li>
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
            <li><a href="mailto:bullettrain@solidstategroup.com">Support</a></li>
            <li><Link to={"/legal/privacy-policy"}>Privacy Policy</Link></li>
            <li><Link to={"/legal/sla"}>Service Level Agreement</Link></li>
          </ul>
        </div>
      </div>

    </footer>
));
