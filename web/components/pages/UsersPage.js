import React, { Component, PropTypes } from 'react';
import EditIdentityModal from './UserPage';

const UsersPage = class extends Component {
    static displayName = 'UsersPage'

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        AppActions.getIdentities(this.props.params.environmentId);
        API.trackPage(Constants.pages.USERS);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.params.environmentId !== this.props.params.environmentId) {
            AppActions.getIdentities(nextProps.params.environmentId);
        }
    }

    onSave = () => {
        toast('Environment Saved');
    };

    editIdentity = (id, envFlags) => {
        openModal(<EditIdentityModal id={id} envFlags={envFlags}/>);
    };

    render() {
        const { projectId, environmentId } = this.props.params;
        const { hasFeature, getValue } = this.props;
        return (
            <div className="app-container container">

                <div>
                    <div>
                        <h3>Users</h3>
                        <p>
                            View and manage features states for individual users. This will override individual default
                            feature
                            settings for your selected environment.
                        </p>
                        <FormGroup>
                            <IdentityListProvider>
                                {({ isLoading, identities, identitiesPaging }) => (
                                    <div>
                                        <FormGroup>
                                            <PanelSearch
                                              id="users-list"
                                              title="Users"
                                              className="no-pad"
                                              icon="ion-md-person"
                                              items={identities}
                                              paging={identitiesPaging}
                                              nextPage={() => AppActions.getIdentitiesPage(environmentId, identitiesPaging.next)}
                                              prevPage={() => AppActions.getIdentitiesPage(environmentId, identitiesPaging.previous)}
                                              goToPage={page => AppActions.getIdentitiesPage(environmentId, `${Project.api}environments/${environmentId}/identities/?page=${page}`)}
                                              renderRow={({ id, identifier }) => (
                                                  <Row space className="list-item" key={id}>
                                                      <Flex>
                                                          <Link
                                                            to={`/project/${this.props.params.projectId}/environment/${this.props.params.environmentId}/users/${id}`}
                                                          >
                                                              {identifier}
                                                          </Link>
                                                      </Flex>
                                                      <ion className="ion-ios-arrow-forward"/>
                                                  </Row>
                                              )}
                                              renderNoResults={(
                                                  <FormGroup className="text-center">
                                                        You have no
                                                        users
                                                        in your
                                                        project.
                                                  </FormGroup>
                                                )}
                                              filterRow={hasFeature('filter_identities') ? (flag, search) => flag.identifier.indexOf(search) != -1 : null}
                                              onChange={e => AppActions.searchIdentities(this.props.params.environmentId, Utils.safeParseEventValue(e))}
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
                                              snippets={Constants.codeHelp.CREATE_USER(this.props.params.environmentId, identities && identities[0] && identities[0].identifier)}
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
