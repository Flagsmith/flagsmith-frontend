import React, {Component, PropTypes} from 'react';
import ConfirmRemoveEnvironment from '../modals/ConfirmRemoveEnvironment';

const TheComponent = class extends Component {
    displayName: 'TheComponent'
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getProject(this.props.params.projectId);
    }

    componentWillMount = () => {
        API.trackPage(Constants.pages.ENVIRONMENT_SETTINGS);
    };

    onSave = () => {
        toast('Environment Saved');
    };

    componentWillReceiveProps(newProps) {
        if (newProps.projectId !== this.props.projectId) {
            AppActions.getProject(newProps.params.projectId);
        }
    }

    onRemove = () => {
        toast("Your project has been removed");
        this.context.router.replace("/");
    };

    confirmRemove = (environment, cb) => {
        openModal("Remove Environment", <ConfirmRemoveEnvironment
            environment={environment}
            cb={cb}/>)
    };

    onRemoveEnvironment = () => {
        this.context.router.replace("/projects");
    };

    render() {
        const {name} = this.state;
        return (
            <div className="app-container container">
                <ProjectProvider
                    onRemoveEnvironment={this.onRemoveEnvironment}
                    id={this.props.params.projectId} onRemove={this.onRemove} onSave={this.onSave}>
                    {({isLoading, isSaving, editProject, editEnv, deleteProject, deleteEnv, project}) => (
                        <div>
                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    <FormGroup>
                                        <InputGroup
                                            ref={(e) => this.input = e}
                                            value={this.props.params.environmentId}
                                            inputProps={{
                                                className: "full-width",
                                                readOnly: true
                                            }}
                                            onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
                                            isValid={name && name.length}
                                            type="text" title={<h3>API Key</h3>}
                                            placeholder="API Key"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            !isSaving && name && editEnv(Object.assign({}, _.find(project.environments, {api_key: this.props.params.environmentId}), {name}));
                                        }}>
                                            <InputGroup
                                                ref={(e) => this.input = e}
                                                inputProps={{
                                                    defaultValue: _.find(project.environments, {api_key: this.props.params.environmentId}).name,
                                                    className: "full-width",
                                                    name: 'env-name'
                                                }}
                                                onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
                                                isValid={name && name.length}
                                                type="text" title={<h3>Environment Name</h3>}
                                                placeholder="My Product Name"/>
                                            <div className="text-right">
                                                <Button id="save-env-btn" disabled={isSaving || !name}>
                                                    {isSaving ? 'Saving' : 'Save'}
                                                </Button>
                                            </div>
                                        </form>
                                    </FormGroup>
                                    <FormGroup>
                                        <strong>
                                            Delete Environment
                                        </strong>
                                        <p>
                                            This project will be deleted permanently
                                        </p>
                                        <Button
                                            id="delete-env-btn"
                                            onClick={() => this.confirmRemove(_.find(project.environments, {api_key: this.props.params.environmentId}), () => {
                                                deleteEnv(_.find(project.environments, {api_key: this.props.params.environmentId}))
                                            })}
                                            className={"btn btn-danger"}>
                                            Delete
                                        </Button>
                                    </FormGroup>
                                </div>
                            )}
                        </div>
                    )}
                </ProjectProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
