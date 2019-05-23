import React, {Component, PropTypes} from 'react';
import ProjectSelect from './ProjectSelect';

const Aside = class extends Component {
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

	onProjectSave = () => {
		AppActions.refreshOrganisation();
	}

	render() {
		const {hasFeature, getValue} = this.props;

		return (
			<OrganisationProvider>
				{({isLoading: isLoadingOrg, projects}) => (
					<ProjectProvider id={this.props.projectId} onSave={this.onProjectSave}>
						{({isLoading, project}) => (
							<Flex className={"aside " + (this.props.className||"")}>
								<div className="brand-container text-center">
									<Link to="/projects">
										<div>
											<img title={"Bullet Train"} height={54}
												 src={"/images/bullet-train-1-mark.svg"}
												 className="brand"/>
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
												projectId={this.props.projectId}
												environmentId={this.props.environmentId}
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
										<div className="flex flex-1"></div>

										<div>
											<Link
												id="project-settings-link"
												activeClassName={"active"}
												className={"link--footer"}
												to={
													`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`
												}>Project Settings</Link>
											<Link
												id="organisation-settings-link"
												activeClassName={"active"}
												className={"link--footer"}
												to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/organisation-settings`}>
												Organisation Settings
											</Link>
											<a
												target={"blank"}
												className={"link--footer"}
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

Aside.propTypes = {};

module.exports = ConfigProvider(Aside);
