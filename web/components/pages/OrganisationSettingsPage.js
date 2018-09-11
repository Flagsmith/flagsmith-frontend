import React, {Component, PropTypes} from 'react';
import CreateProjectModal from '../modals/CreateProject'
import AccountStore from '../../../common/stores/account-store';
import EditOrganisationModal from '../modals/EditOrganisation'
import InviteUsersModal from '../modals/InviteUsers'
import ConfirmRemoveOrganisation from '../modals/ConfirmRemoveOrganisation'

const TheComponent = class extends Component {
	displayName: 'TheComponent'

	constructor(props, context) {
		super(props, context);
		this.state = {};
		AppActions.getOrganisation(AccountStore.getOrganisation().id);
	}

    componentWillMount = () => {
        API.trackPage(Constants.pages.ORGANISATION_SETTINGS);
    };

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};
	editOrganisation = () => {
		openModal('Edit Organisation', <EditOrganisationModal/>)
	};

	newProject = () => {
		openModal('Create  Project', <CreateProjectModal onSave={(projectId) => {
			this.context.router.push(`/project/${projectId}/environment/create`)
		}}/>)
	};

	onSave = () => {
		toast("Saved organisation")
	}

	confirmRemove = (organisation, cb) => {
		openModal("Remove Organisation", <ConfirmRemoveOrganisation
			organisation={organisation}
			cb={cb}/>)
	};

	onRemove = () => {
		toast("Your organisation has been removed");
		this.context.router.replace("/");
	};

	deleteInvite = (id) => {
		openConfirm(<h3>Delete Invite</h3>, <p>Are you sure you want to delete this invite?</p>, () => AppActions.deleteInvite(id));
	}

	render() {
		const {name} = this.state;

		return (
			<div className="app-container container">
				<FormGroup>
					<AccountProvider onSave={this.onSave} onRemove={this.onRemove}>
						{({
							  isLoading,
							  isSaving,
							  user,
							  organisation
						  }, {createOrganisation, selectOrganisation, editOrganisation, deleteOrganisation}) => (
							<div className="margin-bottom">
								<form key={organisation.id} onSubmit={(e) => {
									e.preventDefault();
									!isSaving && name && editOrganisation(name);
								}}>
									<InputGroup
										ref={(e) => this.input = e}
										inputProps={{defaultValue: organisation.name, className: "full-width"}}
										onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
										isValid={name && name.length}
										type="text" title={<h3>Organisation Name</h3>}
										placeholder="My Organisation"/>
									<div className="text-right">
										<Button disabled={isSaving || !name}>
											{isSaving ? 'Saving' : 'Save'}
										</Button>
									</div>
								</form>
								<FormGroup>
									<strong>
										Delete Organisation
									</strong>
									<p>
										This organisation will be deleted permanently along with all projects & features.
									</p>
									<Button
										id="delete-org-btn"
										onClick={() => this.confirmRemove(organisation, () => {
											deleteOrganisation();
										})}
										className={"btn btn-danger"}>
										Delete
									</Button>
								</FormGroup>
							</div>
						)}
					</AccountProvider>
				</FormGroup>
				<FormGroup>
					<OrganisationProvider>
						{({isLoading, name, projects, users, invites}) => (
							<div>
								<h3>Team members</h3>
								<p>
									Invite email addresses, comma separated
								</p>
								{isLoading && <div className="centered-container"><Loader/></div>}
								{!isLoading && (
									<div>
										<FormGroup>
											<PanelSearch
												id="org-members-list"
												title="Users"
												className={"no-pad"}
												items={users}
												renderRow={({id, first_name,last_name,email}) =>
													<div className={"list-item"} key={id}>
														{first_name + " " + last_name} {id == AccountStore.getUserId() && "(You)"}
														<div className={"list-item-footer faint"}>
															{email}
														</div>
													</div>
												}
												renderNoResults={<div>You have no users in this organisation.</div>}
												filterRow={(item, search) => {
													const strToSearch = `${item.first_name} ${item.last_name} ${item.email}`;
													return strToSearch.toLowerCase().indexOf(search.toLowerCase()) !== -1;
												}}
											/>
										</FormGroup>

										<div className="text-right">
											<Button id={"btn-invite"} onClick={() => openModal(<InviteUsersModal/>)}>
												Invite Users
											</Button>
										</div>

										{invites ? (
											<FormGroup>
												<PanelSearch
													id="org-members-list"
													title="Invites Pending"
													className={"no-pad"}
													items={invites}
													renderRow={({id, email, date_created, invited_by}) =>
														<Row className={"list-item"} key={id}>
															<div className={"flex flex-1"}>
																{email}
																<div className={"list-item-footer faint"}>
																		Created {moment(date_created).format("DD/MMM/YYYY")}
																</div>
																{invited_by ? (
																	<div className={"list-item-footer faint"}>
																		Invited by {invited_by.first_name ? invited_by.first_name + ' ' + invited_by.last_name : invited_by.email}
																	</div>
																) : null}
															</div>
															<Row>
																<Column>
																	<a
																			onClick={() => AppActions.resendInvite(id)}
																			className={"btn btn-link"}>
																			Resend
																	</a>
																</Column>
																<Column>
																	<a
																			onClick={() => this.deleteInvite(id)}
																			className={"btn btn-link"}>
																			Delete
																	</a>
																</Column>
															</Row>
														</Row>
													}
													filterRow={(item, search) => {
														return item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1;
													}}
												/>
											</FormGroup>
										) : null}

									</div>
								)}
							</div>
						)}
					</OrganisationProvider>
				</FormGroup>
			</div>
		);
	}
};

TheComponent.propTypes = {};

module.exports = TheComponent;
