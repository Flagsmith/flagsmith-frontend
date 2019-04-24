import React, {Component, PropTypes} from 'react';

const CreateProject = class extends Component {
	static displayName = 'CreateProject'

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	close = (id) => {
		closeModal();
		this.props.onSave(id)
	}

	componentDidMount = () => {
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
			<OrganisationProvider onSave={this.close}>
				{({isLoading, isSaving, projects, createProject, error}) => (
					<form id="create-project-modal" onSubmit={(e) => {
						e.preventDefault();
						!isSaving && name && createProject(name);
					}}>
						<InputGroup
							ref={(e) => this.input = e}
							inputProps={{name: 'projectName', className: "full-width"}}
							onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
							isValid={name && name.length}
							type="text" title="Project Name*"
							placeholder="My Product Name"/>
						{error && <Error error={error}/>}
						<div className="text-right">
							<Button id="create-project-btn" disabled={isSaving || !name}>
								{isSaving ? 'Creating' : 'Create Project'}
							</Button>
						</div>
					</form>
				)}

			</OrganisationProvider>
		);
	}
};

CreateProject.propTypes = {};

module.exports = CreateProject;
