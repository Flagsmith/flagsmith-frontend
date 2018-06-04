import React, {Component, PropTypes} from 'react';
import CreateProjectModal from '../modals/CreateProject'
import AccountStore from '../../../common/stores/account-store';
import EditOrganisationModal from '../modals/EditOrganisation'
import InviteUsersModal from '../modals/InviteUsers'

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

	render() {
		const {name} = this.state;

		return (
			<div className="app-container container">
				<FormGroup>
					<AccountProvider onSave={this.onSave}>
						{({
							  isLoading,
							  isSaving,
							  user,
							  organisation
						  }, {createOrganisation, selectOrganisation, editOrganisation}) => (
							<form onSubmit={(e) => {
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
						)}
					</AccountProvider>
				</FormGroup>
				<FormGroup>
					<OrganisationProvider>
						{({isLoading, name, projects, users}) => (
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
												title="Users"
												className={"no-pad"}
												items={users}
												renderRow={({id, first_name,last_name,email}) =>
													<div className={"list-item"} key={id}>
														{first_name ? first_name + " " + last_name : email + ' <Pending Invite>'} {id == AccountStore.getUserId() && "(You)"}
													</div>
												}
												renderNoResults={<div>You have no users in this organisation.</div>}
												filterRow={(item, search) => {
													//TODO:
													return true;
												}}
											/>
										</FormGroup>

										<div className="text-right">
											<Button onClick={() => openModal(<InviteUsersModal/>)}>
												Invite Users
											</Button>
										</div>

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
