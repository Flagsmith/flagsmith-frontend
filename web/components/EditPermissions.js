// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tabs from './base/forms/Tabs';
import TabItem from './base/forms/TabItem';
import InviteUsersModal from './modals/InviteUsers';
import CreateGroupModal from './modals/CreateGroup';
import UserGroupList from './UserGroupList';

export default class EditPermissions extends PureComponent {
  static displayName = 'EditPermissions';

  static propTypes = {};

  editUserPermissions = (user) => {

  }

  editGroupPermissions = (user) => {

  }

  render() {
      // const { props } = this;
      return (
          <div className="mt-5">
              <h5>
                Manage Permissions
              </h5>
              <Tabs>
                  <TabItem tabLabel="Users">
                      <OrganisationProvider>
                          {({ isLoading, name, projects, usage, users, invites }) => (
                              <div>
                                  {isLoading && <div className="centered-container"><Loader/></div>}
                                  {!isLoading && (
                                  <div>
                                      <FormGroup className="panel--grey">
                                          <PanelSearch
                                            id="org-members-list"
                                            title="Members"
                                            className="no-pad"
                                            items={users}
                                            renderRow={({ id, first_name, last_name, email, role }) => (
                                                <Row
                                                  onClick={() => this.editUserPermissions({ id, first_name, last_name, email, role })} space className="clickable list-item"
                                                  key={id}
                                                >
                                                    <div>
                                                        {`${first_name} ${last_name}`}
                                                        {' '}
                                                        {id == AccountStore.getUserId() && '(You)'}
                                                        <div className="list-item-footer faint">
                                                            {email}
                                                        </div>
                                                    </div>
                                                    <ion style={{fontSize:24}} className="icon--green ion ion-md-settings"/>
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
                                          <div id="select-portal"/>
                                      </FormGroup>
                                  </div>
                                  )}
                              </div>
                          )}
                      </OrganisationProvider>
                  </TabItem>
                  <TabItem tabLabel="Groups"/>
              </Tabs>
          </div>
      );
  }
}
