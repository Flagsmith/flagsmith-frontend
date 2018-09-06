import React from "react";
import makeAsyncScriptLoader from "react-async-script";

const PricingPage = class extends React.Component {
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

    render = () => {
        const { hasFeature, getValue } = this.props;
        return (
            <div>
                <div className="pricing">
                    <div className="container">
                        <h2 className="text-center margin-bottom">Start using Bullet Train for free</h2>
                        <p className="text-center">Then increase your your plan as your business grows.</p>
                        <div className={"col-md-12 row"}>
                            <div className={"col-md-3 pricing-panel"}>
                                <div className="panel panel-default">
                                    <div className="panel-content">
                                        <p className="featured"> </p>
                                        <p className="pricing-price">Free</p>
                                        <img src="/images/growth.svg" alt="free icon" className="pricing-icon"/>
                                        <p className="pricing-type">Free</p>
                                        <p className="text-small text-center">more flags than the UN</p>
                                        <a href="#" className="pricing-cta blue">Sign up</a>
                                    </div>
                                    <div className="panel-footer">
                                        <p className="text-small text-center link-style">What's included</p>
                                        <ul className="pricing-features">
                                            <li><p>Up to 2,000 Monthly Active Users</p></li>
                                            <li><p>Unlimited Administrator Accounts</p></li>
                                            <li><p>Unlimited Projects</p></li>
                                            <li><p>Unlimited Environments</p></li>
                                            <li><p>Unlimited Feature Flags</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-3 pricing-panel"}>
                                <div className="panel panel-default">
                                    <div className="panel-content">
                                        <p className="featured"> </p>
                                        <p className="pricing-price">Start-Up</p>
                                        <img src="/images/startup.svg" alt="Startup icon" className="pricing-icon"/>
                                        <p className="pricing-type">$29</p>
                                        <p className="text-small text-center">billed monthly</p>
                                        <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="startup" className="pricing-cta blue">Start free trial</a>
                                    </div>
                                    <div className="panel-footer">
                                        <p className="text-small text-center link-style">What's included</p>
                                        <ul className="pricing-features">
                                            <li><p>30 Day free trial</p></li>
                                            <li><p>Up to 10,000 Monthly Active Users</p></li>
                                            <li><p>Unlimited Administrator Accounts</p></li>
                                            <li><p>Unlimited Projects</p></li>
                                            <li><p>Unlimited Environments</p></li>
                                            <li><p>Unlimited Feature Flags</p></li>
                                            <li><p>Email Technical Support</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-3 pricing-panel"}>
                                <div className="panel panel-default">
                                    <div className="panel-content">
                                        <p className="featured">Most Popular</p>
                                        <p className="pricing-price">Scale-Up</p>
                                        <img src="/images/layers2.svg" alt="Scale-up icon" className="pricing-icon"/>
                                        <p className="pricing-type">$99</p>
                                        <p className="text-small text-center">billed monthly</p>
                                        <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="scale-up" className="pricing-cta">Start free trial</a>
                                    </div>
                                    <div className="panel-footer">
                                        <p className="text-small text-center link-style">What's included</p>
                                        <ul className="pricing-features">
                                            <li><p>30 Day free trial</p></li>
                                            <li><p>Up to 50,000 Monthly Active Users</p></li>
                                            <li><p>All Startup Features</p></li>
                                            <li><p>Telephone Technical Support</p></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-3 pricing-panel"}>
                                <div className="panel panel-default">
                                    <div className="panel-content">
                                        <p className="featured"> </p>
                                        <p className="pricing-price">Enterprise</p>
                                        <img src="/images/cubes.svg" alt="Enterprise icon" className="pricing-icon"/>
                                        <p className="pricing-type">Contact Us</p>
                                        <p className="text-small text-center">for enterprise pricing</p>
                                        <a href="mailto:enterprise@bullettrain.io" className="pricing-cta blue">Contact Us</a>
                                    </div>

                                    <div className="panel-footer">
                                        <p className="text-small text-center link-style">What's included</p>
                                        <ul className="pricing-features">
                                            <li><p>Over 50,000 Monthly Active Users</p></li>
                                            <li><p>All Startup Features</p></li>
                                            <li><p>Telephone Technical Support</p></li>
                                            <li><p>Optional On Premise Installation</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="faq">
                    <div className="container">
                        <h2 className="text-center margin-bottom">FAQs</h2>
                        <div className="panel panel-default panel-grey">
                            <p className="question">This is a frequently asked question?</p>
                            <p className="answer">This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question.</p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">This is a frequently asked question?</p>
                            <p className="answer">This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question.</p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">This is a frequently asked question?</p>
                            <p className="answer">This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question.</p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">This is a frequently asked question?</p>
                            <p className="answer">This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question. This is the answer to this question.</p>
                        </div>
                        <div className="text-center cta-container">
                            <h5>Didn't find an answer to your question?</h5>
                            <a href="mailto:support@bullettrain.io" className="pricing-cta blue">Get in touch</a>
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

const WrappedPricingPage = makeAsyncScriptLoader(ConfigProvider(PricingPage), 'https://js.chargebee.com/v2/chargebee.js', {
    removeOnUnmount: true
});

module.exports = () => (
    <WrappedPricingPage asyncScriptOnLoad={() => {
        Chargebee.init({
            site: Project.chargebee.site
        });
        Chargebee.registerAgain();
    }}/>
);
