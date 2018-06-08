import React, {Component, PropTypes} from 'react';
import CreateProjectModal from '../modals/CreateProject'
import AccountStore from '../../../common/stores/account-store';
import EditOrganisationModal from '../modals/EditOrganisation'

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getOrganisation(AccountStore.getOrganisation().id);
    }

    componentWillMount = () => {
        API.trackPage(Constants.pages.PROJECT_SELECT);
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    editOrganisation = () => {
        openModal('Edit Organisation', <EditOrganisationModal/>)
    };

    newProject = () => {
        openModal('Create  Project', <CreateProjectModal onSave={({projectId, environmentId}) => {
            this.context.router.push(`/project/${projectId}/environment/${environmentId}/features?new=true`)
        }}/>)
    };

    render() {
        return (
            <div id="project-select-page" className="app-container container">
                <OrganisationProvider>
                    {({isLoading, name, projects, users}) => (
                        <div>
                            {projects && projects.length ? (
                                <div>
                                    <Button onClick={this.newProject} className={"float-right btn btn-primary"}>
                                        Create Project
                                    </Button>
                                    <h3>Your projects</h3>
                                    <p>
                                        Projects let you create and manage a set of features and configure them between
                                        multiple
                                        app environments.
                                    </p>
                                </div>
                            ) : (<div className="text-center">
                                <h3>Great! Now you can create your first project.</h3>
                                <p>
                                    When you create a project we'll also generate a <strong>development</strong> and <strong>production</strong>
                                    {" "}environment for you.
                                </p>
                                <p>
                                    You can create features for your project, then enable and configure them per
                                    environment.
                                </p>
                            </div>)
                            }

                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    <FormGroup>
                                        <PanelSearch
                                            id="projects-list"
                                            className={"no-pad"}
                                            title="Projects"
                                            items={projects}
                                            renderRow={({id, name, environments}) =>
                                                <Link key={id} className={"list-item"}
                                                      to={`/project/${id}/environment/${environments && environments[0] ?
                                                          environments[0].api_key + "/features" : "create"
                                                          }`}>
                                                    <Row>
                                                        <Flex>
                                                            {name}
                                                        </Flex>
                                                        <span className="icon ion-ios-arrow-forward list-item"></span>
                                                    </Row>
                                                </Link>
                                            }
                                            renderNoResults={<div className={"text-center"}>
                                                <div className="text-center">
                                                    <div>
                                                        <button onClick={this.newProject}
                                                                className={"btn btn-primary btn-lg"}
                                                                id="create-first-project-btn">
                                                            <ion className="icon ion-ios-rocket"/>
                                                            {" "}Create a project
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>}
                                            filterRow={(item, search) => {
                                                return item.name.toLowerCase().indexOf(search) > -1;
                                            }}
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

TheComponent.propTypes = {};

module.exports = TheComponent;
