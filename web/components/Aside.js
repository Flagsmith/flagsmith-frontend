import React, {Component, PropTypes} from 'react';
import EnvironmentSelect from './EnvironmentSelect';
import ProjectSelect from './ProjectSelect';
import Popover from './base/Popover';

const TheComponent = class extends Component {
	static displayName = 'Aside';

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.state = {};
		AppActions.getProject(this.props.projectId);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.projectId !== this.props.projectId) {
			AppActions.getProject(this.props.projectId);
		}
	}

	onEditClick = (e) => {
		e.stopPropagation();
		console.log("Stopped prop")
	}

	onProjectSave = () => {
		AppActions.refreshOrganisation();
	}

	render() {
		const isDark = /*pathname.indexOf('/blog') !== -1*/ true;
		return (
			<OrganisationProvider>
        {({isLoading: isLoadingOrg, projects}) => (
					<ProjectProvider id={this.props.projectId} onSave={this.onProjectSave}>
						{({isLoading, project}) => (
							<Flex className={"animated aside " + (this.props.className||"")}>
								<div className="brand-container text-center">
									<Link to="/projects">
										<div>
											{isDark ? (<img title={"Bullet Train"} height={24}
																			src={"/images/bullet-train-1.svg"}
																			className="brand"/>) :
											(<img title={"Bullet Train"} height={24}
														src={"/images/bullet-train-black.svg"}
														className="brand"/>)}
										</div>
									</Link>
								</div>
								{(isLoading || isLoadingOrg) && <Loader/>}
								{!isLoading && !isLoadingOrg && (
									<Flex>
										<Popover className="aside-select aside-select--project"
												renderTitle={(toggle) => (
													<a id="project-menu" onClick={toggle}>
														<Row>
															<Flex>
																<span className={"faint--white"}>
																	Project
																</span>
																<Row id="selected-proj">
																	{_.find(projects, {id: parseInt(this.props.projectId)}).name}
																</Row>
															</Flex>
															<div style={{fontSize:"1.25em"}} className="flex-column icon ion-ios-arrow-down"/>
														</Row>
													</a>
												)}>
											{(toggle) => (
												<div>
													<ProjectSelect
														clearableValue={false}
														onChange={(project) => {
															toggle();
															AppActions.getProject(project.id);
															this.context.router.push(`/project/${project.id}/environment/${project.environments[0].api_key}/features`);
															AsyncStorage.setItem('lastEnv', JSON.stringify({
																	orgId: AccountStore.getOrganisation().id,
																	projectId: project.id,
																	environmentId: project.environments[0].api_key
															}));
														}}/>
													<div className="btn-container">
														<Link
															id="create-project-link"
															onClick={toggle}
															to={`/projects`} className="btn" state={{create: true}}>
															Create Project
														</Link>
													</div>
												</div>
											)}
										</Popover>
										<Popover className="aside-select aside-select--env"
												renderTitle={(toggle) => (
													<a id="env-menu" onClick={toggle}>
														<Row>
															<Flex>
																<span className={"faint"}>
																	Environment
																</span>
																<Row id="selected-env">
																	{_.find(project.environments, {api_key: this.props.environmentId}).name}
																</Row>
															</Flex>
															<div style={{fontSize:"1.25em"}} className="flex-column icon ion-ios-arrow-down"/>
														</Row>
													</a>
												)}>
											{(toggle) => (
												<div>
													<EnvironmentSelect
														clearableValue={false}
														onChange={(environment) => {
															toggle();
															this.context.router.push(`/project/${this.props.projectId}/environment/${environment}/features`);
															AsyncStorage.setItem('lastEnv', JSON.stringify({
																	orgId: AccountStore.getOrganisation().id,
																	projectId: this.props.projectId,
																	environmentId: environment
															}));
														}}/>
													<div className="btn-container">
														<Link
															id="create-env-link"
															onClick={toggle}
															to={`/project/${this.props.projectId}/environment/create`} className="btn">
															Create Environment
														</Link>
													</div>
												</div>
											)}
										</Popover>
										<Flex className="links">
											<Link
												activeClassName={"active"}
												to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/features`
												}><span className={"dot green"}/>Features</Link>
											{/*<Link*/}
												{/*activeClassName={"active"}*/}
												{/*to={*/}
													{/*`/project/${this.props.projectId}/environment/${this.props.environmentId}/segments`*/}
												{/*}>*/}
												{/*<span className={"dot orange"}/>*/}
												{/*Segments*/}
											{/*</Link>*/}
											<Link
												id="users-link"
												activeClassName={"active"}
												to={
													`/project/${this.props.projectId}/environment/${this.props.environmentId}/users`
												}><span className={"dot red"}/>Users</Link>
											<Link
												id="env-settings-link"
												activeClassName={"active"}
												to={
													`/project/${this.props.projectId}/environment/${this.props.environmentId}/settings`
												}><span className={"dot purple"}/>Environment Settings</Link>
										</Flex>
										<div>
											<Link
												id="project-settings-link"
												activeClassName={"active"}
												to={
													`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`
												}><span className={"dot purple"}/>Project Settings</Link>
											<Link
																						id="organisation-settings-link"
																						activeClassName={"active"}
												to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/organisation-settings`}>
												Organisation Settings
											</Link>
											<a
												target={"blank"}
												href={`https://docs.bullet-train.io`}>
												Documentation
											</a>
										</div>
									</Flex>
								)}
							</Flex>
						)}
					</ProjectProvider>
				)}
			</OrganisationProvider>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
