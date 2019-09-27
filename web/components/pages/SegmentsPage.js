import React, { Component } from 'react';
import CreateSegmentModal from '../modals/CreateSegment';
import TryIt from '../TryIt';
import ConfirmRemoveSegment from '../modals/ConfirmRemoveSegment';

const SegmentsPage = class extends Component {
    static displayName = 'SegmentsPage';

    static contextTypes = {
        router: propTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
        AppActions.getFeatures(this.props.match.params.projectId, this.props.match.params.environmentId);
        AppActions.getSegments(this.props.match.params.projectId, this.props.match.params.environmentId);
    }

    componentWillUpdate(newProps) {
        const { match: { params } } = newProps;
        const { match: { params: oldParams } } = this.props;
        if (params.environmentId != oldParams.environmentId || params.projectId != oldParams.projectId) {
            AppActions.getFeatures(this.props.match.params.projectId, this.props.match.params.environmentId);
            AppActions.getSegments(params.projectId, params.environmentId);
        }
    }

    componentDidMount = () => {
        API.trackPage(Constants.pages.FEATURES);
        const { match: { params } } = this.props;
        AsyncStorage.setItem('lastEnv', JSON.stringify({
            orgId: AccountStore.getOrganisation().id,
            projectId: params.projectId,
            environmentId: params.environmentId,
        }));
    };

    newSegment = (flags) => {
        openModal('New Segment', <CreateSegmentModal
          flags={flags}
          environmentId={this.props.match.params.environmentId}
          projectId={this.props.match.params.projectId}
        />, null, { className: 'create-segment-modal' });
    };


    editSegment = (segment) => {
        API.trackEvent(Constants.events.VIEW_SEGMENT);
        openModal('Edit Segment', <CreateSegmentModal
          segment={segment}
          isEdit
          environmentId={this.props.match.params.environmentId}
          projectId={this.props.match.params.projectId}
          projectFlag={segment}
        />, null, { className: 'create-segment-modal' });
    };


    componentWillReceiveProps(newProps) {
        if (newProps.match.params.environmentId != this.props.match.params.environmentId) {
            AppActions.getSegments(newProps.match.params.projectId, newProps.match.params.environmentId);
        }
    }

    confirmRemove = (segment, cb) => {
        openModal('Remove Segment', <ConfirmRemoveSegment
          environmentId={this.props.match.params.environmentId}
          segment={segment}
          cb={cb}
        />);
    }

    onError = (error) => {
        // Kick user back out to projects
        this.context.router.history.replace('/projects');
    }

    render() {
        const { projectId, environmentId } = this.props.match.params;
        return (
            <div data-test="segments-page" id="segments-page" className="app-container container">
                <SegmentListProvider onSave={this.onSave} onError={this.onError}>
                    {({ isLoading, segments }, { removeSegment }) => (
                        <div className="segments-page">
                            {isLoading && <div className="centered-container"><Loader/></div>}
                            {!isLoading && (
                                <div>
                                    {segments && segments.length ? (
                                        <div>
                                            <Row>
                                                <Flex>
                                                    <h3>Segments</h3>
                                                    <p>
                                                        Create and manage groups of users with similar traits.
                                                    </p>
                                                </Flex>
                                                <FormGroup className="float-right">
                                                    <div className="text-right">
                                                        <Button
                                                          className="btn-lg btn-primary"
                                                          id="show-create-segment-btn"
                                                          data-test="show-create-segment-btn"
                                                          onClick={this.newSegment}
                                                        >
                                                            Create Segment
                                                        </Button>
                                                    </div>
                                                </FormGroup>
                                            </Row>

                                            <FormGroup>
                                                <PanelSearch
                                                  className="no-pad"
                                                  id="segment-list"
                                                  icon="ion-ios-globe"
                                                  title="Segments"
                                                  items={segments}
                                                  renderRow={({ name, id, enabled, created_date, type }, i) => (
                                                      <Row className="list-item clickable" key={id} space>
                                                          <div
                                                            className="flex flex-1"
                                                            onClick={() => this.editSegment(segments[i])}
                                                          >
                                                              <Row>
                                                                  <a href="#">
                                                                      <span data-test={`segment-${i}-name`}>
                                                                          {name}
                                                                      </span>
                                                                  </a>
                                                              </Row>
                                                              <div className="list-item-footer faint">
                                                                    Created
                                                                  {' '}
                                                                  {moment(created_date).format('DD/MMM/YYYY')}
                                                              </div>
                                                          </div>
                                                          <Row>
                                                              <Column>
                                                                  <button
                                                                    id="remove-feature"
                                                                    onClick={() => this.confirmRemove(segments[i], () => {
                                                                        removeSegment(this.props.match.params.projectId, segments[i].id);
                                                                    })}
                                                                    className="btn btn--with-icon"
                                                                  >
                                                                      <RemoveIcon/>
                                                                  </button>
                                                              </Column>
                                                          </Row>
                                                      </Row>
                                                  )}
                                                  renderNoResults={(
                                                      <div className="text-center"/>
                                                    )}
                                                  filterRow={({ name }, search) => name.toLowerCase().indexOf(search) > -1}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <CodeHelp
                                                  title="Using segments"
                                                  snippets={Constants.codeHelp.SEGMENTS(environmentId)}
                                                />
                                            </FormGroup>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>Target groups of users with segments.</h3>
                                            <FormGroup>
                                                <Panel icon="ion-ios-globe" title="1. creating a segment">
                                                    <p>
                                                        You can create a segment that targets
                                                        {' '}
                                                        <a
                                                          href="https://docs.bullet-train.io/managing-identities/#identity-traits"
                                                          target="new"
                                                        >
User Traits
                                                        </a>
                                                        .
                                                        As user's traits are updated they will automatically be added to
                                                        the segments based on the rules you create. <a href="https://docs.bullet-train.io/managing-segments/">Check out the documentation on Segments</a>.
                                                    </p>
                                                </Panel>
                                            </FormGroup>
                                            <FormGroup className="text-center">
                                                <Button
                                                  className="btn-lg btn-primary" id="show-create-segment-btn" data-test="show-create-segment-btn"
                                                  onClick={this.newSegment}
                                                >
                                                    <span className="icon ion-ios-globe"/>
                                                    {' '}
                                                    Create your first Segment
                                                </Button>
                                            </FormGroup>
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                    )}
                </SegmentListProvider>
            </div>
        );
    }
};

SegmentsPage.propTypes = {};

module.exports = SegmentsPage;
