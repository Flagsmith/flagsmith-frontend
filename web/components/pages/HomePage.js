import React from "react";
import AccountStore from '../../../common/stores/account-store';
import Hero from '../Hero';

module.exports = class extends React.Component {
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
    }

    render = () => {
        const {email, password, organisation_name, first_name, last_name} = this.state;
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : "";
        const isInvite = document.location.href.indexOf("invite") != -1;
        const isLogin = document.location.href.indexOf("login") != -1;
        return (
            <AccountProvider onLogout={this.onLogout} onLogin={this.onLogin}>
                {({isLoading, isSaving, error}, {register, loginDemo}) => (
                    <div>
                        <Hero
                            onDemoClick={loginDemo}
                            loginLink={`/login${redirect}`}>
                            {isLogin ? (
                                <div className="card signup-form container animated fadeIn col-md-8 col-xl-8">
                                    <AccountProvider>
                                        {({isLoading, isSaving, error}, {login, loginDemo}) => (
                                            <form id="form" name="form" onSubmit={(e) => {
                                                Utils.preventDefault(e);
                                                login({email, password});
                                            }}>
                                                <ion className="homepage-icon icon ion-ios-hand"/>
                                                <h3>Hello again.</h3>
                                                <fieldset id="details">
                                                    <FormGroup>
                                                        <InputGroup
                                                            inputProps={{
                                                                name:"email",
                                                                className: "full-width",
                                                                error: error && error.email
                                                            }}
                                                            title={"Email Address"}
                                                            onChange={(e) => {
                                                                this.setState({email: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder="Email/Username"
                                                            type="text"
                                                            name="email" id="email"/>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup
                                                            inputProps={{
                                                                name:"password",
                                                                className: "full-width",
                                                                error: error && error.password1
                                                            }}
                                                            title={"Password"}
                                                            onChange={(e) => {
                                                                this.setState({password: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder="Password"
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                        />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <button
                                                            id="login-btn"
                                                            disabled={isLoading || isSaving}
                                                            className="btn btn-primary full-width" type="submit">
                                                            Login
                                                        </button>
                                                        <div className={"text-right"}>
                                                            {/*<Link to={`/password-recovery${redirect}`}*/}
                                                                  {/*onClick={this.showForgotPassword}>Forgot password?</Link>*/}
                                                        </div>
                                                    </FormGroup>
                                                </fieldset>
                                                {error && <div id="error-alert" className="alert alert-danger">
                                                    Please check your details and try again
                                                </div>}
                                                <div>
                                                    <Link to={`/${redirect}`}
                                                          onClick={this.showForgotPassword}>Not a member?</Link>
                                                </div>

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
                                            <ion className="homepage-icon icon ion-ios-rocket"/>
                                            <h3>It's free to get started.</h3>
                                            <fieldset id="details">
                                                <div className={"row"}>
                                                    <div className={"col-md-6"}>
                                                        <InputGroup
                                                            inputProps={{
                                                                name:"firstName",
                                                                className: "full-width",
                                                                error: error && error.first_name
                                                            }}
                                                            title={"First Name"}
                                                            onChange={(e) => {
                                                                this.setState({first_name: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder=""
                                                            type="text"
                                                            name="email" id="email"/>
                                                    </div>
                                                    <div className={"col-md-6"}>
                                                        <InputGroup
                                                            inputProps={{
                                                                name:"lastName",
                                                                className: "full-width",
                                                                error: error && error.last_name
                                                            }}
                                                            title={"Last Name"}
                                                            onChange={(e) => {
                                                                this.setState({last_name: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder=""
                                                            type="text"
                                                            name="email" id="email"/>
                                                    </div>
                                                </div>
                                                {!isInvite && (
                                                    <FormGroup>
                                                        <InputGroup
                                                            inputProps={{
                                                                name:"companyName",
                                                                className: "full-width"}}
                                                            title={
                                                                <span>
															Organisation Name {(
                                                                    <Tooltip place="right">
                                                                        {Constants.strings.ORGANISATION_DESCRIPTION}
                                                                    </Tooltip>
                                                                )}
															</span>
                                                            }
                                                            onChange={(e) => {
                                                                this.setState({organisation_name: Utils.safeParseEventValue(e)})
                                                            }}
                                                            className="input-default full-width"
                                                            placeholder=""
                                                            type="text"
                                                            name="organisation" id="organisation"/>
                                                    </FormGroup>
                                                )}
                                                <FormGroup>
                                                    <InputGroup
                                                        inputProps={{
                                                            name:"email",
                                                            className: "full-width",
                                                            error: error && error.email
                                                        }}
                                                        title={"Email Address"}
                                                        onChange={(e) => {
                                                            this.setState({email: Utils.safeParseEventValue(e)})
                                                        }}
                                                        className="input-default full-width"
                                                        placeholder=""
                                                        type="text"
                                                        name="email" id="email"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputGroup
                                                        inputProps={{
                                                            name: "password",
                                                            className: "full-width",
                                                            error: error && error.password1
                                                        }}
                                                        title={"Password"}
                                                        onChange={(e) => {
                                                            this.setState({password: Utils.safeParseEventValue(e)})
                                                        }}
                                                        className="input-default full-width"
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <button
                                                        name="signup-btn"
                                                        disabled={isLoading || isSaving}
                                                        className="btn btn-primary full-width" type="submit">
                                                        Sign Up
                                                    </button>
                                                </FormGroup>
                                                <Link id="existing-member-btn" to={`/login${redirect}`}
                                                      onClick={this.showForgotPassword}>Already a member?</Link>

                                            </fieldset>
                                            {error &&
                                            <FormGroup>
                                                <div id="error-alert" className="alert alert-danger">
                                                    Please check your details and try again
                                                </div>
                                            </FormGroup>
                                            }
                                        </form>
                                    </div>
                                </div>
                            )}
                        </Hero>
                        <div className="tech">
                            <div className="container">
                                <div className="text-center col-md-6 push-lg-3">
                                    <h2>We currently support these popular languages</h2>
                                    <div className="row">
                                        <div className="col-md-3 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-java-client">
                                                <img src="./images/bt-java.png" alt="Java"/>
                                            </a>
                                        </div>
                                        <div className="col-md-3 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-js-client">
                                                <img src="./images/bt-javascript.png" alt="Javascript"/>
                                            </a>
                                        </div>
                                        <div className="col-md-3 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-js-client">
                                                <img src="./images/bt-react.png" alt="React JS"/>
                                            </a>
                                        </div>
                                        <div className="col-md-3 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-nodejs-client">
                                                <img src="./images/bt-nodejs.png" alt="Node.js"/>
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-small margin-top no-mb">Don't worry if you don't see your preferred tech, we'll be adding support for more clients as we grow but please <a href="mailto:bullettrain@solidstategroup.com">get in touch</a> and let us know what you'd like to see.</p>
                                </div>
                            </div>
                        </div>
                        {/*<div className="featured-container">*/}
                            {/*<div className="col-md-1">*/}
                                {/*<ul className="step-list vertical">*/}
                                    {/*<li><span>1</span></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                            {/*<div className={"text-center col-md-6 push-lg-3"}>*/}
                                {/*<h2>How Bullet Train works</h2>*/}
                            {/*</div>*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<div className="round-container">*/}
                                        {/*<ion className="homepage-icon icon ion-ios-rocket"/>*/}
                                    {/*</div>*/}
                                    {/*<p>Create a project</p>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<ion className="homepage-icon icon ion-ios-rocket"/>*/}
                                    {/*<p>Add your features, whether they are enabled and what values they have for your development and production evnironments</p>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<ion className="homepage-icon icon ion-ios-rocket"/>*/}
                                    {/*<p>Integrate an sdk into your project</p>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-3">*/}
                                    {/*<ion className="homepage-icon icon ion-ios-rocket"/>*/}
                                    {/*<p>Identify users when they login to your app and configure what they see from your dashboard</p>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="feature-container">
                            <div className={"text-center col-md-6 push-lg-3"}>
                                <h2>Release configurable features to segmented user groups</h2>
                                <p>With Bullet Train you can configure attributes of your features as well as turning them on or off for specific user groups.</p>
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
                                    <p>Change the behaviour, appearance and config of your app without publishing updates.</p>
                                </div>
                                <div className="col-md-4">
                                    <ion className="homepage-icon icon ion-ios-laptop"/>
                                    <h5>Access anywhere</h5>
                                    <p>Cross platform, use Bullet Train on web, mobile or server</p>
                                </div>
                            </div>
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
                        </div>
                    <footer className="homepage clearfix">
                        <div className="brand-footer float-left">
                            <img src="./images/icon.png" alt="Bullet Train" />
                        </div>
                        <ul className="float-right nav-list">
                            <li><a href="">Demo</a></li>
                            <li><a href="https://docs.bullet-train.io/">Docs</a></li>
                            <li><a href="mailto:bullettrain@solidstategroup.com">Support</a></li>
                        </ul>
                    </footer>
                    </div>
                )}
            </AccountProvider>
        );
    }
};
