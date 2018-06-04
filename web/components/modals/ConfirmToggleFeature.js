import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {
			name: props.name
		};
	}

	close() {
		closeModal();
	}

	render() {
		const {environmentFlag, projectFlag, identity} = this.props;
		const isEnabled = environmentFlag && environmentFlag.enabled ? true : false;
		return (
			<ProjectProvider>
				{({project}) => (
					<div id="confirm-toggle-feature-modal">
						<h3>
							This will
							turn <strong>{Format.enumeration.get(projectFlag.name)}</strong> {isEnabled ? "Off" : "On"}
							{" "}for <strong>{_.find(project.environments, {api_key: this.props.environmentId}).name}</strong>
							{identity && <span> user <strong>{this.props.identity}</strong></span>}
						</h3>
						<FormGroup>
							<div>
								<strong>
									Comments (Optional)
								</strong>
							</div>
							<textarea rows={5} onChange={(e) => this.setState({comment: Utils.safeParseEventValue(e)})}>

							</textarea>
						</FormGroup>
						{/*<Row>*/}
						{/*Do the same for all environments <Switch*/}
						{/*checked={this.state.allEnvironments}*/}
						{/*onChange={(allEnvironments) => {*/}
						{/*this.setState({allEnvironments})*/}
						{/*}}/>*/}
						{/*</Row>*/}
						<FormGroup className="text-right">
							<Button onClick={() => {
								this.close();
								this.props.cb(this.state.allEnvironments ? project.environments : [_.find(project.environments, {api_key: this.props.environmentId})])
							}} className={"btn btn-primary"} id="confirm-toggle-feature-btn">
								Confirm changes
							</Button>
						</FormGroup>
					</div>
				)}
			</ProjectProvider>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
