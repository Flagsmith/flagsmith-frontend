import React, {Component, PropTypes} from 'react';
import CreateProjectModal from '../modals/CreateProject'
import AccountStore from '../../../common/stores/account-store';
import EditOrganisationModal from '../modals/EditOrganisation'
import InviteUsersModal from '../modals/InviteUsers'
import ConfirmRemoveOrganisation from '../modals/ConfirmRemoveOrganisation'
import PaymentModal from '../modals/Payment';
import CancelPaymentPlanModal from '../modals/CancelPaymentPlan';

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

	save = (e) => {
		e.preventDefault();
		const {name, webhook_notification_email} = this.state;
		if (AccountStore.isSaving || (!name && webhook_notification_email === undefined)) {
			return;
		}

		const org = AccountStore.getOrganisation();
		AppActions.editOrganisation({
			name: name ? name : org.name,
			webhook_notification_email: webhook_notification_email !== undefined ? webhook_notification_email : org.webhook_notification_email
		});
	}

	saveDisabled = () => {
		const {name, webhook_notification_email} = this.state;
		if (AccountStore.isSaving || (!name && webhook_notification_email === undefined)) {
			return true;
		}

		// Must have name
		if (name !== undefined && !name) {
			return true;
		}

		// Must be valid email for webhook notification email
		if (webhook_notification_email && !Utils.isValidEmail(webhook_notification_email)) {
			return true;
		}

		return false;
	}

	cancelPaymentPlan = () => {
		openModal(
			<h2>Are you sure you want to cancel your plan?</h2>,
			<CancelPaymentPlanModal />,
		);
	}

	render() {
		const {name, webhook_notification_email} = this.state;
		const freeTrialDaysRemaining = Utils.freeTrialDaysRemaining(AccountStore.getOrganisation().subscription_date);

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
								{organisation.paid_subscription ? (
									<div>
										<h2 className="text-center margin-bottom">Your organisation is on the {Utils.getPlanName(organisation.plan)} plan</h2>
										{!organisation.pending_cancellation ?
											<div className="text-center margin-bottom">Click <a onClick={this.cancelPaymentPlan}>here</a> to cancel your automatic renewal of your plan</div> :
											<div>This plan has been cancelled and will not automatically be renewed</div>
										}
										{/* TODO upgrades? */}
									</div>
								) : organisation.free_to_use_subscription ? (
									<div>
										<h2 className="text-center margin-bottom">Your organisation is using Bullet Train for free.</h2>
										<div className="text-center margin-bottom">As an early adopter of Bullet Train you will be able to use this service for free until DD/MM/YYYY. You will then need to choose a payment plan to continue using Bullet Train.</div>
										<div className="text-center margin-bottom">Click <a onClick={() => openModal(null, <PaymentModal viewOnly={true} />, null, {large: true})}>here</a> to view payment plans</div>
									</div>
								) : freeTrialDaysRemaining > 0 ? (
									<div>
										<h2 className="text-center margin-bottom">Your organisation is within the free trial period</h2>
										<div className="text-center margin-bottom">You have {freeTrialDaysRemaining} days remaining until you need to choose a payment plan.</div>
										<div className="text-center margin-bottom">Click <a onClick={() => openModal(null, <PaymentModal viewOnly={true} />, null, {large: true})}>here</a> to view payment plans</div>
									</div>
								) : (
									<div>
										<h2 className="text-center margin-bottom">Your trial period of Bullet Train is over.</h2>
										<div className="text-center margin-bottom">Click <a onClick={() => openModal(null, <PaymentModal />, null, {large: true})}>here</a> to view payment plans to continue using Bullet Train</div>
									</div>
								)}
								<form key={organisation.id} onSubmit={this.save}>
									<InputGroup
										ref={(e) => this.input = e}
										inputProps={{defaultValue: organisation.name, className: "full-width"}}
										onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
										isValid={name && name.length}
										type="text" title={<h3>Organisation Name</h3>}
										placeholder="My Organisation"/>
									<InputGroup
										inputProps={{defaultValue: organisation.webhook_notification_email, className: "full-width"}}
										onChange={(e) => this.setState({webhook_notification_email: Utils.safeParseEventValue(e)})}
										isValid={webhook_notification_email && webhook_notification_email.length && Utils.isValidEmail(webhook_notification_email)}
										type="text" title={<h3>Webhook Notification Email</h3>}
										placeholder="Email address"/>
									<div className="text-right">
										<Button disabled={this.saveDisabled()}>
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
								<div className="margin-top clearfix">
									<div className="float-left">
										<h3>Team members</h3>
										<p>Invite email addresses, comma separated</p>
									</div>
									<Button id={"btn-invite"} onClick={() => openModal(<InviteUsersModal/>)} className={'float-right btn-primary'}>
										Invite Users
									</Button>
								</div>

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

										{invites && invites.length ? (
											<FormGroup className={"margin-top"}>
												<PanelSearch
													id="org-invites-list"
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
																	<button
																		id="resend-invite"
																		onClick={() => AppActions.resendInvite(id)}
																		className={"btn btn-primary"}>
																		Resend
																	</button>
																</Column>
																<Column>
																	<button
																		id="delete-invite"
																		onClick={() => this.deleteInvite(id)}
																		className={"btn btn-danger"}>
																		Delete
																	</button>
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
