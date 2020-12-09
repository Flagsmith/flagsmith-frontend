import React, { Component } from 'react';
import Tabs from '../base/forms/Tabs';
import TabItem from '../base/forms/TabItem';

const InviteUsers = class extends Component {
    static displayName = 'InviteUsers'

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: props.name,
            invites: [{}],
            tab: 0,
        };
    }

    // close() {
    //     debugger
    //     if (this.state.tab == 1) {
    //         closeModal();
    //     }
    // }

    close(invites) {
        AppActions.inviteUsers(invites);
        closeModal();
    }


    componentDidMount = () => {
        this.focusTimeout = setTimeout(() => {
            this.input.focus();
            this.focusTimeout = null;
        }, 500);
    };

    componentWillUnmount() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
        }
    }

    isValid = () => _.every(this.state.invites, invite => Utils.isValidEmail(invite.emailAddress) && invite.role)

    onChange = (index, key, value) => {
        const invites = this.state.invites;
        invites[index][key] = value;
        this.setState({ invites });
    }

    deleteInvite = (index) => {
        const invites = this.state.invites;
        invites.splice(index, 1);
        this.setState({ invites });
    }

    changeTab = (tab) => {
        this.setState({ 
            invites: [{}],
            tab,
        });
    }

    render() {
        const { invites } = this.state;
        const hasRbacPermission = !this.props.hasFeature('plan_based_access') || Utils.getPlansPermission(AccountStore.getPlans(), 'RBAC');

        return (
            <Tabs value={this.state.tab} onChange={tab => this.changeTab(tab)}>
                <TabItem tabLabel="Invite by email">
                    <OrganisationProvider>
                        {({ isSaving, error }) => (
                            <div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    AppActions.inviteUsers(invites);
                                }}
                                >
                                    {_.map(invites, (invite, index) => (
                                        <Row key={index}>
                                            <Flex>
                                                <InputGroup
                                                ref={e => this.input = e}
                                                inputProps={{
                                                    name: 'inviteEmail',
                                                    className: 'full-width',
                                                }}
                                                onChange={e => this.onChange(index, 'emailAddress', Utils.safeParseEventValue(e))}
                                                value={invite.emailAddress}
                                                isValid={this.isValid}
                                                type="text"
                                                placeholder="E-mail address"
                                                />
                                            </Flex>
                                            <Flex style={{ top: 6, position: 'relative' }}>
                                                <Select
                                                data-test="select-role"
                                                placeholder="Select a role"
                                                value={invite.role}
                                                onChange={role => this.onChange(index, 'role', role)}
                                                className="pl-2"
                                                options={_.map(Constants.roles, (label, value) => ({ value,
                                                    label:
                                                    value !== 'ADMIN' && !hasRbacPermission ? `${label} - Please upgrade for role based access` : label,
                                                    isDisabled: value !== 'ADMIN' && !hasRbacPermission,
                                                }))}
                                                />
                                            </Flex>
                                            {invites.length > 1 ? (
                                                <Column style={{ width: 50 }}>
                                                    <button
                                                    id="delete-invite"
                                                    type="button"
                                                    onClick={() => this.deleteInvite(index)}
                                                    className="btn btn--with-icon ml-auto btn--remove"
                                                    >
                                                        <RemoveIcon/>
                                                    </button>
                                                </Column>
                                            ) : (
                                                <Column style={{ width: 50 }} />
                                            )}
                                        </Row>
                                    ))}

                                    <div className="text-center mt-2">
                                        <ButtonLink
                                        id="btn-add-invite"
                                        disabled={isSaving || !this.isValid()}
                                        type="button"
                                        onClick={() => this.setState({ invites: this.state.invites.concat([{}]) })}
                                        >
                                            {isSaving ? 'Sending' : 'Invite additional member'}
                                            <span className="pl-2 icon ion-ios-add"/>
                                        </ButtonLink>

                                    </div>


                                    <p className="mt-3">
                                        Users without administrator privileges will need to be invited to individual projects.
                                        {' '}
                                        <ButtonLink target="_blank" href="https://docs.flagsmith.com/permissions/">Learn about User Roles.</ButtonLink>
                                    </p>
                                    <div className="text-right mt-2">
                                        {error && <Error error={error}/>}
                                        <Button
                                        id="btn-send-invite"
                                        disabled={isSaving || !this.isValid()}
                                        onClick={() => this.close(invites)}
                                        type="submit"
                                        >
                                            {isSaving ? 'Sending' : 'Send Invitation'}
                                        </Button>
                                    </div>
                                </form>

                            </div>
                        )}

                    </OrganisationProvider>
                </TabItem>
                <TabItem tabLabel="Invite by link">
                    <OrganisationProvider>
                        {({ isSaving, error, invite_link }) => (
                            <div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    AppActions.generateInviteUser();
                                }}
                                >
                                    <div className="mt-3">
                                        <Input
                                            value={invite_link}
                                            defaultValue={invite_link}
                                            inputClassName="input input--wide"
                                            className="full-width"
                                            type="text"
                                            readonly="readonly"
                                            title={<h3>Link</h3>}
                                            placeholder="Link"
                                        />
                                    </div>

                                    <p className="mt-3">
                                        Users without administrator privileges will need to be invited to individual projects.
                                        {' '}
                                        <ButtonLink target="_blank" href="https://docs.flagsmith.com/permissions/">Learn about User Roles.</ButtonLink>
                                    </p>
                                    <div className="text-right mt-2">
                                        {error && <Error error={error}/>}
                                        <Button
                                            id="btn-gen-invite"
                                            disabled={isSaving}
                                            onClick={() => AppActions.generateInviteUser()}
                                            type="submit"
                                        >
                                            {isSaving ? 'Generating' : 'Generate Invitation'}
                                        </Button>
                                    </div>
                                </form>

                            </div>
                        )}
                    </OrganisationProvider>
                </TabItem>
            </Tabs>
        );
    }
};

InviteUsers.propTypes = {};

module.exports = ConfigProvider(InviteUsers);
