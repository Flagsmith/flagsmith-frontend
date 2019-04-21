import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'CreateEnvironmentPage'

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	onSave = (environment) => {
        this.context.router.push(`/project/${this.props.params.projectId}/environment/${environment.api_key}/features`);
    }
	componentDidMount = () => {
		API.trackPage(Constants.pages.CREATE_ENVIRONMENT);

		this.focusTimeout = setTimeout(() => {
			this.input.focus();
			this.focusTimeout = null;
		}, 500);
	};

	componentWillUnmount() {
		if (this.focusTimeout) {
			clearTimeout(this.focusTimeout);
		}
	}

	render() {
		const {name} = this.state;
		return (
			<div className={"app-container container"}>
				<h3>Create Environment</h3>
				<p>
					{Constants.strings.ENVIRONMENT_DESCRIPTION}
				</p>
				<ProjectProvider id={this.props.params.projectId} onSave={this.onSave}>
					{({isLoading, isSaving, createEnv, error}) => (
						<form onSubmit={(e) => {
							e.preventDefault();
							!isSaving && name && createEnv(name, this.props.params.projectId);
						}}>
							<InputGroup
								ref={(e) => {
									if (e) this.input = e
								}}
								inputProps={{name: "envName", className: "full-width"}}
								onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
								isValid={name}
								type="text" title="Name*"
								placeholder="An environment name e.g. Develop"/>
							{error && <Error error={error}/>}
							<div className="text-right">
								<Button id="create-env-btn" disabled={isSaving || !name}>
									{isSaving ? 'Creating' : 'Create Environment'}
								</Button>
							</div>
						</form>
					)}
				</ProjectProvider>
			</div>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
