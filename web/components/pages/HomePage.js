import React from 'react';
import lazyframe from 'lazyframe';
import ForgotPasswordModal from '../ForgotPasswordModal';
import Hero from '../Hero';
import Footer from '../Footer';
import Popover from '../base/Popover';
import 'lazyframe/dist/lazyframe.css';
import PricingPanel from '../PricingPanel';
import { ButtonWhite } from '../base/forms/Button';
import CreateFlagModal from '../modals/CreateFlag';
import { Google } from '../../project/auth';

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

        if (document.location.href.includes('oauth')) {
            const parts = location.href.split('oauth/');
            const params = parts[1];
            if (params && params.includes('google')) {
                const access_token = Utils.fromParam().code;
                AppActions.oauthLogin('google', {
                    access_token,
                });
            } else if (params && params.includes('github')) {
                const access_token = Utils.fromParam().code;
                AppActions.oauthLogin('github', {
                    access_token,
                });
            }
        }
        API.trackPage(Constants.pages.HOME);

        if (document.location.href.indexOf('invite') != -1) {
            Utils.scrollToSignUp();
        }
    }

    showForgotPassword = (e) => {
        e.preventDefault();
        openModal('Forgot password', <ForgotPasswordModal onComplete={() => {
            toast('Please check your email to reset your password.');
        }}
        />, null, { className: 'alert fade expand' });
    }

    render = () => {
        const { email, password, organisation_name, first_name, last_name } = this.state;
        const redirect = Utils.fromParam().redirect ? `?redirect=${Utils.fromParam().redirect}` : '';
        const isInvite = document.location.href.indexOf('invite') != -1;
        const isSignup = (isInvite && document.location.href.indexOf('login')===-1) || document.location.href.indexOf('signup') != -1;

        console.log(this.props);
        const oauths = [];
        if (this.props.getValue('oauth_github')) {
            oauths.push((
                <a key="github" className="oauth oauth-github" href={JSON.parse(this.props.getValue('oauth_github')).url}>
                    <img src="/images/github.svg"/> GitHub
                </a>
            ));
        }
        if (this.props.getValue('oauth_google')) {
            const { apiKey, clientId } = JSON.parse(this.props.getValue('oauth_google'));
            Google.init(apiKey, clientId);
            oauths.push((
                <a
                  key="github" className="oauth oauth-google" onClick={() => {
                      Google.login().then((res) => {
                          if (res) {
                              document.location = `${document.location.origin}/oauth/google?code=${res}`;
                          }
                      });
                  }}
                >
                    <img src="/images/google.svg"/> Google
                </a>
            ));
        }
        if (this.props.getValue('oauth_microsoft')) {
            oauths.push((
                <a
                  key="microsoft" className="oauth oauth-microsoft"
                  ref={JSON.parse(this.props.getValue('oauth_microsoft')).url}
                >
                    <img src="/images/microsoft.svg"/> Microsoft
                </a>
            ));
        }
        if (this.props.hasFeature('oauth-google')) {
            oauths.push((
                <a key="google" className="oauth oauth-google" href={Project.oauth.google.url}>
                    <img src="/images/google.svg"/>
                </a>
            ));
        }
        return (
            <AccountProvider onLogout={this.onLogout} onLogin={this.onLogin}>
                {({ isLoading, isSaving, error }, { register }) => (
                    <div className="homepage">
                        <div className="sign-up" id="sign-up">
                            {!isSignup ? (
                                <div className="card signup-form container">
                                    <AccountProvider>
                                        {({ isLoading, isSaving, error }, { login }) => (
                                            <form
                                              id="form" name="form" onSubmit={(e) => {
                                                  Utils.preventDefault(e);
                                                  login({ email, password });
                                              }}
                                            >
                                                <div className="form-intro text-center">
                                                    <h3 className="mb-4">Sign in</h3>
                                                    {!!oauths.length && (
                                                    <p>
                                                          Log in to your account with one of these services.
                                                    </p>
                                                    )}

                                                </div>

                                                {!!oauths.length && (
                                                <Row style={{ justifyContent: 'center' }}>
                                                    {oauths}
                                                </Row>
                                                )}

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
                                                <fieldset id="details">
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
                                                      type="password"
                                                      name="password"
                                                      data-test="password"
                                                      id="password"
                                                    />
                                                    <div className="form-cta">
                                                        <button
                                                          id="login-btn"
                                                          disabled={isLoading || isSaving}
                                                          className="btn full-width" type="submit"
                                                        >
                                                            Login
                                                        </button>
                                                        <div>
                                                            <Link to={`/signup${redirect}`} className="float-left">
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
                                                    <div id="error-alert" className="alert mt-3 alert-danger">
                                                        Please check your details and try again
                                                    </div>
                                                )}

                                            </form>
                                        )}
                                    </AccountProvider>
                                </div>
                            ) : (
                                <div>
                                    <div className="card signup-form container">
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
                                                {!isInvite && (
                                                <p>We have a 100% free for life plan for smaller projects. <a target="_blank" href="https://bullet-train.io/pricing">
                                                    <br/>Check out our Pricing
                                                </a>
                                                </p>
                                                )}
                                            </div>
                                            {error
                                            && (
                                                <FormGroup>
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
                                            <fieldset id="details" className="">
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
                                                <div className="form-cta">
                                                    <Button
                                                      data-test="signup-btn"
                                                      name="signup-btn"
                                                      disabled={isLoading || isSaving}
                                                      className="full-width"
                                                      type="submit"
                                                    >
                                                        Sign Up
                                                    </Button>
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
                    </div>
                )}
            </AccountProvider>
        );
    }
};

module.exports = ConfigProvider(HomePage);
