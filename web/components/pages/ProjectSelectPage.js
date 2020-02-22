import React, { Component } from 'react';
import CreateProjectModal from '../modals/CreateProject';
import EditOrganisationModal from '../modals/EditOrganisation';

const ProjectSelectPage = class extends Component {
    static displayName = 'ProjectSelectPage';

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getOrganisation(AccountStore.getOrganisation().id);
    }

    componentDidMount = () => {
        API.trackPage(Constants.pages.PROJECT_SELECT);
        const { state } = this.props.location;
        if (state && state.create) {
            this.newProject();
        }
    };

    editOrganisation = () => {
        openModal('Edit Organisation', <EditOrganisationModal/>);
    };

    newProject = () => {
        openModal('Create  Project', <CreateProjectModal onSave={({ projectId, environmentId }) => {
            this.context.router.history.push(`/project/${projectId}/environment/${environmentId}/features?new=true`);
        }}
        />);
    };

    render() {
        const isAdmin = AccountStore.isAdmin();
        return (
            <div data-test="project-select-page" id="project-select-page" className="app-container container">
                <OrganisationProvider>
                    {({ isLoading, name, projects, users }) => (
                        <div>
                            {projects && projects.length ? (
                                <div>
                                    <Button disabled={!isAdmin} onClick={this.newProject} className="float-right">
                                        Create Project
                                    </Button>
                                    <h3>Your projects</h3>
                                    <p>
                                        Projects let you create and manage a set of features and configure them between
                                        multiple
                                        app environments.
                                    </p>
                                </div>
                            ) : isAdmin ? (
                                <div className="text-center">
                                    <h3>Great! Now you can create your first project.</h3>
                                    <p>
                                        When you create a project we'll also generate a
                                        {' '}
                                        <strong>development</strong>
                                        {' '}
                                        and
                                        {' '}
                                        <strong>production</strong>
                                        {' '}
                                        environment for you.
                                    </p>
                                    <p>
                                        You can create features for your project, then enable and configure them per
                                        environment.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h3>Your projects</h3>
                                    <p>
                                        You do not have access to any projects within this organisation yet, please contact member of this organisation who has administrator privileges. Users can be added to projects from the project settings menu.
                                    </p>
                                </div>
                            )
                            }

                            {(isLoading || !projects) && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    <FormGroup>
                                        <PanelSearch
                                          id="projects-list"
                                          className="no-pad"
                                          title="Projects"
                                          items={projects}
                                          renderRow={({ id, name, environments }, i) => (
                                              <Link
                                                key={id} className="list-item"
                                                id={`project-select-${i}`}
                                                to={`/project/${id}/environment/${environments && environments[0]
                                                    ? `${environments[0].api_key}/features` : 'create'
                                                }`}
                                              >
                                                  <Row>
                                                      <Flex>
                                                          {name}
                                                      </Flex>
                                                      <span className="icon ion-ios-arrow-forward list-item"/>
                                                  </Row>
                                              </Link>
                                          )}
                                          renderNoResults={(
                                              <div className="text-center">
                                                  <div className="text-center">
                                                      <div>
                                                          {!isAdmin ? (
                                                              <Tooltip
                                                                html
                                                                title={
                                                                  <button
                                                                    disabled
                                                                    className="btn btn-primary btn-lg"
                                                                    data-test="create-first-project-btn"
                                                                    id="create-first-project-btn"
                                                                  >
                                                                      <span className="icon ion-ios-rocket"/>
                                                                      {' '}
                                                                  Create a project
                                                                  </button>}
                                                              >
                                                                  {Constants.adminPermissions()}
                                                              </Tooltip>
                                                          ) : (
                                                              <button
                                                                onClick={this.newProject}
                                                                className="btn btn-primary btn-lg"
                                                                data-test="create-first-project-btn"
                                                                id="create-first-project-btn"
                                                              >
                                                                  <span className="icon ion-ios-rocket"/>
                                                                  {' '}
                                                                Create a project
                                                              </button>
                                                          )}

                                                      </div>
                                                  </div>
                                              </div>
                                            )}
                                          filterRow={(item, search) => item.name.toLowerCase().indexOf(search) > -1}
                                        />
                                    </FormGroup>

                                </div>
                            )}
                        </div>
                    )}
                </OrganisationProvider>
            </div>
        );
    }
};

ProjectSelectPage.propTypes = {};

module.exports = ProjectSelectPage;
