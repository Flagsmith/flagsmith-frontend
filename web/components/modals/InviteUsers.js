import React, {Component, PropTypes} from 'react';

const InviteUsers = class extends Component {
    displayName: 'InviteUsers'

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: props.name
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

    isValid = () => {
        if (!this.state.emailAddresses) {
            return false;
        }

        const emailAddresses = this.state.emailAddresses.replace(' ', '').split(',');
        return _.find(emailAddresses, addr => !Utils.isValidEmail(addr)) ? false : true;
    }

    render() {
        const {emailAddresses} = this.state;
        return (
            <OrganisationProvider
                onSave={this.close}>
                {({isSaving, error}) => (
                    <div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            AppActions.inviteUsers(emailAddresses);
                        }}>
                            <InputGroup
                                ref={(e) => this.input = e}
                                inputProps={{
                                    name: "inviteEmails",
                                    className: "full-width"
                                }}
                                onChange={(e) => this.setState({
                                    emailAddresses: Utils.safeParseEventValue(e)
                                })}
                                value={this.state.emailAddresses}
                                isValid={this.isValid}
                                type="text" title="Invite users"
                                placeholder="E-mail address(es) comma separated"/>
                            {error && <Error error={error}/>}
                        </form>
                        <div className="text-right">
                            <Button
                                id={"btn-send-invite"}
                                disabled={isSaving || !this.isValid()} onClick={() => AppActions.inviteUsers(emailAddresses)}>
                                {isSaving ? 'Sending' : 'Send Invites'}
                            </Button>
                        </div>
                    </div>
                )}

            </OrganisationProvider>
        );
    }
};

InviteUsers.propTypes = {};

module.exports = InviteUsers;
