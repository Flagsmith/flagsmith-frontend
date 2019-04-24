import React, {Component, PropTypes} from 'react';
import ConfirmRemoveProject from '../modals/ConfirmRemoveProject';

const ProjectSettingsPage = class extends Component {
	displayName: 'ProjectSettingsPage'
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.state = {};
		AppActions.getProject(this.props.params.projectId);
	}

	componentWillMount = () => {
        API.trackPage(Constants.pages.PROJECT_SETTINGS);
    };

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
								<div className="panel--grey">
									<FormGroup>

											<form onSubmit={(e) => {
												e.preventDefault();
												!isSaving && name && editProject(Object.assign({}, project, {name}));
											}}>
												<h5>Project</h5>
												<Row>
													<Column className="m-l-0">
														<Input
															ref={(e) => this.input = e}
															value={this.state.name||project.name}
															inputClassName="input input--wide"
															onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
															isValid={name && name.length}
															type="text" title={<h3>Project Name</h3>}
															placeholder="My Product Name"/>
													</Column>
													<Button id="save-proj-btn" disabled={isSaving || !name}>
														{isSaving ? 'Saving' : 'Save'}
													</Button>
												</Row>
											</form>
									</FormGroup>
								</div>
							)}
							<FormGroup className="m-y-3">
								<Row>
									<Column className="d-flex">
										<strong>
											Delete Project
										</strong>
										<p>
											This project will be deleted permanently
										</p>
									</Column>
									<Button
										onClick={() => this.confirmRemove(project, () => {
											deleteProject(this.props.params.projectId)
										})}
										className={"btn btn--with-icon ml-auto btn--remove"}>
                                        <RemoveIcon />
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
