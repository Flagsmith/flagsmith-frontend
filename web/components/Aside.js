import React, { Component } from 'react';
import propTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import ProjectSelect from './ProjectSelect';
import AsideProjectButton from './AsideProjectButton';
import AsideTitleLink from './AsideTitleLink';
import Collapsible from './Collapsible';
import Popover from './base/Popover';
import ProjectSettingsIcon from './svg/ProjectSettingsIcon';
import AuditLogIcon from './svg/AuditLogIcon';
import OrgSettingsIcon from './svg/OrgSettingsIcon';
import EnvironmentSelect from './EnvironmentSelect';

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
                                                  <img
                                                    title="Bullet Train"
                                                    src="/images/bullet-train-1-mark.svg"
                                                    className="aside__logo"
                                                  />
                                              </div>

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

                                              <ProjectSelect
                                                renderRow={(project, onClick) => (
                                                    <AsideProjectButton
                                                      data-test={`switch-project-${project.name.toLowerCase()}${this.props.projectId === (`${project.id}`) ? '-active' : ''}`}
                                                      key={project.id}
                                                      onClick={onClick}
                                                      className={this.props.projectId === `${project.id}` ? 'active' : ''}
                                                      name={project.name}
                                                      projectLetter={(`${project.name[0]}`).toUpperCase()}
                                                    />
                                                )}
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
                                      </div>
                                      {(
                                          <React.Fragment>
                                              <div className="aside__main-content" style={{ 'overflowY': 'auto' }}>

                                                  <div className="pl-4 pr-4 pt-4">
                                                      <h1 className="aside__project-title">{project && project.name ? project.name : '...'}</h1>
                                                  </div>
                                                  <Permission level="project" permission="ADMIN" id={this.props.projectId}>
                                                      {({ permission, isLoading }) => permission && (
                                                      <NavLink
                                                        id="project-settings-link"
                                                        activeClassName="active"
                                                        className="aside__nav-item"
                                                        to={`/project/${this.props.projectId}/settings`}
                                                      >
                                                          <ProjectSettingsIcon className="aside__nav-item--icon"/>
                                                          Project Settings
                                                      </NavLink>
                                                      )}
                                                  </Permission>
                                                  <Permission level="project" permission="CREATE_ENVIRONMENT" id={this.props.projectId}>
                                                      {({ permission, isLoading }) => permission && (
                                                      <div className="pl-4 pr-4">
                                                          <NavLink
                                                            id="create-env-link"
                                                            className="aside-link"
                                                            to={`/project/${this.props.projectId}/environment/create`}
                                                            exact
                                                          >
                                                              <AsideTitleLink
                                                                tooltip="Create Environment"
                                                                className="mt-4"
                                                                title="Environments"
                                                                iconClassName="ion-md-add"
                                                              />
                                                          </NavLink>
                                                      </div>
                                                      )}

                                                  </Permission>


                                                  {(
                                                      <div className="aside__environments-wrapper">
                                                          <EnvironmentSelect
                                                            renderRow={(environment, onClick) => (
                                                                <Collapsible
                                                                  data-test={`switch-environment-${environment.name.toLowerCase()}${this.props.environmentId === (`${environment.api_key}`) ? '-active' : ''}`}
                                                                  onClick={onClick}
                                                                  active={environment.api_key === this.props.environmentId} title={environment.name}
                                                                >
                                                                    <Permission level="environment" permission="ADMIN" id={environment.api_key}>
                                                                        {({ permission: environmentAdmin, isLoading }) => (isLoading
                                                                            ? <div className="text-center"><Loader/></div> : (
                                                                                <div className="aside__environment-nav list-unstyled mb-0">
                                                                                    <NavLink
                                                                                      className="aside__environment-list-item"
                                                                                      id="features-link"
                                                                                      to={`/project/${project.id}/environment/${environment.api_key}/features`}
                                                                                    >
                                                                                        <img
                                                                                          src="/images/icons/aside/features.svg"
                                                                                          className="aside__environment-list-item--icon"
                                                                                        />
                                                                                        Features
                                                                                    </NavLink>
                                                                                    {environmentAdmin && (
                                                                                    <NavLink
                                                                                      id="users-link"
                                                                                      className="aside__environment-list-item"
                                                                                      exact
                                                                                      to={`/project/${project.id}/environment/${environment.api_key}/users`}
                                                                                    >
                                                                                        <img
                                                                                          src="/images/icons/aside/users.svg"
                                                                                          className="aside__environment-list-item--icon"
                                                                                        />
                                                                                        Users
                                                                                    </NavLink>
                                                                                    )}
                                                                                    {environmentAdmin && (
                                                                                    <NavLink
                                                                                      id="env-settings-link"
                                                                                      className="aside__environment-list-item"
                                                                                      to={`/project/${project.id}/environment/${environment.api_key}/settings`}
                                                                                    >
                                                                                        <img
                                                                                          src="/images/icons/aside/environment-settings.svg"
                                                                                          className="aside__environment-list-item--icon"
                                                                                        />
                                                                                        Environment Settings
                                                                                    </NavLink>
                                                                                    )}
                                                                                    <Permission level="project" permission="ADMIN" id={this.props.projectId}>
                                                                                        {({ permission: projectAdmin, isLoading }) => projectAdmin && (
                                                                                        <NavLink
                                                                                          to={`/project/${project.id}/environment/${this.props.environmentId}/segments`}

                                                                                          id="segments-link"
                                                                                          className="aside__environment-list-item"
                                                                                        >
                                                                                            <img
                                                                                              src="/images/icons/aside/segments.svg"
                                                                                              className="aside__environment-list-item--icon"
                                                                                            />
                                                                                            Segments
                                                                                        </NavLink>
                                                                                        )}
                                                                                    </Permission>
                                                                                </div>
                                                                            ))}
                                                                    </Permission>
                                                                </Collapsible>
                                                            )}
                                                            environmentId={this.props.environmentId}
                                                            clearableValue={false}
                                                            onChange={(environment) => {
                                                                this.context.router.history.push(`/project/${this.props.projectId}/environment/${environment}/features`);
                                                                AsyncStorage.setItem('lastEnv', JSON.stringify({
                                                                    orgId: AccountStore.getOrganisation().id,
                                                                    projectId: this.props.projectId,
                                                                    environmentId: environment,
                                                                }));
                                                            }}
                                                          />
                                                      </div>

                                                  )}

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
                                                          <AuditLogIcon className="aside__nav-item--icon"/>
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
                                                          <OrgSettingsIcon className="aside__nav-item--icon"/>
                                                          Organisation Settings
                                                      </NavLink>
                                                      )}

                                                      <a
                                                        id="logout-link" href="#"
                                                        onClick={AppActions.logout}
                                                        activeClassName="active"
                                                        className="aside__nav-item"
                                                      >
                                                          <img
                                                            src="/images/icons/aside/logout.svg"
                                                            className="aside__nav-item--icon"
                                                          />
                                                          Logout
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


