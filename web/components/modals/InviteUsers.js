import React, { Component } from 'react';

const InviteUsers = class extends Component {
    static displayName = 'InviteUsers'

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: props.name,
            invites: [{
                role: {
                    value: Object.keys(Constants.roles)[0],
                    label: Constants.roles[Object.keys(Constants.roles)[0]],
                },
            }],
        };
    }

    close() {
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

    render() {
        const { invites } = this.state;
        return (
            <OrganisationProvider
              onSave={this.close}
            >
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
                                    <Flex>
                                        <Select
                                          data-test="select-role"
                                          placeholder="Select a role"
                                          value={invite.role}
                                          onChange={role => this.onChange(index, 'role', role)}
                                          className="pt-3 pl-2"
                                          options={_.map(Constants.roles, (label, value) => ({ value, label }))}
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

                            <Button
                              id="btn-add-invite"
                              disabled={isSaving}
                              type="button"
                              onClick={() => this.setState({ invites: this.state.invites.concat([{
                                  value: Object.keys(Constants.roles)[0],
                                  label: Constants.roles[Object.keys(Constants.roles)[0]],
                              }]) })}
                            >
                                {isSaving ? 'Sending' : 'Invite additional member'}
                            </Button>

                            <p className="mt-5">
                                Users without administrator privileges will need to be invited to individual projects.
                                {' '}
                                <a target="_blank" className="link-dark" href="https://docs.bullet-train.io/permissions/">Learn about User Roles.</a>
                            </p>
                            <div className="text-right mt-2">
                                {error && <Error error={error}/>}
                                <Button
                                  id="btn-send-invite"
                                  disabled={isSaving || !this.isValid()}
                                  onClick={() => AppActions.inviteUsers(invites)}
                                  type="submit"
                                >
                                    {isSaving ? 'Sending' : 'Send Invite(s)'}
                                </Button>
                            </div>
                        </form>

                    </div>
                )}

            </OrganisationProvider>
        );
    }
};

InviteUsers.propTypes = {};

module.exports = InviteUsers;
