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
        router: propTypes.object.isRequired,
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

        if (document.location.href.indexOf('invite') != -1) {
            Utils.scrollToSignUp();
        }
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
        const redirect = Utils.fromParam().redirect ? `?redirect=${Utils.fromParam().redirect}` : '';
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
                                            <a href="https://docs.bullet-train.io/clients/java/">
                                                <img src="./images/tech-logos/java.png" alt="Java" title="Java"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/javascript/">
                                                <img src="./images/tech-logos/javascript.png" alt="JavaScript" title="JavaScript"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/javascript/">
                                                <img src="./images/tech-logos/react.png" alt="React JS" title="React JS"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/node/">
                                                <img src="./images/tech-logos/node.png" alt="Node.js" title="Node.js"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/python/">
                                                <img
                                                  src="./images/tech-logos/python.png" className="img-fluid" alt="Python"
                                                  title="Python"
                                                />
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/ruby/">
                                                <img src="./images/tech-logos/ruby.png" alt="Ruby" title="Ruby"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/dotnet/">
                                                <img src="./images/tech-logos/dotnet.png" alt=".NET" title=".NET"/>
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/java/">
                                                <img src="./images/tech-logos/android2x.png" alt="android" title="android" />
                                            </a>
                                        </div>
                                        <div className="col-md-1 col-xs-6">
                                            <a href="https://docs.bullet-train.io/clients/ios/">
                                                <img src="./images/tech-logos/bt-IOS.png" alt="IOS" title="IOS" />
                                            </a>
                                        </div>
                                    </div>
                                    <p className="text-small margin-top no-mb">
                                        Don't worry if you don't see your
                                        preferred tech, we'll be adding support for more clients as we grow but
                                        please
                                        {' '}
                                        <a href="mailto:support@bullet-train.io">get in touch</a>
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
                            <div className="text-center text-center col-lg-4 offset-lg-4">
                                <h2>Fully Featured Platform</h2>
                            </div>
                            <div className="container">
                                <div className="mt-5">
                                    <div className="mb-3 flex-row">
                                        <div className="col-md-4">
                                            <div className="card card--feature">
                                                <span className="card__icon ion-ios-switch mb-3"/>
                                                <h5 className="card__title">Feature Flag Management</h5>
                                                <p className="card__paragraph-text">Ship features remotely across
                                                    multiple environments. Deliver true Continuous Integration.
                                                </p>
                                                <a
                                                  className="card__link"
                                                  href="https://docs.bullet-train.io/managing-features/"
                                                >Feature flags<span
                                                  className="pl-2 ion-md-arrow-dropright"
                                                />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card card--feature">
                                                <span className="card__icon ion-ios-options mb-3"/>
                                                <h5 className="card__title">Customise Features</h5>
                                                <p className="card__paragraph-text"> Change the behaviour,
                                                    appearance and configuration of your app without needing to
                                                    deploy.
                                                </p>
                                                <a
                                                  className="card__link"
                                                  href="https://docs.bullet-train.io/managing-features/"
                                                >Remote config <span
                                                  className="pl-2 ion-md-arrow-dropright"
                                                />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card card--feature">
                                                <span className="card__icon ion-ios-person mb-3"/>
                                                <h5 className="card__title">User Traits</h5>
                                                <p className="card__paragraph-text">Store traits against your users
                                                    without modifying your back-end and target features specifically for them.
                                                </p>
                                                <a
                                                  className="card__link"
                                                  href="https://docs.bullet-train.io/managing-identities/#identity-traits"
                                                >User Traits <span
                                                  className="pl-2 ion-md-arrow-dropright"
                                                />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="col-md-4">
                                            <div className="card card--feature">
                                                <span className="card__icon ion-md-contacts mb-3"/>
                                                <h5 className="card__title">Create User Segements</h5>
                                                <p className="card__paragraph-text">Create detailed user segments
                                                    based on their traits, then target features based on the segment.
                                                </p>
                                                <a
                                                  className="card__link"
                                                  href="https://docs.bullet-train.io/managing-segments/"
                                                >User Segments <span
                                                  className="pl-2 ion-md-arrow-dropright"
                                                />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card card--feature">
                                                <span className="card__icon ion-ios-browsers mb-3"/>
                                                <h5 className="card__title">Staged Feature Rollouts</h5>
                                                <p className="card__paragraph-text">Deploy features to 1% of your user base.
                                                All good? Roll out to everybody.
                                                </p>
                                                <a
                                                  className="card__link"
                                                  href="https://docs.bullet-train.io/staged-feature-rollouts/"
                                                >A/B Deployments<span
                                                  className="pl-2 ion-md-arrow-dropright"
                                                />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card card--feature">
                                                <span className="card__icon ion-md-done-all mb-3"/>
                                                <h5 className="card__title">Track Changes</h5>
                                                <p className="card__paragraph-text">Audit changes &amp;
                                                    rollback any mistakes or issues.
                                                </p>
                                                <a
                                                  className="card__link"
                                                  href="https://docs.bullet-train.io/audit-logs/"
                                                >Feature Audit<span
                                                  className="pl-2 ion-md-arrow-dropright"
                                                />
                                                </a>
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
                                        {({ isLoading, isSaving, error }, { login }) => (
                                            <form
                                              id="form" name="form" onSubmit={(e) => {
                                                  Utils.preventDefault(e);
                                                  login({ email, password });
                                              }}
                                            >
                                                <div className="form-intro text-center">
                                                    <h3 className="mb-4">User login</h3>
                                                </div>
                                                {isInvite
                                                && (
                                                <div className="notification flex-row">
                                                    <span
                                                      className="notification__icon ion-md-information-circle-outline mb-3"
                                                    />
                                                    <p className="notification__text pl-3">Login to accept your invite</p>
                                                </div>
                                                )
                                                }
                                                <fieldset id="details" className="col-lg-6 offset-lg-3">
                                                    {error && error.email ? (
                                                        <span
                                                          id="email-error"
                                                          className="text-danger"
                                                        >
                                                            {error.email}
                                                        </span>
                                                    ) : null}
                                                    <InputGroup
                                                      title="Email address"
                                                      data-test="email"
                                                      inputProps={{
                                                          name: 'email',
                                                          className: 'full-width',
                                                          error: error && error.email,
                                                      }}
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
                                                    <InputGroup
                                                      title="Password"
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
                                                      data-test="password"
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
                                                {!isInvite && <p className="text-white">We have a 100% free for life plan for smaller projects. <a href="/pricing">Check out our Pricing</a></p>}
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
                                            {isInvite
                                                && (
                                                <div className="notification flex-row">
                                                    <span
                                                      className="notification__icon ion-md-information-circle-outline mb-3"
                                                    />
                                                    <p className="notification__text pl-3">Sign up to accept your
                                                        invite
                                                    </p>
                                                </div>
                                                )
                                            }
                                            <fieldset id="details" className="col-lg-6 offset-lg-3">
                                                <InputGroup
                                                  title="First Name"
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
                                                  type="text"
                                                  name="firstName" id="firstName"
                                                />
                                                <InputGroup
                                                  title="Last Name"
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
                                                    <InputGroup
                                                      title="Organisation name"
                                                      data-test="companyName"
                                                      inputProps={{
                                                          name: 'companyName',
                                                          className: 'full-width',
                                                      }}
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
                                                <InputGroup
                                                  title="Email address"
                                                  data-test="email"
                                                  inputProps={{
                                                      name: 'email',
                                                      className: 'full-width',
                                                      error: error && error.email,
                                                  }}
                                                  onChange={(e) => {
                                                      this.setState({ email: Utils.safeParseEventValue(e) });
                                                  }}
                                                  className="input-default full-width"
                                                  type="text"
                                                  name="email"
                                                  id="email"
                                                />

                                                {error && error.password1 ? (
                                                    <span
                                                      id="password-error"
                                                      className="text-danger"
                                                    >
                                                        {error.password1}
                                                    </span>
                                                ) : null}
                                                <InputGroup
                                                  title="Password"
                                                  data-test="password"
                                                  inputProps={{
                                                      name: 'password',
                                                      className: 'full-width',
                                                      error: error && error.password1,
                                                  }}
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
