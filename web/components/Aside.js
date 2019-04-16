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
											{isDark ? (<img title={"Bullet Train"} height={54}
																			src={"/images/bullet-train-1-mark.svg"}
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
										<div className="project-nav">
											<Row className="project-nav__item--header">
												<span className="flex-1">Projects</span>
                                                <Link
                                                    id="create-project-link"
                                                    to={`/projects`} className="project-nav__button project-nav__button--cta" state={{create: true}}>
                                                    <img className="project-nav__icon" src="/images/plus-button--white.svg" alt="New" />
                                                </Link>
											</Row>
											<ProjectSelect
												clearableValue={false}
												onChange={(project) => {
													AppActions.getProject(project.id);
													this.context.router.push(`/project/${project.id}/environment/${project.environments[0].api_key}/features`);
													AsyncStorage.setItem('lastEnv', JSON.stringify({
														orgId: AccountStore.getOrganisation().id,
														projectId: project.id,
														environmentId: project.environments[0].api_key
													}));
												}}/>
										</div>


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
