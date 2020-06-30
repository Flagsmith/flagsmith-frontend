import React, { Component } from 'react';
import propTypes from 'prop-types';
import ProjectSelect from './ProjectSelect';
import AsideProjectButton from './AsideProjectButton';
import AsideTitleLink from './AsideTitleLink';
import Collapsible from './Collapsible';

const Aside = class extends Component {
    static displayName = 'Aside';

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    static propTypes = {
        className: propTypes.string,
        toggleAside: propTypes.func,
        asideIsVisible: propTypes.bool,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getProject(this.props.projectId);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.projectId !== this.props.projectId) {
            AppActions.getProject(this.props.projectId);
        }
    }

    onProjectSave = () => {
        AppActions.refreshOrganisation();
    }

    toggleNav = () => {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        const { hasFeature, getValue, toggleAside, asideIsVisible } = this.props;
        return (
            <OrganisationProvider>
                {({ isLoading: isLoadingOrg, projects }) => (
                    <ProjectProvider id={this.props.projectId} onSave={this.onProjectSave}>
                        {({ isLoading, project }) => (


                            <React.Fragment>

                                <div
                                  className={`aside ${this.props.className || ''}`} style={!asideIsVisible ? {
                                      width: 0,
                                      overflow: 'hidden',
                                  } : isMobile ? { width: '100vw' } : {}}
                                >
                                    {isMobile && (
                                        <div role="button" className="clickable toggle" onClick={toggleAside}>
                                            {!asideIsVisible ? <span className="icon ion-md-menu"/>
                                                : <span className="icon ion-md-close"/>}
                                        </div>
                                    )}


                                    <div className="row ml-0 mr-0 aside__wrapper">
                                        <div
                                          className={`aside__projects-sidebar ${this.props.className || ''}`}
                                        >

                                            <div className="flex-row justify-content-center">
                                                <div className="flex-column">
                                                    <Link to="/">
                                                        <img
                                                          title="Bullet Train"
                                                          src="/images/bullet-train-1-mark.svg"
                                                          className="aside__logo"
                                                        />
                                                    </Link>
                                                </div>
                                                <AsideProjectButton className="active" name="SSG Website"/>

                                                <AsideProjectButton name="Hoxton Mix Website"/>

                                                <div className="flex-column">
                                                    <div className="aside__projects-item">
                                                        <div className="flex-row justify-content-center">
                                                            <div className="flex-column">

                                                                <Button className="btn--transparent">
                                                                    <Link
                                                                      id="create-project-link"
                                                                      to="/projects"
                                                                      state={{ create: true }}
                                                                    >
                                                                        <img src="/images/icons/plus-white.svg" />
                                                                    </Link>
                                                                </Button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {(isLoading || isLoadingOrg) && <Loader/>}
                                        {!isLoading && !isLoadingOrg && (
                                            <React.Fragment>
                                                <div className="aside__main-content" style={{ 'overflowY': 'auto' }}>

                                                    <div className="pl-4 pr-4 pt-4 pb-4">

                                                        <AsideTitleLink title="My Organisation" iconClassName="ion-ios-arrow-up"/>

                                                        {/*<Button className="btn btn--with-icon" icon="/images/icon-play.svg">*/}
                                                        {/*    Button with icon*/}
                                                        {/*</Button>*/}

                                                        <h1 className="aside__project-title mb-4">SSG Website</h1>

                                                        <NavLink
                                                            id="project-settings-link"
                                                            activeClassName="active"
                                                            className="aside__nav-item"
                                                            to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`}
                                                        >
                                                            <img src="/images/icons/aside/project-settings.svg"  className="aside__nav-item-icon" />
                                                            Project Settings
                                                        </NavLink>

                                                        <AsideTitleLink className="mt-4" title="Environments" iconClassName="ion-md-add"/>

                                                        <Collapsible title="How does the collaboration platform work?">
                                                          navs
                                                        </Collapsible>


                                                    </div>

                                                    <div className="project-nav">

                                                        <ProjectSelect
                                                          projectId={this.props.projectId}
                                                          environmentId={this.props.environmentId}
                                                          clearableValue={false}
                                                          onChange={(project) => {
                                                              AppActions.getProject(project.id);
                                                              if (project.environments[0]) {
                                                                  this.context.router.history.push(`/project/${project.id}/environment/${project.environments[0].api_key}/features`);
                                                              } else {
                                                                  this.context.router.history.push(`/project/${project.id}/environment/create`);
                                                              }
                                                              AsyncStorage.setItem('lastEnv', JSON.stringify({
                                                                  orgId: AccountStore.getOrganisation().id,
                                                                  projectId: project.id,
                                                                  environmentId: project.environments[0].api_key,
                                                              }));
                                                          }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-1"/>

                                                    <div>
                                                        {hasFeature('demo_feature') && (
                                                            <a
                                                              style={{ color: getValue('demo_link_color') || 'white' }}
                                                              className="link--footer active"
                                                              href="https://docs.bullet-train.io"
                                                            >
                                                                <i className="icon mr-2 ion-ios-star"/>
                                                                Super cool demo feature!
                                                            </a>
                                                        )}
                                                        {AccountStore.getOrganisationRole() === 'ADMIN' && (
                                                            <NavLink
                                                              id="audit-log-link"
                                                              activeClassName="active"
                                                              className="link--footer"
                                                              to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/audit-log`}
                                                            >
                                                                Audit Log
                                                            </NavLink>
                                                        )}

                                                        {AccountStore.getOrganisationRole() === 'ADMIN' && (
                                                            <NavLink
                                                              id="organisation-settings-link"
                                                              activeClassName="active"
                                                              className="link--footer"
                                                              to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/organisation-settings`}
                                                            >
                                                                Organisation Settings
                                                            </NavLink>
                                                        )}

                                                        {hasFeature('edit_account') && (
                                                            <NavLink
                                                              id="organisation-settings-link"
                                                              activeClassName="active"
                                                              className="link--footer"
                                                              to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/account-settings`}
                                                            >
                                                                Account Settings
                                                            </NavLink>
                                                        )}

                                                        <a
                                                          className="link--footer"
                                                          href="https://docs.bullet-train.io"
                                                        >
                                                            Documentation

                                                        </a>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </ProjectProvider>
                )}
            </OrganisationProvider>
        );
    }
};

module.exports = ConfigProvider(Aside);
