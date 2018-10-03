import React from "react";
import makeAsyncScriptLoader from "react-async-script";

import Footer from '../Footer';

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
                        <h2 className="text-center margin-bottom margin-top">Start using Bullet Train for free</h2>
                        <p className="text-center">Then increase your plan as your business grows.</p>
                        <div className="col-md-12">
                            <div className={"row"}>
                                <div className={"col-md-3 pricing-panel"}>
                                    <div className="panel panel-default">
                                        <div className="panel-content">
                                            <p className="featured"> </p>
                                            <p className="pricing-price">Side Project</p>
                                            <img src="/images/growth.svg" alt="free icon" className="pricing-icon"/>
                                            <p className="pricing-type">$5</p>
                                            <p className="text-small text-center">Billed monthly</p>
                                            <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="side-project" className="pricing-cta blue">Start free trial</a>
                                        </div>
                                        <div className="panel-footer">
                                            <p className="text-small text-center link-style">What's included</p>
                                            <ul className="pricing-features">
                                                <li><p>30 day free trial</p></li>
                                                <li><p>Up to 2,000 Monthly Active Users</p></li>
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
                                                <li><p>30 day free trial</p></li>
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
                                                <li><p>30 day free trial</p></li>
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
                                            <a href="mailto:enterprise@bullet-train.io" className="pricing-cta blue">Contact Us</a>
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
                </div>

                <div className="faq">
                    <div className="container">
                        <h2 className="text-center margin-bottom">FAQs</h2>
                        <div className="panel panel-default panel-grey">
                            <p className="question">So how does this all work?</p>
                            <p className="answer">
                                First off, you're free to host Bullet Train yourself, free of charge. We're open source, and totally fine with you doing that.
                            </p>
                            <p className="answer">
                                If you want to support the project, or you don't fancy going through the hassle of managing that infrastructure, we'd love you to sign up.
                            </p>
                            <p className="answer">
                                The only metric you need to count when deciding on your plan is the number of Monthly Active Users you need to serve flags for (see below).
                                You can create as many projects, flags, admin users as you like. We feel that this is the fairest measure of usage.
                            </p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">What is a monthly active user?</p>
                            <p className="answer">
                                Whenever you serve a set of feature flags or remote configurations to one of your users, we'll track it as a single user.
                                That user can request feature flags as often as they like for the current 30 day period. It just tracks as a single Monthly Active User (MAU).
                                We total up all users across all projects and environments over the 30 day period (based on your initial billing date), and that makes up your total MAU.
                            </p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">What happens if I go over my plan limit?</p>
                            <p className="answer">
                                Don't worry - we'll carry on serving your flags to your users. We realise that this is important to your application.
                                If this does happen, we'll be in touch to discuss moving you to a new plan.
                            </p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">What about an annual discount?</p>
                            <p className="answer">
                                We're working on this - please <a href="mailto:support@bullettrain.io">get in touch</a> if this is important to you right now.
                            </p>
                        </div>
                        <div className="panel panel-default panel-grey">
                            <p className="question">Wait, what? This seems too cheap?</p>
                            <p className="answer">
                                We like to think of it as offering great value 🤪
                            </p>
                        </div>
                        <div className="text-center cta-container">
                            <h5>Didn't find an answer to your question?</h5>
                            <a href="mailto:enterprise@bullet-train.io" className="pricing-cta blue">Get in touch</a>
                        </div>
                    </div>
                </div>
                <Footer className="homepage" />
            </div>
        );
    }
};

const WrappedPricingPage = makeAsyncScriptLoader(ConfigProvider(PricingPage), 'https://js.chargebee.com/v2/chargebee.js', {
    removeOnUnmount: true
});

module.exports = (props) => (
    <WrappedPricingPage {...props} asyncScriptOnLoad={() => {
        Chargebee.init({
            site: Project.chargebee.site
        });
        Chargebee.registerAgain();
    }}/>
);
