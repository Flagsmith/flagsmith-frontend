import React, { Component } from 'react';
import propTypes from 'prop-types';
import ProjectSelect from './ProjectSelect';
import AsideProjectButton from './AsideProjectButton';
import AsideTitleLink from './AsideTitleLink';
import Collapsible from './Collapsible';
import Popover from './base/Popover';
import ProjectSettingsIcon from './svg/ProjectSettingsIcon';
import AuditLogIcon from './svg/AuditLogIcon';
import OrgSettingsIcon from './svg/OrgSettingsIcon';

const Aside = class extends Component {
    static displayName = 'Aside';

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    static propTypes = {
        className: propTypes.string,
        toggleAside: propTypes.func,
        asideIsVisible: propTypes.bool,
    };

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
    };

    toggleNav = () => {
        this.setState({ visible: !this.state.visible });
    };

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

                                                <AsideProjectButton className="active" name="SSG Website" projectLetter="S"/>

                                                <AsideProjectButton name="Hoxton Mix Website" projectLetter="H"/>

                                                <div className="flex-column">
                                                    <div className="aside__projects-item">
                                                        <div className="flex-row justify-content-center">
                                                            <div className="flex-column">

                                                                <Tooltip
                                                                  title={(
                                                                      <Button className="btn--transparent">
                                                                          <Link
                                                                            id="create-project-link"
                                                                            to="/projects"
                                                                            state={{ create: true }}
                                                                          >
                                                                              <img src="/images/icons/plus-white.svg"/>
                                                                          </Link>
                                                                      </Button>
)}
                                                                  place="right"
                                                                >
                                                                    Create Project
                                                                </Tooltip>

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

                                                    <div className="pl-4 pr-4 pt-4">
                                                        <h1 className="aside__project-title">SSG Website</h1>
                                                    </div>

                                                    <NavLink
                                                      id="project-settings-link"
                                                      activeClassName="active"
                                                      className="aside__nav-item"
                                                      to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`}
                                                    >
                                                        <ProjectSettingsIcon className="aside__nav-item--icon" />
                                                            Project Settings
                                                    </NavLink>

                                                    <div className="pl-4 pr-4">
                                                        <AsideTitleLink
                                                          className="mt-4" title="Environments"
                                                          iconClassName="ion-md-add"
                                                        />
                                                    </div>


                                                    <div className="aside__environments-wrapper">

                                                        <Collapsible className="active" title="Develop">

                                                            <ul className="aside__environment-nav list-unstyled mb-0">
                                                                <li className="aside__environment-list-item active">
                                                                    <img
                                                                      src="/images/icons/aside/features.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Features
                                                                </li>
                                                                <li className="aside__environment-list-item">
                                                                    <img
                                                                      src="/images/icons/aside/users.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Users
                                                                </li>
                                                                <li className="aside__environment-list-item">
                                                                    <img
                                                                      src="/images/icons/aside/segments.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Segments
                                                                </li>
                                                                <li className="aside__environment-list-item">
                                                                    <img
                                                                      src="/images/icons/aside/environment-settings.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Environment Settings
                                                                </li>
                                                            </ul>

                                                        </Collapsible>

                                                        <Collapsible title="Develop">

                                                            <ul className="aside__environment-nav list-unstyled mb-0">
                                                                <li className="aside__environment-list-item active">
                                                                    <img
                                                                      src="/images/icons/aside/features.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Features
                                                                </li>
                                                                <li className="aside__environment-list-item">
                                                                    <img
                                                                      src="/images/icons/aside/users.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Users
                                                                </li>
                                                                <li className="aside__environment-list-item">
                                                                    <img
                                                                      src="/images/icons/aside/segments.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Segments
                                                                </li>
                                                                <li className="aside__environment-list-item">
                                                                    <img
                                                                      src="/images/icons/aside/environment-settings.svg"
                                                                      className="aside__environment-list-item--icon"
                                                                    />
                                                                    Environment Settings
                                                                </li>
                                                            </ul>

                                                        </Collapsible>


                                                    </div>

                                                    {/*<div className="project-nav" style={{ position: 'relative', bottom: '25em' }}>*/}

                                                    {/*    <ProjectSelect*/}
                                                    {/*      projectId={this.props.projectId}*/}
                                                    {/*      environmentId={this.props.environmentId}*/}
                                                    {/*      clearableValue={false}*/}
                                                    {/*      onChange={(project) => {*/}
                                                    {/*          AppActions.getProject(project.id);*/}
                                                    {/*          if (project.environments[0]) {*/}
                                                    {/*              this.context.router.history.push(`/project/${project.id}/environment/${project.environments[0].api_key}/features`);*/}
                                                    {/*          } else {*/}
                                                    {/*              this.context.router.history.push(`/project/${project.id}/environment/create`);*/}
                                                    {/*          }*/}
                                                    {/*          AsyncStorage.setItem('lastEnv', JSON.stringify({*/}
                                                    {/*              orgId: AccountStore.getOrganisation().id,*/}
                                                    {/*              projectId: project.id,*/}
                                                    {/*              environmentId: project.environments[0].api_key,*/}
                                                    {/*          }));*/}
                                                    {/*      }}*/}
                                                    {/*    />*/}
                                                    {/*</div>*/}


                                                    <div className="flex flex-1"/>

                                                    <div className="aside__footer">
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
                                                          className="aside__nav-item"
                                                          to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/audit-log`}
                                                        >
                                                            <AuditLogIcon className="aside__nav-item--icon" />
                                                                Audit Log
                                                        </NavLink>
                                                        )}

                                                        {AccountStore.getOrganisationRole() === 'ADMIN' && (
                                                            <NavLink
                                                              id="organisation-settings-link"
                                                              activeClassName="active"
                                                              className="aside__nav-item"
                                                              to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/organisation-settings`}
                                                            >
                                                                <OrgSettingsIcon className="aside__nav-item--icon" />
                                                                Organisation Settings
                                                            </NavLink>
                                                        )}

                                                        <NavLink
                                                          id="logout-link" href="#"
                                                          to="exampleone"
                                                          activeClassName="active"
                                                          className="aside__nav-item"

                                                        >
                                                            <img
                                                              src="/images/icons/aside/logout.svg"
                                                              className="aside__nav-item--icon"
                                                            />
                                                            Logout
                                                        </NavLink>

                                                        {/* {hasFeature('edit_account') && ( */}
                                                        {/*    <NavLink */}
                                                        {/*      id="organisation-settings-link" */}
                                                        {/*      activeClassName="active" */}
                                                        {/*      className="link--footer" */}
                                                        {/*      to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/account-settings`} */}
                                                        {/*    > */}
                                                        {/*        Account Settings */}
                                                        {/*    </NavLink> */}
                                                        {/* )} */}

                                                        {/* <a */}
                                                        {/*  className="link--footer" */}
                                                        {/*  href="https://docs.bullet-train.io" */}
                                                        {/* > */}
                                                        {/*    Documentation */}

                                                        {/* </a> */}
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
