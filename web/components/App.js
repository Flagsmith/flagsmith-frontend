import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Aside from './Aside';
import Popover from '../components/base/Popover';
import AccountStore from '../../common/stores/account-store';
import Feedback from '../components/modals/Feedback';
import PaymentModal from '../components/modals/Payment';

const App = class extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {}

    constructor(props, context) {
        super(props, context);
        AppActions.getConfig();
    }

    componentDidMount= () => {
        window.addEventListener('scroll', this.handleScroll);
    };

    onLogin = () => {
        const {redirect} = this.props.location.query;


        if (!AccountStore.getOrganisation() && document.location.href.indexOf('invite') == -1) { //If user has no organisation redirect to /create
            this.context.router.replace('/create');
            return
        }

        //Redirect on login
        if (this.props.location.pathname == '/' || this.props.location.pathname == '/login' || this.props.location.pathname == '/demo' || this.props.location.pathname == '/signup') {
            this.context.router.replace(redirect ? redirect : '/projects');
        }
    };

    handleScroll = () => {
        if (this.scrollPos < 768 && $(document).scrollTop() >= 768){
            this.setState({myClassName: 'scrolled'})
        } else if (this.scrollPos >= 768 && $(document).scrollTop() < 768) {
            this.setState({myClassName: ''})
        }
        this.scrollPos = $(document).scrollTop();
    }

    onLogout = () => {
        this.context.router.replace('/');
    };

    feedback = () => {
        openModal('Feedback', <Feedback />)
    }

    render() {
        const {hasFeature, getValue, params, location} = this.props;
        const {projectId, environmentId} = params;
        const pageHasAside = environmentId;
        const pathname = location.pathname;
        const isHomepage = pathname == '/' || pathname == '/login';
        const isLegal = pathname == '/legal/tos' || pathname == '/legal/sla' || pathname == '/legal/privacy-policy';
        const isDark = pathname.indexOf('/blog') !== -1;

        const redirect = location.query.redirect ? `?redirect=${location.query.redirect}` : "";

        return (
            <div>
                <AccountProvider onNoUser={this.onNoUser} onLogout={this.onLogout} onLogin={this.onLogin}>
                    {({isLoading, user, organisation}) => {

                        const loggedInUser = organisation && !AccountStore.isDemo;
                        const hasPaid = loggedInUser && organisation.paid_subscription; // Organisation has paid via chargebee
                        const freeTrialDaysRemaining = loggedInUser && Utils.freeTrialDaysRemaining(organisation.subscription_date);
                        const hasFreeTrial = loggedInUser && freeTrialDaysRemaining > 0; // Organisation is still within their free trial
                        const hasFreeUse = loggedInUser && organisation.free_to_use_subscription; /* Organisation was created before payment options came in and therefore they have free usage (for now) */

                        return (
                            <div className={pageHasAside && "aside-body"}>
                                <nav className={"navbar navbar-fixed-top " + (pageHasAside ? " navbar-aside" : '') + (isHomepage ? " navbar-homepage " : '')  + (isLegal ? "navbar-aside dark-header " : '') + (isDark ? " dark-header " : '') + (this.state.myClassName ? this.state.myClassName : '')}>
                                    <div className="navbar-left">
                                        <div className="navbar-nav">
                                            {!projectId && (
                                                <Link to={user ? "/projects" : "/"}
                                                      className="nav-item nav-item-brand nav-link">
                                                    {isLegal ? null : (<Row>
                                                        {isHomepage || isDark ? (<img title={"Bullet Train"} height={24} src={"/images/bullet-train-1.svg"} className="brand"/>) :
                                                            (<img title={"Bullet Train"} height={24} src={"/images/bullet-train-black.svg"} className="brand"/>) }
                                                    </Row>)}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div className="navbar-right">
                                        {user ? (
                                            <div className="flex-column org-nav">
                                                <Popover className="popover-right"
                                                         renderTitle={(toggle) => (
                                                             <a id="org-menu" onClick={toggle}>
                                                                 {organisation ? organisation.name : ''}
                                                                 <div className="flex-column ion ion-ios-arrow-down"/>
                                                             </a>
                                                         )}>
                                                    {(toggle) => (
                                                        <div>

                                                            {organisation && (
                                                                <OrganisationSelect
                                                                    clearableValue={false}
                                                                    onChange={(organisation) => {
                                                                        toggle();
                                                                        AppActions.selectOrganisation(organisation.id);
                                                                        AppActions.getOrganisation(organisation.id);
                                                                        this.context.router.push('/projects');
                                                                    }}/>
                                                            )}
                                                            <div>
                                                                <Link id="create-org-link" onClick={toggle} to="/create">
                                                                    Create Organisation
                                                                </Link>
                                                            </div>

                                                            <a id="logout-link" href="#"
                                                               onClick={() => AppActions.setUser(null)}
                                                               to="exampleone">Logout</a>
                                                        </div>
                                                    )}
                                                </Popover>
                                            </div>
                                        ) : (
                                            <div>
                                                <Link to={`/login${redirect}#sign-up`} className="btn float-right" onClick={Utils.scrollToSignUp}>Login</Link>
                                                <ul className="nav-list list-unstyled float-right">
                                                    <li><Link to={"/demo"}>Demo</Link></li>
                                                    <li><a target={"_blank"} href="https://docs.bullet-train.io/">Docs</a></li>
                                                    <li><Link to={'/pricing'}>Pricing</Link></li>
                                                </ul>
                                            </div>
                                        )}

                                    </div>
                                </nav>
                                {pageHasAside && (
                                    <Aside
                                        className={`${AccountStore.isDemo ? "demo" : ''} ${AccountStore.isDemo || (hasFreeTrial && !hasPaid) || (hasFreeUse && !hasPaid) || !hasPaid ? 'footer' : ''}`}
                                        projectId={this.props.params.projectId}
                                        environmentId={this.props.params.environmentId}
                                    />
                                )}
                                {this.props.children}
                                {AccountStore.isDemo && (
                                    <div className={"footer-bar pulse"}>
                                        You are using a demo account. Finding this useful?{" "}
                                        <Link onClick={() => AppActions.setUser(null)} to={"/"}>Click here to Sign up</Link>
                                    </div>
                                )}
                                {hasPaid ? null : hasFreeUse ? (
                                    <div className={"footer-bar"}>
                                        Your organisation is using Bullet Train for free. {pathname.indexOf('organisation-settings') === -1 && this.props.params.projectId && this.props.params.environmentId ? (
                                        <span>Click <Link
                                            id="organisation-settings-link"
                                            activeClassName={"active"}
                                            to={`/project/${this.props.params.projectId}/environment/${this.props.params.environmentId}/organisation-settings`}>
                                            here
                                        </Link> for further information on {hasFeature('free_tier') ? 'upgrading' : 'migrating'} to a paid plan.</span>
                                    ) : null}
                                    </div>
                                ) : hasFreeTrial ? (
                                    <div className={"footer-bar"}>
                                        Your organisation has {freeTrialDaysRemaining} days remaining on it's free trial.
                                    </div>
                                ) : loggedInUser ? (
                                    <div className={"footer-bar clickable"} onClick={() => openModal(null, <PaymentModal />, null, {large: true})}>
                                        Your trial period has expired. Click here to view payment plans.
                                    </div>
                                ) : null}
                            </div>
                        )
                    }}
                </AccountProvider>
                {navigator.webdriver ? null : (
                    <div className="feedback-btn">
                        <Button onClick={this.feedback} className="btn btn-primary">Have any feedback?</Button>
                    </div>
                )}
            </div>
        );
    }
}

App.propTypes = {
    location: RequiredObject,
    history: RequiredObject,
};

export default ConfigProvider(App);
