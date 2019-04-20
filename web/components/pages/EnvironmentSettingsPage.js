import React, {Component, PropTypes} from 'react';
import ConfirmRemoveEnvironment from '../modals/ConfirmRemoveEnvironment';
import ProjectStore from '../../../common/stores/project-store';

const TheComponent = class extends Component {
    displayName: 'EnvironmentSettingsPage'
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
        this.context.router.replace("/projects");
    };

    confirmRemove = (environment, cb) => {
        openModal("Remove Environment", <ConfirmRemoveEnvironment
            environment={environment}
            cb={cb}/>)
    };

    onRemoveEnvironment = () => {
        this.context.router.replace("/projects");
    };

    saveEnv = (e) => {
        e.preventDefault();
        const {name, webhooks_enabled, webhook_url} = this.state;
        if (ProjectStore.isSaving || (!name && webhooks_enabled === undefined && webhook_url === undefined)) {
            return;
        }
        const env = _.find(ProjectStore.getEnvs(), {api_key: this.props.params.environmentId});
        AppActions.editEnv(Object.assign({}, env, {
            name: name ? name : env.name,
            webhook_url: webhook_url !== undefined ? webhook_url : env.webhook_url,
            webhooks_enabled: webhooks_enabled !== undefined ? webhooks_enabled : env.webhooks_enabled
        }));
    }

    saveDisabled = () => {
        const {name, webhooks_enabled, webhook_url} = this.state;
        if (ProjectStore.isSaving || (!name && webhooks_enabled === undefined && webhook_url === undefined)) {
            return true;
        }

        const env = _.find(ProjectStore.getEnvs(), {api_key: this.props.params.environmentId});

        // Must have name
        if (name !== undefined && !name) {
            return true;
        }

        // Must have webhook URL if webhooks is enabled
        if ((webhooks_enabled !== undefined && webhooks_enabled) && (webhook_url === undefined ? !env.webhook_url : !webhook_url || !Utils.isValidURL(webhook_url))) {
            return true;
        }

        return false;
    }

    render() {
        const {name, webhook_url, webhooks_enabled} = this.state;
        return (
            <div className="app-container container">
                <ProjectProvider
                    onRemoveEnvironment={this.onRemoveEnvironment}
                    id={this.props.params.projectId} onRemove={this.onRemove} onSave={this.onSave}>
                    {({isLoading, isSaving, editProject, editEnv, deleteProject, deleteEnv, project}) => {
                        const env = _.find(project.environments, {api_key: this.props.params.environmentId});
                        return (
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
                                                    readOnly: true,
                                                    style: {userSelect: 'all'}
                                                }}
                                                onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
                                                isValid={name && name.length}
                                                type="text" title={<h3>API Key</h3>}
                                                placeholder="API Key"/>
                                        </FormGroup>
                                        <FormGroup>
                                            <form onSubmit={this.saveEnv}>
                                                <InputGroup
                                                    ref={(e) => this.input = e}
                                                    inputProps={{
                                                        defaultValue: env.name,
                                                        className: "full-width",
                                                        name: 'env-name'
                                                    }}
                                                    onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
                                                    isValid={name && name.length}
                                                    type="text" title={<h3>Environment Name</h3>}
                                                    placeholder="Environment Name"/>
                                                {/* <FormGroup>
                                                    <div>
                                                        <h3>Webhooks Enabled?</h3>
                                                    </div>
                                                    <Switch
                                                        checked={webhooks_enabled === undefined ? env.webhooks_enabled : webhooks_enabled}
                                                        onChange={(webhooks_enabled) => this.setState({webhooks_enabled})}
                                                    />
                                                </FormGroup>
                                                <InputGroup
                                                    inputProps={{
                                                        defaultValue: env.webhook_url,
                                                        className: "full-width",
                                                        name: 'env-webhook-url'
                                                    }}
                                                    onChange={(e) => this.setState({webhook_url: Utils.safeParseEventValue(e)})}
                                                    isValid={webhook_url && webhook_url.length && Utils.isValidURL(webhook_url)}
                                                    type="text" title={<h3>Webhook URL</h3>}
                                                    placeholder="https://webhook.url"
                                                    disabled={webhooks_enabled === undefined ? !env.webhooks_enabled : !webhooks_enabled}/> */}
                                                <div className="text-right clearfix">
                                                    <Button id="save-env-btn" className="float-right" disabled={this.saveDisabled()}>
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
                                                className={"btn btn-danger float-left"}>
                                                Delete
                                            </Button>
                                        </FormGroup>
                                    </div>
                                )}
                            </div>
                        )
                    }}
                </ProjectProvider>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
