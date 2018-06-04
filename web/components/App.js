import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Aside from './Aside';
import Popover from '../components/base/Popover';
import AccountStore from '../../common/stores/account-store';


export default class App extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    onLogin = () => {
        const {redirect} = this.props.location.query;

        if (!AccountStore.getOrganisation() && this.props.location.pathname != '/invite') { //If user has no organisation redirect to /create
            this.context.router.replace('/create');
            return
        }

        //Redirect on login
        if (this.props.location.pathname == '/' || this.props.location.pathname == '/login' || this.props.location.pathname == '/signup') {
            this.context.router.replace(redirect ? redirect : '/projects');
        }
    };

    onLogout = () => {
        this.context.router.replace('/');
    };

    render() {
        const pageHasAside = this.props.params.environmentId;
        return (
            <div>
                <AccountProvider onNoUser={this.onNoUser} onLogout={this.onLogout} onLogin={this.onLogin}>
                    {({isLoading, user, organisation}) => (
                        <div className={pageHasAside && "aside-body"}>
                            <nav className={"navbar navbar-fixed-top navbar-light " + (pageHasAside && "navbar-aside")}>
                                <div className="navbar-left">
                                    <div className="navbar-nav">
                                        <Link to={"/"} className="nav-item nav-item-brand nav-link">
                                            <Row>
                                                <img height={34} src={"/images/icon-light.png"}/>
                                                Bullet Train
                                            </Row>
                                        </Link>
                                    </div>
                                </div>
                                <div className="navbar-right">
                                    {user && (
                                        <div className="flex-column">
                                            <Popover className="popover-right"
                                                     renderTitle={(toggle) => organisation && (
                                                         <a id="openNavbarRight" onClick={toggle}>
                                                             {organisation.name}
                                                             <div className="flex-column ion ion-ios-arrow-down"/>
                                                         </a>
                                                     )}>
                                                {(toggle) => (
                                                    <div>
                                                        <div>
                                                            <Link id="createOrgLink" onClick={toggle} to="/create">
                                                                Create Organisation
                                                            </Link>
                                                        </div>
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

                                                        <a id="logoutLink" href="#" onClick={() => AppActions.setUser(null)}
                                                           to="exampleone">Logout</a>
                                                    </div>
                                                )}
                                            </Popover>
                                        </div>
                                    )}

                                </div>
                            </nav>
                            {pageHasAside && (
                                <Aside
                                    className={AccountStore.isDemo && "demo"}
                                    projectId={this.props.params.projectId}
                                    environmentId={this.props.params.environmentId}
                                />
                            )}
                            {this.props.children}
                            {AccountStore.isDemo && (
                                <div className={"footer-bar"}>
                                    You are using a demo account. Finding this useful?{" "}
                                    <Link onClick={() => AppActions.setUser(null)} to={"/"}>Click here to Sign up</Link>
                                </div>
                            )}
                        </div>
                    )}
                </AccountProvider>
            </div>
        );
    }
}

App.propTypes = {
    location: RequiredObject,
    history: RequiredObject,
};
