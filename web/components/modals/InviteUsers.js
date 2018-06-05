import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

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
        setTimeout(() => {
            this.input.focus()
        }, 500);
    };

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
                baseURL={`${document.location.origin}/invite/`}
                onSave={this.close}>
                {({isSaving, error, inviteUsers}) => (
                    <div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            inviteUsers(emailAddresses);
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
                        <div className="pull-right">
                            <Button
                                id={"btn-send-invite"}
                                disabled={isSaving || !this.isValid()} onClick={() => inviteUsers(emailAddresses)}>
                                {isSaving ? 'Sending' : 'Send Invites'}
                            </Button>
                        </div>
                    </div>
                )}

            </OrganisationProvider>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
