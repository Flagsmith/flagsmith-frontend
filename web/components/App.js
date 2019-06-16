import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Aside from './Aside';
import Popover from './base/Popover';
import Feedback from './modals/Feedback';
import PaymentModal from './modals/Payment';
import AlertBar from './AlertBar';

const App = class extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = {}

    constructor(props, context) {
        super(props, context);
        AppActions.getConfig();
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    };

    onLogin = () => {
        const { redirect } = this.props.location.query;


        if (!AccountStore.getOrganisation() && document.location.href.indexOf('invite') == -1) { // If user has no organisation redirect to /create
            this.context.router.replace('/create');
            return;
        }

        // Redirect on login
        if (this.props.location.pathname == '/' || this.props.location.pathname == '/login' || this.props.location.pathname == '/demo' || this.props.location.pathname == '/signup') {
            if (redirect) {
                this.context.router.replace(redirect);
            } else {
                AsyncStorage.getItem('lastEnv')
                    .then((res) => {
                        if (res) {
                            const lastEnv = JSON.parse(res);
                            const lastOrg = _.find(AccountStore.getUser().organisations, { id: lastEnv.orgId });
                            if (!lastOrg) {
                                this.context.router.replace('/projects');
                                return;
                            }

                            const org = AccountStore.getOrganisation();
                            if (!org || org.id !== lastOrg.id) {
                                AppActions.selectOrganisation(lastOrg.id);
                                AppActions.getOrganisation(lastOrg.id);
                            }

                            this.context.router.replace(`/project/${lastEnv.projectId}/environment/${lastEnv.environmentId}/features`);
                            return;
                        }

                        this.context.router.replace('/projects');
                    });
            }
        }
    };

    handleScroll = () => {
        if (this.scrollPos < 768 && $(document).scrollTop() >= 768) {
            this.setState({ myClassName: 'scrolled' });
        } else if (this.scrollPos >= 768 && $(document).scrollTop() < 768) {
            this.setState({ myClassName: '' });
        }
        this.scrollPos = $(document).scrollTop();
    }

    onLogout = () => {
        this.context.router.replace('/');
    };

    feedback = () => {
        openModal('Feedback', <Feedback />);
    }

    render() {
        const { hasFeature, getValue, params, location } = this.props;
        const { projectId, environmentId } = params;
        const pageHasAside = environmentId;
        const pathname = location.pathname;
        const isHomepage = pathname == '/' || pathname == '/login';
        const isLegal = pathname == '/legal/tos' || pathname == '/legal/sla' || pathname == '/legal/privacy-policy';
        const isDark = /* pathname.indexOf('/blog') !== -1 */ true;

        const redirect = location.query.redirect ? `?redirect=${location.query.redirect}` : '';
        return (
            <div>
                <AccountProvider onNoUser={this.onNoUser} onLogout={this.onLogout} onLogin={this.onLogin}>
                    {({ isLoading, user, organisation }) => {
                        const loggedInUser = organisation && !AccountStore.isDemo;
                        const hasPaid = loggedInUser && organisation.paid_subscription; // Organisation has paid via chargebee
                        const freeTrialDaysRemaining = loggedInUser && Utils.freeTrialDaysRemaining(organisation.subscription_date);
                        const hasFreeTrial = loggedInUser && freeTrialDaysRemaining > 0; // Organisation is still within their free trial
                        const hasFreeUse = loggedInUser && organisation.free_to_use_subscription;
                        /* Organisation was created before payment options came in and therefore they have free usage (for now) */

                        const inTrial = !hasPaid && loggedInUser && hasFreeTrial && !hasFreeUse;
                        const expiredTrial = !hasPaid && loggedInUser && !hasFreeTrial && !hasFreeUse;
                        const freeTier = !hasPaid && loggedInUser && hasFreeUse;

                        return (
                            <div>
                                {inTrial && (
                                    <AlertBar>
                                        Your organisation has
                                        {' '}
                                        {freeTrialDaysRemaining}
                                        {' '}
days remaining on it's free
                                        trial.
                                    </AlertBar>
                                )}

                                {expiredTrial && (
                                    <AlertBar>
                                        Your trial period has expired. Click here to view payment plans.
                                    </AlertBar>
                                )}

                                {freeTier && (
                                    <AlertBar>
                                        <div>
                                            Your organisation is using Bullet Train for
                                            free.
                                            {' '}
                                            {pathname.indexOf('organisation-settings') === -1 && this.props.params.projectId && this.props.params.environmentId ? (
                                                <span>
Click
                                                    <Link
                                                      id="organisation-settings-link"
                                                      className="bold"
                                                      activeClassName="active"
                                                      to={`/project/${this.props.params.projectId}/environment/${this.props.params.environmentId}/organisation-settings`}
                                                    >
                                            here
                                                    </Link>
                                                    {' '}
for further information on
                                                    {hasFeature('free_tier') ? 'upgrading ' : 'migrating '}
                                                to a paid plan.
                                                </span>
                                            ) : null}
                                        </div>
                                    </AlertBar>
                                )}

                                {AccountStore.isDemo && (
                                    <AlertBar className="pulse">
                                        <div>
                                            You are using a demo account. Finding this useful?
                                            {' '}
                                            <Link onClick={() => AppActions.setUser(null)} to="/">
Click here to Sign
                                                up
                                            </Link>
                                        </div>
                                    </AlertBar>
                                )}
                                <div className={pageHasAside && 'aside-body'}>

                                    <nav className={isHomepage && 'show navbar navbar__master-brand'}>
                                        <div className="navbar-left">
                                            <div className="navbar-nav">

                                                <a
                                                  href="https://labs.solidstategroup.com/" target="__blank"
                                                  className="nav-item nav-item-brand nav-link"
                                                >
                                                    <div className="nav-item-brand">
                                                        <img
                                                          style={{ width: 250 }}
                                                          src="/images/products-nav/labs-logo-dark.svg" alt="Javascript feature flags"
                                                        />
                                                    </div>
                                                </a>

                                            </div>
                                        </div>
                                        <div className="navbar-right">
                                            <Popover
                                              style={{ padding: 10 }} className="popover-right"
                                              renderTitle={(toggle, isActive) => (
                                                  <div className="products-button" onClick={toggle}>
Products
                                                      <ion
                                                        className={isActive ? 'ion-ios-arrow-dropup' : 'ion-ios-arrow-dropdown'}
                                                      />
                                                  </div>
                                              )}
                                            >
                                                {toggle => (
                                                    <div>
                                                        <a
                                                          href="https://bullet-train.io/" target="__blank"
                                                          className="product-item"
                                                        >
                                                            <img src="/images/products-nav/bullet-train-logo-mark.svg" alt="Javascript feature flags"/>
                                                            <h5>Bullet Train</h5>
                                                            <small>Release features with confidence</small>
                                                        </a>
                                                        <a
                                                          href="https://formlyapp.com/" target="__blank"
                                                          className="product-item"
                                                        >
                                                            <img
                                                              src="/images/products-nav/formly-logo-mark-colour.svg" alt="Javascript feature flags"
                                                            />
                                                            <h5>Formly</h5>
                                                            <small>Contact Forms, Simplified</small>
                                                        </a>
                                                        <a
                                                          href="https://uptimely.app/" target="__blank"
                                                          className="product-item"
                                                        >
                                                            <img
                                                              src="/images/products-nav/uptimely-logo-mark-colour-filled.svg" alt="Javascript feature flags"
                                                            />
                                                            <h5>Uptimely</h5>
                                                            <small>Website Monitoring. Sorted.</small>
                                                        </a>
                                                    </div>
                                                )}
                                            </Popover>
                                        </div>
                                    </nav>


                                    <nav
                                      className={`navbar navbar-fixed-top ${pageHasAside ? ' navbar-aside' : ''}${isHomepage ? ' navbar-homepage ' : ''}${isLegal ? 'navbar-aside dark-header ' : ''}${isDark ? ' dark-header ' : ''}${this.state.myClassName ? this.state.myClassName : ''}`}
                                    >

                                        <div className="navbar-left">
                                            <div className="navbar-nav">
                                                {!projectId && (
                                                    <Link
                                                      to={user ? '/projects' : '/'}
                                                      className="nav-item nav-item-brand nav-link"
                                                    >
                                                        {isLegal ? null : (
                                                            <Row>
                                                                {isHomepage || isDark ? (
                                                                    <img
                                                                      title="Bullet Train" height={24}
                                                                      src="/images/bullet-train-1.svg"
                                                                      className="brand" alt="Javascript feature flags"
                                                                    />)
                                                                    : (
                                                                        <img
                                                                          title="Bullet Train" height={24}
                                                                          src="/images/bullet-train-black.svg"
                                                                          className="brand" alt="Javascript feature flags"
                                                                        />
                                                                    ) }
                                                            </Row>
                                                        )}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                        <div className="navbar-right">
                                            {user ? (
                                                <div className="flex-column org-nav">
                                                    <Popover
                                                      className="popover-right"
                                                      renderTitle={toggle => (
                                                          <a id="org-menu" onClick={toggle}>
                                                              {organisation ? organisation.name : ''}
                                                              <div
                                                                className="flex-column ion ion-ios-arrow-down"
                                                              />
                                                          </a>
                                                      )}
                                                    >
                                                        {toggle => (
                                                            <div>

                                                                {organisation && (
                                                                    <OrganisationSelect
                                                                      clearableValue={false}
                                                                      onChange={(organisation) => {
                                                                          toggle();
                                                                          AppActions.selectOrganisation(organisation.id);
                                                                          AppActions.getOrganisation(organisation.id);
                                                                          this.context.router.push('/projects');
                                                                      }}
                                                                    />
                                                                )}
                                                                <div>
                                                                    <Link
                                                                      id="create-org-link" onClick={toggle}
                                                                      to="/create"
                                                                    >
                                                                        Create Organisation
                                                                    </Link>
                                                                </div>

                                                                <a
                                                                  id="logout-link" href="#"
                                                                  onClick={() => AppActions.setUser(null)}
                                                                  to="exampleone"
                                                                >
Logout
                                                                </a>
                                                            </div>
                                                        )}
                                                    </Popover>
                                                </div>
                                            ) : (
                                                <div>

                                                        <Link className="float-right" to={`/login${redirect}`} onClick={Utils.scrollToSignUp}>
                                                            <Button className="btn-primary">Login</Button>
                                                        </Link>
                                                    <ul className="nav-list list-unstyled float-right">
                                                        <li><Link to="/demo">Demo</Link></li>
                                                        <li>
                                                            <a
                                                              target="_blank"
                                                              href="https://docs.bullet-train.io/"
                                                            >
Docs
                                                            </a>
                                                        </li>
                                                        <li><Link to="/pricing">Pricing</Link></li>
                                                        <li><Link to="/open-source">Open Source</Link></li>
                                                        <li><Link to="/features">Features</Link></li>
                                                    </ul>
                                                </div>
                                            )}

                                        </div>
                                    </nav>
                                    {pageHasAside && (
                                        <Aside
                                          className={`${AccountStore.isDemo ? 'demo' : ''} ${AccountStore.isDemo || (hasFreeTrial && !hasPaid) || (hasFreeUse && !hasPaid) || !hasPaid ? 'footer' : ''}`}
                                          projectId={this.props.params.projectId}
                                          environmentId={this.props.params.environmentId}
                                        />
                                    )}
                                    {this.props.children}
                                </div>
                            </div>
                        );
                    }}
                </AccountProvider>
            </div>
        );
    }
};

App.propTypes = {
    location: RequiredObject,
    history: RequiredObject,
};

export default ConfigProvider(hot(module)(App));
