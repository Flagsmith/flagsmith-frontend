import React, { Component } from 'react';
import propTypes from 'prop-types';
import ProjectSelect from './ProjectSelect';

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
                    <Flex className={`aside ${this.props.className || ''}`} style={!asideIsVisible ? { width: 0, overflow: 'hidden' } : isMobile ? { width: '100vw' } : {}}>
                        {isMobile && (
                            <div role="button" className="clickable toggle" onClick={toggleAside}>
                                {!asideIsVisible ? <span className="icon ion-md-menu"/> : <span className="icon ion-md-close"/> }
                            </div>
                        )}
                        <div className="brand-container text-center">
                            <Link to="/projects">
                                <div>
                                    <img
                                      title="Bullet Train" height={54}
                                      src="/images/bullet-train-1-mark.svg"
                                      className="brand"
                                    />
                                </div>
                            </Link>
                        </div>
                        {(isLoading || isLoadingOrg) && <Loader/>}
                        {!isLoading && !isLoadingOrg && (
                        <Flex style={{ 'overflow-y': 'auto' }}>
                            <div className="project-nav">
                                <Row className="project-nav__item--header">
                                    <span className="flex-1">Projects</span>
                                    <Link
                                      id="create-project-link"
                                      to="/projects" className="project-nav__button project-nav__button--cta" state={{ create: true }}
                                    >
                                        <img className="project-nav__icon" src="/images/plus-button--white.svg" alt="New" />
                                    </Link>
                                </Row>
                                <ProjectSelect
                                  projectId={this.props.projectId}
                                  environmentId={this.props.environmentId}
                                  clearableValue={false}
                                  onChange={(project) => {
                                      AppActions.getProject(project.id);
                                      this.context.router.history.push(`/project/${project.id}/environment/${project.environments[0].api_key}/features`);
                                      AsyncStorage.setItem('lastEnv', JSON.stringify({
                                          orgId: AccountStore.getOrganisation().id,
                                          projectId: project.id,
                                          environmentId: project.environments[0].api_key,
                                      }));
                                  }}
                                />
                            </div>
                            <div className="flex flex-1" />

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
                                <Permission level="project" permission="ADMIN" id={this.props.projectId}>
                                    {({ isLoading, permission }) => !!permission && (
                                    <Link
                                      id="project-settings-link"
                                      activeClassName="active"
                                      className="link--footer"
                                      to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`}
                                    >
                                        Project Settings
                                    </Link>
                                    )}

                                </Permission>

                                {AccountStore.getOrganisationRole() === 'ADMIN' && (
                                    <Link
                                      id="organisation-settings-link"
                                      activeClassName="active"
                                      className="link--footer"
                                      to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/organisation-settings`}
                                    >
                                                    Organisation Settings
                                    </Link>
                                )}
                                <a
                                  className="link--footer"
                                  href="https://docs.bullet-train.io"
                                >
												Documentation

                                </a>
                            </div>
                        </Flex>
                        )}
                    </Flex>
                )}
            </ProjectProvider>
        )}
    </OrganisationProvider>
	    );
    }
};

module.exports = ConfigProvider(Aside);
