import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Aside from './Aside';
import Popover from '../components/base/Popover';
import AccountStore from '../../common/stores/account-store';
import Feedback from '../components/modals/Feedback';
import PaymentModal from '../components/modals/Payment';
import CancelPaymentPlanModal from './modals/CancelPaymentPlan';

export default class App extends Component {

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

    scrollToSignUp = () => {
        Utils.scrollToElement('.signup-form');
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

    cancelTrial = () => {
        openModal(
			<h2>Are you sure you want to cancel your trial?</h2>,
			<CancelPaymentPlanModal trial={true} />,
		);
    }

    render() {
        const {projectId, environmentId} = this.props.params;
        const pageHasAside = environmentId;
        const isHomepage = this.props.location.pathname == '/' || this.props.location.pathname == '/login';
        const isLegal = this.props.location.pathname == '/legal/tos' || this.props.location.pathname == '/legal/sla' || this.props.location.pathname == '/legal/privacy-policy';
        const isDark = this.props.location.pathname == '/blog/remote-config-and-feature-flags';
        const loggedInUser = AccountStore.getUser() && !AccountStore.isDemo;
        const hasPaid = Constants.simulate.HAS_PAID; // Organisation has paid via chargebee
        const hasFreeTrial = loggedInUser && hasPaid && Constants.simulate.HAS_FREE_TRIAL; // Organisation has paid via chargebee but is still within their free trial
        const hasFreeUse = loggedInUser && Constants.simulate.HAS_FREE_USE; /* Organisation was created before payment options came in and therefore they have free usage (for now) */

        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : "";

        return (
            <div>
                <AccountProvider onNoUser={this.onNoUser} onLogout={this.onLogout} onLogin={this.onLogin}>
                    {({isLoading, user, organisation}) => (
                        <div className={pageHasAside && "aside-body"}>
                            <nav className={"navbar navbar-fixed-top " + (pageHasAside ? " navbar-aside" : '') + (isHomepage ? " navbar-homepage " : '')  + (isLegal ? "navbar-aside dark-header " : '') + (isDark ? " dark-header " : '') + this.state.myClassName}>
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
                                                     renderTitle={(toggle) => organisation && (
                                                         <a id="org-menu" onClick={toggle}>
                                                             {organisation.name}
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
                                            <Link to={`/login${redirect}#sign-up`} className="btn float-right">Login</Link>
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
                                    className={`${AccountStore.isDemo ? "demo" : ''} ${AccountStore.isDemo || hasFreeTrial || !hasPaid ? 'footer' : ''}`}
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
                            {/* is within free trial */}
                            {hasFreeTrial ? (
                                <div className={"footer-bar"}>
                                    Your organisation has 29 days of it's free trial left. Click <a onClick={this.cancelTrial}>here</a> to cancel your free trial.
                                </div>
                            ) : !hasPaid ? (
                                <div className={"footer-bar clickable"} onClick={() => openModal(null, <PaymentModal />, null, {large: true})}>
                                    {hasFreeUse ? 'Your organisation is currently using Bullet Train for free. Click here to see payment plans.' : 'Thanks for signing up to use Bullet Train. Click here to start your free trial'}.
                                </div>
                            ) : null}
                        </div>
                    )}
                </AccountProvider>
                <div className="feedback-btn">
                    <Button onClick={this.feedback} className="btn btn-primary">Have any feedback?</Button>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    location: RequiredObject,
    history: RequiredObject,
};
