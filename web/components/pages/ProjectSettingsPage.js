import React, { Component } from 'react';
import ConfirmRemoveProject from '../modals/ConfirmRemoveProject';
import EditPermissions from '../EditPermissions';

const ProjectSettingsPage = class extends Component {
    static displayName = 'ProjectSettingsPage'

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getProject(this.props.match.params.projectId);
    }

    componentDidMount = () => {
        API.trackPage(Constants.pages.PROJECT_SETTINGS);
    };

    onSave = () => {
        toast('Project Saved');
    };


    componentWillReceiveProps(newProps) {
        if (newProps.projectId !== this.props.projectId) {
            AppActions.getProject(newProps.match.params.projectId);
        }
    }

    onRemove = () => {
        toast('Your project has been removed');
        this.context.router.history.replace('/projects');
    };

    confirmRemove = (project, cb) => {
        openModal('Remove Project', <ConfirmRemoveProject
          project={project}
          cb={cb}
        />);
    };

    render() {
        const { name } = this.state;
        return (
            <div className="app-container container">
                <ProjectProvider id={this.props.match.params.projectId} onRemove={this.onRemove} onSave={this.onSave}>
                    {({ isLoading, isSaving, editProject, deleteProject, project }) => (
                        <div>
                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div className="panel--grey">
                                    <FormGroup>

                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            !isSaving && name && editProject(Object.assign({}, project, { name }));
                                        }}
                                        >
                                            <h5>Project Name</h5>
                                            <Row>
                                                <Column className="m-l-0">
                                                    <Input
                                                      ref={e => this.input = e}
                                                      value={this.state.name || project.name}
                                                      inputClassName="input input--wide"
                                                      name="proj-name"
                                                      onChange={e => this.setState({ name: Utils.safeParseEventValue(e) })}
                                                      isValid={name && name.length}
                                                      type="text" title={<h3>Project Name</h3>}
                                                      placeholder="My Project Name"
                                                    />
                                                </Column>
                                                <Button id="save-proj-btn" disabled={isSaving || !name}>
                                                    {isSaving ? 'Updating' : 'Update Name'}
                                                </Button>
                                            </Row>
                                        </form>
                                    </FormGroup>
                                </div>
                            )}
                            <EditPermissions id={this.props.match.params.projectId} level="project"/>
                            <FormGroup className="m-y-3">
                                <Row>
                                    <Column className="d-flex">
                                        <h5>
                                            Delete Project

                                        </h5>
                                        <p>
                                            This project will be deleted permanently

                                        </p>
                                    </Column>
                                    <Button
                                      onClick={() => this.confirmRemove(project, () => {
                                          deleteProject(this.props.match.params.projectId);
                                      })}
                                      className="btn btn--with-icon ml-auto btn--remove"
                                    >
                                        <RemoveIcon/>
                                    </Button>
                                </Row>

                            </FormGroup>
                        </div>
                    )}
                </ProjectProvider>
            </div>
        );
    }
};

ProjectSettingsPage.propTypes = {};

module.exports = ProjectSettingsPage;
