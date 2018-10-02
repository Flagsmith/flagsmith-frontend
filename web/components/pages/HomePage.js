import React from "react";
import AccountStore from '../../../common/stores/account-store';
import ForgotPasswordModal from '../ForgotPasswordModal';
import Hero from '../Hero';
import Footer from '../Footer';

const HomePage = class extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        if (AccountStore.getOrganisation() && AccountStore.getUser() && !AccountStore.isDemo) {
            this.context.router.replace("/projects?intro=1")
        } else if (!AccountStore.getOrganisation() && AccountStore.getUser() && !AccountStore.isDemo) {
            this.context.router.replace("/create")
        }

        API.trackPage(Constants.pages.HOME);

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            //>=, not <=
            if (scroll >= 705) {
                //clearHeader, not clearheader - caps H
                $(".navbar-fixed-top").addClass("dark-header");

            } else if (scroll <= 705){
                $(".navbar-fixed-top").removeClass("dark-header");
            }
        });
    }

    showForgotPassword = (e) => {
        e.preventDefault()
        openModal('Forgot password', <ForgotPasswordModal onComplete={() => {
            toast("Forgot password submitted")
        }}/>)
    }

    render = () => {
        const {email, password, organisation_name, first_name, last_name} = this.state;
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : "";
        const isInvite = document.location.href.indexOf("invite") != -1;
        const isLogin = document.location.href.indexOf("login") != -1;
        const {hasFeature, getValue} = this.props;
        return (
            <AccountProvider onLogout={this.onLogout} onLogin={this.onLogin}>
                {({isLoading, isSaving, error}, {register}) => (
                    <div className="homepage">
                        <Hero>

                        </Hero>
                        <div className="tech">
                            <div className="container">
                                <div className="text-center col-md-12 col-lg-8 push-lg-2">
                                    <h2>We currently support these popular languages</h2>
                                    <div className="row">
                                        <div className="col-md-2 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-java-client">
                                                <img src="./images/bt-java.png" alt="Java"/>
                                            </a>
                                        </div>
                                        <div className="col-md-2 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-js-client">
                                                <img src="./images/bt-javascript.png" alt="Javascript"/>
                                            </a>
                                        </div>
                                        <div className="col-md-2 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-js-client">
                                                <img src="./images/bt-react.png" alt="React JS"/>
                                            </a>
                                        </div>
                                        <div className="col-md-2 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-nodejs-client">
                                                <img src="./images/bt-nodejs.png" alt="Node.js"/>
                                            </a>
                                        </div>
                                        <div className="col-md-2 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-python-client">
                                                <img src="./images/bt-python.png" className="img-fluid" alt="Python"/>
                                            </a>
                                        </div>
                                        <div className="col-md-2 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-ruby-client">
                                                <img src="./images/bt-ruby.png" alt="Python"/>
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-small margin-top no-mb">Don't worry if you don't see your
                                        preferred tech, we'll be adding support for more clients as we grow but
                                        please <a href="mailto:bullettrain@solidstategroup.com">get in touch</a> and let
                                        us know what you'd like to see.</p>
                                </div>
                            </div>
                        </div>

                        <div className="feature-container">
                            <div className={"text-center col-md-12 col-lg-6 push-lg-3"}>
                                <h2>Release configurable features to segmented user groups</h2>
                                <p>With Bullet Train you can configure attributes of your features as well as turning
                                    them on or off for specific user groups.</p>
                            </div>
                            <div className={"homepage-features col-md-6 push-md-3 row mt-5"}>
                                <div className="col-md-4">
                                    <ion className="homepage-icon icon ion-ios-rocket"/>
                                    <h5>Feature Flags</h5>
                                    <p>Ship features remotely across multiple environments.</p>
                                </div>
                                <div className="col-md-4">
                                    <ion className="homepage-icon icon ion-ios-laptop"/>
                                    <h5>Remote Config</h5>
                                    <p>Change the behaviour, appearance and config of your app here without needing to
                                        build.</p>
                                </div>
                                <div className="col-md-4">
                                    <ion className="homepage-icon icon ion-ios-laptop"/>
                                    <h5>Use anywhere</h5>
                                    <p>Integrate Bullet Train with your website, mobile apps or server</p>
                                </div>
                            </div>
                            <div className="home-sections">
                                <div className="homepage-features col-md-6 push-md-3 row mt-5 upcoming">
                                    <p className="large-para">Coming soon</p>
                                    <div className="col-md-4">
                                        <ion className="homepage-icon icon ion-md-done-all"/>
                                        <h5>Track changes</h5>
                                        <p>Audit feature changes & rollback any mistakes or issues</p>
                                    </div>
                                    <div className="col-md-4">
                                        <ion className="homepage-icon icon ion-md-contacts"/>
                                        <h5>Segment users</h5>
                                        <p>Create detailed user segments for feature targeting</p>
                                    </div>
                                    <div className="col-md-4">
                                        <ion className="homepage-icon icon ion-ios-flask"/>
                                        <h5>A/B Testing</h5>
                                        <p> A/B test feature sets or individual features</p>
                                    </div>
                                </div>
                                {/*<hr/>*/}
                                {/*{getValue("home_copy") && JSON.parse(getValue("home_copy"))*/}
                                    {/*.map(({title, content}) => (*/}
                                        {/*<div className={"col-md-6 push-md-3 row mt-5"}>*/}
                                            {/*<div className={"text-center"}>*/}
                                                {/*<h2>*/}
                                                    {/*{title}*/}
                                                {/*</h2>*/}
                                                {/*<div dangerouslySetInnerHTML={{__html: content}}*/}
                                                     {/*className={"col-md-12"}/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*))}*/}
                            </div>
                        </div>

                        <div className="pricing">
                            <div className="container">
                                <h2 className="text-center margin-bottom">Start using Bullet Train for free</h2>
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
                                                    <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="side-project" className="pricing-cta blue">Sign up</a>
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
                                                    <img src="/images/cubes.svg" alt="Enterprise icon" className="pricing-icon"/>
                                                    <p className="pricing-type">Contact Us</p>
                                                    <p className="text-small text-center">for enterprise pricing</p>
                                                    <a href="mailto:enterprise@bullettrain.io" className="pricing-cta blue">Contact Us</a>
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
                        <div className="sign-up" id="sign-up">
                            {isLogin ? (
                                <div className="card signup-form container animated fadeIn col-md-8 col-xl-8">
                                    <AccountProvider>
                                        {({isLoading, isSaving, error}, {login}) => (
                                            <form id="form" name="form" onSubmit={(e) => {
                                                Utils.preventDefault(e);
                                                login({email, password});
                                            }}>
                                                <h3 className="margin-bottom">User login</h3>
                                                {isInvite && <p>Login to accept your invite</p>}
                                                <fieldset id="details" className="col-lg-6 offset-lg-3">
                                                        {error && error.email ? (<span id="email-error" className="text-danger">{error.email}</span>) : null}
                                                        <Input
                                                            inputProps={{
                                                                name: "email",
                                                                className: "full-width",
                                                                error: error && error.email
                                                            }}
                                                            onChange={(e) => {
                                                                this.setState({email: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder="Email"
                                                            type="text"
                                                            name="email" id="email"/>
                                                        {error && error.password1 ? (<span id="password-error" className="text-danger">{error.password1}</span>) : null}
                                                        <Input
                                                            inputProps={{
                                                                name: "password",
                                                                className: "full-width",
                                                                error: error && error.password1
                                                            }}
                                                            onChange={(e) => {
                                                                this.setState({password: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder="Password"
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                        />
                                                        <div className="form-cta">
                                                            <button
                                                                id="login-btn"
                                                                disabled={isLoading || isSaving}
                                                                className="btn white full-width" type="submit">
                                                                Login
                                                            </button>
                                                            {hasFeature('forgot_password') && (
                                                                <div>
                                                                    <Link to={`/${redirect}`} className="float-left">Not got an account?</Link>
                                                                    <Link className="float-right" to={`/password-recovery${redirect}`}
                                                                          onClick={this.showForgotPassword}>Forgot
                                                                        password?</Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                </fieldset>
                                                {error && <div id="error-alert" className="alert alert-danger">
                                                    Please check your details and try again
                                                </div>}

                                            </form>
                                        )}
                                    </AccountProvider>
                                </div>
                            ) : (
                                <div>
                                    <div className="card signup-form container animated fadeIn col-md-8 col-xl-8">
                                        <form id="form" name="form" onSubmit={(e) => {
                                            Utils.preventDefault(e);
                                            const isInvite = document.location.href.indexOf("invite") != -1;
                                            register({email, password, organisation_name, first_name, last_name}
                                                , isInvite
                                            );
                                        }}>

                                            <div className="form-intro text-center">
                                                <h3>It's free to get started.</h3>
                                                <p className="">Sign up for a 30 day free trial</p>
                                            </div>
                                            {error &&
                                            <FormGroup className="col-lg-6 offset-lg-3">
                                                <div id="error-alert" className="alert alert-danger">
                                                    Please check your details and try again
                                                </div>
                                            </FormGroup>
                                            }
                                            {isInvite && <p>Sign up to accept your invite</p>}
                                            <fieldset id="details" className="col-lg-6 offset-lg-3">
                                                <Input inputProps={{
                                                        name: "firstName",
                                                        className: "full-width",
                                                        error: error && error.first_name
                                                    }}
                                                    onChange={(e) => {
                                                        this.setState({first_name: Utils.safeParseEventValue(e)})
                                                    }}
                                                    className="input-default full-width"
                                                    placeholder="First name"
                                                    type="text"
                                                    name="firstName" id="email"/>
                                                <Input
                                                    inputProps={{
                                                        name: "lastName",
                                                        className: "full-width",
                                                        error: error && error.last_name
                                                    }}
                                                    placeholder={"Last Name"}
                                                    onChange={(e) => {
                                                        this.setState({last_name: Utils.safeParseEventValue(e)})
                                                    }}
                                                    className="input-default full-width"
                                                    type="text"
                                                    name="lastName" id="email"/>
                                                {!isInvite && (
                                                    <Input
                                                        inputProps={{
                                                            name: "companyName",
                                                            className: "full-width"
                                                        }}
                                                        placeholder="Organisation name"

                                                        onChange={(e) => {
                                                            this.setState({organisation_name: Utils.safeParseEventValue(e)})
                                                        }}
                                                        className="input-default full-width"
                                                        type="text"
                                                        name="companyName" id="organisation"/>
                                                )}

                                                {error && error.email ? (<span id="email-error" className="text-danger">{error.email}</span>) : null}
                                                <Input
                                                        inputProps={{
                                                            name: "email",
                                                            className: "full-width",
                                                            error: error && error.email
                                                        }}
                                                        placeholder={"Email Address"}
                                                        onChange={(e) => {
                                                            this.setState({email: Utils.safeParseEventValue(e)})
                                                        }}
                                                        className="input-default full-width"
                                                        type="text"
                                                        name="email" id="email"/>

                                                {error && error.password1 ? (<span id="password-error" className="text-danger">{error.password1}</span>) : null}
                                                <Input
                                                        inputProps={{
                                                            name: "password",
                                                            className: "full-width",
                                                            error: error && error.password1
                                                        }}
                                                        placeholder={"Password"}
                                                        onChange={(e) => {
                                                            this.setState({password: Utils.safeParseEventValue(e)})
                                                        }}
                                                        className="input-default full-width"
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                    />
                                                <div className="form-cta margin-top">
                                                    <button
                                                        name="signup-btn"
                                                        disabled={isLoading || isSaving}
                                                        className="btn white full-width" type="submit">
                                                        Sign Up
                                                    </button>
                                                    <Link id="existing-member-btn" to={`/login${redirect}`}>
                                                        Already a member?
                                                    </Link>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Footer className="homepage" />
                    </div>
                )}
            </AccountProvider>
        );
    }
};
module.exports = ConfigProvider(HomePage);