// {this.props.projectId === (`${project.id}`) && (
//   <div className="env-list">
//       <EnvironmentSelect
//         environmentId={this.props.environmentId}
//         clearableValue={false}
//         onChange={(environment) => {
//             this.context.router.history.push(`/project/${this.props.projectId}/environment/${environment}/features`);
//             AsyncStorage.setItem('lastEnv', JSON.stringify({
//                 orgId: AccountStore.getOrganisation().id,
//                 projectId: this.props.projectId,
//                 environmentId: environment,
//             }));
//         }}
//       />
//       <ul className="project-list list-unstyled pt-2">
//           <Permission level="project" permission="CREATE_ENVIRONMENT" id={this.props.projectId}>
//               {({ permission, isLoading }) => (
//                 <li className="project-nav__item flex-row">
//                     {permission && (
//                       <Link
//                         id="create-env-link"
//                         to={`/project/${this.props.projectId}/environment/create`}
//                         className="project-nav__button project-nav__button--cta"
//                       >
//                           <span className="project-nav__item__text">Create Environment</span>
//                           <img
//                             className="project-nav__icon" src="/images/plus-button.svg"
//                             alt="New"
//                           />
//                       </Link>
//                     )}
//
//                 </li>
//               )}
//           </Permission>
//       </ul>
//       <Permission level="project" permission="ADMIN" id={this.props.projectId}>
//           {({ isLoading, permission }) => !!permission && (
//             <React.Fragment>
//                 {this.props.hasFeature('segments') && (
//                   <NavLink
//                     id="segments-link"
//                     className="project-nav__item project-list__item  project-settings-link"
//                     activeClassName="active"
//                     to={`/project/${project.id}/environment/${this.props.environmentId}/segments`
//                     }
//                   >
//                       Segments
//                   </NavLink>
//                 )}
//                 <NavLink
//                   id="project-settings-link"
//                   activeClassName="active"
//                   className="project-nav__item project-list__item  project-settings-link"
//                   to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`}
//                 >
//                     Project Settings
//                 </NavLink>
//             </React.Fragment>
//           )}
//       </Permission>
//   </div>
// )}
