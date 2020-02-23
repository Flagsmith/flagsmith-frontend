import React, { Component } from 'react';
import withAuditWebhooks from '../../../common/providers/withAuditWebhooks';
import ConfigProvider from '../../../common/providers/ConfigProvider';
import CreateAuditWebhookModal from '../modals/CreateAuditWebhook';
import ConfirmRemoveAuditWebhook from '../modals/ConfirmRemoveAuditWebhook';

const AuditLogPage = class extends Component {
    static displayName = 'AuditLogPage'

    state = {};

    componentDidMount() {
        AppActions.getAuditLog();
        API.trackPage(Constants.pages.AUDIT_LOG);
        if (this.props.hasFeature('audit_webhooks')) {
            this.props.getWebhooks();
        }
    }


    createWebhook = () => {
        openModal('New Webhook', <CreateAuditWebhookModal
          router={this.context.router}
          save={this.props.createWebhook}
        />, null, { className: 'alert fade expand' });
    };


    editWebhook = (webhook) => {
        openModal('Edit Webhook', <CreateAuditWebhookModal
          router={this.context.router}
          webhook={webhook}
          isEdit
          save={this.props.saveWebhook}
        />, null, { className: 'alert fade expand' });
    };

    deleteWebhook = (webhook) => {
        openModal('Remove Webhook', <ConfirmRemoveAuditWebhook
          url={webhook.url}
          cb={() => this.props.deleteWebhook(webhook)}
        />);
    };


    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.params.environmentId !== this.props.match.params.environmentId) {
        //     AppActions.getIdentities(nextProps.params.environmentId);
        // }
    }

    filterRow = (logMessage, search) => {
        const stringToSearch = `${logMessage.log} ${logMessage.author ? logMessage.author.first_name : ''} ${logMessage.author ? logMessage.author.last_name : ''} ${logMessage.author ? logMessage.author.email : ''} ${moment(logMessage.created_date).format('L LTS')}`;
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
                <div
                  className="audit__author"
                >
                    {author ? `${author.first_name} ${author.last_name}` : 'Unknown'}
                </div>
            </Flex>
            <div className="audit__date">{moment(created_date).format('Do MMM YYYY HH:mma')}</div>
        </Row>
    )

    render() {
        const { environmentId } = this.props.match.params;
        const { props: { webhooks, webhooksLoading } } = this;

        return (
            <div className="app-container container">

                <div>
                    <div>
                        {this.props.hasFeature('audit_webhooks') && (
                          <FormGroup className="m-y-3">
                              <Row className="mb-3" space>
                                  <h3 className="m-b-0">Audit webhooks</h3>
                                  <Button onClick={this.createWebhook}>
                                      Create audit webhook
                                  </Button>
                              </Row>
                              <p>
                                  Audit webhooks let you know when audit logs occur, you can configure 1 or more audit webhooks per organisation.
                                  {' '}
                                  <a target="_blank" className="link-dark" href="https://docs.bullet-train.io/system-administration/">Learn about audit webhooks.</a>
                              </p>
                              {webhooksLoading && !webhooks ? (
                                <Loader/>
                              ) : (
                                <PanelSearch
                                  id="webhook-list"
                                  title={(
                                    <Tooltip
                                      title={<h6 className="mb-0">Webhooks <span className="icon ion-ios-information-circle"/></h6>}
                                      place="right"
                                    >
                                        {Constants.strings.WEBHOOKS_DESCRIPTION}
                                    </Tooltip>
                                  )}
                                  className="no-pad"
                                  icon="ion-md-cloud"
                                  items={webhooks}
                                  renderRow={webhook => (
                                    <Row
                                      onClick={() => {
                                          this.editWebhook(webhook);
                                      }} space className="list-item clickable cursor-pointer"
                                      key={webhook.id}
                                    >
                                        <Flex>
                                            <a href="#">
                                                {webhook.url}
                                            </a>
                                            <div className="list-item-footer faint">
                                                Created
                                                {' '}
                                                {moment(webhook.created_date).format('DD/MMM/YYYY')}
                                            </div>
                                        </Flex>
                                        <Row>
                                            <Switch checked={webhook.enabled}/>
                                            <button
                                              id="delete-invite"
                                              type="button"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  e.preventDefault();
                                                  this.deleteWebhook(webhook);
                                              }}
                                              className="btn btn--with-icon ml-auto btn--remove"
                                            >
                                                <RemoveIcon/>
                                            </button>
                                        </Row>
                                    </Row>
                                  )}
                                  renderNoResults={(
                                    <Panel
                                      id="users-list"
                                      icon="ion-md-cloud"
                                      title={(
                                        <Tooltip
                                          title={<h6 className="mb-0">Webhooks <span className="icon ion-ios-information-circle"/></h6>}
                                          place="right"
                                        >
                                            {Constants.strings.AUDIT_WEBHOOKS_DESCRIPTION}
                                        </Tooltip>
                                      )}
                                    >
                                        You currently have no webhooks configured for this organisation.
                                    </Panel>
                                  )}
                                  isLoading={this.props.webhookLoading}
                                />
                              )}
                          </FormGroup>
                        )}
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

module.exports = ConfigProvider(withAuditWebhooks(AuditLogPage));
