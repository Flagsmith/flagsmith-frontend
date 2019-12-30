import React, { Component } from 'react';
import CreateProjectModal from '../modals/CreateProject';
import EditOrganisationModal from '../modals/EditOrganisation';
import InviteUsersModal from '../modals/InviteUsers';
import ConfirmRemoveOrganisation from '../modals/ConfirmRemoveOrganisation';
import PaymentModal from '../modals/Payment';
import CancelPaymentPlanModal from '../modals/CancelPaymentPlan';
import data from '../../../common/data/base/_data';

const OrganisationSettingsPage = class extends Component {
    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    static displayName = 'OrganisationSettingsPage';

    constructor(props, context) {
        super(props, context);
        this.state = {
            manageSubscriptionLoaded: true,
        };
        AppActions.getOrganisation(AccountStore.getOrganisation().id);
        // todo could be a provider
        const org = AccountStore.getOrganisation();
        if (props.hasFeature('manage_chargbee') && org.subscription) {
            this.state.manageSubscriptionLoaded = false;
            data.get(`/organisations/${org.id}/portal-url`)
                .then((chargebeeURL) => {
                    this.setState({
                        manageSubscriptionLoaded: true,
                        chargebeeURL,
                    });
                });
        }
    }

    componentDidMount = () => {
        API.trackPage(Constants.pages.ORGANISATION_SETTINGS);

        if (AccountStore.getOrganisationRole() !== 'ADMIN') {
            this.context.router.history.replace('/projects');
        }
    };

    editOrganisation = () => {
        openModal('Edit Organisation', <EditOrganisationModal/>);
    };

    newProject = () => {
        openModal('Create  Project', <CreateProjectModal onSave={(projectId) => {
            this.context.router.history.push(`/project/${projectId}/environment/create`);
        }}
        />);
    };

    onSave = () => {
        toast('Saved organisation');
    }

    confirmRemove = (organisation, cb) => {
        openModal('Remove Organisation', <ConfirmRemoveOrganisation
          organisation={organisation}
          cb={cb}
        />);
    };

    onRemove = () => {
        toast('Your organisation has been removed');
        if (AccountStore.getOrganisation()) {
            this.context.router.history.replace('/projects');
        } else {
            this.context.router.history.replace('/create');
        }
    };

    deleteInvite = (id) => {
        openConfirm(<h3>Delete Invite</h3>, <p>
            Are you sure you want to delete this
            invite?
                                            </p>, () => AppActions.deleteInvite(id));
    }

    deleteUser = (id) => {
        openConfirm(<h3>Delete User</h3>, <p>
            Are you sure you want to delete this user?
                                          </p>, () => AppActions.deleteUser(id));
    }

    save = (e) => {
        e.preventDefault();
        const { name, webhook_notification_email } = this.state;
        if (AccountStore.isSaving || (!name && webhook_notification_email === undefined)) {
            return;
        }

        const org = AccountStore.getOrganisation();
        AppActions.editOrganisation({
            name: name || org.name,
            webhook_notification_email: webhook_notification_email !== undefined ? webhook_notification_email : org.webhook_notification_email,
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

    roleChanged = (id, { value: role }) => {
        AppActions.updateUserRole(id, role);
    }

    render() {
        const { hasFeature, getValue } = this.props;
        const { name, webhook_notification_email } = this.state;

        return (
            <AccountProvider onSave={this.onSave} onRemove={this.onRemove}>
                {({
                    isLoading,
                    isSaving,
                    user,
                    organisation,
                }, { createOrganisation, selectOrganisation, editOrganisation, deleteOrganisation }) => (
                    <div className="app-container container">
                        <FormGroup>
                            <div className="margin-bottom">
                                <div className="panel--grey" style={{ marginTop: '9em' }}>
                                    <form key={organisation.id} onSubmit={this.save}>
                                        <h5>Organisation Name</h5>
                                        <Row>
                                            <Column className="m-l-0 mb-2">
                                                <Input
                                                  ref={e => this.input = e}
                                                  value={this.state.name || organisation.name}
                                                  onChange={e => this.setState({ name: Utils.safeParseEventValue(e) })}
                                                  isValid={name && name.length}
                                                  type="text"
                                                  inputClassName="input--wide"
                                                  placeholder="My Organisation"
                                                />
                                            </Column>
                                            <Button disabled={this.saveDisabled()} className="">
                                                {isSaving ? 'Saving' : 'Save'}
                                            </Button>
                                        </Row>
                                    </form>
                                    <div className="plan plan--current flex-row m-t-2">
                                        <div className="plan__prefix">
                                            <img
                                              src="/images/bullet-train-1-mark.png" className="plan__prefix__image"
                                              alt="BT"
                                            />
                                        </div>
                                        <div className="plan__details flex flex-1">
                                            <p className="text-small m-b-0">Your plan</p>
                                            <h3 className="m-b-0">{Utils.getPlanName(_.get(organisation, 'subscription.plan')) ? Utils.getPlanName(_.get(organisation, 'subscription.plan')) : 'Free'}</h3>
                                        </div>
                                        <div>
                                            { organisation.subscription ? (
                                                <button
                                                  disabled={!this.state.manageSubscriptionLoaded}
                                                  type="button" className="btn btn-primary text-center ml-auto mt-2 mb-2"
                                                  onClick={() => {
                                                      if (this.state.chargebeeURL) {
                                                          window.location = this.state.chargebeeURL;
                                                      } else {
                                                          openModal(null, <PaymentModal
                                                            viewOnly={false}
                                                          />, null, { large: true });
                                                      }
                                                  }}
                                                >
                                                  Manage payment plan
                                                </button>
                                            ) : (
                                                <button
                                                  type="button" className="btn btn-primary text-center ml-auto mt-2 mb-2"
                                                  onClick={() => openModal(null, <PaymentModal
                                                    viewOnly={false}
                                                  />, null, { large: true })}
                                                >
                                                  View payment plans
                                                </button>
                                            ) }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="mt-5">
                            <div>
                                <OrganisationProvider>
                                    {({ isLoading, name, projects, usage, users, invites }) => (
                                        <div>

                                            <div className="col-md-12">
                                                <div className="flex-row header--icon">
                                                    <h5>Your usage</h5>
                                                </div>
                                                {!isLoading && usage != null && (
                                                <div>
                                                    <p>
                                                        {'You have made '}
                                                        <strong>{`${Utils.numberWithCommas(usage)}`}</strong>
                                                        {' requests over the past 30 days.'}
                                                    </p>
                                                </div>
                                                )}

                                                <div className="flex-row header--icon mt-5">
                                                    <h5>Team members</h5>
                                                    <button
                                                      id="btn-invite" onClick={() => openModal('Invite Users',
                                                          <InviteUsersModal/>)}
                                                      className="btn btn--with-icon p-x-0 p-y-0"
                                                      type="button"
                                                    >
                                                        <img
                                                          className="btn__icon" src="/images/icons/plus-button.svg"
                                                          alt="Invite"
                                                        />
                                                    </button>
                                                </div>
                                                {organisation.num_seats && (
                                                    <p>
                                                        {'You are currently using '}
                                                        <strong className={organisation.num_seats > (_.get(organisation, 'subscription.max_seats') || 1) ? 'text-danger' : ''}>
                                                            {`${organisation.num_seats} / ${_.get(organisation, 'subscription.max_seats') || 1}`}
                                                        </strong>
                                                        {` seat${organisation.num_seats === 1 ? '' : 's'}.`}
                                                    </p>
                                                )}
                                                <p><a className="text__link" href="https://docs.bullet-train.io/system-administration/">Learn about User Roles</a></p>
                                            </div>
                                            <div className="panel--grey">
                                                {isLoading && <div className="centered-container"><Loader/></div>}
                                                {!isLoading && (
                                                <div>
                                                    <FormGroup>
                                                        <PanelSearch
                                                          id="org-members-list"
                                                          title="Members"
                                                          className="no-pad"
                                                          items={users}
                                                          renderRow={({ id, first_name, last_name, email, role }) => (
                                                              <Row space className="list-item" key={id}>
                                                                  <div>
                                                                      {`${first_name} ${last_name}`}
                                                                      {' '}
                                                                      {id == AccountStore.getUserId() && '(You)'}
                                                                      <div className="list-item-footer faint">
                                                                          {email}
                                                                      </div>
                                                                  </div>
                                                                  <Row>
                                                                      <Column>
                                                                          {organisation.role === 'ADMIN' && id !== AccountStore.getUserId() ? (
                                                                              <div style={{ width: 200 }}>
                                                                                  <Select
                                                                                    data-test="select-role"
                                                                                    placeholder="Select a role"
                                                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                                                    value={role && { value: role, label: Constants.roles[role] }}
                                                                                    onChange={e => this.roleChanged(id, Utils.safeParseEventValue(e))}
                                                                                    className="pl-2"
                                                                                    options={_.map(Constants.roles, (label, value) => ({ value, label }))}
                                                                                    menuPortalTarget={document.body}
                                                                                    menuPosition="absolute"
                                                                                    menuPlacement="auto"
                                                                                  />
                                                                              </div>
                                                                          ) : (
                                                                              <div className="pl-3">{Constants.roles[role] || ''}</div>
                                                                          )}
                                                                      </Column>

                                                                      <Column>
                                                                          <button
                                                                            id="delete-invite"
                                                                            type="button"
                                                                            onClick={() => this.deleteUser(id)}
                                                                            className="btn btn--with-icon ml-auto btn--remove"
                                                                          >
                                                                              <RemoveIcon/>
                                                                          </button>
                                                                      </Column>
                                                                  </Row>
                                                              </Row>
                                                          )}
                                                          renderNoResults={(
                                                              <div>
                                                                  You have no users in this organisation.
                                                              </div>
)}
                                                          filterRow={(item, search) => {
                                                              const strToSearch = `${item.first_name} ${item.last_name} ${item.email}`;
                                                              return strToSearch.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                                                          }}
                                                        />
                                                        <div id="select-portal" />
                                                    </FormGroup>

                                                    {invites && invites.length ? (
                                                        <FormGroup className="margin-top">
                                                            <PanelSearch
                                                              id="org-invites-list"
                                                              title="Invites Pending"
                                                              className="no-pad"
                                                              items={invites}
                                                              renderRow={({ id, email, date_created, invited_by }, i) => (
                                                                  <Row
                                                                    data-test={`pending-invite-${i}`}
                                                                    className="list-item" key={id}
                                                                  >
                                                                      <div className="flex flex-1">
                                                                          {email}
                                                                          <div className="list-item-footer faint">
                                                                                    Created
                                                                              {' '}
                                                                              {moment(date_created).format('DD/MMM/YYYY')}
                                                                          </div>
                                                                          {invited_by ? (
                                                                              <div
                                                                                className="list-item-footer faint"
                                                                              >
                                                                                        Invited by
                                                                                  {' '}
                                                                                  {invited_by.first_name ? `${invited_by.first_name} ${invited_by.last_name}` : invited_by.email}
                                                                              </div>
                                                                          ) : null}
                                                                      </div>
                                                                      <Row>
                                                                          <Column>
                                                                              <button
                                                                                id="resend-invite"
                                                                                type="button"
                                                                                onClick={() => AppActions.resendInvite(id)}
                                                                                className="btn btn--anchor"
                                                                              >
                                                                                        Resend
                                                                              </button>
                                                                          </Column>
                                                                          <Column>
                                                                              <button
                                                                                id="delete-invite"
                                                                                type="button"
                                                                                onClick={() => this.deleteInvite(id)}
                                                                                className="btn btn--with-icon ml-auto btn--remove"
                                                                              >
                                                                                  <RemoveIcon/>
                                                                              </button>
                                                                          </Column>
                                                                      </Row>
                                                                  </Row>
                                                              )}
                                                              filterRow={(item, search) => item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1}
                                                            />
                                                        </FormGroup>
                                                    ) : null}
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </OrganisationProvider>
                            </div>
                        </FormGroup>
                        <FormGroup className="mt-5">
                            <Row>
                                <Column className="d-flex pl-3">
                                    <h6>Delete Organisation</h6>
                                    <p>
                                        This organisation will be deleted permanently along with all projects & features.
                                    </p>
                                </Column>
                                <Button
                                  id="delete-org-btn"
                                  onClick={() => this.confirmRemove(organisation, () => {
                                      deleteOrganisation();
                                  })}
                                  className="btn btn--with-icon ml-auto btn--remove"
                                >
                                    <RemoveIcon/>
                                </Button>
                            </Row>
                        </FormGroup>
                    </div>
                )}
            </AccountProvider>
        );
    }
};

OrganisationSettingsPage.propTypes = {};

module.exports = ConfigProvider(OrganisationSettingsPage);
