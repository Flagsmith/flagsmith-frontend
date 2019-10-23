import React, { Component } from 'react';

const AuditLogPage = class extends Component {
    static displayName = 'AuditLogPage'

    state = {};

    componentDidMount() {
        AppActions.getAuditLog();
        API.trackPage(Constants.pages.AUDIT_LOG);
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.params.environmentId !== this.props.match.params.environmentId) {
        //     AppActions.getIdentities(nextProps.params.environmentId);
        // }
    }

    filterRow = (logMessage, search) => {
        const stringToSearch = `${logMessage.log} ${logMessage.author.first_name} ${logMessage.author.last_name} ${logMessage.author.email} ${moment(logMessage.created_date).format('L LTS')}`;
        return stringToSearch.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }

    renderRow = ({ created_date, log, author }) => (
        <Row space className="list-item audit__item" key={created_date}>
            <Flex>
                <div
                  className="audit__log"
                >
                    {log}
                </div>
                {!!author && (
                <div
                      className="audit__author"
                    >
                        {author? `${author.first_name} ${author.last_name}`: 'Unknown'}
                    </div>
            </Flex>
            <div className="audit__date">{moment(created_date).format('Do MMM YYYY HH:mma')}</div>
        </Row>
    )

    render() {
        const { environmentId } = this.props.match.params;
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
                                            <div className="audit">
                                                <FormGroup>
                                                    <PanelSearch
                                                      id="messages-list"
                                                      title="Log entries"
                                                      className="no-pad"
                                                      icon="ion-md-browsers"
                                                      items={auditLog}
                                                      paging={auditLogPaging}
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
