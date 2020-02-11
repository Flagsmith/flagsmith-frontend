// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import UserGroupsProvider from '../../common/providers/UserGroupsProvider';
import CreateGroup from './modals/CreateGroup';

export default class TheComponent extends PureComponent {
  static displayName = 'TheComponent';

  static propTypes = {};

  constructor(props) {
      super(props);
      this.state = {};
  }

  componentDidMount() {
      AppActions.getGroups(this.props.orgId);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
      if (nextProps.orgId !== this.props.orgId) {
          AppActions.getGroups(nextProps.orgId);
      }
  }

  render() {
      // const { props } = this;
      return (
          <UserGroupsProvider>
              {({ isLoading, userGroups, userGroupsPaging }) => (
                  <div className="mt-5">
                      <FormGroup>
                          <PanelSearch
                            renderSearchWithNoResults
                            id="users-list"
                            title="Groups"
                            className="no-pad"
                            icon="ion-md-people"
                            items={userGroups}
                            paging={userGroupsPaging}
                            nextPage={() => AppActions.getGroupsPage(this.props.orgId, userGroupsPaging.next)}
                            prevPage={() => AppActions.getGroupsPage(this.props.orgId, userGroupsPaging.previous)}
                            goToPage={page => AppActions.getGroupsPage(this.props.orgId, `${Project.api}organisations/${this.props.orgId}/groups/?page=${page}`)}
                            renderRow={({ id, name }, index) => (
                                <Row
                                  space className="list-item" key={id}
                                  data-test={`user-item-${index}`}
                                >
                                    <Flex onClick={() => openModal('Edit Group', <CreateGroup orgId={this.props.orgId} group={{ id, name }}/>)} className="clickable">
                                        {name}
                                    </Flex>

                                    <Column>
                                        <button
                                          id="remove-group"
                                          className="btn btn--with-icon"
                                          type="button"
                                          onClick={() => this.removeGroup(id)}
                                        >
                                            <RemoveIcon/>
                                        </button>
                                    </Column>
                                </Row>
                            )}
                            renderNoResults={(
                                <FormGroup className="text-center">
                                      You have no groups in your organisation.
                                </FormGroup>
                )}
                            isLoading={isLoading}
                          />
                      </FormGroup>
                  </div>
              )}

          </UserGroupsProvider>
      );
  }
}
