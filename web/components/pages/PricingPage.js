import React from "react";

const HomePage = class extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        API.trackPage(Constants.pages.PRICING);
    }

    componentDidMount() {
        Chargebee.registerAgain();
    }

    render = () => {
        const { hasFeature, getValue } = this.props;
        return (
            <div>
                <div className="pricing">
                    <div className="container">
                        <h2>Start using Bullet Train for free, then scale-up over time.</h2>
                        <div className={"col-md-12 row"}>
                            <div className={"col-md-3"}>
                                <Panel title="Free">
                                    <p className="price">$Free</p>
                                    <ul className="pricing-features">
                                        <li><p>Up to 2,000 Monthly Active Users</p></li>
                                        <li><p>Unlimited Administrator Accounts</p></li>
                                        <li><p>Unlimited Projects</p></li>
                                        <li><p>Unlimited Environments</p></li>
                                        <li><p>Unlimited Feature Flags</p></li>
                                    </ul>
                                    <a href="#">Sign Up</a>
                                </Panel>
                            </div>
                            <div className={"col-md-3"}>
                                <Panel title="Startup">
                                    <p className="price">$29 / month</p>
                                    <ul className="pricing-features">
                                        <li><p>Up to 10,000 Monthly Active Users</p></li>
                                        <li><p>Unlimited Administrator Accounts</p></li>
                                        <li><p>Unlimited Projects</p></li>
                                        <li><p>Unlimited Environments</p></li>
                                        <li><p>Unlimited Feature Flags</p></li>
                                        <li><p>Email Technical Support</p></li>
                                    </ul>
                                    <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="startup">Subscribe</a>
                                </Panel>
                            </div>
                            <div className={"col-md-3"}>
                                <Panel title="Scale-Up">
                                    <p className="price">$99 / month</p>
                                    <ul className="pricing-features">
                                        <li><p>Up to 50,000 Monthly Active Users</p></li>
                                        <li><p>All Startup Features</p></li>
                                        <li><p>Telephone Technical Support</p></li>
                                    </ul>
                                    <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="scale-up">Subscribe</a>
                                </Panel>
                            </div>
                            <div className={"col-md-3"}>
                                <Panel title="Enterprise">
                                    <p>$Contact Us</p>
                                    <ul>
                                        <li><p>Over 50,000 Monthly Active Users</p></li>
                                        <li><p>All Startup Features</p></li>
                                        <li><p>Telephone Technical Support</p></li>
                                        <li><p>Optional On Premise Installation</p></li>
                                    </ul>
                                    <a href="mailto:enterprise@bullettrain.io">Contact Us</a>
                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="homepage clearfix">
                    <div className="clearfix">
                        <div className="brand-footer float-left">
                            <img src="./images/icon-light-2.png" alt="Bullet Train" />
                        </div>
                        <ul className="float-right nav-list">
                            {hasFeature("explain") && (
                                <li><Link to={"/blog/remote-config-and-feature-flags"}>What are feature flags?</Link></li>
                            )}
                            {hasFeature("explain") && (
                                <li><Link to={"/blog/remote-config-and-feature-flags"}>What is remote config?</Link></li>
                            )}
                            <li><Link to={"/demo"}>Demo</Link></li>
                            <li><a href="https://docs.bullet-train.io/">Docs</a></li>
                            <li><a href="mailto:bullettrain@solidstategroup.com">Support</a></li>
                            <li><Link to={"/policies/privacy-policy"}>Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="built-by text-center">
                        <p>Built by <a href="http://www.solidstategroup.com"><img
                            src="./images/ssg-logotype-white-transparent-bg.png" alt="Solid state group" /></a>
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
};
module.exports = ConfigProvider(HomePage);