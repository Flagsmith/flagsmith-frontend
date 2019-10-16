import React, { Component } from 'react';
import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import Aside from './Aside';
import Popover from './base/Popover';
import Feedback from './modals/Feedback';
import PaymentModal from './modals/Payment';
import AlertBar from './AlertBar';

const App = class extends Component {
    static propTypes = {
        children: propTypes.element.isRequired,
    };

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    state = {
        asideIsVisible: !isMobile,
    }

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            if (isMobile) {
                this.setState({ asideIsVisible: false });
            }
            this.hideMobileNav();
        }
    }

    hideMobileNav = () => {
        if (this.mobileNav && this.mobileNav.isActive()) {
            this.mobileNav.toggle();
        }
    }

    toggleAside = () => {
        this.setState({ asideIsVisible: !this.state.asideIsVisible });
    }

    onLogin = () => {
        const { redirect } = Utils.fromParam();


        if (!AccountStore.getOrganisation() && document.location.href.indexOf('invite') == -1) { // If user has no organisation redirect to /create
            this.context.router.history.replace('/create');
            return;
        }

        // Redirect on login
        if (this.props.location.pathname == '/' || this.props.location.pathname == '/login' || this.props.location.pathname == '/demo' || this.props.location.pathname == '/signup') {
            if (redirect) {
                this.context.router.history.replace(redirect);
            } else {
                AsyncStorage.getItem('lastEnv')
                    .then((res) => {
                        if (res) {
                            const lastEnv = JSON.parse(res);
                            const lastOrg = _.find(AccountStore.getUser().organisations, { id: lastEnv.orgId });
                            if (!lastOrg) {
                                this.context.router.history.replace('/projects');
                                return;
                            }

                            const org = AccountStore.getOrganisation();
                            if (!org || org.id !== lastOrg.id) {
                                AppActions.selectOrganisation(lastOrg.id);
                                AppActions.getOrganisation(lastOrg.id);
                            }

                            this.context.router.history.replace(`/project/${lastEnv.projectId}/environment/${lastEnv.environmentId}/features`);
                            return;
                        }

                        this.context.router.history.replace('/projects');
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
        this.context.router.history.replace('/');
    };

    feedback = () => {
        openModal('Feedback', <Feedback />);
    }

    render() {
        console.log(this.context.router);
        const { hasFeature, getValue, match: { params }, location } = this.props;
        const pathname = location.pathname;
        const { asideIsVisible } = this.state;
        console.log(this.props);
        const match = matchPath(pathname, {
            path: '/project/:projectId/environment/:environmentId',
            exact: false,
            strict: false,
        });
        const projectId = _.get(match, 'params.projectId');
        const environmentId = _.get(match, 'params.environmentId');
        const pageHasAside = environmentId;
        const isHomepage = pathname == '/' || pathname == '/login';
        const isLegal = pathname == '/legal/tos' || pathname == '/legal/sla' || pathname == '/legal/privacy-policy';
        const isDark = /* pathname.indexOf('/blog') !== -1 */ true;

        const redirect = Utils.fromParam().redirect ? `?redirect=${Utils.fromParam().redirect}` : '';
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
                                            {pathname.indexOf('organisation-settings') === -1 && projectId && environmentId ? (
                                                <span>
                                                    {'Click '}
                                                    <Link
                                                      id="organisation-settings-link"
                                                      className="bold"
                                                      activeClassName="active"
                                                      to={`/project/${projectId}/environment/${environmentId}/organisation-settings`}
                                                    >
                                            here
                                                    </Link>
                                                    {' '}
for further information on
                                                    {hasFeature('free_tier') ? ' upgrading ' : ' migrating '}
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
                                <div className={pageHasAside ? `aside-body${isMobile && !asideIsVisible ? '-full-width' : ''}` : ''}>

                                    {isHomepage && (
                                    <nav className={isHomepage && 'show navbar navbar__master-brand'}>
                                        <div className="navbar-left">
                                            <div className="navbar-nav">

                                                <a
                                                  href="https://labs.solidstategroup.com/" target="__blank"
                                                  className="nav-item nav-item-brand nav-link"
                                                >
                                                    <div className="nav-item-brand">
                                                        <img
                                                          src="/images/products-nav/labs-logo-dark.svg" alt="ssg-labs-logo"
                                                          className="brand"
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
                                                      <span
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
                                                            <img src="/images/products-nav/bullet-train-logo-mark.svg" alt="Bullet Train logo"/>
                                                            <h5>Bullet Train</h5>
                                                            <small>Release features with confidence</small>
                                                        </a>
                                                        <a
                                                          href="https://formlyapp.com/" target="__blank"
                                                          className="product-item"
                                                        >
                                                            <img
                                                              src="/images/products-nav/formly-logo-mark-colour.svg" alt="Formly logo"
                                                            />
                                                            <h5>Formly</h5>
                                                            <small>Contact Forms, Simplified</small>
                                                        </a>
                                                        <a
                                                          href="https://uptimely.app/" target="__blank"
                                                          className="product-item"
                                                        >
                                                            <img
                                                              src="/images/products-nav/uptimely-logo-mark-colour-filled.svg" alt="Uptimely logo"
                                                            />
                                                            <h5>Uptimely</h5>
                                                            <small>Website Monitoring. Sorted.</small>
                                                        </a>
                                                    </div>
                                                )}
                                            </Popover>
                                        </div>
                                    </nav>

                                    )}

                                    {(!pageHasAside || !asideIsVisible || !isMobile) && (
                                    <nav
                                      className={`navbar navbar-fixed-top ${pageHasAside && asideIsVisible ? ' navbar-aside' : ''}${isHomepage ? ' navbar-homepage ' : ''}${isLegal ? 'navbar-aside dark-header ' : ''}${isDark ? ' dark-header ' : ''}${this.state.myClassName ? this.state.myClassName : ''}`}
                                    >
                                        <Row space>
                                            <div className="navbar-left">
                                                <div className="navbar-nav">
                                                    {pageHasAside && !asideIsVisible && (
                                                    <div role="button" className="clickable toggle" onClick={this.toggleAside}>
                                                        <span className="icon ion-md-menu"/>
                                                    </div>
                                                    )}
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
                                                                      className="brand" alt="Bullet Train logo"
                                                                    />)
                                                                    : (
                                                                        <img
                                                                          title="Bullet Train" height={24}
                                                                          src="/images/bullet-train-black.svg"
                                                                          className="brand" alt="Bullet Train logo"
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
                                                                          this.context.router.history.push('/projects');
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
                                                                      onClick={AppActions.logout}
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

                                                        <div className="hidden-sm-down">
                                                            <Link className="float-right" to={`/login${redirect}`} onClick={Utils.scrollToSignUp}>
                                                                <Button className="btn-primary">Login</Button>
                                                            </Link>
                                                            <ul className="nav-list list-unstyled float-right">
                                                                <li><Link to="/features">Features</Link></li>
                                                                <li><Link to="/pricing">Pricing</Link></li>
                                                                <li><a target="_blank" href="https://docs.bullet-train.io/">Docs</a></li>
                                                                <li><Link to="/open-source">Open Source</Link></li>
                                                                <li><Link to="/demo">Demo</Link></li>
                                                            </ul>
                                                        </div>


                                                        <div className="hidden-md-up">
                                                            <Popover
                                                              className="popover-right mobile-navigation"
                                                              renderTitle={(toggle, isActive) => (
                                                                  <div className="mobile-navigation__button" onClick={toggle}>
                                                                      <span
                                                                        className={isActive ? 'icon ion-ios-close' : 'icon ion-md-menu'}
                                                                      />
                                                                  </div>
                                                              )}
                                                              ref={c => this.mobileNav = c}
                                                            >
                                                                {toggle => (
                                                                    <div className="mobile-navigation__bg">
                                                                        <ul className="list-unstyled mb-0">
                                                                            <li><Link to="/features">Features</Link></li>
                                                                            <li><Link to="/pricing">Pricing</Link></li>
                                                                            <li><a target="_blank" href="https://docs.bullet-train.io/" onClick={this.hideMobileNav}>Docs</a></li>
                                                                            <li><Link to="/open-source">Open Source</Link></li>
                                                                            <li><Link to="/demo">Demo</Link></li>
                                                                            <li>
                                                                                <Link to={`/login${redirect}`} onClick={Utils.scrollToSignUp}>
                                                                                    <Button className="btn-block">Login</Button>
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </Popover>
                                                        </div>


                                                    </div>
                                                )}

                                            </div>
                                        </Row>
                                    </nav>
                                    )}
                                    {pageHasAside && (
                                        <Aside
                                          className={`${AccountStore.isDemo ? 'demo' : ''} ${AccountStore.isDemo || (hasFreeTrial && !hasPaid) || (hasFreeUse && !hasPaid) || !hasPaid ? 'footer' : ''}`}
                                          projectId={projectId}
                                          environmentId={environmentId}
                                          toggleAside={this.toggleAside}
                                          asideIsVisible={asideIsVisible}
                                          organisation={organisation}
                                        />
                                    )}
                                    {isMobile && pageHasAside && asideIsVisible ? null : this.props.children}
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

export default hot(module)(withRouter(ConfigProvider(App)));
