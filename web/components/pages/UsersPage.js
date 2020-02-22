import React, { Component } from 'react';
import EditIdentityModal from './UserPage';
import CreateUserModal from '../modals/CreateUser';

const UsersPage = class extends Component {
    static displayName = 'UsersPage'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        AppActions.getIdentities(this.props.match.params.environmentId);
        API.trackPage(Constants.pages.USERS);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.match.params.environmentId !== this.props.match.params.environmentId) {
            AppActions.getIdentities(nextProps.match.params.environmentId);
        }
    }

    onSave = () => {
        toast('Environment Saved');
    };

    editIdentity = (id, envFlags) => {
        openModal(<EditIdentityModal id={id} envFlags={envFlags}/>);
    };

    removeIdentity = (id, identifier) => {
        openConfirm(
            <h3>Delete User</h3>,
            <p>
                {'Are you sure you want to delete '}
                <strong>{identifier}</strong>
                {'?'}
            </p>,
            () => AppActions.deleteIdentity(this.props.match.params.environmentId, id),
        );
    }

    newUser = () => {
        openModal('New Users', <CreateUserModal
          environmentId={this.props.match.params.environmentId}
        />, null, { className: 'alert fade expand' });
    }

    render() {
        const { projectId, environmentId } = this.props.match.params;
        const { hasFeature, getValue } = this.props;
        return (
            <div className="app-container container">

                <div>
                    <div>
                        <Row>
                            <Flex>
                                <h3>Users</h3>
                                <p>
                                    View and manage features states for individual users. This will override individual default
                                    feature
                                    settings for your selected environment.
                                </p>
                            </Flex>
                            <Permission level="environment" permission="ADMIN" id={environmentId}>
                                {({ permission }) => (permission ? (
                                    <Button data-test="show-create-feature-btn" id="show-create-feature-btn" onClick={this.newUser}>
                                      Create Users
                                    </Button>
                                ) : (
                                    <Tooltip
                                      html
                                      title={(
                                          <Button
                                            disabled data-test="show-create-feature-btn" id="show-create-feature-btn"
                                            onClick={this.newUser}
                                          >
                                            Create Users
                                          </Button>
                                      )}
                                      place="right"
                                    >
                                        {
                                            Constants.environmentPermissions('Admin')
                                        }
                                    </Tooltip>
                                ))}
                            </Permission>

                        </Row>

                        <FormGroup>
                            <IdentityListProvider>
                                {({ isLoading, identities, identitiesPaging }) => (
                                    <div>
                                        <FormGroup>
                                            <PanelSearch
                                              renderSearchWithNoResults
                                              id="users-list"
                                              title="Users"
                                              className="no-pad"
                                              icon="ion-md-person"
                                              items={identities}
                                              paging={identitiesPaging}
                                              nextPage={() => AppActions.getIdentitiesPage(environmentId, identitiesPaging.next)}
                                              prevPage={() => AppActions.getIdentitiesPage(environmentId, identitiesPaging.previous)}
                                              goToPage={page => AppActions.getIdentitiesPage(environmentId, `${Project.api}environments/${environmentId}/identities/?page=${page}`)}
                                              renderRow={({ id, identifier }, index) => (
                                                  <Row
                                                    space className="list-item" key={id}
                                                    data-test={`user-item-${index}`}
                                                  >
                                                      <Flex>
                                                          <Link
                                                            to={`/project/${this.props.match.params.projectId}/environment/${this.props.match.params.environmentId}/users/${id}`}
                                                          >
                                                              {identifier}
                                                              <span className="ion-ios-arrow-forward ml-3"/>

                                                          </Link>
                                                      </Flex>

                                                      <Column>
                                                          <button
                                                            id="remove-feature"
                                                            className="btn btn--with-icon"
                                                            type="button"
                                                            onClick={() => this.removeIdentity(id, identifier)}
                                                          >
                                                              <RemoveIcon/>
                                                          </button>
                                                      </Column>
                                                  </Row>
                                              )}
                                              renderNoResults={(
                                                  <FormGroup className="text-center">
                                                        You have no users in your project{this.state.search ? <span> for <strong>"{this.state.search}"</strong></span> : ''}.
                                                  </FormGroup>
                                                )}
                                              filterRow={(flag, search) => flag.identifier.indexOf(search) != -1}
                                              onChange={(e) => {
                                                  this.setState({ search: Utils.safeParseEventValue(e) });
                                                  AppActions.searchIdentities(this.props.match.params.environmentId, Utils.safeParseEventValue(e));
                                              }}
                                              isLoading={isLoading}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <p className="faint">
                                                Users are created for your environment automatically when calling
                                                identify/get flags
                                                from any of the SDKs.
                                                <br/>
                                                We've created
                                                {' '}
                                                <strong>user_123456</strong>
                                                {' '}
                                                for you so you always have an example user to
                                                test with on your environments.
                                            </p>
                                            <CodeHelp
                                              showInitially
                                              title="Creating users and getting their feature settings"
                                              snippets={Constants.codeHelp.CREATE_USER(this.props.match.params.environmentId, identities && identities[0] && identities[0].identifier)}
                                            />
                                        </FormGroup>
                                    </div>
                                )}

                            </IdentityListProvider>
                        </FormGroup>

                    </div>
                </div>
            </div>
        );
    }
};

UsersPage.propTypes = {};

module.exports = ConfigProvider(UsersPage);
