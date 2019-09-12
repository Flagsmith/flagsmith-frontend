import React, { Component, PropTypes } from 'react';

const AuditLogPage = class extends Component {
    static displayName = 'AuditLogPage'

    state = {};

    componentDidMount() {
        AppActions.getAuditLog();
        API.trackPage(Constants.pages.AUDIT_LOG);
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.params.environmentId !== this.props.params.environmentId) {
        //     AppActions.getIdentities(nextProps.params.environmentId);
        // }
    }

    filterRow = (logMessage, search) => {
        const stringToSearch = `${logMessage.log} ${logMessage.author.first_name} ${logMessage.author.last_name} ${logMessage.author.email} ${moment(logMessage.created_date).format('L LTS')}`;
        return stringToSearch.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }

    renderRow = ({ created_date, log, author }) => (
        <Row space className="list-item" key={created_date}>
            <Flex>
                <div className="">{moment(created_date).format('L LTS')}</div>
                <div>{log}</div>
                <div>{`Performed by ${author.first_name} ${author.last_name}`}</div>
            </Flex>
        </Row>
    )

    render() {
        const { projectId, environmentId } = this.props.params;
        return (
            <div className="app-container container">

                <div>
                    <div>
                        <h3>Audit Log</h3>
                        <p>
                            View all activity that occured generically across the project and specific to this environment.
                        </p>
                        <FormGroup>
                            <AuditLogProvider>
                                {({ isLoading, auditLog, auditLogPaging }) => (
                                    <div>
                                        {isLoading && <div className="centered-container"><Loader/></div>}
                                        {!isLoading && (
                                            <div>
                                                <FormGroup>
                                                    <PanelSearch
                                                      id="messages-list"
                                                      title="Log Messages"
                                                      className="no-pad"
                                                      icon="ion-md-person"
                                                      items={auditLog}
                                                      paging={auditLogPaging}
                                                      nextPage={() => AppActions.getAuditLogPage(environmentId, auditLogPaging.next)}
                                                      prevPage={() => AppActions.getAuditLogPage(environmentId, auditLogPaging.previous)}
                                                      goToPage={page => AppActions.getAuditLogPage(environmentId, `${Project.api}audit/?page=${page}`)}
                                                      renderRow={this.renderRow}
                                                      renderNoResults={(
                                                          <FormGroup className="text-center">
                                                            You have no
                                                            log messages
                                                            for your
                                                            project.
                                                          </FormGroup>
                                                    )}
                                                      filterRow={this.filterRow}
                                                    />
                                                </FormGroup>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </AuditLogProvider>
                        </FormGroup>

                    </div>
                </div>
            </div>
        );
    }
};

AuditLogPage.propTypes = {};

module.exports = AuditLogPage;
