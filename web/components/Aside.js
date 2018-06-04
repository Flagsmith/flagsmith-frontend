import React, {Component, PropTypes} from 'react';
import EnvironmentSelect from './EnvironmentSelect'
import Popover from './base/Popover';

const TheComponent = class extends Component {
	displayName: 'TheComponent'

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

	render() {
		return (
			<ProjectProvider id={this.props.projectId}>
				{({isLoading, project}) => (
					<Flex className={"aside " + (this.props.className||"")}>
						<div className="brand-container text-center">
							<Link to="/projects">
								<Row>
									<img height={34} src={"/images/icon.png"}/>
									Bullet Train
								</Row>
							</Link>
						</div>
						{isLoading && <Loader/>}
						{!isLoading && (
							<Flex>
								<Popover className="aside-select"
										 renderTitle={(toggle) => (
											 <a id="env-menu" onClick={toggle}>
												 <Row>
													 <Flex>
														 <span className={"faint"}>
															 {project.name}:
														 </span>
														 <Row id="selected-env">
															 {_.find(project.environments, {api_key: this.props.environmentId}).name}
														 </Row>
													 </Flex>
													 <div className="flex-column icon ion-ios-arrow-down"/>
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
												}}/>
											<div className="btn-container">
												<Link
													id="create-env-link"
													onClick={toggle}
													to={`/project/${this.props.projectId}/environment/create`} className="btn btn-primary">
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
									<Link
										activeClassName={"active"}
										to={
											`/project/${this.props.projectId}/environment/${this.props.environmentId}/segments`
										}>
										<span className={"dot orange"}/>
										Segments
									</Link>
									<Link
										id="users-link"
										activeClassName={"active"}
										to={
											`/project/${this.props.projectId}/environment/${this.props.environmentId}/users`
										}><span className={"dot red"}/>Users</Link>
									<Link
										activeClassName={"active"}
										to={
											`/project/${this.props.projectId}/environment/${this.props.environmentId}/settings`
										}><span className={"dot purple"}/>Environment Settings</Link>
								</Flex>
								<div>
									<Link
										activeClassName={"active"}
										to={
											`/project/${this.props.projectId}/environment/${this.props.environmentId}/project-settings`
										}><span className={"dot purple"}/>Project Settings</Link>
									<Link
										activeClassName={"active"}
										to={`/project/${this.props.projectId}/environment/${this.props.environmentId}/organisation-settings`}>
										Organisation Settings
									</Link>
									<Link
										activeClassName={"active"}
										to={`/documentation?environmentId=${this.props.environmentId}`}>
										Documentation
									</Link>
								</div>
							</Flex>
						)}
					</Flex>
				)}
			</ProjectProvider>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
