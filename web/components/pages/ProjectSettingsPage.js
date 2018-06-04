import React, {Component, PropTypes} from 'react';
import ConfirmRemoveProject from '../modals/ConfirmRemoveProject';

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

	onSave = () => {
		toast('Project Saved');
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

	confirmRemove = (project, cb) => {
		openModal("Remove Project", <ConfirmRemoveProject
			project={project}
			cb={cb}/>)
	};

	render() {
		const {name} = this.state;
		return (
			<div className="app-container container">
				<ProjectProvider id={this.props.params.projectId} onRemove={this.onRemove} onSave={this.onSave}>
					{({isLoading, isSaving, editProject, deleteProject, project}) => (
						<div>
							{isLoading && <div className="centered-container"><Loader/></div>}
							{!isLoading && (
								<div>
									<FormGroup>
										<form onSubmit={(e) => {
											e.preventDefault();
											!isSaving && name && editProject(Object.assign({}, project, {name}));
										}}>
											<InputGroup
												ref={(e) => this.input = e}
												inputProps={{defaultValue: project.name, className: "full-width"}}
												onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
												isValid={name && name.length}
												type="text" title={<h3>Project Name</h3>}
												placeholder="My Product Name"/>
											<div className="text-right">
												<Button disabled={isSaving || !name}>
													{isSaving ? 'Saving' : 'Save'}
												</Button>
											</div>
										</form>
									</FormGroup>
									<FormGroup>
										<strong>
											Delete Project
										</strong>
										<p>
											This project will be deleted permanently
										</p>
										<Button
											onClick={() => this.confirmRemove(project, () => {
												deleteProject(this.props.params.projectId)
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
