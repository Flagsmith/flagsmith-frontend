import React, { Component, PropTypes } from 'react';
import AccountStore from '../../../common/stores/account-store';
import makeAsyncScriptLoader from "react-async-script";

const PaymentModal = class extends Component {
  displayName: 'TheComponent'
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount = () => {
    // API.trackPage(Constants.pages.ACCOUNT);
  };

  onSave = () => {
    toast('Account Saved');
  };

  componentWillReceiveProps(newProps) {
  }

  render() {
    const hasFreeUse = Constants.simulate.HAS_FREE_USE; // Organisation was created before payment options came in and therefore they have free usage (for now)
    return (
      <div className="app-container container">
        <AccountProvider onSave={this.onSave} onRemove={this.onRemove}>
          {({
            isLoading,
            isSaving,
            user,
            organisation
          }, { createOrganisation, selectOrganisation, editOrganisation, deleteOrganisation }) => (
              <div>
                <div style={{ backgroundColor: 'white' }}>
                  <h2 className="text-center margin-bottom">{hasFreeUse ? 'Your organisation is currently using Bullet Train for free' : 'Start using Bullet Train for free'}</h2>
                  <p className="text-center">Increase your plan as your business grows.</p>
                  <div className="col-md-12">
                    <div className={"row"}>
                      <div className={"col-md-3 pricing-panel"}>
                        <div className="panel panel-default">
                          <div className="panel-content">
                            <p className="featured"> </p>
                            <p className="pricing-price">Side Project</p>
                            <img src="/images/growth.svg" alt="free icon" className="pricing-icon" />
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
                            <img src="/images/startup.svg" alt="Startup icon" className="pricing-icon" />
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
                            <img src="/images/layers2.svg" alt="Scale-up icon" className="pricing-icon" />
                            <p className="pricing-type">$99</p>
                            <p className="text-small text-center">billed monthly</p>
                            <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="scale-up" className="pricing-cta">Start free trial</a>
                          </div>
                          <div className="panel-footer">
                            <p className="text-small text-center link-style">What's included</p>
                            <ul className="pricing-features">
                              <li><p>30 day free trial</p></li>
                              <li><p>Up to 50,000 Monthly Active Users</p></li>
                              <li><p>Telephone Technical Support</p></li>
                              <li><p>All Startup Features</p></li>
                            </ul>

                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3 pricing-panel"}>
                        <div className="panel panel-default">
                          <div className="panel-content">
                            <p className="featured"> </p>
                            <p className="pricing-price">Enterprise</p>
                            <img src="/images/cubes.svg" alt="Enterprise icon" className="pricing-icon" />
                            <p className="pricing-type">Contact Us</p>
                            <p className="text-small text-center">for enterprise pricing</p>
                            <a href="mailto:enterprise@bullet-train.io" className="pricing-cta blue">Contact Us</a>
                          </div>

                          <div className="panel-footer">
                            <p className="text-small text-center link-style">What's included</p>
                            <ul className="pricing-features">
                              <li><p>Optional On Premise Installation</p></li>
                              <li><p>Over 50,000 Monthly Active Users</p></li>
                              <li><p>Telephone Technical Support</p></li>
                              <li><p>All Startup Features</p></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </AccountProvider>
      </div>
    );
  }
};

const WrappedPaymentModal = makeAsyncScriptLoader(ConfigProvider(PaymentModal), 'https://js.chargebee.com/v2/chargebee.js', {
  removeOnUnmount: true
});

PaymentModal.propTypes = {};

module.exports = (props) => (
  <WrappedPaymentModal {...props} asyncScriptOnLoad={() => {
    Chargebee.init({
      site: Project.chargebee.site
    });
    Chargebee.registerAgain();
  }} />
);
