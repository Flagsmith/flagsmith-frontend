import React from 'react';
import lazyframe from 'lazyframe';
import ForgotPasswordModal from '../ForgotPasswordModal';
import Hero from '../Hero';
import Footer from '../Footer';
import Popover from '../base/Popover';
import 'lazyframe/dist/lazyframe.css';
import PricingPanel from '../PricingPanel';
import { ButtonWhite } from '../base/forms/Button';

const HomePage = class extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    static displayName = 'HomePage';

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        lazyframe('.lazyframe');

        API.trackPage(Constants.pages.HOME);

        $(window).scroll(() => {
            const scroll = $(window).scrollTop();

            // >=, not <=
            if (scroll >= 75) {
                // clearHeader, not clearheader - caps H
                $('.navbar-homepage').addClass('dark-header');
            } else if (scroll <= 75) {
                $('.navbar-homepage').removeClass('dark-header');
            }
        });
    }

    showForgotPassword = (e) => {
        e.preventDefault();
        openModal('Forgot password', <ForgotPasswordModal onComplete={() => {
            toast('Forgot password submitted');
        }}
        />);
    }

    render = () => {
        const { email, password, organisation_name, first_name, last_name } = this.state;
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : '';
        const isInvite = document.location.href.indexOf('invite') != -1;
        const isLogin = document.location.href.indexOf('login') != -1;
        const { hasFeature, getValue } = this.props;

        return (
            <AccountProvider onLogout={this.onLogout} onLogin={this.onLogin}>
                {({ isLoading, isSaving, error }, { register }) => (
                    <div className="homepage">

                        <Hero redirect={redirect}/>

                        <div className="tech">
                            <div className="container">
                                <div className="text-center col-md-12 col-lg-8 push-lg-2">
                                    <h2>We currently support these popular languages</h2>
                                    <div className="row">
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-java-client">
                                                <img src="./images/tech-logos/java.png" alt="Java" title="Java"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-js-client">
                                                <img src="./images/tech-logos/javascript.png" alt="JavaScript" title="JavaScript"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-js-client">
                                                <img src="./images/tech-logos/react.png" alt="React JS" title="React JS"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-nodejs-client">
                                                <img src="./images/tech-logos/node.png" alt="Node.js" title="Node.js"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-python-client">
                                                <img
                                                  src="./images/tech-logos/python.png" className="img-fluid"
                                                  alt="Python" title="Python"
                                                />
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-ruby-client">
                                                <img src="./images/tech-logos/ruby.png" alt="Ruby" title="Ruby"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-dotnet-client">
                                                <img src="./images/tech-logos/dotnet.png" alt=".NET" title=".NET"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-java-client">
                                                <img src="./images/tech-logos/android2x.png" alt="android" title="android" />
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://github.com/SolidStateGroup/bullet-train-ios-client">
                                                <img src="./images/tech-logos/bt-IOS.png" alt="IOS" title="IOS" />
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-small margin-top no-mb">
                                        Don't worry if you don't see your
                                        preferred tech, we'll be adding support for more clients as we grow but
                                        please <a href="mailto:support@bullet-train.io">get in touch</a>
                                        {' '}
                                        and let
                                        us know what you'd like to see.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="container text-center">
                            <div className="video embed-responsive embed-responsive-16by9">
                                <div
                                  className="lazyframe embed-responsive-item"
                                  data-src="https://www.youtube.com/embed/GPkCLO0F-5g" data-vendor="youtube"
                                  data-apikey={Project.youtubeApi}
                                />
                            </div>
                        </div>

                        <div className="feature-container">
                            <div className="text-center col-md-12 col-lg-6 push-lg-3">
                                <h2>Release configurable features to segmented user groups</h2>
                                <p>
                                    With Bullet Train you can configure attributes of your features as well as turning
                                    them on or off for specific user groups.
                                </p>
                            </div>
                            <div className="homepage-features col-md-8 push-md-2 row mt-5">
                                <div className="col-md-3">
                                    <ion className="homepage-icon icon ion-ios-rocket"/>
                                    <h5>Feature Flags</h5>
                                    <p>Ship features remotely across multiple environments.</p>
                                </div>
                                <div className="col-md-3">
                                    <ion className="homepage-icon icon ion-ios-color-palette"/>
                                    <h5>Remote Config</h5>
                                    <p>
                                        Change the behaviour, appearance and config of your app here without needing to
                                        build.
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <ion className="homepage-icon icon ion-ios-laptop"/>
                                    <h5>Use anywhere</h5>
                                    <p>Integrate Bullet Train with your website, mobile apps or server</p>
                                </div>
                                <div className="col-md-3">
                                    <ion className="homepage-icon icon ion-ios-person"/>
                                    <h5>User Traits</h5>
                                    <p>Store traits against your users without modifying your back-end.</p>
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
                                {/* <hr/> */}
                                {/* {getValue("home_copy") && JSON.parse(getValue("home_copy")) */}
                                {/* .map(({title, content}) => ( */}
                                {/* <div className={"col-md-6 push-md-3 row mt-5"}> */}
                                {/* <div className={"text-center"}> */}
                                {/* <h2> */}
                                {/* {title} */}
                                {/* </h2> */}
                                {/* <div dangerouslySetInnerHTML={{__html: content}} */}
                                {/* className={"col-md-12"}/> */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* ))} */}
                            </div>
                        </div>

                        <div className="mobile-app tech">
                            <div className="container text-center">
                                <div className="col-md-6 offset-md-3 pb-3">
                                    <h2>Feature Flags on the go</h2>
                                    <p>
Now you can manage feature flags and remote config across web, mobile and server
                                        side applications with our Android and IOS apps.
                                    </p>
                                </div>
                                <a
                                  href="https://itunes.apple.com/us/app/bullet-train-feature-manager/id1460735497?ls=1&mt=8"
                                  target="__blank"
                                >
                                    <img
                                      width={160} className="img-fluid mr-5 app-store-badge"
                                      src="./images/app-store-icons/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                                      alt="download on the app store"
                                    />
                                </a>
                                <a
                                  href="https://play.google.com/store/apps/details?id=com.solidstategroup.bullettrain"
                                  target="__blank"
                                >
                                    <img
                                      width={180} className="img-fluid ml-5 play-badge"
                                      src="./images/app-store-icons/google-play-badge2x.png"
                                      alt="get it on google play"
                                    />
                                </a>
                                <div className="col-md-12">
                                    <img
                                      className="img-fluid pt-5" src="./images/mobile_1.png"
                                      alt="bullet train mobile"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sign-up" id="sign-up">
                            {isLogin ? (
                                <div className="card signup-form container animated fadeIn col-md-8 col-xl-8">
                                    <AccountProvider>
                                        {({ isLoading, isSaving, error }, { login }) => (
                                            <form
                                              id="form" name="form" onSubmit={(e) => {
                                                  Utils.preventDefault(e);
                                                  login({ email, password });
                                              }}
                                            >
                                                <h3 className="margin-bottom">User login</h3>
                                                {isInvite && <p>Login to accept your invite</p>}
                                                <fieldset id="details" className="col-lg-6 offset-lg-3">
                                                    {error && error.email ? (
                                                        <span
                                                          id="email-error"
                                                          className="text-danger"
                                                        >
                                                            {error.email}
                                                        </span>
                                                    ) : null}
                                                    <Input
                                                      inputProps={{
                                                          name: 'email',
                                                          className: 'full-width',
                                                          error: error && error.email,
                                                      }}
                                                      onChange={(e) => {
                                                          this.setState({ email: Utils.safeParseEventValue(e) });
                                                      }}
                                                      className="input-default full-width"
                                                      placeholder="Email"
                                                      type="text"
                                                      name="email" id="email"
                                                    />
                                                    {error && error.password1 ? (
                                                        <span
                                                          id="password-error"
                                                          className="text-danger"
                                                        >
                                                            {error.password1}
                                                        </span>
                                                    ) : null}
                                                    <Input
                                                      inputProps={{
                                                          name: 'password',
                                                          className: 'full-width',
                                                          error: error && error.password1,
                                                      }}
                                                      onChange={(e) => {
                                                          this.setState({ password: Utils.safeParseEventValue(e) });
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
                                                          className="btn white full-width" type="submit"
                                                        >
                                                            Login
                                                        </button>
                                                        <div>
                                                                <Link to={`/${redirect}`} className="float-left">
Not got
                                                                    an account?
                                                                </Link>
                                                                <Link
                                                                  className="float-right"
                                                                  to={`/password-recovery${redirect}`}
                                                                  onClick={this.showForgotPassword}
                                                                >
                                                                    Forgot
                                                                    password?
                                                                </Link>
                                                            </div>
                                                    </div>
                                                </fieldset>
                                                {error && (
                                                    <div id="error-alert" className="alert alert-danger">
                                                        Please check your details and try again
                                                    </div>
                                                )}

                                            </form>
                                        )}
                                    </AccountProvider>
                                </div>
                            ) : (
                                <div>
                                    <div className="card signup-form container animated fadeIn col-md-8 col-xl-8">
                                        <form
                                          id="form" name="form" onSubmit={(e) => {
                                              Utils.preventDefault(e);
                                              const isInvite = document.location.href.indexOf('invite') != -1;
                                              register({ email, password, organisation_name, first_name, last_name },
                                                  isInvite);
                                          }}
                                        >

                                            <div className="form-intro text-center">
                                                <h3>It's free to get started.</h3>
                                                <p className="">Sign up for a 30 day free trial</p>
                                            </div>
                                            {error
                                            && (
                                                <FormGroup className="col-lg-6 offset-lg-3">
                                                    <div id="error-alert" className="alert alert-danger">
                                                        Please check your details and try again
                                                    </div>
                                                </FormGroup>
                                            )
                                            }
                                            {isInvite && <p>Sign up to accept your invite</p>}
                                            <fieldset id="details" className="col-lg-6 offset-lg-3">
                                                <Input
                                                  data-test="firstName"
                                                  inputProps={{
                                                      name: 'firstName',
                                                      className: 'full-width',
                                                      error: error && error.first_name,
                                                  }}
                                                  onChange={(e) => {
                                                      this.setState({ first_name: Utils.safeParseEventValue(e) });
                                                  }}
                                                  className="input-default full-width"
                                                  placeholder="First name"
                                                  type="text"
                                                  name="firstName" id="firstName"
                                                />
                                                <Input
                                                  data-test="lastName"
                                                  inputProps={{
                                                      name: 'lastName',
                                                      className: 'full-width',
                                                      error: error && error.last_name,
                                                  }}
                                                  placeholder="Last Name"
                                                  onChange={(e) => {
                                                      this.setState({ last_name: Utils.safeParseEventValue(e) });
                                                  }}
                                                  className="input-default full-width"
                                                  type="text"
                                                  name="lastName" id="lastName"
                                                />
                                                {!isInvite && (
                                                    <Input
                                                      data-test="companyName"
                                                      inputProps={{
                                                          name: 'companyName',
                                                          className: 'full-width',
                                                      }}
                                                      placeholder="Organisation name"

                                                      onChange={(e) => {
                                                          this.setState({ organisation_name: Utils.safeParseEventValue(e) });
                                                      }}
                                                      className="input-default full-width"
                                                      type="text"
                                                      name="companyName" id="organisation"
                                                    />
                                                )}

                                                {error && error.email ? (
                                                    <span
                                                      id="email-error"
                                                      className="text-danger"
                                                    >
                                                        {error.email}
                                                    </span>
                                                ) : null}
                                                <Input
                                                  data-test="email"
                                                  inputProps={{
                                                      name: 'email',
                                                      className: 'full-width',
                                                      error: error && error.email,
                                                  }}
                                                  placeholder="Email Address"
                                                  onChange={(e) => {
                                                      this.setState({ email: Utils.safeParseEventValue(e) });
                                                  }}
                                                  className="input-default full-width"
                                                  type="text"
                                                  name="email" id="email"
                                                />

                                                {error && error.password1 ? (
                                                    <span
                                                      id="password-error"
                                                      className="text-danger"
                                                    >
                                                        {error.password1}
                                                    </span>
                                                ) : null}
                                                <Input
                                                  data-test="password"
                                                  inputProps={{
                                                      name: 'password',
                                                      className: 'full-width',
                                                      error: error && error.password1,
                                                  }}
                                                  placeholder="Password"
                                                  onChange={(e) => {
                                                      this.setState({ password: Utils.safeParseEventValue(e) });
                                                  }}
                                                  className="input-default full-width"
                                                  type="password"
                                                  name="password"
                                                  id="password"
                                                />
                                                <div className="form-cta margin-top">

                                                    <ButtonWhite
                                                      data-test="signup-btn"
                                                      name="signup-btn"
                                                      disabled={isLoading || isSaving}
                                                      className="full-width"
                                                      type="submit"
                                                    >
                                                        Sign Up
                                                    </ButtonWhite>

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

                        <Footer className="homepage"/>
                    </div>
                )}
            </AccountProvider>
        );
    }
};

module.exports = ConfigProvider(HomePage);
