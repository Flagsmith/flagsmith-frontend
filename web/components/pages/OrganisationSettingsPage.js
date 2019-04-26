import React, { Component, PropTypes } from 'react';
import CreateProjectModal from '../modals/CreateProject'
import EditOrganisationModal from '../modals/EditOrganisation'
import InviteUsersModal from '../modals/InviteUsers'
import ConfirmRemoveOrganisation from '../modals/ConfirmRemoveOrganisation'
import PaymentModal from '../modals/Payment';
import CancelPaymentPlanModal from '../modals/CancelPaymentPlan';

const TheComponent = class extends Component {
    static displayName = 'OrganisationSettingsPage';

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
        }}
        />)
    };

    onSave = () => {
        toast("Saved organisation")
    }

    confirmRemove = (organisation, cb) => {
        openModal("Remove Organisation", <ConfirmRemoveOrganisation
            organisation={organisation}
            cb={cb}
        />)
    };

    onRemove = () => {
        toast("Your organisation has been removed");
        if (AccountStore.getOrganisation()) {
            this.context.router.replace("/projects");
        } else {
            this.context.router.replace("/create");
        }
    };

    deleteInvite = (id) => {
        openConfirm(<h3>Delete Invite</h3>, <p>Are you sure you want to delete this
            invite?</p>, () => AppActions.deleteInvite(id));
    }

    save = (e) => {
        e.preventDefault();
        const { name, webhook_notification_email } = this.state;
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
        const { name, webhook_notification_email } = this.state;
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
            <CancelPaymentPlanModal/>,
        );
    }

    render() {
        const { hasFeature, getValue } = this.props;
        const { name, webhook_notification_email } = this.state;
        const freeTrialDaysRemaining = Utils.freeTrialDaysRemaining(AccountStore.getOrganisation().subscription_date);

        return (

            <AccountProvider onSave={this.onSave} onRemove={this.onRemove}>
                {({
                      isLoading,
                      isSaving,
                      user,
                      organisation
                  }, { createOrganisation, selectOrganisation, editOrganisation, deleteOrganisation }) => (
                    <div className="app-container container">
                        <FormGroup>
                            <div className="margin-bottom">
                                <div className="hidden">
                                    {AccountStore.isDemo ? null : organisation.paid_subscription ? (
                                        <div>
                                            <h2 className="text-center margin-bottom">Your organisation is on the {Utils.getPlanName(organisation.plan)} plan</h2>
                                            {!organisation.pending_cancellation ?
                                                <div className="text-center margin-bottom">Click <a onClick={this.cancelPaymentPlan}>here</a> to cancel your automatic renewal of your plan</div> :
                                                <div>This plan has been cancelled and will not automatically be renewed</div>
                                            }
                                            {/* TODO upgrades? */}
                                        </div>
                                    ) : organisation.free_to_use_subscription ? (
                                        <div className="text-center">
                                            <h2 className="text-center margin-bottom">Your organisation is using Bullet Train for free.</h2>
                                            {hasFeature('free_tier') ?
                                                <div className="text-center margin-bottom">You may want to consider upgrading to a paid plan that includes more usage.</div> :
                                                <div className="text-center margin-bottom">As an early adopter of Bullet Train you will be able to use this service for free until DD/MM/YYYY. You will then need to choose a payment plan to continue using Bullet Train.</div>
                                            }
                                            <div><button type="button" className="btn btn-primary text-center mx-auto" onClick={() => openModal(null, <PaymentModal viewOnly={!hasFeature('free_tier')} />, null, {large: true})}>View payment plans</button></div>
                                        </div>
                                    ) : freeTrialDaysRemaining > 0 ? (
                                        <div>
                                            <h2 className="text-center margin-bottom">Your organisation is within the free trial period</h2>
                                            <div className="text-center margin-bottom">You have {freeTrialDaysRemaining} days remaining until you need to choose a payment plan.</div>
                                            <div className="text-center margin-bottom"><button type="button" onClick={() => openModal(null, <PaymentModal viewOnly={true} />, null, {large: true})}>View payment plans</button></div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 className="text-center margin-bottom">Your trial period of Bullet Train is over.</h2>
                                            <div className="text-center margin-bottom"><button type="button" onClick={() => openModal(null, <PaymentModal />, null, {large: true})}>here</button>View payment plans</div>
                                        </div>
                                    )}
								</div>

                                <div className="panel--grey">
                                    <form key={organisation.id} onSubmit={this.save}>
                                        <h5>Organisation</h5>
                                        <Row>
                                            <Column className="m-l-0">
                                                <Input
                                                    ref={(e) => this.input = e}
                                                    value={organisation.name}
                                                    onChange={(e) => this.setState({name: Utils.safeParseEventValue(e)})}
                                                    isValid={name && name.length}
                                                    type="text"
                                                    inputClassName="input--wide"
                                                    placeholder="My Organisation"/>
                                            </Column>
                                            {/* <InputGroup
                                             inputProps={{defaultValue: organisation.webhook_notification_email, className: "full-width"}}
                                             onChange={(e) => this.setState({webhook_notification_email: Utils.safeParseEventValue(e)})}
                                             isValid={webhook_notification_email && webhook_notification_email.length && Utils.isValidEmail(webhook_notification_email)}
                                             type="text" title={<h3>Webhook Notification Email</h3>}
                                             placeholder="Email address"/> */}
                                            <Button disabled={this.saveDisabled()} className="">
                                                {isSaving ? 'Saving' : 'Save'}
                                            </Button>
                                        </Row>
                                    </form>

                                    <div className="plan plan--current flex-row m-t-2">
                                        <div className="plan__prefix">
                                            <img src="/images/bullet-train-1-mark.png" className="plan__prefix__image" alt="BT"/>
                                        </div>
                                        <div className="plan__details">
                                            <p className="text-small m-b-0">Your plan</p>
                                            <h3 className="m-b-0">{Utils.getPlanName(organisation.plan) ? Utils.getPlanName(organisation.plan) : "Free"}</h3>
                                        </div>
                                        <button type="button" className="btn btn-primary text-center ml-auto" onClick={() => openModal(null, <PaymentModal viewOnly={!hasFeature('free_tier')} />, null, {large: true})}>View payment plans</button>
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="m-y-3">
                            <div className="panel--grey">
                                <OrganisationProvider>
                                    {({ isLoading, name, projects, users, invites }) => (
                                        <div>
                                            <div className="flex-row header--icon">
                                                <h5>Team members</h5>
                                                <button id={"btn-invite"} onClick={() => openModal("Invite Users", <InviteUsersModal/>)} className={'btn btn--with-icon p-x-0 p-y-0'}>
                                                    <img className="btn__icon" src="/images/icons/plus-button.svg" alt="Invite"/>
                                                </button>
                                            </div>

                                    {isLoading && <div className="centered-container"><Loader/></div>}
                                    {!isLoading && (
                                        <div>
                                            <FormGroup>
                                                <PanelSearch
                                                    id="org-members-list"
                                                    title="Members"
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
                                                                                    className={"btn btn--anchor"}>
                                                                                    Resend
                                                                                </button>
                                                                            </Column>
                                                                            <Column>
                                                                                <button
                                                                                    id="delete-invite"
                                                                                    onClick={() => this.deleteInvite(id)}
                                                                                    className={"btn btn--with-icon ml-auto btn--remove"}
                                                                                >
                                                                                    <RemoveIcon />
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
                            </div>
                        </FormGroup>
                        <FormGroup className="m-y-3">
                            <Row>
                                <Column className="d-flex">
                                    <h6>Delete Organisation</h6>
                                    <p>This organisation will be deleted permanently along with all projects &
                                        features.</p>
                                </Column>
                                <Button
                                    id="delete-org-btn"
                                    onClick={() => this.confirmRemove(organisation, () => {
                                        deleteOrganisation();
                                    })}
                                    className={"btn btn--with-icon ml-auto btn--remove"}
                                >
                                    <RemoveIcon />
                                </Button>
                            </Row>
                        </FormGroup>
                    </div>
                )}
            </AccountProvider>
        );
    }
};

TheComponent.propTypes = {};

module.exports = ConfigProvider(TheComponent);
