import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	close = (id) => {
		closeModal();
		this.props.onSave(id)
	}

	componentDidMount = () => {
		setTimeout(() => {
			this.input.focus()
		}, 500);
	};

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
						<div className="pull-right">
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

TheComponent.propTypes = {};

module.exports = TheComponent;
