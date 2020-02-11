import React, { Component } from 'react';
import UserGroupsProvider from '../../../common/providers/UserGroupsProvider';

const CreateGroup = class extends Component {
    static displayName = 'CreateGroup'

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: props.group ? props.group.name : '',
            users: props.group ? props.group.users : [],
        };
    }

    close() {
        closeModal();
    }


    componentDidMount = () => {
        if (!this.props.isEdit && !E2E) {
            this.focusTimeout = setTimeout(() => {
                this.input.focus();
                this.focusTimeout = null;
            }, 500);
        }
    };

    componentWillUnmount() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
        }
    }

    save = (e) => {
        Utils.preventDefault(e);
        const { name, users } = this.state;
        if (this.props.group) {
            AppActions.updateGroup(this.props.orgId, {
                id: this.props.group.id,
                name,
                users,
            });
        } else {
            AppActions.createGroup(this.props.orgId, {
                name,
                users,
            });
        }
    }

    render() {
        const { name, users } = this.state;
        const isEdit = !!this.props.group;
        return (
            <UserGroupsProvider onSave={this.close}>
                {({ isSaving }) => (
                    <form
                      id="create-feature-modal"
                      onSubmit={this.save}
                    >
                        <InputGroup
                          ref={e => this.input = e}
                          data-test="groupName"
                          inputProps={{
                              className: 'full-width',
                              name: 'groupName',
                          }}
                          value={name}
                          onChange={e => this.setState({ name: Utils.safeParseEventValue(e) })}
                          isValid={name && name.length}
                          type="text"
                          name="Name*"
                          placeholder="E.g. Developers"
                        />
                        <div className="text-right">
                            {isEdit ? (
                                <Button data-test="update-feature-btn" id="update-feature-btn" disabled={isSaving || !name}>
                                    {isSaving ? 'Updating' : 'Update Group'}
                                </Button>
                            ) : (
                                <Button data-test="create-feature-btn" id="create-feature-btn" disabled={isSaving || !name}>
                                    {isSaving ? 'Creating' : 'Create Group'}
                                </Button>
                            )}
                        </div>
                    </form>
                )}
            </UserGroupsProvider>

        );
    }
};

CreateGroup.propTypes = {};

module.exports = ConfigProvider(CreateGroup);
